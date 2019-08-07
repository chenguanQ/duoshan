<?php
$db = mysqli_connect("127.0.0.1","root","","duoshan");

$username = $_REQUEST["username"];
$password = $_REQUEST["password"];
$phone = $_REQUEST["phone"];

$sql = "INSERT INTO `userList` (`username`, `password`, `phone`) VALUES ('$username', '$password', '$phone')";
$result = mysqli_query($db, $sql);

// var_dump($result);

/* 返回JSON数据给客户端 */
/* 规范：{"status":"success","msg":"注册成功","data":""} */
$data = array("status"=>"", "msg"=>"", "data"=>"");
if($result)
{
  $data["status"] = "success";
  $data["msg"] = "恭喜你，注册成功！";
  $data["data"] =$username ;
}else{
  $data["status"] = "error";
  $data["msg"] = "抱歉，用户名或者手机号码已经被注册了！";
}
echo json_encode($data,true);
?>

