<?php
$con = mysqli_connect("127.0.0.1", "root", "", "duoshan");
$sql = "SELECT cart.*,goodslistdata.des,goodslistdata.src FROM cart , goodslistdata WHERE cart.goodid = goodslistdata.gid";
$result = mysqli_query($con, $sql);
$data = mysqli_fetch_all($result, MYSQLI_ASSOC);
echo json_encode($data, true);

?>