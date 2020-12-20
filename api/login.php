<?php

use PhpMyAdmin\Message;
    $user = $_GET["username"];
    $paws = $_GET["paws"];
$con = mysqli_connect("localhost","root","123456","car");
    $sql = "SELECT * FROM `person` WHERE `usename` LIKE '$user' AND `password` = $paws";
    $row = mysqli_query($con,$sql);
    if(!$row){
        die("获取失败" .mysqli_error($row));
    }
    $res = mysqli_fetch_assoc($row);
    echo json_encode(array(
        "Message" =>"登录成功！",
        "code"=>1,
        "detali"=>$res,

    ));
?>