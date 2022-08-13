var socket = io();
var myid = document.getElementById("my-id");
// Game
var messages = document.getElementById("messages");
var form = document.getElementById("form");
var input = document.getElementById("input");
var reset = document.getElementById("reset");
// Chat
var chatMessages = document.getElementById("chat-messages");
var chatForm = document.getElementById("chat-form");
var chatInput = document.getElementById("chat-input");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (input.value) {
    socket.emit("chat message", input.value);
    input.value = "";
  }
});

chatForm.addEventListener("submit", function (e) {
  e.preventDefault();
  if (chatInput.value) {
    socket.emit("chat message-chat", chatInput.value);
    chatInput.value = "";
  }
});

let msgs = [];
socket.on("chat message", function (msg) {
  var item = document.createElement("li");
  msgs.push(msg);
  if (msgs.length == 2) {
    item.textContent = `${msgs[0]}  ${msgs[1]}`;
    if (msgs[0] === msgs[1]) {
      item.style.backgroundColor = "#dcffca";
    }
    messages.appendChild(item);
    msgs = [];
  }
  window.scrollTo(0, document.body.scrollHeight);
});

socket.on("chat message-chat", function (msg, id) {
  var item = document.createElement("li");
  item.textContent = msg;
  if (socket.id === id) {
    item.style.textAlign = "end";
  }
  chatMessages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});

reset.addEventListener("click", () => {
  console.log("reset");
  socket.emit("reset");
});
socket.on("reset", () => {
  messages.innerHTML = "";
});

// socket.on("new person", function (id) {
//   var item = document.createElement("li");
//   item.textContent = `The user ${id} is connected`;

//   messages.appendChild(item);
//   window.scrollTo(0, document.body.scrollHeight);
// });

socket.on("leave person", function (id) {
  var item = document.createElement("li");
  item.textContent = `The user ${id} is disconnected`;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});
