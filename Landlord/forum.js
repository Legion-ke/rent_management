document.addEventListener("DOMContentLoaded", function() {
    // Function to fetch messages using AJAX
    function fetchMessages() {
        fetch('forum.php?action=getMessages')
            .then(response => response.json())
            .then(messages => {
                // Clear existing messages
                document.getElementById('forumMessages').innerHTML = "";
                // Append new messages
                messages.forEach(message => {
                    document.getElementById('forumMessages').innerHTML += "<div>" + message + "</div>";
                });
            });
    }

    // Fetch messages initially
    fetchMessages();

    // Real-time updates - fetch messages every 5 seconds
    setInterval(fetchMessages, 5000);

    // Submit message
    document.querySelector("button[type='submit']").addEventListener("click", function() {
        var message = document.getElementById("forumMessage").value;
        if (message.trim() !== "") {
            fetch('forum.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: 'message=' + encodeURIComponent(message)
            })
            .then(response => response.text())
            .then(data => {
                document.getElementById("forumMessage").value = "";
                fetchMessages(); // Fetch messages again after posting
            });
        }
    });
});
