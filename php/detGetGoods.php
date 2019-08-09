<?php
$id = $_REQUEST["id"];
$sql = "";
$sql = "SELECT * FROM  goodslistdata WHERE des = '$id'";

// echo $id ;
// echo $sql;

# 连接数据库并且到数据库中进行查询
$db = mysqli_connect("127.0.0.1", "root", "", "duoshan");
$result = mysqli_query($db,$sql);

$data = array("status" => "success", "msg" => "请求成功", "data" => mysqli_fetch_all($result, MYSQLI_ASSOC));
echo json_encode($data, true);
?>