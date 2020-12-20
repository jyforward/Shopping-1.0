<?php
    $con = mysqli_connect("localhost","root","123456","car");
    $sql = "SELECT * FROM `shopcar`";
    $row = mysqli_query($con,$sql);
    if(!$row){
        die('error for mysql' . mysqli_error($con));
    }
   
    $arr = array();
    while( $res = mysqli_fetch_assoc($row)){
        array_push($arr,$res);
    }
    print_r(json_encode($arr));
?>