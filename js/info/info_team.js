(function(){
        var team_id = location.search.split("=")[1];
        /*获取团队未读数量*/
        $.ajax({
            type: "POST",
            data:{team_id:team_id,state:'0'},
            url: cur_site + "team/apply/list/",
            dataType: "json",
            success: function (data) {
                var err = data.err;
                if (err == '-129') {
                    console.log("无投递记录");
                }
                if (err == '-1') {
                    console.log("请求方法错误");
                }
                if (err == '-10') {
                    console.log("操作失败");
                }
                if (err == '0') {
                    $('.info-tag').css('display','inline-block').html(data.unread_num);
                }
            },
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        });
        var user_click=$('#user_click');
        var list=$('#main-list');
        $('body').click(function(){
            list.css('display','none');
        });
        $('#pub-posi').attr('href','http://110.64.69.101:8080/team/position/addPosition.html?t_id='+team_id);
        $('#pub-proj').attr('href','http://110.64.69.101:8080/team/manageProject/manageProject.html?tid='+team_id);//设置
        user_click.click(function(){
            if(list.css('display')=='block'){
                list.css('display','none');
            }
            else{
                list.css('display','block');
            }
            event.stopPropagation();
        });
        list.click(function(){
            event.stopPropagation();
        });
})();