<?php
//把json数据保存到数据库中
header('Content-Type:text/html;charset=utf-8;');
$con =mysqli_connect("127.0.0.1","root","","duoshan");

$data = file_get_contents("goodsListData.json");
$arr = json_decode($data,true);
// var_dump($arr) ;

for($i=0;$i<count($arr);$i++){
    $src = $arr[$i]["src"];
    $des = $arr[$i]["des"];
    // var_dump($i);
    $sql = "INSERT INTO `duoshan`.`goodslistdata` (`src`, `des`) VALUES ('$src', '$des')";
    mysqli_query($con,$sql);
}
?>