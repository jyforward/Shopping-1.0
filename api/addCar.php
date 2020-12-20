<?php
    # 用户名 商品id 商品图片 商品名 商品提示 商品价格
    $username = $_GET['username'];
    $goods_id = $_GET['goods_id'];
    $goods_img=$_GET['goods_img'];
    $goods_name=$_GET['goods_name'];
    $goods_note=$_GET['goods_note'];
    $goods_price=$_GET['goods_price'];
    $goods_num=$_GET['goods_num'];
    // $username = 'jingjing';
    // $goods_id = '8';
    // $goods_img='https://resource.smartisan.com/resource/4fc4edc5973be10c3d221c592e760063.png?x-oss-process=image/resize,w_80';
    // $goods_name='Smartisan TNT go';
    // $goods_note='有线版';
    // $goods_price='1999.00';

    $con = mysqli_connect('localhost','root','123456','data');


    $sql = "SELECT * FROM `car` WHERE `username`='$username' AND `goods_id`='$goods_id'";
    $res = mysqli_query($con,$sql);
    $sql1 = "INSERT INTO `car` (`id`, `username`, `goods_id`, `goods_img`, `goods_name`, `goods_note`, `goods_price`, `goods_num`) VALUES (NULL, '$username', '$goods_id', '$goods_img', '$goods_name', '$goods_note', '$goods_price', '$goods_num');";

    if(!$res){
        die('error for mysql' . mysqli_error());
    }
    $row = mysqli_fetch_assoc($res);
     # 如果购物车表中存在该条数据，让这个条数据中的goods_num 值加 传进来的数量
    if($row){
        $goodsNum1 = $row['goods_num'] + $goods_num*1;
       $res2= mysqli_query($con,"UPDATE `car` SET `goods_num` = '$goodsNum1' WHERE `car`.`goods_id` = ' $goods_id'");
    }else{
        # 如果不存在，就往car表中 添加数据
        $res2= mysqli_query($con,$sql1);
    }
    if($res2){
        echo json_encode(array("code"=>true,"msg"=>"添加数据成功"));
    }else{
        echo json_encode(array("code"=>false,"msg"=>"添加数据失败！"));
    }

?>