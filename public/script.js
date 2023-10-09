const socket = io();

document.querySelectorAll('.chat-container')[1].style.display = 'none';

const inputBox = document.querySelector('.input-box');
const sendButton = document.querySelector('.send-btn');
const chat = document.querySelector('.chat');

sendButton.addEventListener('click', () => {
    const textMessage = inputBox.value;
    inputBox.value = '';

    socket.emit('send-msg', { msg: textMessage });
});

socket.on('received-msg', (data) => {
    const div = document.createElement('div');

    if (data.id === socket.id) {
        div.classList.add('message', 'sender');
        div.innerHTML = `<strong>You</strong>: ${data.msg}`;
    } else {
        div.classList.add('message', 'receiver');
        div.innerHTML = `<strong>${data.username}</strong>: ${data.msg}`;
    }

    chat.append(div);
});

const loginName = document.querySelector('#login-name');
const loginBtn = document.querySelector('#login-btn');

loginBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const username = loginName.value;
    loginName.value = '';

    if (username === '') {
        return;
    }

    const chatUsername = document.getElementById('chat-username');
    chatUsername.textContent = username;

    socket.emit('login', { username });

    document.querySelectorAll('.chat-container')[0].style.display = 'none';
    document.querySelectorAll('.chat-container')[1].style.display = 'block';
});
