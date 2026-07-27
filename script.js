alert("SCRIPT START");

const SERVER = "https://super-beem-server.onrender.com/chat";

const chat = document.getElementById("chat");
const input = document.getElementById("msg");
const sendBtn = document.getElementById("send");
const clearBtn = document.getElementById("clearBtn");
const typing = document.getElementById("typing");
const voiceBtn = document.getElementById("voiceBtn");

// Load previous chat
loadChat();

sendBtn.addEventListener("click", sendMessage);

input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        sendMessage();
    }
});

clearBtn.addEventListener("click", function () {

    localStorage.removeItem("superbeem_chat");

    chat.innerHTML = `
    <div class="bot">
    👋 Hello! I'm SUPER BEEM AI.<br>
    How can I help you today?
    </div>`;

    saveChat();
});

if (voiceBtn) {
    voiceBtn.addEventListener("click", startVoice);
}

function saveChat() {
    localStorage.setItem("superbeem_chat", chat.innerHTML);
}

function loadChat() {

    const saved = localStorage.getItem("superbeem_chat");

    if (saved) {
        chat.innerHTML = saved;
    }

}
async function sendMessage() {

    const message = input.value.trim();

    if (message === "") return;

    chat.innerHTML += `
    <div class="user">${message}</div>
    `;

    saveChat();

    input.value = "";

    typing.style.display = "block";

    chat.scrollTop = chat.scrollHeight;

    try {

        const response = await fetch(SERVER, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: message
            })
        });

        const data = await response.json();

        typing.style.display = "none";

        chat.innerHTML += `
        <div class="bot">${data.reply}</div>
        `;

        saveChat();

        if ("speechSynthesis" in window) {

            speechSynthesis.cancel();

            const speech = new SpeechSynthesisUtterance(data.reply);

            speech.lang = "en-US";

            speechSynthesis.speak(speech);

        }

    } catch (error) {

        typing.style.display = "none";

        chat.innerHTML += `
        <div class="bot">
        ❌ ${error.message}
        </div>
        `;

        saveChat();

    }

    chat.scrollTop = chat.scrollHeight;

}        
function startVoice() {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        alert("Voice recognition is not supported on this browser.");
        return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "te-IN";   // Telugu + English
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = function () {
        voiceBtn.innerHTML = "🎙️";
        voiceBtn.disabled = true;
    };

    recognition.onend = function () {
        voiceBtn.innerHTML = "🎤";
        voiceBtn.disabled = false;
    };

    recognition.onresult = function (event) {
        input.value = event.results[0][0].transcript;
        sendMessage();
    };

    recognition.onerror = function (event) {

        console.log("Voice Error:", event.error);

        if (event.error !== "no-speech") {
            alert("Voice Error: " + event.error);
        }

        voiceBtn.innerHTML = "🎤";
        voiceBtn.disabled = false;
    };

    recognition.start();
}    
// Stop AI voice when user starts typing
input.addEventListener("input", () => {
    if ("speechSynthesis" in window) {
        speechSynthesis.cancel();
    }
});

// Stop AI voice when page closes
window.addEventListener("beforeunload", () => {
    if ("speechSynthesis" in window) {
        speechSynthesis.cancel();
    }
});

// Auto scroll whenever new messages are added
const observer = new MutationObserver(() => {
    chat.scrollTop = chat.scrollHeight;
});

observer.observe(chat, {
    childList: true
});

console.log("SUPER BEEM AI Loaded Successfully");
alert("SCRIPT LOADED");
