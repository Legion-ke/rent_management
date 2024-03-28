<?php
session_start();
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

// Process form data
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Escape user inputs to prevent SQL injection
    $username = mysqli_real_escape_string($conn, $_POST['username']);
    $password = mysqli_real_escape_string($conn, $_POST['password']);

    // Retrieve user data from the database
    $sql = "SELECT * FROM landlord WHERE username='$username'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        // Directly compare passwords
        if ($password === $row['password']) {
            // Store user information in session variables
            $_SESSION['username'] = $row['username'];
            $_SESSION['email'] = $row['email']; // Add any other relevant user data
            
            // Redirect the user to Dashboard.html
            header("Location: Dashboard.html");
            exit();
        } else {
            echo "Invalid password!";
        }
    } else {
        echo "User not found!";
    }
}

// Close connection
$conn->close();
?>
