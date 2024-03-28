<?php
// Database connection
$servername = "localhost"; // Change this if your database is hosted elsewhere
$username = "root"; // Change this to your database username
$password = ""; // Change this to your database password
$dbname = "rent_management"; // Change this to your database name

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $house_number = $_POST['house_number'];
    $issue = $_POST['issue'];

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Prepare and bind statement
    $stmt = $conn->prepare("INSERT INTO repair (house_number, issue) VALUES (?, ?)");
    $stmt->bind_param("is", $house_number, $issue);

    // Execute the statement
    if ($stmt->execute()) {
        echo "<script>alert('Repair booked successfully!');</script>";
        // Redirect back to repair.html after displaying the alert
        echo "<script>window.location.href = 'repair-booking.html';</script>";
    } else {
        echo "<script>alert('Error: " . $conn->error . "');</script>";
        // Redirect back to repair.html after displaying the alert
        echo "<script>window.location.href = 'repair-booking.html';</script>";
    }

    $stmt->close();
    $conn->close();
}
?>
