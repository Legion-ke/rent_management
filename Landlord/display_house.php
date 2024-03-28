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

// SQL query to fetch data, ordered by house_id in descending order
$sql = "SELECT house_id, format, rent 
        FROM property, house 
        WHERE property.id = house.house_type
        ORDER BY house_id DESC";

$result = $conn->query($sql);

echo "<!DOCTYPE html>
<html lang='en'>
<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>Display Houses</title>
    <style>
        table {
            border-collapse: collapse;
            width: 100%;
        }
        th, td {
            border: 1px solid #dddddd;
            text-align: left;
            padding: 8px;
        }
        th {
            background-color: #f2f2f2;
        }
    </style>
</head>
<body>
    <h2>House Data</h2>
    <table>
        <tr>
            <th>House ID</th>
            <th>Format</th>
            <th>Rent</th>
        </tr>";

if ($result->num_rows > 0) {
    // Output data of each row
    while($row = $result->fetch_assoc()) {
        echo "<tr>
                <td>". $row["house_id"]. "</td>
                <td>". $row["format"]. "</td>
                <td>KSH.".number_format($row["rent"]). "</td>
              </tr>";
    }
} else {
    echo "<tr><td colspan='3'>0 results</td></tr>";
}
echo "</table></body></html>";

$conn->close();
?>
