<?php
print_r($_GET);die;
include "pdo.php";
$pdo = getPdo();

$username = $_GET['name'];


//查询数据库
$sql = "select * from p_users where user_name='$username'";
$res = $pdo->query($sql);
$res = $res->fetch(PDO::FETCH_ASSOC);
if($res){
    $response = [
        'error' => '4000010',
        'msg' => '已存在',
    ];
}else{
    $response = [
        'error' => '0',
        'msg' => 'ok',
    ];
}
echo json_encode($response);