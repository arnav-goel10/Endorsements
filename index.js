// javascript
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, set } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://endorsements-arnav-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const EndorsementListinDB = ref(database, "EndorsementList")
const fromEl = document.getElementById('from')
const toEl = document.getElementById('to')
const testimonialEl = document.getElementById('testimonial')
const publishEl = document.getElementById('pub')
const lsendEl = document.getElementById('lsend')
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

function addtestimonial(obj, key) {
  let testin = document.createElement('div');
  const likeEl = document.getElementsByClassName('likes');
  const individualEl = document.getElementsByClassName('individual');
  const newEl = document.createElement("li");
  const newTo = document.createElement("div");
  const newFrom = document.createElement("div");
  const newTest = document.createElement("div");
  const newLike = document.createElement("button");
  newEl.className = "individual";
  newTo.className = "totest";
  newFrom.className = "fromtest";
  newTest.className = "testtest";
  newLike.className = "likes";
  newTo.innerHTML = `<p>To ${obj.to}</p>`;
  newTest.innerHTML = `<p>${obj.testimonial}</p>`;
  const currentCount = obj.likecount || 0;
  newLike.textContent = `${currentCount} 🩷`;
  newFrom.innerHTML = `From ${obj.sender}`;
  newFrom.appendChild(newLike);
  newEl.appendChild(newTo);
  newEl.appendChild(newTest);
  newEl.appendChild(newFrom);
  lsendEl.prepend(newEl);

  const isLikedPost = isLiked(key); // Check if post is liked using local storage function

  // Update like button styling based on like state
  if (isLikedPost) {
    newLike.classList.add("liked");
  } else {
    newLike.classList.remove("liked");
  }

  newLike.addEventListener("click", function() {
    startlike(currentCount, key, obj);
  });

  newEl.addEventListener("dblclick", function() {
    startlike(currentCount, key, obj);
  });
}

function updateLikeCount(key, currentCount,obj) {
    const newObj = {
        ...obj,
        likecount: currentCount
    };
    set(ref(database, `EndorsementList/${key}`), JSON.stringify(newObj));
}

function startlike(xyz, key1, obj1) {
  const hasLikedBefore = isLiked(key1); // Check if post is liked in local storage

  if (hasLikedBefore) {
    updateLikeCount(key1, xyz - 1, obj1); // Update like count -1
    removeFromLikedPosts(key1); // Remove from local storage liked posts
  } else {
    updateLikeCount(key1, xyz + 1, obj1); // Update like count +1
    addToLikedPosts(key1); // Add to local storage liked posts
  }
}

function isLiked(key) {
    const likedPosts = JSON.parse(localStorage.getItem("likedPosts") || "{}");
    return likedPosts[key] === true;
  }

  function addToLikedPosts(key) {
    const likedPosts = JSON.parse(localStorage.getItem("likedPosts") || "{}");
    likedPosts[key] = true;
    localStorage.setItem("likedPosts", JSON.stringify(likedPosts));
  }
  
function removeFromLikedPosts(key) {
    const likedPosts = JSON.parse(localStorage.getItem("likedPosts") || "{}");
    delete likedPosts[key];
    localStorage.setItem("likedPosts", JSON.stringify(likedPosts));
}