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
}

function upload(obj) {
    console.log(obj)
    push(EndorsementListinDB, JSON.stringify(obj))
}