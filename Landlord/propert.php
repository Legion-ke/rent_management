<?php
// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "rent_management";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Form submission handling
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $houseType = $_POST['houseType'];

    // SQL to insert data into database
    $sql = "INSERT INTO house (house_type) VALUES ('$houseType')";

    if ($conn->query($sql) === TRUE) {
        // House created successfully, send response to client side
        echo "<script>alert('House created successfully');</script>";
        echo "<script>window.location.href = 'property.html';</script>";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();
?>