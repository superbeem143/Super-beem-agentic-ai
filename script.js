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
const response = document.getElementById("response");

sendBtn.addEventListener("click", () => {

    const text = prompt.value;

    response.innerHTML =
        "🤖 SUPER BEEM : I received your command.<br><br>" +
        "Command : <b>" + text + "</b><br><br>" +
        "Status : Processing...";
});
