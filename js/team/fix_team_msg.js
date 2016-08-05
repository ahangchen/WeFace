$(function(){

        var oldIntro,oldHistory,team_tel,team_mail,oldTid,oldName,oldLogoPath,oldSlogan,oldAbout,oldBType,oldLabel;

        //修改团队介绍
        $("#fix_team_intro").on("click",function(){
            //获取旧的团队介绍
            $.getJSON(/*cur_site + "team/info?tid=1"*/"../data/team_index.json", function(data) {
                var change_line=(data.res.about).split('<br>').length-1;//得到有几个换行
                oldIntro=data.res.about;
                for(var i=0;i<change_line;i++)
                oldIntro=oldIntro.replace('<br>','\n');//在input中正常显示
                oldTid=data.res.tid;
                oldName=data.res.name;
                oldLogoPath=data.res.logo_path;
                oldSlogan=data.res.slogan;
                oldAbout=data.res.about;
                oldHistory=data.res.history;
                oldBType=data.res.b_type;
            $.ajax({
                type:"get",
                url: "team_intro.html",
                dataType:"html",
                success:function(data){
                    //解除累加绑定
                    //$("#fix_team_intro").unbind('click');
                    //获取修改团队介绍界面
                    $("#team_introuduction").html(data);
                    //初始化要修改的信息
                    $("#team_intro").val(oldIntro+'\n\n').trigger('autoresize');
                    //保存对团队介绍的编辑,post
                    $("#intro_saveButton").on("click",function () {
                        var up_intro=$("#team_intro").val().replace(/\n\n/,'');//把每次多余的\n去掉
                        var new_intro=up_intro.replace(/\n/gm,'<br>');//所有的分点能换行,显示换行效果
                        //console.log(new_intro);
                        $("#team_introuduction").html(new_intro);
                        var result={
                            tid: oldTid,
                            name: oldName,
                            logo_path:oldLogoPath,
                            slogan:oldSlogan,
                            about:up_intro,
                            history:oldHistory,
                            b_type:oldBType
                        };
                        $.ajax({
                            type: 'POST',
                            data: result,
                            url: cur_site + 'team/update_team_info/',
                            xhrFields: {withCredentials: true},
                            dataType: 'json',
                            success: function (data) {
                                console.log(data.msg);
                            }
                        })
                    });
                    //取消对团队介绍的编辑
                    $("#intro_cancelButton").on("click",function () {
                        $("#team_introuduction").empty().html(oldIntro);
                    });
                    //点击分点按钮进行分点
                    $("#intro_list_auto").unbind("click").on("click",function(){
                        var temp=($("#team_intro").val()).replace(/\n\n/, "");
                        $("#team_intro").val(temp+'\n'+'◆'+'\n\n').trigger('autoresize');
                        /*var temp;
                        if(oldIntro==$("#team_intro").val()){
                            temp=($("#team_intro").val()).replace(/\n\n/, "")+'\n'+'◆';
                        }
                        else
                            temp=($("#team_intro").val()).replace(/\n\n/, "")+'◆';
                        $("#team_intro").val(temp+'\n').trigger('autoresize');*/
                    });
                }
                })
            });
        });

        //团队发展历史的编辑
        $("#history_button").on("click",function(){
            //获取旧的团队历史
            $.getJSON(cur_site + "team/info?tid=1", function(data) {
                oldHistory=data.res.history+'\n\n';
                oldIntro=data.res.about;
                oldTid=data.res.tid;
                oldName=data.res.name;
                oldLogoPath=data.res.logo_path;
                oldSlogan=data.res.slogan;
                oldAbout=data.res.about;
                oldBType=data.res.b_type;

            $.ajax({
                type:"get",
                url: "develop_history.html",
                dataType:"html",
                success:function(data){
                    //解除累加绑定
                    //$("#history_button").unbind("click");
                    //获取修改团队历史的界面
                    $("#history_text").html(data);
                    //初始化修改团队历史的信息
                    $("#develop_history").val(oldHistory).trigger('autoresize');

                    //取消对团队历史的编辑
                    $("#history_cancelButton").on("click",function(){
                        $("#history_text").empty().html(oldHistory);
                    });
                    //保存对团队历史的修改,post
                    $("#history_saveButton").unbind('click').on("click",function(){
                        var up_history=$("#develop_history").val();
                        var new_History=$("#develop_history").val().replace(/\n/gm,'<br>');//所有的分点能换行
                        $("#history_text").html(new_History);
                        var result={
                            tid: oldTid,
                            name: oldName,
                            logo_path:oldLogoPath,
                            slogan:oldSlogan,
                            about:oldIntro,
                            history:up_history,
                            b_type:oldBType
                        };
                        $.ajax({
                            type: 'POST',
                            data: result,
                            url: cur_site + 'team/update_team_info/',
                            xhrFields: {withCredentials: true},
                            dataType: 'json',
                            success: function (data) {
                                console.log(data.msg);
                            }
                        })
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
                }
            })
            });
        });

        //修改团队的联系方式
        $("#team_connect").on("click",function(){
            //获取旧的团队联系方式
            $.getJSON(cur_site + "team/info?tid=1", function(data) {
                team_tel=data.res.tel;
                team_mail=data.res.mail;

            $.ajax({
                type:"get",
                url: "team_connect.html",
                dataType:"html",
                success:function(data){
                    //解除之前的累计点击
                    //$("#team_connect").unbind("click");
                    //获取到修改联系方式的页面
                    $("#member_information").html(data);
                    //初始化要改的数据
                    $("#connect_tel").val(team_tel).trigger('autoresize');
                    $("#connect_mail").val(team_mail).trigger('autoresize');
                    //取消对团队联系方式的修改
                    $("#connect_cancelButton").on("click",function(){
                        $("#member_information").empty().html(team_tel+"<br>"+team_mail);
                    });
                    //保存对团队联系方式的修改,post,显示新的
                    $("#connect_saveButton").unbind('click').on("click",function(){
                        var new_tel=$("#connect_tel").val();
                        var new_mail=$("#connect_mail").val();
                        $("#member_information").html(new_tel+"<br>"+new_mail);
                        var result={
                            "tid":1,
                            "tel":new_tel,
                            "mail":new_mail
                        };
                        $.ajax({
                            type: 'POST',
                            data: result,
                            url: cur_site + 'team/update_team_contact/',
                            xhrFields: {withCredentials: true},
                            dataType: 'json',
                            success: function (data) {
                              console.log(data.msg);
                            }
                        })
                    });
                }
            });
            })
        });



    //对团队的基本信息进行修改
    $("#fix_msg_button").on("click",function(){
        $("#remove_basic_msg").empty();
        $.ajax({
            type:"get",
            url: "basic_msg_for_team.html",
            dataType:"html",
            success:function(data){
                //对修改页面的加载
                $("#remove_basic_msg").html(data);
                $.getJSON("../data/team_index.json", function(data) {
                    //记录之前所有的值
                    oldHistory=data.res.history;
                    oldIntro=data.res.about;
                    oldTid=data.res.tid;
                    oldName=data.res.name;
                    oldLogoPath=data.res.logo_path;
                    oldSlogan=data.res.slogan;
                    oldAbout=data.res.about;
                    oldBType=data.res.b_type;
                    oldLabel=data.res.label;
                    var type_num=oldBType.length;//记录标签的个数
                    var type_dym_name=oldBType;//动态记录标签的名字,删除,添加
                    var move_distance=0;//记录下拉框的移动距离
                    var label_num=oldLabel.length;//记录label的geshu
                    var label_dym_name=oldLabel;//动态记录label的名字,删除,添加
                    var newLogo;//新的logo
                    var newSlogan;//新的slogan
                    var newName;//新的名字
                    //-----------初始化之前的信息------------
                    //初始化团队的logo
                    $("#local_photo").attr("src",oldLogoPath);
                    //初始化团队名称
                    $("#team_name").val(oldName);
                    //动态加载tag,初始化tag的信息
                    for(var i=0;i<oldBType.length;i++) {
                        $("#show_type_as_tag").append('<div class="chip team_type_fix">' + oldBType[i] +
                            '<i class="close material-icons" id=' + oldBType[i] + '>close</i> </div>');
                    }
                    //计算移动距离
                    if(oldBType.length>3) {//需要换行处理
                        for(var i=3;i<oldBType.length;i++){
                            move_distance=move_distance+oldBType[i].length+4;
                        }
                    }
                    else {//不需要换行处理
                        for(var i=0;i<oldBType.length;i++)
                        move_distance = move_distance + oldBType[i].length + 4;
                    }
                    //移动下拉选择框
                    $(".job_type").css("margin-left",move_distance+'em');
                    //初始化团队人数,人数不可修改
                    $("#team_number").val(data.res.man_cnt+"人团队");
                    //初始化团队标语
                    $("#team_slogan").val(oldSlogan);
                    //初始化团队标签
                    var chip_data=[];
                    for(var i=0;i<label_num;i++){
                        var tag_temp={tag:oldLabel[i],
                        id:oldLabel[i]};
                        chip_data.push(tag_temp);
                    }
                    $('.chips-initial').material_chip({//要用一定的格式
                        data:chip_data,
                        placeholder: '输入新标签'});

                    //-------------初始化完成-----------------

                    //对Label进行添加,上限八个
                    $('.chips-initial').on('chip.add', function(e, chip){//监听只允许添加八个
                        label_dym_name.push(chip.tag);//把添加到的新的push,纯数据
                        label_num++;
                        if(label_num==8){
                            //console.log($('.chips-initial')[0]);
                            $('.chips-initial .input').remove();
                        }
                    });
                    //对label进行删除
                    $('.chips-initial').on('chip.delete', function(e, chip){
                        label_dym_name.splice($.inArray(chip.tag,label_dym_name),1);//把删除的label从数组中去掉
                        label_num--;
                        if(label_num==7){//允许继续添加
                            $('.chips-initial').append('<input class="input" placeholder>');
                        }
                    });

                    //对行业类型进行修改,行业类型的上限是五个
                    //对行业类型的删除操作
                    $(".team_type_fix .close").on("click",function(){//如果点击了关闭按钮,在删除标签的同时需要记录
                        type_dym_name.splice($.inArray(this.id,type_dym_name),1);//从数组中删除特定元素
                        type_num--;//行业类型的数目减1
                        //计算移动距离
                        if(type_num==3) {//需要换行处理
                            move_distance=0;
                            for(var i=0;i<type_num;i++){
                                move_distance=move_distance+type_dym_name[i].length+4;
                            }
                        }
                        else//不需要换行处理
                            move_distance=move_distance-this.id.length-4;
                        //移动下拉选择框
                        $(".job_type").css("margin-left",move_distance+'em');
                    });
                    //对行业类型进行添加操作
                    $(".add_type").on("click",function(){
                        //获取到在selector中选择的行业类型
                        var select_tag=$(".tag_select option:selected").text();
                        //-------------判断是否添加-------
                        //不能为空,且不能冲突
                        if(select_tag!='行业类型'&&$.inArray(select_tag,type_dym_name)<0&&type_num!=5){
                            type_dym_name.push(select_tag);
                            type_num++;
                            $("#show_type_as_tag").append('<div class="chip team_type_fix">'+select_tag+
                                '<i class="close material-icons" id='+select_tag+'>close</i> </div>');

                            //新的没绑定,可能有好的办法解决
                            $(".team_type_fix .close").unbind("click").on("click",function(){//如果点击了关闭按钮,在删除标签的同时需要记录
                                type_dym_name.splice($.inArray(this.id,type_dym_name),1);//从数组中删除特定元素
                                type_num--;//行业类型的数目减1
                                //计算移动距离
                                if(type_num==3) {//需要换行处理
                                    move_distance=0;
                                    for(var i=0;i<type_num;i++){
                                        move_distance=move_distance+type_dym_name[i].length+4;
                                    }
                                }
                                else//不需要换行处理
                                    move_distance=move_distance-this.id.length-4;
                                //移动下拉选择框
                                $(".job_type").css("margin-left",move_distance+'em');
                            });
                            //计算移动距离
                            if(type_num==4) {//需要换行处理
                                move_distance=select_tag.length+4;
                            }
                            else//不需要换行处理
                                move_distance=move_distance+select_tag.length+4;
                            //移动下拉选择框
                            $(".job_type").css("margin-left",move_distance+'em');
                        }
                        else if(type_num==5)
                            alert("行业类型上限为5!");

                    });


                    //取消修改
                    var type_temp='';//加载行业类型
                    for(var i=0;i<(oldBType).length;i++)
                        type_temp=type_temp+oldBType[i]+' ';
                    $("#cancelButton").on("click",function(){
                        $("#remove_basic_msg").empty().append(
                        '<div id="team_logo_div"><img src="'+oldLogoPath+'" id="team_logo"></div>'+
                            '<div id="information"><p id="p1">'+data.res.name+'</p><p id="p2">'+type_temp+'</p>'+
                        '<p id="p3">'+oldAbout+","+data.res.man_cnt+"人团队"+'</p> ' +
                        '<p id="p4">'+oldSlogan+'</p></div>'+
                            '<div id="information_three"></div>'
                        );
                        //动态加载div
                        var tag_cnt=data.res.label.length;
                        for(var i=0;i<tag_cnt;i++){
                            $("#information_three").append('<div class="tag"></div>');
                        }
                        var tag = $(".tag");
                        for (var i = 0; i < tag.length; i++) {
                            $(tag[i]).html(data.res.label[i]);
                        }
                    });

                    //保存修改
                    $("#saveButton").on("click",function(){
                        //对团队的名字进行修改
                        newName=$("#team_name").val();
                        //对团队的slogan进行修改
                        newSlogan=$("#team_slogan").val();
                        $("#remove_basic_msg").empty().append(
                            '<div id="team_logo_div"><img src="'+oldLogoPath+'" id="team_logo"></div>'+
                            '<div id="information"><p id="p1">'+newName+'</p><p id="p2">'+type_dym_name+'</p>'+
                            '<p id="p3">'+oldAbout+","+data.res.man_cnt+"人团队"+'</p> ' +
                            '<p id="p4">'+newSlogan+'</p></div>'+
                            '<div id="information_three"></div>'
                        );
                        //动态加载div
                        for(var i=0;i<label_num;i++){
                            $("#information_three").append('<div class="tag"></div>');
                        }
                        var tag = $(".tag");
                        for (var i = 0; i < tag.length; i++) {
                            $(tag[i]).html(label_dym_name[i]);
                        }
                    });



                });

            }
        });
    });
    
    


});

function F_Open_img(){
    document.getElementById("update_photo").click();

}

function show_local_img(file){//预览图片
    var img = document.getElementById("local_photo");
    var reader = new FileReader();
    reader.onload = function(evt) {
        img.src = evt.target.result;
    };
    reader.readAsDataURL(file.files[0]);
}


