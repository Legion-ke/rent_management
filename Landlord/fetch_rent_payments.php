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
$sql = "SELECT rent_id, house_number, payment_date, confirm FROM rent_collection";
$result = $conn->query($sql);

// Check if the query execution was successful
if (!$result) {
    echo "Error: " . $conn->error; // Output any errors from the database
} else {
    // Check if there are any payments
    if ($result->num_rows > 0) {
        // Output data of each row
        while($row = $result->fetch_assoc()) {
            echo "<tr>";
            echo "<td>" . $row["rent_id"] . "</td>";
            echo "<td>" . $row["house_number"] . "</td>";
            echo "<td>" . $row["payment_date"] . "</td>";
            echo "<td>" . ($row["confirm"] ? "Confirmed" : "Not Confirmed") . "</td>";
            // Provide button to view rent receipt image
            echo "<td><a href='view_rent_receipt.php?rent_id=" . $row["rent_id"] . "' target='_blank'>View</a></td>";
            // Provide buttons for confirmation
            echo "<td>";
            echo "<form action='confirm_payment.php' method='post'>";
            echo "<input type='hidden' name='payment_id' value='" . $row["rent_id"] . "'>";
            echo "<button type='submit' name='confirm'>Confirm</button>";
            echo "&nbsp;&nbsp;"; // Adding space between buttons
            echo "<button type='submit' name='deny'>Deny</button>";
            echo "</form>";
            echo "</td>";
            echo "</tr>";
        }
    } else {
        echo "<tr><td colspan='6'>No rent payments found</td></tr>";
    }
}

// Close connection
$conn->close();
?>
