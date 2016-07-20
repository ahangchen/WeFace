/**
 * Created by cwh on 16-7-20.
 */
$(document).ready(function () {
    $("form").on("submit", function(e) {
        e.preventDefault();
        var formData= {
            'name': $('#team_name').val(),
            'leader': $('#leader').val(),
            'tel': $('#tel').val(),
            'mail':$('#mail').val()
        };
        console.log(formData);
        $.ajax({
            type: 'POST',
            url: "http://110.64.69.66:8081/team/invite/",
            dataType: "json",
            data: formData ,
            success: function (data) {
                var ret = data['err'];
                console.log(ret);
                if(ret == "0") {
                    $('#inv_result').attr('style', 'display:block');
                    $('#inv_text').html('团队登录邮箱：' + $('#mail').attr('value') + '<br/>邀请码：' + data['msg']);
                } else {
                    $('#inv_result').attr('style', 'display:block');
                    $('#inv_text').html('团队登录邮箱已被占用');
                }
            },
            error: function (data) {
                $('#inv_result').attr('style', 'display:block');
                $('#inv_text').html('未知错误');
            },
            headers: {
                "Access-Control-Allow-Origin":"*"
            }
        });
    });
});