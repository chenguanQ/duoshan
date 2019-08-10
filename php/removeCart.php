<?php

$con = mysqli_connect("127.0.0.1", "root", "", "duoshan");
$cartid = $_REQUEST["cartid"];
//echo $cartid;
$sql = "DELETE FROM cart  WHERE cartid='$cartid'";
mysqli_query($con, $sql);
?>