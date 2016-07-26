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
    var account = document.getElementById("email").value;
    $('#conf').click(function () {
        if (choice = "学生") {
            var data = {
                "account": account
            };
            $.ajax({
                type: 'POST',
                data: data,
                url: 'http://110.64.69.66:8081/student/rsmail/',
                dataType: 'json',
                success: function (data) {
                    var err = data.err;
                    if (err == 0) {
                        $('#mail-check').css('display', 'none');
                        $('#mail-conf').css('display', 'block');
                    }
                    if (err == -4) {
                        document.getElementById("find-result").innerHTML = "账号不存在";
                    }
                    if (err == -1) {
                        document.getElementById("find-result").innerHTML = "请求方法错误";
                    }
                    if (err == -10) {
                        document.getElementById("find-result").innerHTML = "操作失败";
                    }

                },
                headers: {
                    "Access-Control-Allow-Origin":"*"
                }
            });
        }
        else {
            var data = {
                "account": account
            };
            $.ajax({
                type: 'POST',
                data: data,
                url: '../../data/find.json',
                dataType: 'json',
                success: function (data) {
                    var err = data.err;
                    if (err == 0) {
                        $('#mail-check').css('display', 'none');
                        $('#mail-conf').css('display', 'block');
                    }
                    if (err == -4) {
                        document.getElementById("find-result").innerHTML = "账号不存在";
                    }
                    if (err == -1) {
                        document.getElementById("find-result").innerHTML = "请求方法错误";
                    }
                    if (err == -10) {
                        document.getElementById("find-result").innerHTML = "操作失败";
                    }

                }
            });
        }

    })
})