(function(){
    var id=window.location.search;
    if(id!='')//判断是否处于登录状态
    {
        var student_id = location.search.split("=")[1];
        /*获取学生用户名*/
        $.ajax({
            type: "POST",
            data:{id:student_id},
            url: cur_site + "student/info/get/",
            dataType: "json",
            success: function (data) {
                var err = data.err;
                if (err == '-8') {
                    console.log("学生不存在");
                }
                if (err == '-1') {
                    console.log("学生不存在");
                }
                if (err == '-10') {
                    console.log("操作失败");
                }
                if (err == '0') {
                    var name = data.name;
                    $('#user_click').html(name);
                    if(name==''){
                        $('#user_click').html('待完善');
                    }
                }
            },
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        });
        /*获取未读数量*/
        $.ajax({
            type: "POST",
            data:{stu_id:student_id,state:'0'},
            url: cur_site + "student/apply/list/",
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
                    var apply_list=data.apply_list;
                    var un_read=0;
                    for(var i in apply_list){
                        if(apply_list[i].is_read==false){
                            un_read++;
                        }
                    }
                    $('.info-tag').css('display','inline-block').html(un_read);
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
        $('#login-on').css('display','block');
        $('#login-off').css('display','none');
        var deliever_path="../stu/deliver.html?stu_id="+student_id;
        $('#info-deliver').attr('href',deliever_path);
        //$('#go-main').attr('href',url+id);//设置
        //$('#account-set').attr('href',url);//设置
        //$('#account-exit').attr('href',url);//设置
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
    }
})();