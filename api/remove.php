<?php
    $id = $_GET['nid'];
    $con = mysqli_connect("localhost","root","123456","car");
    $sql = "DELETE FROM `shopcar` WHERE `shopcar`.`id` = '$id'";
    $row = mysqli_query($con,$sql);
    if($row){
        echo json_encode(array('code'=>1,'msg'=>"删除成功"));
    }else{
        echo json_encode(array('code'=>0,'msg'=>"删除失败"));
    }
?>