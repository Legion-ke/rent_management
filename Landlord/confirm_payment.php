<?php
// Database connection details
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "rent_management";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['confirm']) || isset($_POST['deny'])) {
        // Get the payment ID from the form
        $payment_id = $_POST['payment_id'];
        
        // Update the confirmation status based on the button clicked
        $confirmed = isset($_POST['confirm']) ? 1 : 0;
        
        // Prepare and execute the SQL query to update the confirmation status
        $sql = "UPDATE rent_collection SET confirm = ? WHERE rent_id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ii", $confirm, $rent_id);
        
        if ($stmt->execute()) {
            echo "Payment status updated successfully.";
        } else {
            echo "Error updating payment status: " . $conn->error;
        }
        
        $stmt->close();
    } else {
        echo "Invalid action.";
    }
}

// Close connection
$conn->close();
?>
