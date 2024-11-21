// ------------------- Message Functions -------------------
let chatsArray = [];
let messageDiv = document.getElementById("messageDiv");

async function send() {
    let txtMessage = document.getElementById("txtMessage").value;
    let time = getTime();
    chatsArray.push({ sender: "Me", message: txtMessage });

    addMessage("Me", txtMessage, time);

    let aiResponse = await getAIResponse(txtMessage);
    addMessage("AI", aiResponse, getTime());
}

// ------------------- Add Message -------------------
function addMessage(sender, message, time) {
    let avatarURL, textAlignment, bubbleClass, bubbleAlignment, timeColor;

    if (sender === "Me") {
        avatarURL = "https://randomuser.me/api/portraits/men/1.jpg";
        textAlignment = "text-end";
        bubbleClass = "bg-secondary text-white";
        bubbleAlignment = "ms-auto";
        timeColor = "text-white";
    } else if (sender === "AI") {
        avatarURL = "https://randomuser.me/api/portraits/women/1.jpg";
        textAlignment = "text-end";
        bubbleClass = "bg-white text-dark";
        bubbleAlignment = "me-auto";
        timeColor = "text-dark";
    }

    let messageHTML = `
    <div class="message-bubble ${bubbleClass} ${bubbleAlignment} w-100 rounded-2 p-3 mt-3">
        <div class="d-flex ${textAlignment} mb-2">
            <img src="${avatarURL}" class="rounded-circle" width="30" height="30" alt="${sender}" />
            <p class="fw-bold ms-2 mb-0">${sender}</p>
        </div>
        <p class="text-start">${message}</p>
        <p class="${textAlignment} ${timeColor} text-muted" style="font-size: 0.8rem;">${time}</p>
    </div>
    `;

    messageDiv.innerHTML += messageHTML;
    messageDiv.scrollTop = messageDiv.scrollHeight;
}

// ------------------- Get Time -------------------
function getTime() {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    let time = hours + ":" + (minutes < 10 ? "0" : "") + minutes + " " + ampm;
    return time;
}

// ------------------- Fetch AI Response -------------------
async function getAIResponse(userMessage) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "contents": [
            {
                "parts": [
                    {
                        "text": userMessage
                    }
                ]
            }
        ]
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    let response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=", requestOptions);
    let result = await response.json();
    let aiMessage = result.candidates[0].content.parts[0].text;

    return aiMessage;
}

