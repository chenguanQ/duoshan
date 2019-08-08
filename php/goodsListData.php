<?php
//把json数据保存到数据库中
header('Content-Type:text/html;charset=utf-8;');
$con =mysqli_connect("127.0.0.1","root","","duoshan");

$data = file_get_contents("goodsListData.json");
$arr = json_decode($data,true);
// print_r($arr) ;

for($i=0;$i<count($arr);$i++){

    $src = $arr[$i]["src"];
    $des = $arr[$i]["des"];
    $price = $arr[$i]["price"];
    $oldprice = $arr[$i]["oldprice"];
    $shop = $arr[$i]["shop"];
    $gid = $i;
    
    $sql = "INSERT INTO `duoshan`.`goodslistdata` (`src`, `des`, `price`, `oldprice`, `shop`, `gid`) VALUES ('$src', '$des', ' $price', '$oldprice', '$shop', '$gid')";
    $res = mysqli_query($con,$sql);
    var_dump($res);
}
?>