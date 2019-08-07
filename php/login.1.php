<?php
$phone = $_REQUEST["phone"];
$sql = "";
$sql = "SELECT * FROM  userList WHERE phone = '$phone'";


// echo $sql;

# 连接数据库并且到数据库中进行查询
$db = mysqli_connect("127.0.0.1", "root", "", "duoshan");
$result = mysqli_query($db,$sql);
# 检查指定的手机号
// var_dump($result);
$data = array("status" => "", "msg" => "", "data" => "");
if(mysqli_num_rows($result) == "0"  )
{
  $data["status"] = "error";
  $data["msg"] = "登录失败：该用户不存在";
}else{
  /* 检查手机号是否正确 */
  $res = mysqli_fetch_array($result);
  if($res["phone"] != $phone)
  {
    $data["status"] = "error";
    $data["msg"] = "登录失败：手机号未注册！";
  }else{
    $data["status"] = "success";
    $data["msg"] = "恭喜你，登录成功！";
    $data["data"] = "$phone";
  }
}

echo json_encode($data, true);

?>