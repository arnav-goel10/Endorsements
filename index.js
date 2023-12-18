// javascript
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://endorsements-arnav-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const EndorsementListinDB = ref(database, "EndorsementList")
const fromEl = document.getElementById('from');
const toEl = document.getElementById('to');
const testimonialEl = document.getElementById('testimonial');
const publishEl = document.getElementById('pub');
const lsendEl = document.getElementById('lsend');
relist()
publishEl.addEventListener("click", async function() {
    console.log(fromEl.value)
    await upload({
        sender: fromEl.value,
        to: toEl.value,
        testimonial: testimonialEl.value
    })
    await clearinput()
    await relist()
})

function clearinput() {
    fromEl.value = ''
    toEl.value = ''
    testimonialEl.value = ''
}

function relist() {
    console.log('relisting')
    onValue(EndorsementListinDB, function(snapshot) {      
        if (snapshot.exists()) {
            let itemsArray = Object.entries(snapshot.val())
            cleartestimonials()
            for (let i = 0; i < itemsArray.length; i++) {
                let currentItem = itemsArray[i]
                let currentItemID = currentItem[0]
                let currentItemValue = currentItem[1]
                addtestimonial(JSON.parse(currentItemValue))
            }    
            
        } else {
            lsend.innerHTML = "No items here... yet"
        }
        
        
    })
}

function upload(obj) {
    push(EndorsementListinDB, JSON.stringify(obj))
}

function cleartestimonials() {
    lsendEl.innerHTML = ''
}

function addtestimonial(obj) {
    let testin = document.createElement('div')
    testin.innerHTML += `
        <div class="testimonial-header">
            <div class="testimonial-header-left">
                <div class="testimonial-header-left-from">
                    <span class="testimonial-header-left-from-text">${obj.sender}</span>
                </div>
                <div class="testimonial-header-left-to">
                    <span class="testimonial-header-left-to-text">to</span>
                </div>
                <div class="testimonial-header-left-to">
                    <span class="testimonial-header-left-to-text">${obj.to}</span>
                </div>
            </div>
            <div class="testimonial-header-right">
                <div class="testimonial-header-right-delete">
                    <button class="testimonial-header-right-delete-button" onclick="deletetestimonial('${obj.id}')">
                        <span class="testimonial-header-right-delete-button-text">Delete</span>
                    </button>
                </div>
            </div>
        </div>
        <div class="testimonial-body">
            <div class="testimonial-body-text">
                <span class="testimonial-body-text-text">${obj.testimonial}</span>
            </div>
        </div>
    `
    lsendEl.appendChild(testin)
}