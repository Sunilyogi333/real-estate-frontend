<?php 
if (isset($_POST['submit'])) {
    $image = base64_encode(file_get_contents($_FILES['main_image']["tmp_name"]));
    $sql = "INSERT INTO tablename (`image`) VALUES ('$image')";
    $result = mysqli_query($conn, $sql);
    if ($result) {
        echo "Image uploaded successfully";
    } else {
        echo "Image upload failed";
    }
}
?>


<!-- other code -->
<form action="<?php echo $_SERVER["PHP_SELF"]; ?>" method="POST" enctype="multipart/form-data">
<!-- other code -->
    <input type="file" name="main_image" id="main_image">
    <input type="submit" name="submit" value="Upload">
</form>
