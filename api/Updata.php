<?php
    $id = $_GET['nid'];
    $num = $_GET['num'];
    $con = mysqli_connect("localhost","root","123456","car");
    $sql = "UPDATE `shopcar` SET `num` = '$num' WHERE `shopcar`.`id` = '$id';";
    $row = mysqli_query($con,$sql);
    if($row){
       echo json_encode(array('code'=>1,'msg'=>'修改数据成功'));
    }else{
        echo json_encode(array('code'=>0,'msg'=>'修改数据失败'));
    }
?>