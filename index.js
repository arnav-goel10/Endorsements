// javascript
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-df319-default-rtdb.europe-west1.firebasedatabase.app/"
}

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
    clear()
    upload(testimonialobj)
    relist()
}

function clear() {
    fromEl.value = ''
    toEl.value = ''
    testimonialEl.value = ''
}

function relist() {

}

function upload(obj) {

}