$(function () {
    var choice = "学生";
    $('.actor-choice').click(function () {
        choice = $(this).attr('name');
        document.getElementById("actor-show").innerHTML = choice;
    }); //获取选择的选项
    $('#actor-next').click(function () {
        $('.choice-form').css('display', 'none');
        $('.regi-form').css('display', 'block');
        if (choice == "学生") {
            $('.regi-group').css('display', 'none');
        }
    }); //选择完角色进入注册页面
    $('#login-conf').click(function () {
        var account = document.getElementById("account").value;
        var pwd = document.getElementById("pwd").value;
        if (account == "" || pwd == "") {
            if (account == "") {
                document.getElementById("account-warn").innerHTML = "账号不能为空";
            }
            if (pwd == "") {
                document.getElementById("pwd-warn").innerHTML = "密码不能为空";
            }
        }
        if (account !== "" && pwd !== ""){
            if (choice == "学生") {
                var flag = false;
                var account = document.getElementById("account").value;
                var pwd = document.getElementById("pwd").value;
                var pwd_hash = hex_sha1(pwd);
                var data = {
                    account: account,
                    pwd: pwd_hash
                };
                $.ajax({
                    type: 'POST',
                    data: data,
                    url: cur_site + 'student/login/',
                    dataType: 'json',
                    success: function (data) {
                        var err = data.err;
                        var stu_id=data.id;
                        if (err == 0) {
                            flag = true;
                        }
                        if (err == -1) {
                            document.getElementById('account-warn').innerHTML = "请求方法错误";
                        }
                        if (err == -4) {
                            document.getElementById('account-warn').innerHTML = "账号不存在";
                        }
                        if (err == -5) {
                            document.getElementById('pwd-warn').innerHTML = "密码错误";
                        }
                        if (err == -6) {
                            document.getElementById('account-warn').innerHTML = "账号未激活";
                        }
                        if (err == -10) {
                            document.getElementById('account-warn').innerHTML = "操作失败";
                        }
                        if (flag == true) {
                            window.location.href = "../../stu/index.html?stu_id="+stu_id;
                        }
                    },
                    headers: {
                        "Access-Control-Allow-Origin":"*"
                    }
                });
            }
            else {
                var flag = false;
                var account = document.getElementById("account").value;
                var pwd = document.getElementById("pwd").value;
                var pwd_hash = hex_sha1(pwd);
                var data = {
                    mail: account,
                    pwd: pwd_hash
                };
                $.ajax({
                    type: 'POST',
                    data: data,
                    url: cur_site + 'team/login/',
                    dataType: 'json',
                    success: function (data) {
                        var err = data.err;
                        var tid=data.msg;
                        if (err == 0) {
                            flag = true;
                        }
                        if (err == -1) {
                            document.getElementById('account-warn').innerHTML = "请求方法错误";
                        }
                        if (err == -10) {
                            document.getElementById('account-warn').innerHTML = "操作失败";
                        }
                        if (err == -4) {
                            document.getElementById('pwd-warn').innerHTML = "账号或密码错误";
                        }
                        if (err == -5) {
                            document.getElementById('account-warn').innerHTML = "账号不可用";
                        }
                        if (flag == true) {
                            console.log(tid);
                            window.location.href = "../../team/index.html?tid="+tid;
                        }
                    },
                    headers: {
                        "Access-Control-Allow-Origin":"*"
                    }
                });
            }
            }



    });
    /*忘记密码跳转*/
    $('#pwd-find').click(function(){
            window.location.href = "../../main/role/find.html";
    });

})