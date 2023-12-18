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
const publishEl = document.getElementById('lsend');

function published() {
    const fromval = fromEl.value
    const toval = toEl.value
    const testimonialval = testimonialEl.value
    const testimonialobj = {
        from: fromval,
        to: toval,
        testimonial: testimonialval
    }
    clearinput()
    upload(testimonialobj)
    relist()
}

function clearinput() {
    fromEl.value = ''
    toEl.value = ''
    testimonialEl.value = ''
}

function relist() {
    
}

function upload(obj) {
    push(EndorsementListinDB, obj)
}