<?php
session_start();
// Database connection
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

// Function to save a message to the database
function saveMessage($conn, $username, $message) {
    $username = $conn->real_escape_string($username);
    $message = $conn->real_escape_string($message);

    $sql = "INSERT INTO forum_messages (username, message) VALUES ('$username', '$message')";
    if ($conn->query($sql) === TRUE) {
        return true;
    } else {
        return false;
    }
}

// Function to get all messages from the database
function getMessages($conn) {
    $messages = array();
    $sql = "SELECT * FROM forum_messages ORDER BY created_at DESC";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $messages[] = $row['username'] . ": " . $row['message'];
        }
    }
    return $messages;
}

// If form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_SESSION['username']) && isset($_POST['message'])) {
        $username = $_SESSION['username'];
        $message = $_POST['message'];
        saveMessage($conn, $username, $message);
    }
}

// If AJAX request for getting messages
if (isset($_GET['action']) && $_GET['action'] == "getMessages") {
    $messages = getMessages($conn);
    echo json_encode($messages);
    exit;
}

$conn->close();
?>