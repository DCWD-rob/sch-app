<?php
// user2_chat.php
$messageFile = __DIR__ . '/message.txt';
$user = 'User 2';

// Handle AJAX POST: send or clear
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Clear chat (called via sendBeacon on window close)
    if (isset($_POST['clearChat']) && $_POST['clearChat'] == 1) {
        file_put_contents($messageFile, '');
        echo json_encode(['success' => true]);
        exit;
    }

    // Send message
    if (isset($_POST['message'], $_POST['user'])) {
        $msg  = trim($_POST['message']);
        $userName = trim($_POST['user']);
        if ($msg !== '' && $userName !== '') {
            $safeMsg  = htmlspecialchars($msg, ENT_QUOTES, 'UTF-8');
            $safeUser = htmlspecialchars($userName, ENT_QUOTES, 'UTF-8');
            $entry = json_encode([
                'time' => date("Y-m-d H:i:s"),
                'user' => $safeUser,
                'text' => $safeMsg
            ]) . "\n";
            file_put_contents($messageFile, $entry, FILE_APPEND);
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'error' => 'Message and user required.']);
        }
        exit;
    }

    echo json_encode(['success' => false, 'error' => 'Invalid request']);
    exit;
}

// Handle AJAX GET: fetch messages
if (isset($_GET['ajax']) && $_GET['ajax'] == 1) {
    header('Content-Type: application/json');
    $messages = [];
    if (file_exists($messageFile)) {
        $lines = file($messageFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        foreach ($lines as $line) {
            $decoded = json_decode($line, true);
            if (is_array($decoded)) {
                $messages[] = $decoded;
            }
        }
    }
    echo json_encode($messages);
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title> Chat User</title>
    <style>
        body{font-family:Arial;padding:20px;max-width:700px;margin:auto;background:#fff5f5;}
        h2{color:#721c24;}
        #chat{max-height:500px;overflow-y:auto;border:1px solid #ddd;padding:10px;margin-bottom:10px;background:#f9f9f9;}
        .message{margin-bottom:10px;border-radius:10px;padding:10px;max-width:70%;clear:both;}
        .user1{background:#cce5ff;float:left;text-align:left;}
        .user2{background:#f8d7da;float:right;text-align:right;}
        .username{font-weight:bold;display:block;margin-bottom:5px;}
        .timestamp{font-size:0.75em;color:#555;margin-top:5px;}
        textarea,input{width:100%;padding:8px;margin-bottom:5px;box-sizing:border-box;}
        button{padding:10px 20px;margin-top:5px;cursor:pointer;}
        #error{color:red;}
    </style>
</head>
<body>
<h2>💬  Chat User</h2>

<audio id="sendSound" src="blip.mp3" preload="auto"></audio>

<div id="chat"><p>Loading messages...</p></div>

<input type="text" id="displayName" placeholder="Your display name (optional, default: User 2)">
<textarea id="messageInput" placeholder="Type your message..."></textarea><br>
<button id="sendBtn">Send</button>
<p id="error"></p>

<script>
const chat = document.getElementById('chat');
const msgInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const errorEl = document.getElementById('error');
const sendSound = document.getElementById('sendSound');
const API = window.location.href.split('?')[0];
let lastMessageCount = 0;
let audioEnabled = false;

document.body.addEventListener('click',()=>{audioEnabled=true},{once:true});
document.body.addEventListener('keypress',()=>{audioEnabled=true},{once:true});

function escapeHTML(str){
    return str.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}

async function loadMessages(){
    try{
        const res = await fetch(API + '?ajax=1', {credentials:'include'});
        const data = await res.json();
        if (Array.isArray(data)) {
            if (data.length !== lastMessageCount && audioEnabled && lastMessageCount !== 0) {
                // Optional: play sound on new incoming messages
            }
            lastMessageCount = data.length;
            chat.innerHTML = data.map(msg => {
                const cls = msg.user.startsWith('User 1') ? 'user1' : 'user2';
                return `
                    <div class="message ${cls}">
                        <span class="username">${escapeHTML(msg.user)}</span>
                        <span class="text">${escapeHTML(msg.text)}</span>
                        <div class="timestamp">${escapeHTML(msg.time)}</div>
                    </div>
                `;
            }).join('');
            chat.scrollTop = chat.scrollHeight;
        } else {
            chat.innerHTML = "<p style='color:red;'>Error loading messages</p>";
        }
    } catch(e){
        chat.innerHTML = "<p style='color:red;'>Error loading messages</p>";
    }
}

async function sendMessage(){
    const msg = msgInput.value.trim();
    if (!msg) return;
    const nameField = document.getElementById('displayName').value.trim();
    const userLabel = nameField ? nameField + ' (User 2)' : 'User 2';
    const fd = new URLSearchParams();
    fd.append('message', msg);
    fd.append('user', userLabel);
    try{
        const res = await fetch(API, {method:'POST', body:fd, credentials:'include'});
        const data = await res.json();
        if (data.success) {
            msgInput.value = '';
            if (audioEnabled) {
                sendSound.play().catch(()=>{});
            }
            loadMessages();
        } else {
            errorEl.textContent = data.error || 'Error sending message.';
        }
    } catch(e){
        errorEl.textContent = 'Error sending message.';
    }
}

sendBtn.addEventListener('click', sendMessage);
msgInput.addEventListener('keypress', e => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

setInterval(loadMessages, 1000);
loadMessages();

// Clear chat when window closes
window.addEventListener('beforeunload', () => {
    const fd = new URLSearchParams();
    fd.append('clearChat', '1');
    navigator.sendBeacon(API, fd);
});
</script>
</body>
</html>
