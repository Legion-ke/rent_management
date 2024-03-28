<?php
// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Database connection
    $servername = "localhost"; // Change this if your database is hosted elsewhere
    $username = "root"; // Change this to your database username
    $password = ""; // Change this to your database password
    $dbname = "rent_management"; // Change this to your database name

    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Prepare and bind the SQL statement
    $stmt = $conn->prepare("INSERT INTO rent_collection (house_number, payment_date, rent_receipt_image) VALUES (?, ?, ?)");
    $stmt->bind_param("iss", $house_number, $payment_date, $rent_receipt_image);

    // Set parameters and execute
    $house_number = $_POST['house_number'];
    $payment_date = $_POST['payment_date'];

    // Handle file upload
    $target_dir = "uploads/"; // Directory where the file will be saved
    $target_file = $target_dir . basename($_FILES["rent_receipt_image"]["name"]); // Path of the uploaded file
    $uploadOk = 1; // Flag to indicate if the upload is successful

    // Check if image file is a actual image or fake image
    $check = getimagesize($_FILES["rent_receipt_image"]["tmp_name"]);
    if ($check !== false) {
        $uploadOk = 1;
    } else {
        echo "<script>alert('File is not an image.');</script>";
        $uploadOk = 0;
    }

    // Check if file already exists
    if (file_exists($target_file)) {
        echo "<script>alert('Sorry, file already exists.');</script>";
        $uploadOk = 0;
    }

    // Check file size
    if ($_FILES["rent_receipt_image"]["size"] > 500000) {
        echo "<script>alert('Sorry, your file is too large.');</script>";
        $uploadOk = 0;
    }

    // Allow certain file formats
    $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
    if ($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif") {
        echo "<script>alert('Sorry, only JPG, JPEG, PNG & GIF files are allowed.');</script>";
        $uploadOk = 0;
    }

    // Check if $uploadOk is set to 0 by an error
    if ($uploadOk == 0) {
        echo "<script>alert('Sorry, your file was not uploaded.');</script>";
    } else {
        // if everything is ok, try to upload file
        if (move_uploaded_file($_FILES["rent_receipt_image"]["tmp_name"], $target_file)) {
            // Set the image path for database insertion
            $rent_receipt_image = $target_file;

            // Execute SQL statement
            if ($stmt->execute()) {
                echo "<script>alert('Rent submitted successfully.');</script>";
            } else {
                echo "<script>alert('Error: " . $conn->error . "');</script>";
            }
        } else {
            echo "<script>alert('Sorry, there was an error uploading your file.');</script>";
        }
    }

    // Close statement and connection
    $stmt->close();
    $conn->close();

    // Redirect back to rent-payment.html
    echo "<script>window.location.href = 'rent-payment.html';</script>";
    exit;
}
?>
