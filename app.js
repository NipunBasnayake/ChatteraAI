// ------------------- Dropdown Buttons -------------------
let senderButton = document.getElementById("senderButton");
let dropItem1 = document.getElementById("dropItem1");
let dropItem2 = document.getElementById("dropItem2");

dropItem1.addEventListener("click", (e) => {
    e.preventDefault();
    senderButton.value = dropItem1.textContent;
});

dropItem2.addEventListener("click", (e) => {
    e.preventDefault();
    senderButton.value = dropItem2.textContent;
});

// ------------------- Message Functions -------------------
let chatsArray = [];

let messageDiv = document.getElementById("messageDiv");

function send() {
    let senderButtonValue = senderButton.value;
    let txtMessage = document.getElementById("txtMessage").value;
    let time = getTime();
    chatsArray.push({ senderButtonValue, txtMessage });

    let avatarURL, textAlignment, bubbleClass, bubbleAlignment, timeColor;

    if (senderButtonValue === "Sender 1") {
        avatarURL = "https://randomuser.me/api/portraits/men/1.jpg";
        textAlignment = "text-end";
        bubbleClass = "bg-secondary text-white";
        bubbleAlignment = "ms-auto";
        timeColor = "text-white";
    } else if(senderButtonValue === "Sender 2"){
        avatarURL = "https://randomuser.me/api/portraits/women/1.jpg";
        textAlignment = "text-end";
        bubbleClass = "bg-white text-dark";
        bubbleAlignment = "me-auto";
        timeColor = "text-dark";
    }
    if (senderButtonValue!="Select Sender") {
        let messageHTML = `
        <div class="message-bubble ${bubbleClass} ${bubbleAlignment} w-100 rounded-2 p-3 mt-3">
            <div class="d-flex ${textAlignment} mb-2">
                <img src="${avatarURL}" class="rounded-circle" width="30" height="30" alt="${senderButtonValue}" />
                <p class="fw-bold ms-2 mb-0">${senderButtonValue}</p>
            </div>
            <p class="text-start">${txtMessage}</p>
            <p class="${textAlignment} ${timeColor} text-muted" style="font-size: 0.8rem;">${time}</p>
        </div>
    `;

    messageDiv.innerHTML += messageHTML;
    messageDiv.scrollTop = messageDiv.scrollHeight;
    }
}




//  ------------------- Get Time -------------------
function getTime() {
    let date = new Date();
    let hours = new Date().getHours();
    let minutes = new Date().getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    let time = hours + "." + minutes + " " + ampm;
    return time;
}
