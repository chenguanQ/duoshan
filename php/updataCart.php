<?php

$con = mysqli_connect("127.0.0.1", "root", "", "duoshan");
$cartid = $_REQUEST["cartid"];
$num = $_REQUEST["num"];
$price = $_REQUEST["price"];
$res = $price * $num;
//echo $res;
$sql = "UPDATE cart SET num='$num',total='$res' WHERE cartid='$cartid'";
mysqli_query($con, $sql);
?>