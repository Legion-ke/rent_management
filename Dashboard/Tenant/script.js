// Sample data structure to store tenant and landlord information
const users = [
    { username: 'tenant1', password: 'tenant1pass', role: 'tenant', rentBalance: 500 },
    { username: 'landlord1', password: 'landlord1pass', role: 'landlord' }
];

// Sample data structure to store repair bookings and forum messages
const repairBookings = [];
const forumMessages = [];

function loadTenantDashboard() {
    // Load tenant-specific information
    const tenant = getCurrentUser();
    document.getElementById('tenantRentBalance').textContent = `$${tenant.rentBalance.toFixed(2)}`;

    // Load forum messages
    loadForumMessages();
}

function payRent() {
    const tenant = getCurrentUser();
    const paymentAmount = parseFloat(document.getElementById('paymentAmount').value);

    if (isNaN(paymentAmount) || paymentAmount <= 0) {
        alert('Please enter a valid payment amount.');
        return;
    }

    // Update rent balance and store the payment
    tenant.rentBalance -= paymentAmount;
    alert(`Rent payment of $${paymentAmount.toFixed(2)} successful!`);
    document.getElementById('tenantRentBalance').textContent = `$${tenant.rentBalance.toFixed(2)}`;
}

function bookRepair() {
    const tenant = getCurrentUser();
    const repairIssue = document.getElementById('repairIssue').value;

    if (!repairIssue.trim()) {
        alert('Please enter a repair issue.');
        return;
    }

    // Store repair booking
    repairBookings.push({ tenant: tenant.username, issue: repairIssue });
    alert('Repair booking submitted successfully!');
    document.getElementById('repairIssue').value = ''; // Clear the input field
}

function postMessage() {
    const tenant = getCurrentUser();
    const forumMessage = document.getElementById('forumMessage').value;

    if (!forumMessage.trim()) {
        alert('Please enter a message.');
        return;
    }

    // Store forum message
    forumMessages.push({ sender: tenant.username, message: forumMessage });
    alert('Message posted successfully!');
    document.getElementById('forumMessage').value = ''; // Clear the input field

    // Refresh forum messages
    loadForumMessages();
}

function loadForumMessages() {
    const forumMessagesDiv = document.getElementById('forumMessages');
    forumMessagesDiv.innerHTML = '';

    // Display forum messages
    forumMessages.forEach(message => {
        const messageDiv = document.createElement('div');
        messageDiv.innerHTML = `<strong>${message.sender}:</strong> ${message.message}`;
        forumMessagesDiv.appendChild(messageDiv);
    });
}

function signOut() {
    window.location.href = 'index.html';
}

// Helper function to get the current logged-in user
function getCurrentUser() {
    const currentUser = users.find(user => user.username === getCurrentUsername());
    return currentUser;
}

// Helper function to get the current logged-in username (replace this with your authentication logic)
function getCurrentUsername() {
    // For simplicity, you might use local storage or session storage for authentication in a real-world scenario
    return 'tenant1'; // Replace with your authentication logic
}

function previewImage(event) {
    var reader = new FileReader();
    reader.onload = function() {
        var output = document.getElementById('preview');
        output.src = reader.result;
    }
    reader.readAsDataURL(event.target.files[0]);
}

function confirmRent() {
    var rentImage = document.getElementById('rentImage').files[0];
    if (rentImage) {
        // Display loading animation
        document.getElementById('loadingAnimation').style.display = 'block';

        // Simulate confirmation process (setTimeout is used here, you should replace this with actual confirmation process)
        setTimeout(function() {
            // Hide loading animation
            document.getElementById('loadingAnimation').style.display = 'none';

            // Display confirmation message (you can replace this with your actual confirmation message)
            alert('Rent confirmed successfully!');
        }, 3000); // 3 seconds for simulation, replace with actual process duration
    } else {
        alert('Please upload an image for confirmation.');
    }
}


// Initialize tenant dashboard
loadTenantDashboard();
