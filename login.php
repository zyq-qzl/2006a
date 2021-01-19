<?php
    include "pdo.php";
    $pdo = getPdo();

    // print_r($_POST);die;

    //接收 post参数
    $name = $_POST['user_name'];
    $pass = $_POST['password'];      

    // 验证用户名是否存在
    $sql = "select * from p_users where user_name = '$name' or email='$name' or mobile = '$name'";
    $res = $pdo->query($sql);
    $record = $res->fetch(PDO::FETCH_ASSOC);

    if($record)       //查询到用户
    {
        //验证密码
        if(password_verify($pass,$record['password'])){      
             //密码正确 登录成功
             $response = [
                'error' => 0,
                'msg' =>'ok'
            ];
        }else{  
            //密码不正确 登录失败
            $response = [
                'error' => 40001,
                'msg' =>'密码不正确'
            ];
        }
    }else{   
        //查询不到用户
        $response = [
            'error' => 40002,
            'msg' =>'查询不到用户，请重试'
        ];

    }

    //返回json数据
    echo json_encode($response);