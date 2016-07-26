$(function () {
    var choice = "学生";
    var flag = false;
    var account_flag = false;
    var pwd_flag = false;
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
    $('#pwd-conf').keyup(function () {
        document.getElementById("conf-result").innerHTML = "";
    });
    /*--------------------------------用 户 名 检 测 部 分--------------------------------*/
    $('#account').blur(function () {
        account_flag = false;
        var pattern = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;
        var account = document.getElementById("account").value;
        if (!pattern.test(account)) {
            document.getElementById("account-result").innerHTML = "用户名不符合要求";
        } else {
            document.getElementById("account-result").innerHTML = "用户名符合要求";
            account_flag = true;
        }

        if (account.length == 0) {
            document.getElementById("account-result").innerHTML = "";
        }
    });

    /*--------------------------------密 码 检 测 部 分--------------------------------*/
    $('#pwd-conf').blur(function () {
        pwd_flag = false;
        var pwd = document.getElementById('pwd').value;
        var pwdconf = document.getElementById('pwd-conf').value;
        if (pwd.length >= 6) {
            if (pwd != pwdconf) {
                document.getElementById("conf-result").innerHTML = "两次输入的密码不同，请重新输入";
            }
            if (pwd == pwdconf && pwdconf != "") {
                $("#conf-result").css("color", "green");
                document.getElementById("conf-result").innerHTML = "两次输入的密码相同";
                pwd_flag = true; //此时密码符合要求
            }
            if (pwd == "" && pwdconf == "") {
                document.getElementById("con-result").innerHTML = "";
            }
        }
        if (pwd.length < 6) {
            document.getElementById("conf-result").innerHTML = "";
        }
    });
    $('#pwd').keyup(function () {
        document.getElementById("pwd-result").innerHTML = "";
    });
    $('#pwd').blur(function () {
        var pattern = /^\d+$/;
        var pwd = document.getElementById('pwd').value;
        var pwdconf = document.getElementById('pwd-conf').value;
        if (pwd.length > 0 && pwd.length < 6) {
            document.getElementById("pwd-result").innerHTML = "密码小于6个字符请重新输入";
        }
        if (pwd.length >= 6) {
            if (pattern.test(pwd)) {
                document.getElementById("pwd-result").innerHTML = "不能为纯数字";
            } else {
                document.getElementById("pwd-result").innerHTML = "密码符合要求";
            }
        }
        if (pwd == "" && pwdconf == "") {
            document.getElementById("conf-result").innerHTML = "";
        }
    }); //密码判断；

    /*--------------------------------验 证 码 检 测 部 分--------------------------------*/
    // $(function () {
    //     $('#code-check').click(function () {
    //         var a = $.ajax({
    //             url: "http://110.64.69.66:8081/team/valid_code",
    //             processData: false,
    //             xhrFields: {withCredentials: true}
    //         }).always(function (data) {
    //             console.log('test');
    //             $("#code-check").attr('src', "data:image/gif;base64," + data);
    //         });
    //     });
    // });


    $('#regi-conf').click(function () {
        if (choice == '学生') {
            var checked = document.getElementById('agree').checked;
            if (account_flag == true && pwd_flag == true && checked) {
                var account = $('#account').val();
                var pwd = document.getElementById('pwd').value;
                var pwd_hash = hex_sha1(pwd);
                var code = document.getElementById('code').value;
                var data = {
                    account: account,
                    pwd: pwd_hash,
                    code: code
                };
                $.ajax({
                    type: 'POST',
                    data: data,
                    url: 'http://110.64.69.66:8081/student/register/',
                    xhrFields: {withCredentials: true},
                    dataType: 'json',
                    success: function (data) {
                        var err = data.err;
                        if (err == "0") {
                            flag = true;
                        }
                        if (err == "-2") {
                            document.getElementById('code-result').innerHTML = "验证码错误";
                        }
                        if (err == '-3') {
                            document.getElementById('account-result').innerHTML = "账号已经存在";
                        }
                        if (err == '-1') {
                            document.getElementById('account-result').innerHTML = "请求方法错误";
                        }
                        if (err == '-10') {
                            document.getElementById('account-result').innerHTML = "操作失败";
                        }
                        if (flag == true) {
                            $('.regi-form').css('display', 'none');
                            $('.success-form').css('display', 'block'); //注册成功界面显示
                            var a = 5;

                            function timeleft() {
                                a = a - 1;
                                if (a == 0) {
                                    window.location.href = "../index.html"
                                }
                                document.getElementById('time').innerHTML = a;
                            }

                            setInterval(timeleft, 1000);
                        }
                    },
                    headers: {
                        "Access-Control-Allow-Origin":"*"
                    }
                });

            }
        }
        else{
            var checked = document.getElementById('agree').checked;
            if (account_flag == true && pwd_flag == true && checked) {
                var account = $('#account').val();
                var pwd = document.getElementById('pwd').value;
                var pwd_hash = hex_sha1(pwd);
                var inv_code = document.getElementById('welcome').value;
                var code = document.getElementById('code').value;
                var data = {
                    mail: account,
                    pwd: pwd_hash,
                    inv_code:inv_code,
                    code: code
                };
                $.ajax({
                    type: 'POST',
                    data: data,
                    url: 'http://110.64.69.66:8081/team/register/',
                    dataType: 'json',
                    xhrFields: {withCredentials: true},
                    success: function (data) {
                        var err = data.err;
                        if (err == '0') {
                            flag = true;
                        }
                        if (err == '-2') {
                            document.getElementById('code-result').innerHTML = "验证码错误";
                        }
                        if (err == '-4') {
                            document.getElementById('account-result').innerHTML = "邀请码或账号不正确";
                        }
                        if (err == '-1') {
                            document.getElementById('account-result').innerHTML = "请求方法错误";
                        }
                        if (err == '-10') {
                            document.getElementById('account-result').innerHTML = "操作失败";
                        }
                        if (flag == true) {
                            $('.regi-form').css('display', 'none');
                            $('.success-form').css('display', 'block');
                            $('#go-to').css('display', 'none');//注册成功界面显示
                            var a = 5;

                            function timeleft() {
                                a = a - 1;
                                if (a == 0) {
                                    window.location.href = "../index.html"
                                }
                                document.getElementById('time').innerHTML = a;
                            }

                            setInterval(timeleft, 1000);
                        }
                    },
                 headers: {
                     "Access-Control-Allow-Origin":"*"
                 }
                });
            }
        }


    }); //ajax注册判断

    /*$('.success-back').click(function() {
     $('.success-form').css('display', 'none');
     $('.end-form').css('display', 'block');
     }); //注册成功返回主页*/
})

function loadValidCode(id) {
    $.ajax({
        url: "http://110.64.69.66:8081/team/valid_code/",
        processData: false,
        xhrFields: {withCredentials: true},
        headers: {
            "Access-Control-Allow-Origin":"*"
        }
    }).always(function (data) {
            console.log('test');
            $(id).attr('src', "data:image/gif;base64," + data);
        }
    );

}

$(document).ready(function () {
    $('#check').click(function () {
        loadValidCode('#check');
    });
    loadValidCode('#check');
});