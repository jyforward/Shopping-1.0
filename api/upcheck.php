<?php
    $check = $_GET['checkid'];
    $id = $_GET['nid'];
    $con = mysqli_connect("localhost","root","123456","car");
    $sql = "UPDATE `shopcar` SET `good_check` = '$check' WHERE `shopcar`.`id` = '$id';";
    $row = mysqli_query($con,$sql);
    if($row){
        echo json_encode(array('code'=>1,'msg'=>'修改成功'));
    }else{
        echo json_encode(array('code'=>0,'msg'=>'修改失败'));
    }

?>