<?php
// Database connection
$servername = "localhost"; // Change this if your database is hosted elsewhere
$username = "root"; // Change this to your database username
$password = ""; // Change this to your database password
$dbname = "rent_management"; // Change this to your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Query to fetch empty houses
$sql = "SELECT house_number FROM tenants";
$result = $conn->query($sql);

$occupiedHouses = array();
if ($result->num_rows > 0) {
    // Collect occupied houses
    while ($row = $result->fetch_assoc()) {
        $occupiedHouses[] = $row['house_number'];
    }
}

// Generate list of empty houses
$emptyHouses = array();
for ($i = 1; $i <= 10; $i++) { // Assuming there are 10 houses, adjust the range as per your actual houses
    if (!in_array($i, $occupiedHouses)) {
        $emptyHouses[] = $i;
    }
}

// Return list of empty houses as JSON
echo json_encode($emptyHouses);

$conn->close();
?>
