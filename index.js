// javascript
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, get,child } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

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
                addtestimonial(JSON.parse(currentItemValue),currentItemID)
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

function addtestimonial(obj,key) {
    let testin = document.createElement('div')
    const likeEl = document.getElementsByClassName('likes')
    const individualEl = document.getElementsByClassName('individual')
    const  newEl = document.createElement("li")
    const newTo = document.createElement("div")
    const newFrom = document.createElement("div")
    const newTest = document.createElement("div")
    const newLike = document.createElement("button")
    newEl.className = "individual"
    newTo.className = "totest"
    newFrom.className = "fromtest"
    newTest.className = "testtest"
    newLike.className = "likes"
    newTo.innerHTML = `<p>To ${obj.to}</p>`
    newTest.innerHTML = `<p>${obj.testimonial}</p>`
    newLike.textContent = `${obj.likecount==undefined?0:obj.likecount} 🩷`
    newFrom.innerHTML = `From ${obj.sender}`;
    newFrom.appendChild(newLike);
    newEl.appendChild(newTo);
    newEl.appendChild(newTest);
    newEl.appendChild(newFrom);
    lsendEl.append(newEl)
    newLike.addEventListener("click", function() {
        console.log(12)
    })  
    newEl.addEventListener("dblclick", function() {
        console.log(11)
    })
}