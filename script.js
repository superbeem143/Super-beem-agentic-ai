const sendBtn = document.getElementById("sendBtn");
const prompt = document.getElementById("prompt");
const chatBox = document.getElementById("chatBox");

sendBtn.addEventListener("click", () => {

    const text = prompt.value.trim();

    if(text === "") return;

    chatBox.innerHTML += `
        <div class="user">
            🧑 ${text}
        </div>
    `;

    setTimeout(() => {

        chatBox.innerHTML += `
            <div class="bot">
                🤖 SUPER BEEM is thinking...
            </div>
        `;

        chatBox.scrollTop = chatBox.scrollHeight;

    },500);

    prompt.value="";

});
