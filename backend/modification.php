<?php

session_start();

require "config.php";

$name=$_POST["name"];
$gender=$_POST["gender"];//男为"male"  女为"female"
$grade=$_POST["grade"];//大一为"gradeOne"  大二为"gradeTwo"
$college=$_POST["college"];
$dormitory=$_POST["dormitory"];
$phone=$_POST["phone"];
$first=$_POST["first"];
$second=$_POST["second"];
$adjust=$_POST["adjust"];//服从为"adjustYes"  不服从为"adjustNo"
$introduction=$_POST["introduction"];

$id = $_SESSION["id"];


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



//修改信息
$sql="UPDATE information SET `name`=?, gender=?,grade=?, college=?, dormitory=?, phone=?, `first`=?,
        second=?, adjust=?, introduction=? WHERE id=?";

$stmt=mysqli_prepare($con,$sql);
mysqli_stmt_bind_param($stmt,"ssssssssssi",$name,$gender,$grade,$college,$dormitory,$phone,
                        $first,$second,$adjust,$introduction,$id);

                        
mysqli_execute($stmt);

$result = [
    "errcode" => 0,
    "msg" => "修改成功",
    "data" => ""
];

echo json_encode($result);








?>
