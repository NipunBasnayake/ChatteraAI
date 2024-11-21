// ------------------- Message Functions -------------------
let chatsArray = [];
let messageDiv = document.getElementById("messageDiv");

async function send() {
    let txtMessage = document.getElementById("txtMessage");
    let message = txtMessage.value.trim();
    if (!message) return;

    let time = getTime();
    chatsArray.push({ sender: "Me", message });

    addMessage("Me", message, time);
    txtMessage.value = "";
    addTypingIndicator();

    try {
        let aiResponse = await getAIResponse(message);
        removeTypingIndicator();
        addMessage("ChatterAI", aiResponse, getTime());
    } catch (error) {
        removeTypingIndicator();
        addMessage("ChatterAI", "Sorry, I encountered an error. Please try again.", getTime());
    }
}

function addMessage(sender, message, time) {
    let avatarURL, bubbleClass, alignmentClass, avatarPositionClass, timeColor;

    if (sender === "Me") {
        avatarURL = "images/UserAvatar.jpg";  
        bubbleClass = "bg-secondary text-white";
        alignmentClass = "justify-content-end";
        timeColor = "text-white";
    } else if (sender === "ChatterAI") {
        avatarURL = "images/AIAvatar.png"; 
        bubbleClass = "bg-white text-dark";
        alignmentClass = "justify-content-start";
        timeColor = "text-dark";
    }

    let messageHTML = `
    <div class="d-flex ${alignmentClass} align-items-start w-100 my-2">
        <div class="d-flex align-items-center">
            <img src="${avatarURL}" class="rounded-circle me-2" width="40" height="40" alt="${sender}">
            <div class="${bubbleClass} p-3 rounded-3 message-bubble" style="max-width: 75%; ${
                sender === "Me" ? "border-top-right-radius: 0;" : "border-top-left-radius: 0;"
            }">
                <div class="fw-bold">${sender}</div>
                <p class="mb-1">${message}</p>
                <small class="text-muted ${timeColor}">${time}</small>
            </div>
        </div>
    </div>
    `;

    messageDiv.innerHTML += messageHTML;
    messageDiv.scrollTop = messageDiv.scrollHeight;
}




// ------------------- Handle "Enter" Key for Message Sending -------------------
document.getElementById("txtMessage").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        send();
    }
});

function addTypingIndicator() {
    let typingHTML = `
    <div id="typingIndicator" class="d-flex align-items-start w-100 my-2">
        <img src="images/AIAvatar.png" class="rounded-circle me-2" width="40" height="40" alt="ChatterAI">
        <div class="bg-white text-dark p-3 rounded-3" style="max-width: 75%;">
            <div class="fw-bold">ChatterAI</div>  <!-- Changed AI to ChatterAI -->
            <p class="mb-1"><em>Typing...</em></p>
        </div>
    </div>
    `;
    messageDiv.innerHTML += typingHTML;
    messageDiv.scrollTop = messageDiv.scrollHeight;
}

function removeTypingIndicator() {
    let typingIndicator = document.getElementById("typingIndicator");
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// ------------------- Get Time -------------------
function getTime() {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${minutes < 10 ? "0" : ""}${minutes} ${ampm}`;
}

// ------------------- Fetch AI Response -------------------
async function getAIResponse(userMessage) {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            "contents": [{ "parts": [{ "text": userMessage }] }]
        }),
    };

    let response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=",
        requestOptions
    );

    if (!response.ok) {
        throw new Error("Failed to fetch AI response");
    }

    let result = await response.json();
    return result.candidates[0].content.parts[0].text;
}
