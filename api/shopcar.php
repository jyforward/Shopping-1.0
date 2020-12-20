<?php
    $user = $_GET['username'];
    $descr = $_GET['describer'];
    $price = $_GET['price'];
    $num = $_GET['num'];
    $goods_id = $_GET['id'];
    $good_img =$_GET["imgs"];
    $con = mysqli_connect("localhost","root","123456","car");
    $sql = "SELECT * FROM `shopcar` WHERE `goods_id` = '$goods_id' AND `usename` = '$user'";
    $res = mysqli_query($con,$sql);
    $sql1 = "INSERT INTO `shopcar` (`id`, `usename`, `describer`, `price`, `num`, `goods_id`, `good_img`,`good_check`) VALUES (NULL, '$user', '$descr', '$price', '$num', '$goods_id', '$good_img',1);";
    if(!$res){
        die('error for mysql' . mysqli_error($con));
    }
    $row = mysqli_fetch_assoc($res);
    if($row){
        $goodsNum1 = $row['num'] + $num*1;
        $res2= mysqli_query($con,"UPDATE `shopcar` SET `num` = '$goodsNum1' WHERE `shopcar`.`goods_id` = ' $goods_id'");
    }else{
        $res2= mysqli_query($con,$sql1);
        // INSERT INTO `shopcar` (`id`, `usename`, `describer`, `price`, `num`, `goods_id`, `good_img`) VALUES (NULL, '王五', 'dasfadggadg', '123', '12', '2132131', 'fddasfdasfdasfdsafdafsdfasffafdafdafdafdaf');
    }
    if($res2){
        echo json_encode(array("code"=>true,"msg"=>"添加数据成功"));
    }else{
        echo json_encode(array("code"=>false,"msg"=>"添加数据失败！"));
    }
    // INSERT INTO `shopcar` (`id`, `usename`, `describer`, `price`, `num`) VALUES (NULL, '张三', 'dsafasfdafdafdsafd', '123', '12');
?>