<?php

require "config.php";

$name=$_POST["name"];
$gender=$_POST["gender"];
$grade=$_POST["grade"];
$college=$_POST["college"];
$dormitory=$_POST["dormitory"];
$phone=$_POST["phone"];
$first=$_POST["first"];
$second=$_POST["second"];
$adjust=$_POST["adjust"];
$introduction=$_POST["introduction"];

judgeNull($name,"姓名");

judgeNull($gender,"性别");

judgeNull($grade,"年级");

judgeNull($college,"学院");

judgeNull($dormitory,"宿舍");

judgeNull($phone,"手机号");

judgeNull($first,"第一志愿");

judgeNull($adjust,"是否服从调剂");



judgeName($name);

judgeTable($con,"college",$college);

judgeDormitory($dormitory);

judgePhone($phone);

judgeTable($con,"department",$first);

if($second != null){
    judgeTable($con,"department",$second);
}

judgeIntroduction($introduction);

//判断是否已经报名过
$sql="SELECT `name` FROM information WHERE phone=?";
$stmt=mysqli_prepare($con,$sql);
mysqli_stmt_bind_param($stmt,"s",$phone);
mysqli_execute($stmt);
$res=mysqli_stmt_get_result($stmt);
while($row=mysqli_fetch_array($res)){
    if($name == $row["name"]){
        $result = [
            "errcode" => 7,
            "msg" => "您已经报名过了，可查询报名信息",
            "data" => ""
        ];
        echo json_encode($result);
        exit;
    }
}



$sql="INSERT INTO information(`name`,gender,grade,college,dormitory,phone,`first`,second,adjust,introduction)
      VALUES (?,?,?,?,?,?,?,?,?,?)";
$stmt=mysqli_prepare($con,$sql);
mysqli_stmt_bind_param($stmt,"ssssssssss",$name,$gender,$grade,$college,$dormitory,$phone,$first,$second,$adjust,$introduction);
mysqli_execute($stmt);




$result = [
    "errcode" => 0,
    "msg" => "报名成功",
    "data" => ""
];

echo json_encode($result);












?>
