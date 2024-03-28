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

// Check if rent ID is provided
if(isset($_GET['rent_id'])) {
    // Prepare and execute SQL query to fetch rent receipt image data
    $rentId = $_GET['rent_id'];
    $sql = "SELECT rent_receipt_image FROM rent_collection WHERE rent_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $rentId);
    $stmt->execute();
    $stmt->store_result();

    // Check if rent record exists
    if ($stmt->num_rows > 0) {
        // Bind the result
        $stmt->bind_result($rentReceiptImage);
        $stmt->fetch();

        // Output image data
        header("Content-type: image/jpeg"); // Assuming the image format is JPEG
        echo $rentReceiptImage;
    } else {
        echo "Rent receipt image not found.";
    }

    // Close statement
    $stmt->close();
} else {
    echo "Rent ID not provided.";
}

// Close connection
$conn->close();
?>
