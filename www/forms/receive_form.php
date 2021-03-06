<?php
include_once ($_SERVER['DOCUMENT_ROOT'].'/dirs.php');
//$root_dir = getcwd(); // I obtain: /var/www/html
//$img_dir = '/static/uploads/image/'; // I obtain: uploads/
//$target_dir = "{$root_dir}{$img_dir}"; // I obtain: /var/www/html/uploads/
$target_dir = UPLOAD_IMAGE_PATH; //

$target_file = $target_dir . basename($_FILES["imageFile"]["name"]);
echo $target_file;
$uploadOk = 1;
$imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
//echo $imageFileType;
// Check if image file is a actual image or fake image
  $check = getimagesize($_FILES["imageFile"]["tmp_name"]);
  if($check !== false) {
    echo "File is an image - " . $check["mime"] . ".";
    $uploadOk = 1;
  } else {
    echo "File is not an image.";
    $uploadOk = 0;
  }

// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
    echo "Sorry, your file was not uploaded.";
  // if everything is ok, try to upload file
  } else {
    if (move_uploaded_file($_FILES["imageFile"]["tmp_name"], $target_file)) {
      echo "The file ". htmlspecialchars( basename( $_FILES["imageFile"]["name"])). " has been uploaded.";
    } else {
      echo "Sorry, there was an error uploading your file.";
    }
}
?>