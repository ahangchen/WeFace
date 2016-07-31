/**
 * Created by yuruilee on 16/7/30.
 */
$(function(){

    $("#fix_msg_button").unbind('click').on("click",function(){//显示团队的基本编辑信息
        $("#information").css("height","500px").children().css("opacity","0");
        $.ajax({
            type:"get",
            url: "basic_msg_for_team.html",
            dataType:"html",
            success:function(data){
                $("#information").html(data);
            }
        });
    });


    //标签的选择
    var tag=[];//记录已选择的标签
    var tag_num=0;
    var option_collapse=[];
    $("#type_tag").unbind('click').on("click",function () {
        tag_num=$("#type_tag").length-1;
    });

    $(".add_type").unbind('click').on("click",function(){
        var option_num=$(".tag_select").val();
        console.log(option_num);
        if(tag_num<5&&option_num!=null) {
            var type_name=$(".tag_select option:selected").text();
            if(tag_num!=0){
                for(var i=0;i<option_collapse.length;i++){
                    if(option_num==option_collapse[i])
                        return;
                }
            }
            option_collapse.length=0;
            tag.push(type_name);
            $("#type_tag").append('<div class="tag_collapse chip" id='+option_num+'>'+type_name+'<i class="close material-icons">close</i> </div>');
            $("div .tag_collapse").each(function () {
                option_collapse.push(this.id);
            });
            //console.log(option_collapse);
            tag_num++;
        }
    });


    //保存,取消重新加载
    $("#saveButton").unbind('click').on("click",function(){
        location.reload("index.html");
    });
    $("#cancelButton").unbind('click').on("click",function(){
        location.reload("index.html");
    });

    //修改团队介绍
    $("#fix_team_intro").unbind('click').on("click",function(){
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
    $.getJSON('../data/team_index.json', function(data) {
        $("#team_intro").val(data.res.about+'\n\n').trigger('autoresize');
    });

    //取消对团队介绍的编辑
    $("#intro_cancelButton").unbind('click').on("click",function () {
        $("#team_introuduction").empty();
        $.getJSON('../data/team_index.json', function(data) {
            $("#team_introuduction").html(data.res.about);
        });
    });

    //保存对团队介绍的编辑,post
    $("#intro_saveButton").unbind('click').on("click",function () {
        $("#team_introuduction").empty();
        $.getJSON('../data/team_index.json', function(data) {
            $("#team_introuduction").html(data.res.about);
        });
    });

    //团队发展历史的编辑
    $("#history_button").unbind('click').on("click",function(){
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
    $.getJSON('../data/team_index.json', function(data) {
        $("#develop_history").val(data.res.history+'\n\n').trigger('autoresize');
    });

    //取消对团队历史的编辑
    $("#history_cancelButton").unbind('click').on("click",function(){
        $("#history_text").empty();
        $.getJSON('../data/team_index.json', function(data) {
            $("#history_text").html(data.res.history);
        });
    });

    //保存对团队历史的修改,post
    $("#history_saveButton").unbind('click').on("click",function(){
        $("#history_text").empty();
        $.getJSON('../data/team_index.json', function(data) {
            $("#history_text").html(data.res.history);
        });
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

    //对原来联系方式的显示
    /*$.getJSON('../data/team_index.json', function(data) {
        $("#connect_tel").val(data.res.tel).trigger('autoresize');
        $("#connect_email").val(data.res.mail).trigger('autoresize');
    });*/

    //取消对团队联系方式的修改
    $("#connect_cancelButton").unbind('click').on("click",function(){
        $("#member_information").empty();
        $.getJSON('../data/team_index.json', function(data) {
            $("#member_information").html(data.res.tel+"<br>"+data.res.mail);
        });

    });

    //保存对团队联系方式的修改,post,显示新的
    $("#connect_saveButton").unbind('click').on("click",function(){
        $("#member_information").empty();
        $.getJSON('../data/team_index.json', function(data) {
            $("#member_information").html(data.res.tel+"<br>"+data.res.mail);
        });

    });

    
    //对成员的编辑
    $("#edit_member").one("click",function(){
        $("#contact_way").css("margin-top","30px");
        $.ajax({
            type:"get",
            url: "add_member.html",
            dataType:"html",
            success:function(result){
                $("#team_member_icon").html(result);
                //对编辑成员的初始化,动态获取个数
                $.getJSON('../data/team_index.json', function(data) {
                    $("#team_member_icon_edit").append(
                        '<div class="leader_div_edit"><img src="" alt="头像" id ="leader" class="Head_portrait_edit" /><br>创始人<br><span class="name"></span></div>');
                    var icon_num=(data.res.stus).length-1;//总的成员头像数
                    var left_icon;//放在左边的成员的头像数
                    var right_icon;//放在右边的成员的头像数
                    if(icon_num%2==0){
                        left_icon=right_icon=icon_num/2;
                    }
                    else{
                        left_icon=icon_num/2+0.5;
                        right_icon=icon_num/2-0.5;
                    }

                    //所有包含两个头像的双行
                    for(var j=0;j<right_icon;j++){
                        $("#team_member_icon_edit").append('<div id=left'+j+' class="Head_portrait_div_edit Head_portrait_div_left_edit"><img src="" alt="头像" class="Head_portrait_edit" /><br><span class="name"></span></div>'+
                            '<div id=right'+j+' class="Head_portrait_div_edit"><img src="" alt="头像" class="Head_portrait_edit" /><br><span class="name"></span></div>');
                    }

                    //成员个数是奇数的时候,只包含一个头像的一定在左边,右边添加add建
                    if(right_icon!=left_icon) {
                       /* $("#team_member_icon_edit").append('<div id=left'+right_icon+' class="Head_portrait_div_edit Head_portrait_div_left_edit"><img src="" alt="头像" class="Head_portrait_edit" /><br><span class="name"></span></div>' +
                        '<div id="add_member" class="Head_portrait_div_edit"><a class="btn-floating btn-large waves-effect waves orange" href="#add_member_dialog">'+
                        '<i class="material-icons" style="color:#fff">add</i></a></div>'
                        );*/
                        $("#team_member_icon_edit").append('<div id=left'+right_icon+' class="Head_portrait_div_edit Head_portrait_div_left_edit"><img src="" alt="头像" class="Head_portrait_edit" /><br><span class="name"></span></div>');
                    }

                        //成员是偶数在新的一行添加add建
                    /*else{
                        $("#team_member_icon_edit").append(
                            '<div id="add_member" class="Head_portrait_div_edit Head_portrait_div_left_edit"><a class="btn-floating btn-large waves-effect waves orange" href="#add_member_dialog">'+
                            '<i class="material-icons" style="color:#fff">add</i></a></div>'
                        );
                    }*/


                    var Head_portrait = $(".Head_portrait_edit");
                    for (var i = 0; i < Head_portrait.length; i++) {
                        $(Head_portrait[i]).attr('src', data.res.stus[i].logo_path);
                    }
                    // 团队成员姓名加载
                    var name_arr = $(".name");
                    for (var i = 0; i < name_arr.length; i++) {
                        $(name_arr[i]).html(data.res.stus[i].name);
                    }

                });
            }
        });
    });

    //对成员进行删除
    $.getJSON("../data/team_index.json",function(data){
        var icon_num=(data.res.stus).length-1;//总的成员头像数
        var right_icon=icon_num/2;//放在右边的成员的头像数
        for(var i=0;i<right_icon;i++){
            $("#right"+i).on("click",function () {
                $('#'+this.id+" .Head_portrait_edit").attr("src","../res/imgs/team/hover_close.jpg");
            });
            $("#left"+i).on("click",function () {
                $('#'+this.id+" .Head_portrait_edit").attr("src","../res/imgs/team/hover_close.jpg");
            });
        }
        //如果是奇数对最后一个元素添加监听事件
        $("#left"+right_icon).on("click",function () {
            $('#'+this.id+" .Head_portrait_edit").attr("src","../res/imgs/team/hover_close.jpg");
        });

    });

    //点击添加成员的一系列动作
    $("#add_member").on("click",function () {
        $('#add_member_dialog').openModal();
        //点击添加对成员进行添加,点击触发前面的modal事件,弹出框
        $("#searchMemberButton").unbind("click").on("click",function () {
            $.getJSON('../data/search_member_success.json', function (data) {//得到返回的搜索数据
                if(data["err"] == 0){//找到该学生,返回匹配的邮箱
                    $.ajax({
                        type: "get",
                        url: "search_success.html",
                        dataType: "html",
                        success: function (result) {
                            $("#member_search_result").html(result);

                            //添加搜索到的邮箱
                            for (var i = 0; i < data["res"].length; i++) {
                                var mail_temp = data["res"][i]["mail"];
                                $(".member_match_select").append('<option value=' + data["res"][i]["sid"] + '>' + mail_temp + '</option>');
                            }
                            //最后一项为其它,选择这个的时候发送邀请
                            $(".member_match_select").append('<option value="-1">其它(跳到手动添加)</option>');

                            //通过学生的sid得到学生的头像
                            $("#add_member_img").attr("src","../res/imgs/team/touxiang1.jpg");

                            //点击添加按钮,关闭弹出框,显示在列表中,刷新?
                            $("#addMemberButton").unbind("click").on('click',function () {
                                //关掉弹出框,并刷新窗口
                                $("#add_member_dialog").closeModal();
                                $("#enter_result").empty().append('<div  id="add_member_note">输入姓名，搜索匹配头像和账号，可通过点击成员头像查看该成员个人主页。若有重名，请核对后进行选择。若成员未注册推荐注册，完善个人主页。</div>'+
                                    '<div class="input-field member_name "><i class="material-icons prefix">account_circle</i>'+
                                    '<input id="member_name" type="text" class="validate"><label for="member_name">输入成员姓名</label> </div>'+
                                    '<div id="member_search_result">'+
                                    '<a href="#" id="searchMemberButton" class="waves-effect waves-light btn modal-action">搜索</a> </div>');


                                //Post新添加的成员,并刷新成员列表,显示新的成员信息
                                $("#team_member_icon_edit").empty();

                                $.getJSON('../data/add_exist_member.json', function(data) {
                                    $("#team_member_icon_edit").append(
                                        '<div class="leader_div_edit"><img src="" alt="头像" id ="leader" class="Head_portrait_edit" /><br>创始人<br><span class="name"></span></div>');
                                    var icon_num=(data.res.stus).length-1;//总的成员头像数
                                    var left_icon;//放在左边的成员的头像数
                                    var right_icon;//放在右边的成员的头像数
                                    if(icon_num%2==0){
                                        left_icon=right_icon=icon_num/2;
                                    }
                                    else{
                                        left_icon=icon_num/2+0.5;
                                        right_icon=icon_num/2-0.5;
                                    }

                                    //所有包含两个头像的双行
                                    for(var j=0;j<right_icon;j++){
                                        $("#team_member_icon_edit").append('<div id=left'+j+' class="Head_portrait_div_edit Head_portrait_div_left_edit"><img src="" alt="头像" class="Head_portrait_edit" /><br><span class="name"></span></div>'+
                                            '<div id=right'+j+' class="Head_portrait_div_edit"><img src="" alt="头像" class="Head_portrait_edit" /><br><span class="name"></span></div>');
                                    }

                                    //成员个数是奇数的时候,只包含一个头像的一定在左边
                                    if(right_icon!=left_icon) {
                                        $("#team_member_icon_edit").append('<div id=left'+right_icon+' class="Head_portrait_div_edit Head_portrait_div_left_edit"><img src="" alt="头像" class="Head_portrait_edit" /><br><span class="name"></span></div>');
                                    }

                                    var Head_portrait = $(".Head_portrait_edit");
                                    for (var i = 0; i < Head_portrait.length; i++) {
                                        $(Head_portrait[i]).attr('src', data.res.stus[i].logo_path);
                                    }
                                    // 团队成员姓名加载
                                    var name_arr = $(".name");
                                    for (var i = 0; i < name_arr.length; i++) {
                                        $(name_arr[i]).html(data.res.stus[i].name);
                                    }

                                });

                            });

                        }
                    });
                }

                else{//没有找到相关联的邮箱
                    $.ajax({
                        type:"get",
                        url: "search_fault.html",
                        dataType:"html",
                        success:function(result){
                            $("#member_search_result").html(result);
                            //在点击邀请注册的时候,得到输入邮箱的内容,post,发送一封邮件到他的邮箱,并刷新列表
                            $("#invite_to_join").on("click",function () {
                                console.log($("#member_mail").val());//输入的邮箱

                                //关闭弹出框,并刷新
                                $("#add_member_dialog").closeModal();
                                $("#enter_result").empty().append('<div  id="add_member_note">输入姓名，搜索匹配头像和账号，可通过点击成员头像查看该成员个人主页。若有重名，请核对后进行选择。若成员未注册推荐注册，完善个人主页。</div>'+
                                    '<div class="input-field member_name "><i class="material-icons prefix">account_circle</i>'+
                                    '<input id="member_name" type="text" class="validate"><label for="member_name">输入成员姓名</label> </div>'+
                                    '<div id="member_search_result">'+
                                    '<a href="#" id="searchMemberButton" class="waves-effect waves-light btn modal-action">搜索</a> </div>');

                                //刷新成员列表,显示无头像和邮箱
                                $("#team_member_icon_edit").empty();
                                $.getJSON('../data/add_invalid_member.json', function(data) {
                                    $("#team_member_icon_edit").append(
                                        '<div class="leader_div_edit"><img src="" alt="头像" id ="leader" class="Head_portrait_edit" /><br>创始人<br><span class="name"></span></div>');
                                    var icon_num=(data.res.stus).length-1;//总的成员头像数
                                    var left_icon;//放在左边的成员的头像数
                                    var right_icon;//放在右边的成员的头像数
                                    if(icon_num%2==0){
                                        left_icon=right_icon=icon_num/2;
                                    }
                                    else{
                                        left_icon=icon_num/2+0.5;
                                        right_icon=icon_num/2-0.5;
                                    }

                                    //所有包含两个头像的双行
                                    for(var j=0;j<right_icon;j++){
                                        $("#team_member_icon_edit").append('<div id=left'+j+' class="Head_portrait_div_edit Head_portrait_div_left_edit"><img src="" alt="头像" class="Head_portrait_edit" /><br><span class="name"></span></div>'+
                                            '<div id=right'+j+' class="Head_portrait_div_edit"><img src="" alt="头像" class="Head_portrait_edit" /><br><span class="name"></span></div>');
                                    }

                                    //成员个数是奇数的时候,只包含一个头像的一定在左边,右边添加add建
                                    if(right_icon!=left_icon) {
                                        $("#team_member_icon_edit").append('<div id=left'+right_icon+' class="Head_portrait_div_edit Head_portrait_div_left_edit"><img src="" alt="头像" class="Head_portrait_edit" /><br><span class="name"></span></div>');
                                    }


                                    var Head_portrait = $(".Head_portrait_edit");
                                    for (var i = 0; i < Head_portrait.length; i++) {
                                        $(Head_portrait[i]).attr('src', data.res.stus[i].logo_path);
                                    }
                                    // 团队成员姓名加载
                                    var name_arr = $(".name");
                                    for (var i = 0; i < name_arr.length; i++) {
                                        $(name_arr[i]).html(data.res.stus[i].name);
                                    }

                                });

                            });

                        }
                    });
                }
            });
        });

    });


    //中途关掉弹出框,就刷新从头开始,而不是停在上次退出的页面
    $("#close_prompt").on("click",function(){
        $("#enter_result").empty().append('<div  id="add_member_note">输入姓名，搜索匹配头像和账号，可通过点击成员头像查看该成员个人主页。若有重名，请核对后进行选择。若成员未注册推荐注册，完善个人主页。</div>'+
            '<div class="input-field member_name "><i class="material-icons prefix">account_circle</i>'+
            '<input id="member_name" type="text" class="validate"><label for="member_name">输入成员姓名</label> </div>'+
            '<div id="member_search_result">'+
            '<a href="#" id="searchMemberButton" class="waves-effect waves-light btn modal-action">搜索</a> </div>');
    });


    //取消对成员的添加和删除
    $("#member_cancelButton").unbind('click').on("click",function(){//在第二次点击之前解除绑定
        $("#team_member_icon").empty();
        $("#contact_way").css("margin-top","250px");
        $.getJSON('../data/team_index.json', function(data) {
            $("#team_member_icon").append(
            '<div class="leader_div"><img src="" alt="头像" id ="leader" class="Head_portrait" /><br>创始人<br><span class="name"></span></div>');
            var icon_num=(data.res.stus).length-1;//总的成员头像数
            var left_icon;//放在左边的成员的头像数
            var right_icon;//放在右边的成员的头像数
            if(icon_num%2==0){
                left_icon=right_icon=icon_num/2;
            }
            else{
                left_icon=icon_num/2+1;
                right_icon=icon_num/2;
            }

            //所有包含两个头像的双行
            for(var j=0;j<right_icon;j++){
                $("#team_member_icon").append('<div class="Head_portrait_div Head_portrait_div_left"><img src="" alt="头像" class="Head_portrait" /><br><span class="name"></span></div>'+
                    '<div class="Head_portrait_div"><img src="" alt="头像" class="Head_portrait" /><br><span class="name"></span></div>');
            }

            //成员个数是奇数的时候,只包含一个头像的一定在左边
            if(right_icon!=left_icon)
            $("#team_member_icon").append('<div class="Head_portrait_div Head_portrait_div_left"><img src="" alt="头像" class="Head_portrait" /><br><span class="name"></span></div>');


            var Head_portrait = $(".Head_portrait");
            for (var i = 0; i < Head_portrait.length; i++) {
                $(Head_portrait[i]).attr('src', data.res.stus[i].logo_path);
            }
            // 团队成员姓名加载
            var name_arr = $(".name");
            for (var i = 0; i < name_arr.length; i++) {
                $(name_arr[i]).html(data.res.stus[i].name);
            }
            $("#edit_member").unbind('click');//解除对编辑成员的点击事件,否则执行两次
        });
    });

    //保存对成员的添加操作,post并重新显示
    $("#member_saveButton").unbind('click').on("click",function(){

    });
    
    //Jquery对modal的初始化
        $(document).ready(function() {
            $('.modal-trigger').leanModal();
        });
    
});

function F_Open_img(){
    document.getElementById("update_photo").click();

}

function show_local_img(file){//预览图片
    $("#photo_logo").css("opacity","0");
    var img = document.getElementById("local_photo");
    var reader = new FileReader();
    reader.onload = function(evt) {
        img.src = evt.target.result;
    };
    reader.readAsDataURL(file.files[0]);
}

function match_others() {//在选择添加成员的时候,如果选择其它选项,有不同的动作
    if($("#add_member_email option:selected").text()=="其它(跳到手动添加)"){
        $.ajax({
            type:"get",
            url: "search_fault.html",
            dataType:"html",
            success:function(result){
                $("#member_search_result").html(result);
                $("#invite_to_join").on("click",function () {
                    console.log($("#member_mail").val());//输入的邮箱

                    //关闭弹出框,并刷新
                    $("#add_member_dialog").closeModal();
                    $("#enter_result").empty().append('<div  id="add_member_note">输入姓名，搜索匹配头像和账号，可通过点击成员头像查看该成员个人主页。若有重名，请核对后进行选择。若成员未注册推荐注册，完善个人主页。</div>'+
                        '<div class="input-field member_name "><i class="material-icons prefix">account_circle</i>'+
                        '<input id="member_name" type="text" class="validate"><label for="member_name">输入成员姓名</label> </div>'+
                        '<div id="member_search_result">'+
                        '<a href="#" id="searchMemberButton" class="waves-effect waves-light btn modal-action">搜索</a> </div>');

                    //刷新成员列表,显示无头像和邮箱
                    $("#team_member_icon_edit").empty();
                    $.getJSON('../data/add_invalid_member.json', function(data) {
                        $("#team_member_icon_edit").append(
                            '<div class="leader_div_edit"><img src="" alt="头像" id ="leader" class="Head_portrait_edit" /><br>创始人<br><span class="name"></span></div>');
                        var icon_num=(data.res.stus).length-1;//总的成员头像数
                        var left_icon;//放在左边的成员的头像数
                        var right_icon;//放在右边的成员的头像数
                        if(icon_num%2==0){
                            left_icon=right_icon=icon_num/2;
                        }
                        else{
                            left_icon=icon_num/2+0.5;
                            right_icon=icon_num/2-0.5;
                        }

                        //所有包含两个头像的双行
                        for(var j=0;j<right_icon;j++){
                            $("#team_member_icon_edit").append('<div id=left'+j+' class="Head_portrait_div_edit Head_portrait_div_left_edit"><img src="" alt="头像" class="Head_portrait_edit" /><br><span class="name"></span></div>'+
                                '<div id=right'+j+' class="Head_portrait_div_edit"><img src="" alt="头像" class="Head_portrait_edit" /><br><span class="name"></span></div>');
                        }

                        //成员个数是奇数的时候,只包含一个头像的一定在左边,右边添加add建
                        if(right_icon!=left_icon) {
                            /* $("#team_member_icon_edit").append('<div id=left'+right_icon+' class="Head_portrait_div_edit Head_portrait_div_left_edit"><img src="" alt="头像" class="Head_portrait_edit" /><br><span class="name"></span></div>' +
                             '<div id="add_member" class="Head_portrait_div_edit"><a class="btn-floating btn-large waves-effect waves orange" href="#add_member_dialog">'+
                             '<i class="material-icons" style="color:#fff">add</i></a></div>'
                             );*/
                            $("#team_member_icon_edit").append('<div id=left'+right_icon+' class="Head_portrait_div_edit Head_portrait_div_left_edit"><img src="" alt="头像" class="Head_portrait_edit" /><br><span class="name"></span></div>');
                        }

                        //成员是偶数在新的一行添加add建
                        /*else{
                         $("#team_member_icon_edit").append(
                         '<div id="add_member" class="Head_portrait_div_edit Head_portrait_div_left_edit"><a class="btn-floating btn-large waves-effect waves orange" href="#add_member_dialog">'+
                         '<i class="material-icons" style="color:#fff">add</i></a></div>'
                         );
                         }*/


                        var Head_portrait = $(".Head_portrait_edit");
                        for (var i = 0; i < Head_portrait.length; i++) {
                            $(Head_portrait[i]).attr('src', data.res.stus[i].logo_path);
                        }
                        // 团队成员姓名加载
                        var name_arr = $(".name");
                        for (var i = 0; i < name_arr.length; i++) {
                            $(name_arr[i]).html(data.res.stus[i].name);
                        }

                    });

                });
            }
        });
    }
    else{//只是选择了其它邮箱,由sid重新post,得到头像
        var sid_email=$("#add_member_email option:selected").text();//邮箱
        $("#add_member_img").attr("src","../res/imgs/team/touxiang3.jpg");
    }
}

