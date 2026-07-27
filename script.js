const SERVER = "https://super-beem-server.onrender.com/chat";

const chat = document.getElementById("chat");
const msg = document.getElementById("msg");
const sendBtn = document.getElementById("send");

sendBtn.addEventListener("click", sendMessage);

msg.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        sendMessage();
    }
});

async function sendMessage() {

    const text = msg.value.trim();

    if (text === "") return;

    chat.innerHTML += `
        <div class="user">${text}</div>
    `;

    msg.value = "";
    chat.scrollTop = chat.scrollHeight;

    const loading = document.createElement("div");
    loading.className = "bot";
    loading.innerText = "🤖 Thinking...";
    chat.appendChild(loading);

    try {

        const response = await fetch(SERVER, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: text
            })
        });

        const data = await response.json();

        loading.innerText = data.reply || "No response";

        if ("speechSynthesis" in window) {
            speechSynthesis.cancel();

            const speech = new SpeechSynthesisUtterance(data.reply);
            speech.lang = "en-US";
            speech.rate = 1;
            speech.pitch = 1;

            speechSynthesis.speak(speech);
        }

    } catch (error) {

        loading.innerText = "❌ Error: " + error.message;

    }

    chat.scrollTop = chat.scrollHeight;
}
