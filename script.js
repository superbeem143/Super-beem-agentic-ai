const SERVER = "https://super-beem-server.onrender.com/chat";

const chat = document.getElementById("chat");
const input = document.getElementById("msg");
const sendBtn = document.getElementById("send");
const clearBtn = document.getElementById("clearBtn");
const typing = document.getElementById("typing");

sendBtn.addEventListener("click", sendMessage);

input.addEventListener("keydown", function(e){
    if(e.key === "Enter"){
        sendMessage();
    }
});

clearBtn.addEventListener("click", function(){
    chat.innerHTML = `
    <div class="bot">
    👋 Hello! I'm SUPER BEEM AI.<br>
    How can I help you today?
    </div>`;
});

async function sendMessage(){

    const message = input.value.trim();

    if(message==="") return;

    chat.innerHTML += `
    <div class="user">${message}</div>
    `;

    input.value="";

    typing.style.display="block";

    chat.scrollTop = chat.scrollHeight;

    try{

        const response = await fetch(SERVER,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                message:message
            })
        });

        const data = await response.json();

        typing.style.display="none";

        chat.innerHTML += `
        <div class="bot">${data.reply}</div>
        `;

        if("speechSynthesis" in window){

            speechSynthesis.cancel();

            const speech = new SpeechSynthesisUtterance(data.reply);

            speech.lang="en-US";

            speechSynthesis.speak(speech);

        }

    }catch(error){

        typing.style.display="none";

        chat.innerHTML += `
        <div class="bot">
        ❌ ${error.message}
        </div>
        `;

    }

    chat.scrollTop = chat.scrollHeight;

}
