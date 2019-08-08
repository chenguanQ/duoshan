<?php
# 先连接数据库
$con = mysqli_connect("127.0.0.1","root","","duoshan");

# 查询数据库中商品的总数量
$sql = "SELECT * FROM goodslistdata";
$result = mysqli_query($con, $sql);
//var_dump($result);
 $ListCount = mysqli_num_rows($result);

# 计算页码值(总共有多少页)
$count = 20;
$pageCount = ceil($ListCount / $count);

// # JSON数据返回
$data = array("status"=>"success","msg"=>"获取成功","data"=>array("count"=> $pageCount));
echo json_encode($data, true);
?>