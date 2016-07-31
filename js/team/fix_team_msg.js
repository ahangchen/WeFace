$(function(){

    //修改团队介绍
        $("#fix_team_intro").on("click",function(){
            $.ajax({
                type:"get",
                url: "team_intro.html",
                dataType:"html",
                success:function(data){
                    $("#team_introuduction").html(data);
                }
            })
        });

        //获取团队原来的介绍
        var oldIntro;
        $.getJSON('../data/team_index.json', function(data) {
            oldIntro=data.res.about+'\n\n';
            $("#team_intro").val(data.res.about+'\n\n').trigger('autoresize');
        });

        //取消对团队介绍的编辑
        $("#intro_cancelButton").unbind('click').on("click",function () {
            $("#team_introuduction").empty().html(oldIntro);
        });

        //保存对团队介绍的编辑,post
        $("#intro_saveButton").on("click",function () {
            var temp=$("#team_intro").val().replace(/\n/gm,'<br>');//所有的分点能换行
            $("#team_introuduction").html(temp);
        });

        //点击分点按钮进行分点
        $("#intro_list_auto").unbind("click").on("click",function(){
            var temp;
            if(oldIntro==$("#team_intro").val()){
                temp=($("#team_intro").val()).replace(/\n\n/, "")+'\n'+'◆';
            }
            else
               temp=($("#team_intro").val()).replace(/\n\n/, "")+'◆';
            $("#team_intro").val(temp+'\n').trigger('autoresize');
        });


    //团队发展历史的编辑
    $("#history_button").on("click",function(){
        $.ajax({
            type:"get",
            url: "develop_history.html",
            dataType:"html",
            success:function(data){
                $("#history_text").html(data);
            }
        })
    });

    //获取原来的团队历史
    var oldHistory;
    $.getJSON('../data/team_index.json', function(data) {
        oldHistory=data.res.history+'\n\n';
        $("#develop_history").val(data.res.history+'\n\n').trigger('autoresize');
    });

    //取消对团队历史的编辑
    $("#history_cancelButton").unbind('click').on("click",function(){
        $("#history_text").empty().html(oldHistory);
    });

    //保存对团队历史的修改,post
    $("#history_saveButton").unbind('click').on("click",function(){
        var temp=$("#develop_history").val().replace(/\n/gm,'<br>');//所有的分点能换行
        $("#history_text").html(temp);
    });

    //点击分点按钮进行分点
    $("#history_list_auto").unbind("click").on("click",function(){
        var temp;
        if(oldHistory==$("#develop_history").val()){
            temp=($("#develop_history").val()).replace(/\n\n/, "")+'\n'+'◆';
        }
        else
            temp=($("#develop_history").val()).replace(/\n\n/, "")+'◆';
        $("#develop_history").val(temp+'\n').trigger('autoresize');
    });


    //修改团队的联系方式
    $("#team_connect").unbind('click').on("click",function(){
        $.ajax({
            type:"get",
            url: "team_connect.html",
            dataType:"html",
            success:function(data){
                $("#member_information").html(data);
            }
        })
    });

    var team_tel;
    var team_mail;
    $.getJSON('../data/team_index.json', function(data) {
        team_tel=data.res.tel;
        team_mail=data.res.mail;
        $("#connect_tel").val(data.res.tel).trigger('autoresize');
        $("#connect_mail").val(data.res.mail).trigger('autoresize');
    });

    //取消对团队联系方式的修改
    $("#connect_cancelButton").unbind('click').on("click",function(){
        $("#member_information").empty().html(team_tel+"<br>"+team_mail);

    });

    //保存对团队联系方式的修改,post,显示新的
    $("#connect_saveButton").unbind('click').on("click",function(){
        $("#member_information").html($("#connect_tel").val()+"<br>"+$("#connect_mail").val());
    });




});


