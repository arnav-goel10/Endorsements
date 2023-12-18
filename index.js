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
    <div class="individual">
        <div class="from">
            <p>From: ${obj.sender}</p>
        </div>
        <div class="to">
            <p>To: ${obj.to}</p>
        </div>
        <div class="testimonial">
            <p>Testimonial: ${obj.testimonial}</p>
        </div>
    </div>
    
    `
    lsendEl.appendChild(testin)
}