<?php
$servername = "localhost";
$username = "legion";
$password = "Given@007";
$dbname = "rent_management";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$username = $_POST['username'];
$email = $_POST['email'];
$houseNo = $_POST['houseNo'];

$sql = "INSERT INTO rent_management (username, email, house_no) VALUES ('$username', '$email', '$houseNo')";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
