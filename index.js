// javascript
const fromEl = document.getElementById('from');
const toEl = document.getElementById('to');
const testimonialEl = document.getElementById('testimonial');

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
}

function clear() {
    fromEl.value = ''
    toEl.value = ''
    testimonialEl.value = ''
}

