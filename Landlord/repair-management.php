<?php
// Connect to MySQL
$servername = "localhost";
$username = "root"; // Your MySQL username
$password = ""; // Your MySQL password
$database = "rent_management"; // Your MySQL database name

$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch data from repairs table
$sql = "SELECT * FROM repair";
$result = $conn->query($sql);

if (!$result) {
    die("Query failed: " . $conn->error);
}

echo "<table border='1'>";
echo "<tr><th>ID</th><th>House Number</th><th>Issue</th></tr>";

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        echo "<tr><td>".$row["id"]."</td><td>".$row["house_number"]."</td><td>".$row["issue"]."</td></tr>";
    }
    echo "</table>";
} else {
    echo "<tr><td colspan='4'>0 results</td></tr>";
}

$conn->close();
?>
