<?php

$con = mysqli_connect("127.0.0.1", "root", "", "duoshan");
$status = $_REQUEST["status"];
$cartid = $_REQUEST["cartid"];
$all =  $_REQUEST["all"];
$complete = $_REQUEST["complete"];
//echo $all;
//echo $complete;

if($all == 1){
$sql = "UPDATE cart SET isActive='$status'";
}else{
    $sql = "UPDATE cart SET isActive='$status' WHERE cartid='$cartid'";
}

if($complete == 2){
    $sql = "DELETE FROM cart";

    }
mysqli_query($con, $sql);
?>