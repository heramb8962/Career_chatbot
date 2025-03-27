function sendMessage() {
    let userInput = document.getElementById("user-input").value;
    let chatMessages = document.getElementById("chat-messages");

    if (!userInput.trim()) return; // Prevent empty messages

    // Add user message to chat
    chatMessages.innerHTML += <div><strong>You:</strong> ${userInput}</div>;

    // Send message to Flask backend
    fetch("/chat", {
        method: "POST",
        body: JSON.stringify({ message: userInput }),
        headers: { "Content-Type": "application/json" }
    })
    .then(response => response.json()) // Convert response to JSON
    .then(data => {
        // Add bot response to chat
        chatMessages.innerHTML += <div><strong>Bot:</strong> ${data.response}</div>;
        document.getElementById("user-input").value = ""; // Clear input field
        chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to latest message
    })
    .catch(error => {
        console.error("Error:", error);
        chatMessages.innerHTML += <div><strong>Bot:</strong> Error connecting to server.</div>;
    });
}

// Allow sending messages with the Enter key
document.getElementById("user-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

function clearChat() {
    document.getElementById("chat-messages").innerHTML = ""; // Clears all chat messages
}

let recognition;
let isRecording = false;

function startSpeechRecognition() {
    if (!recognition) {
        recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onresult = function(event) {
            const transcript = event.results[0][0].transcript;
            document.getElementById('user-input').value = transcript;
        };

        recognition.onerror = function(event) {
            console.error('Speech recognition error:', event.error);
        };
    }

    const voiceIcon = document.querySelector('.voice-icon');

    if (isRecording) {
        recognition.stop(); // Stop recording when clicked again
        isRecording = false;
        voiceIcon.classList.remove('recording'); // Remove red color
    } else {
        recognition.start();
        isRecording = true;
        voiceIcon.classList.add('recording'); // Add red color
    }
}