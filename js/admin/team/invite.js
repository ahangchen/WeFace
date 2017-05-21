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
            url: cur_site + "team/invite/",
            dataType: "json",
            data: formData ,
            success: function (data) {
                var ret = data['err'];
                console.log(ret);
                if(ret == "0") {
                    $('#inv_text').html('团队登录邮箱：' + $('#mail').val() + '<br/>邀请码：' + data['msg']);
                    $('#inv_result').attr('style', 'display:block');
                    alert("邀请码:" + data['msg']);
                } else {
                    $('#inv_text').html('团队登录邮箱已被占用');
                    $('#inv_result').attr('style', 'display:block');
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
