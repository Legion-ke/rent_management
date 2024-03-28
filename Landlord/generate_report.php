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

// Function to generate tenants report
function generateTenantsReport($conn) {
    $sql = "SELECT * FROM tenants";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        echo "<h2>Tenants Report</h2>";
        echo "<table border='1'><tr><th>ID</th><th>Username</th><th>Email</th><th>House Number</th></tr>";
        while($row = $result->fetch_assoc()) {
            echo "<tr><td>".$row["id"]."</td><td>".$row["username"]."</td><td>".$row["email"]."</td><td>".$row["house_number"]."</td></tr>";
        }
        echo "</table>";
    } else {
        echo "No tenants found";
    }
}

// Function to generate houses report
function generateHousesReport($conn) {
    $sql = "SELECT house_id, format, rent 
        FROM property, house 
        WHERE property.id = house.house_type
        ORDER BY house_id ASC";

$result = $conn->query($sql);

echo "<!DOCTYPE html>
<html lang='en'>
<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>Display Houses</title>
</head>
<body>
    <h2>House Data</h2>
    <table border='1'>
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
}


// Function to generate rents report
function generateRentsReport($conn) {
    // Fetch data from rents table
    $sqlRents = "SELECT * FROM rents";
    $resultRents = $conn->query($sqlRents);

    //Fetch data from rent payment table 
    $sql = "SELECT rent_id, house_number, payment_date FROM rent_collection";
    $resultCollection = $conn->query($sql);


    // Display reports
    echo "<h2>Rents Data Report</h2>";
    displayReport($resultRents);
    echo "<h2>Paid Rents</h2>";
    displayReport($resultCollection);
}

function generateIssuesReport($conn) {
    $sql = "SELECT * FROM repair";
    $result = $conn->query($sql);
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
}


// Function to display report
function displayReport($result) {
    if ($result->num_rows > 0) {
        echo "<table border='1'><tr>";
        while($row = $result->fetch_assoc()) {
            foreach($row as $key => $value) {
                echo "<th>$key</th>";
            }
            break;
        }
        echo "</tr>";
        while($row = $result->fetch_assoc()) {
            echo "<tr>";
            foreach($row as $value) {
                echo "<td>$value</td>";
            }
            echo "</tr>";
        }
        echo "</table>";
    } else {
        echo "No data found";
    }
}

// Generate report based on the type
$type = $_GET['type'] ?? '';
switch ($type) {
    case 'tenants':
        generateTenantsReport($conn);
        break;
    case 'houses':
        generateHousesReport($conn);
        break;
    case 'rents':
        generateRentsReport($conn);
        break;
    case 'issues':
        generateIssuesReport($conn);
        break;
    default:
        echo "Invalid report type";
        break;
}

// Close connection
$conn->close();
?>
