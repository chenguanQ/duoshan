<?php
$username = $_REQUEST["user"];
$password = $_REQUEST["password"];

$sql = "";
if(preg_match("/^1[3-9]\d{9}$/",$username)){
    $sql = "SELECT * FROM  userList WHERE phone = '$username'";
}else{
    $sql = "SELECT * FROM  userList WHERE username = '$username'";
}

// echo $sql;

# 连接数据库并且到数据库中进行查询
$db = mysqli_connect("127.0.0.1", "root", "", "duoshan");
 
# 用户名存在 && 密码要正确
# 检查指定的用户名

$result = mysqli_query($db,$sql);

# 检查指定的手机号

// var_dump($result);
$data = array("status" => "", "msg" => "", "data" => "");
if(mysqli_num_rows($result) == "0"  )
{
  $data["status"] = "error";
  $data["msg"] = "登录失败：该用户不存在";
}else{
  /* 检查密码是否正确 */
  $res = mysqli_fetch_array($result);
  if($res["password"] != $password)
  {
    $data["status"] = "error";
    $data["msg"] = "登录失败：密码不正确！";
  }else{
    $data["status"] = "success";
    $data["msg"] = "恭喜你，登录成功！";
    $data["data"] = "$username";
  }
}

echo json_encode($data, true);

?>