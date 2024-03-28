<?php
// Database connection
$servername = "localhost"; // Change this if your database is hosted elsewhere
$username = "root"; // Change this to your database username
$password = ""; // Change this to your database password
$dbname = "rent_management"; // Change this to your database name

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Form submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $house_number = $_POST['house_number'];

    // Check if house number already exists
    $check_query = "SELECT * FROM tenants WHERE house_number = ?";
    $stmt = $conn->prepare($check_query);
    $stmt->bind_param("i", $house_number);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        echo "<script>alert('House $house_number is already occupied.');</script>";
    } else {
        // Insert tenant details into the database
        $insert_query = "INSERT INTO tenants (username, email, password, house_number) VALUES (?, ?, ?, ?)";
        $stmt = $conn->prepare($insert_query);
        $stmt->bind_param("sssi", $username, $email, $password, $house_number);
        
        if ($stmt->execute()) {
            echo "<script>alert('Tenant details successfully added.');</script>";
            echo "<script>window.location.href = 'tenants.html';</script>";
        } else {
            echo "<script>alert('Error: " . $conn->error . "');</script>";
        }
    }
}
$conn->close();
?>
