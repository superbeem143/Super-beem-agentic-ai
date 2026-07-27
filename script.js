const SERVER="https://super-beem-server.onrender.com/chat";
const chat=document.getElementById("chat");
const msg=document.getElementById("msg");
document.getElementById("send").onclick=send;
msg.addEventListener("keydown",e=>{if(e.key==="Enter")send();});
async function send(){
 const text=msg.value.trim();
 if(!text)return;
 chat.innerHTML+=`<div class="user">${text}</div>`;
 msg.value="";
 const t=document.createElement("div");
 t.className="bot typing";
 t.textContent="SUPER BEEM AI is typing...";
 chat.appendChild(t);
 chat.scrollTop=chat.scrollHeight;
 try{
  const r=await fetch(SERVER,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:text})});
  const d=await r.json();
  t.className="bot";
  t.textContent=d.reply||"No reply";
  if("speechSynthesis" in window){
    speechSynthesis.cancel();
    speechSynthesis.speak(new SpeechSynthesisUtterance(t.textContent));
  }
 }catch(e){
  t.className="bot";
  t.textContent="Error: "+e.message;
 }
}
