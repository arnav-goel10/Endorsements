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
    upload({
        sender: fromEl.value,
        to: toEl.value,
        testimonial: testimonialEl.value,
        likecount: 0
    })
    clearinput()
    await relist()
})

function clearinput() {
    fromEl.value = ''
    toEl.value = ''
    testimonialEl.value = ''
}

async function relist() {
    await onValue(EndorsementListinDB, function(snapshot) {      
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
            lsendEl.innerHTML = "No Endorsements... yet 😅"
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
    testin.innerHTML +=`
    <li class="individual" dblclick="addlike()">
        <div class="totest">
            <p>To ${obj.to}</p>
        </div>
        <div class="testtest">
        <p>${obj.testimonial}</p>
        </div>
        <div class="fromtest">
            From ${obj.sender} <div class="likes">${obj.likecount==undefined?0:obj.likecount} 🩷</div>
    </li>
    ` + lsendEl.innerHTML
    lsendEl.innerHTML = testin.innerHTML
}

const likeEl = document.getElementsByClassName('likes')
likeEl.addEventListener("click", function () {
    addlike()
})

const individualEl = document.getElementsByClassName('individual')
individualEl.addEventListener("dblclick", function () {
    addlike()
})

function addlike() {
    console.log("like")
}