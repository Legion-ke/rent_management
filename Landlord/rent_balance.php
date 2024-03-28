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

// Fetch rent payments data
$sql = "SELECT house_number, SUM(rent_amount) AS total_rent, SUM(amount_paid) AS total_paid FROM rent_collection GROUP BY house_number";
$result = $conn->query($sql);

// Check if there are any payments
if ($result->num_rows > 0) {
    echo "<h2>Rent Balances</h2>";
    echo "<table border='1'>";
    echo "<tr><th>House Number</th><th>Total Rent</th><th>Total Paid</th><th>Balance</th></tr>";
    // Output data of each row
    while($row = $result->fetch_assoc()) {
        $balance = $row["total_rent"] - $row["total_paid"];
        echo "<tr>";
        echo "<td>" . $row["house_number"] . "</td>";
        echo "<td>" . $row["total_rent"] . "</td>";
        echo "<td>" . $row["total_paid"] . "</td>";
        echo "<td>" . $balance . "</td>";
        echo "</tr>";
    }
    echo "</table>";
} else {
    echo "No rent balances found";
}

// Close connection
$conn->close();
?>
