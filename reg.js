var f = document.forms[0]
f.addEventListener('submit',function(e){
    e.preventDefault()      //阻止表单提交的默认行为
    var username = f.username.value  //获取 username的input值
    var mobile = f.mobile.value      //获取手机号
    var email = f.email.value        //获取 email
    var pass1 = f.pass1.value        //获取密码
    var pass2 = f.pass2.value        //获取确认密码

    //通过Ajax将表单的数据发送给服务器
    // 1 实例化
    var xhr = new XMLHttpRequest()

    // 2 监听 readyState == 4
    xhr.onreadystatechange = function(){
        if(xhr.readyState==4 && xhr.status==200)
        {
            //接收服务器的响应数据
            var json_str = xhr.responseText
            // console.log(json_str)

            //判断错误码
            var json_obj = JSON.parse(json_str);
            if(json_obj.error>0){
                alert(json_obj.msg);
            }else{
                alert('ok')
                window.location.href="login.html"
            }

        }
    }

    // 3 open
    xhr.open("POST","user.php")


    // 4 send
    //var inputs = f.elements        
     //获取所有input
    var inputs = f.querySelectorAll("input")


    var form_param = ""
    for(var i=0;i<inputs.length;i++)
    {
        if(inputs[i].getAttribute("name")===null ){
            continue;
        }

        // console.log(inputs[i].getAttribute("name"))
        // console.log(inputs[i].value)


        form_param += inputs[i].getAttribute("name") + "=" + inputs[i].value + "&"
        
            
    }
    //去掉最后一个 &
    form_param = form_param.substring(0,form_param.length-1)
    console.log(form_param)


    xhr.setRequestHeader("content-type","application/x-www-form-urlencoded")
    // xhr.send("n="+ username + "&m=" + mobile)
    xhr.send(form_param)

})

