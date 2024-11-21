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

    chatsArray.push({ senderButtonValue, txtMessage });
    
    console.log(time);

    let messageHTML = ``;

    if (senderButtonValue == "Sender 1") {

        messageHTML =   `<div class="bg-black text-white w-50 rounded-2 ms-auto p-3 mt-3">
                            <p class="text-start fw-bold">${senderButtonValue}</p>
                            <p class="text-start">${txtMessage}</p>
                            <p class="text-end">${time}</p>
                        </div>`;

    } else if (senderButtonValue == "Sender 2") {

        messageHTML =   `<div class="bg-white text-dark w-50 rounded-2 me-auto p-3 mt-3">
                            <p class="text-start fw-bold">${senderButtonValue}</p>
                            <p class="text-start">${txtMessage}</p>
                            <p class="text-end">${time}</p>
                        </div>`;

    } else if (senderButtonValue == "Select Sender") {
        alert("Select a Sender");
    }

    messageDiv.innerHTML += messageHTML;
}



//  ------------------- time -------------------
let date = new Date();
let utcTime = (date.getTimezoneOffset() * 60000);
let hours = new Date().getHours();
let minutes = new Date().getMinutes();
let ampm = hours >= 12 ? 'PM' : 'AM';
let time = hours+"."+minutes+" "+ampm;

