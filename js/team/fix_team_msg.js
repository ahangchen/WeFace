$(function () {
    var tid = getId();//从url得到学生的id

    var oldIntro, oldHistory, team_tel, team_mail, oldTid, oldName, oldLogoPath, oldSlogan, oldAbout, oldBType, oldLabel;

    //修改团队介绍
    $("#fix_team_intro").on("click", function () {
        //获取旧的团队介绍
        $.ajax({
            type: 'GET',
            url: cur_site + "team/info/",
            // url: "../data/team_index.json",
            dataType: "json",
            data: {'tid': 1/*tid*/},
            success: function (data) {
                var change_line = (data.res.about).split('<br>').length - 1;//得到有几个换行
                oldIntro = data.res.about;
                for (var i = 0; i < change_line; i++)
                    oldIntro = oldIntro.replace('<br>', '\n');//在input中正常显示
                oldTid = data.res.tid;
                oldName = data.res.name;
                oldLogoPath = data.res.logo_path;
                oldSlogan = data.res.slogan;
                oldAbout = data.res.about;
                oldHistory = data.res.history;
                //先只得到一个行业类型
                oldBType = data.res.b_type;
                $.ajax({
                    type: "get",
                    url: "team_intro.html",
                    dataType: "html",
                    success: function (data) {
                        //解除累加绑定
                        //$("#fix_team_intro").unbind('click');
                        //获取修改团队介绍界面
                        $("#team_introuduction").html(data);
                        //初始化要修改的信息
                        $("#team_intro").val(oldIntro + '\n\n').trigger('autoresize');
                        //保存对团队介绍的编辑,post
                        $("#intro_saveButton").on("click", function () {
                            var up_intro = $("#team_intro").val().replace(/\n\n/, '');//把每次多余的\n去掉
                            var new_intro = up_intro.replace(/\n/gm, '<br>');//所有的分点能换行,显示换行效果
                            //console.log(new_intro);
                            $("#team_introuduction").html(new_intro);
                            var result = {
                                tid: oldTid,
                                name: oldName,
                                logo_path: oldLogoPath,
                                slogan: oldSlogan,
                                about: up_intro,
                                history: oldHistory,
                                b_type: oldBType
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
                        $("#intro_cancelButton").on("click", function () {
                            $("#team_introuduction").empty().html(oldIntro);
                        });
                        //点击分点按钮进行分点
                        $("#intro_list_auto").unbind("click").on("click", function () {
                            var temp = ($("#team_intro").val()).replace(/\n\n/, "");
                            $("#team_intro").val(temp + '\n' + '◆' + '\n\n').trigger('autoresize');
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
            }
        });

    });

    //团队发展历史的编辑
    $("#history_button").on("click", function () {
        //获取旧的团队历史
        $.ajax({
            type: 'GET',
            url: cur_site + "team/info/",
            // url: "../data/team_index.json",
            dataType: "json",
            data: {'tid': 1/*tid*/},
            success: function (data) {
                oldHistory = data.res.history + '\n\n';
                oldIntro = data.res.about;
                oldTid = data.res.tid;
                oldName = data.res.name;
                oldLogoPath = data.res.logo_path;
                oldSlogan = data.res.slogan;
                oldAbout = data.res.about;
                oldBType = data.res.b_type;

                $.ajax({
                    type: "get",
                    url: "develop_history.html",
                    dataType: "html",
                    success: function (data) {
                        //解除累加绑定
                        //$("#history_button").unbind("click");
                        //获取修改团队历史的界面
                        $("#history_text").html(data);
                        //初始化修改团队历史的信息
                        $("#develop_history").val(oldHistory).trigger('autoresize');

                        //取消对团队历史的编辑
                        $("#history_cancelButton").on("click", function () {
                            $("#history_text").empty().html(oldHistory);
                        });
                        //保存对团队历史的修改,post
                        $("#history_saveButton").unbind('click').on("click", function () {
                            var up_history = $("#develop_history").val();
                            var new_History = $("#develop_history").val().replace(/\n/gm, '<br>');//所有的分点能换行
                            $("#history_text").html(new_History);
                            var result = {
                                tid: oldTid,
                                name: oldName,
                                logo_path: oldLogoPath,
                                slogan: oldSlogan,
                                about: oldIntro,
                                history: up_history,
                                b_type: oldBType
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
                        $("#history_list_auto").unbind("click").on("click", function () {
                            var temp;
                            if (oldHistory == $("#develop_history").val()) {
                                temp = ($("#develop_history").val()).replace(/\n\n/, "") + '\n' + '◆';
                            }
                            else
                                temp = ($("#develop_history").val()).replace(/\n\n/, "") + '◆';
                            $("#develop_history").val(temp + '\n').trigger('autoresize');
                        });
                    }
                })
            }
        });
    });

    //修改团队的联系方式
    $("#team_connect").on("click", function () {
        //获取旧的团队联系方式
        $.ajax({
            type: 'GET',
            url: cur_site + "team/info/",
            // url: "../data/team_index.json",
            dataType: "json",
            data: {'tid': 1/*tid*/},
            success: function (data) {
                team_tel = data.res.tel;
                team_mail = data.res.mail;

                $.ajax({
                    type: "get",
                    url: "team_connect.html",
                    dataType: "html",
                    success: function (data) {
                        //解除之前的累计点击
                        //$("#team_connect").unbind("click");
                        //获取到修改联系方式的页面
                        $("#member_information").html(data);
                        //初始化要改的数据
                        $("#connect_tel").val(team_tel).trigger('autoresize');
                        $("#connect_mail").val(team_mail).trigger('autoresize');
                        //取消对团队联系方式的修改
                        $("#connect_cancelButton").on("click", function () {
                            $("#member_information").empty().html(team_tel + "<br>" + team_mail);
                        });
                        //保存对团队联系方式的修改,post,显示新的
                        $("#connect_saveButton").unbind('click').on("click", function () {
                            var new_tel = $("#connect_tel").val();
                            var new_mail = $("#connect_mail").val();
                            $("#member_information").html(new_tel + "<br>" + new_mail);
                            var result = {
                                "tid": 1,
                                "tel": new_tel,
                                "mail": new_mail
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
            }
        });

    });

    //对基本信息进行编辑
    $("#fix_msg_button").on("click", function () {
        $("#fix_msg_button").css("opacity", '0');
        $("#remove_basic_msg").empty();


            $.ajax({
                type: "get",
                url: "basic_msg_for_team.html",
                dataType: "html",
                success: function (data) {
                    //对修改页面的加载
                    $("#remove_basic_msg").html(data);
                    //请求团队的职业类型,初始化选择框
                    $.ajax({
                        type: "get",
                        url: cur_site + "team/business/",
                        dataType: "json",
                        success: function (data) {
                            var all_team_type = data.msg;


                            $.ajax({
                                type: 'GET',
                                url: cur_site + "team/info/",
                                dataType: "json",
                                data: {'tid': tid},
                                success: function (data) {
                                    console.log(data);
                                    var team_name = data.res.name;
                                    var team_slogan = data.res.slogan;
                                    var team_member_num = data.res.man_cnt;
                                    var team_logo = data.res.logo_path;
                                    var team_about=data.res.about;
                                    var team_history=data.res.history;
                                    //对label的操作,对最原始的label,删除,不post,对新加的label删除直接post,记录新加的label,在取消的时候删除
                                    var team_label = data.res.label;
                                    var old_label = team_label;//原始的label
                                    var new_label = [];//新加的label
                                    var delete_old_label = [];//删除的旧标签
                                    var team_type = [];
                                    /*for(var i=0;i<data.res.b_type.length;i++){
                                     team_type.push(data.res.b_type[i]);
                                     }*/
                                    team_type.push(data.res.b_type);
                                    var new_team_type_name=[];
                                    var team_type_name=[];
                                     for(var i=0;i<team_type.length;i++){
                                         for(var j=0;j<all_team_type.length;j++){
                                             if(all_team_type[j].id==team_type[i]){
                                             team_type_name.push(all_team_type[j].name);
                                                 new_team_type_name.push(all_team_type[j].name);
                                             }
                                         }
                                     }


                                    $("#team_name").val(team_name);
                                    $("#team_number").val(team_member_num + '人团队');
                                    $("#team_slogan").val(team_slogan);
                                    $("#local_photo").attr('src', cur_media + team_logo);
                                    if (team_label.length == 0) {
                                        $('.chips-placeholder').material_chip({
                                            secondaryPlaceholder: '请输入团队标签'
                                        });
                                    }
                                    else {
                                        var team_label_data = [];
                                        for (var i = 0; i < team_label.length; i++) {
                                            var tag_temp = {
                                                tag: team_label[i],
                                                id: i
                                            };
                                            team_label_data.push(tag_temp);
                                        }
                                        $('.chips-initial').material_chip({//要用一定的格式
                                            data: team_label_data,
                                            placeholder: "请输入团队标签"
                                        });
                                        if (team_label.length == 8) {
                                            $('.chips-initial .input').remove();
                                        }
                                    }
                                    editlabel(old_label, new_label, delete_old_label);
                                    deletelabel(old_label, new_label, delete_old_label);
                                    showtype(team_type_name,all_team_type);
                                    addType(new_team_type_name,all_team_type);
                                    deleteType(new_team_type_name,all_team_type);



                                    //保存对基本信息的编辑
                                    $("#saveButton").on("click", function () {
                                            //删除旧的删除标签
                                        var new_team_label=[];
                                        if(delete_old_label.length!=0) {
                                            for (var k = 0; k < old_label.length; k++) {
                                                var mark=0;
                                                for(var q=0;q<delete_old_label.length;q++){
                                                    if (old_label[k] == delete_old_label[q]) {
                                                        mark=1;
                                                    }
                                                }
                                                if(mark==0)
                                                    new_team_label.push(old_label[k]);
                                            }
                                            for (var i = 0; i < delete_old_label.length; i++) {
                                                var result = {
                                                    tid: tid,
                                                    name: delete_old_label[i]
                                                };

                                            }
                                            $.ajax({
                                                type: 'POST',
                                                data: result,
                                                url: cur_site + "team/rm_team_label/",
                                                xhrFields: {withCredentials: true},
                                                dataType: 'json',
                                                success: function (data) {
                                                    console.log(data);
                                                }
                                            });
                                        }

                                        else{
                                            for (var k = 0; k < old_label.length; k++) {
                                                new_team_label.push(old_label[k]);
                                            }
                                        }
                                        for(var k=0;k<new_label.length;k++){
                                            new_team_label.push(new_label[k]);
                                        }

                                        var newName=$("#team_name").val();
                                        var newSlogan= $("#team_slogan").val();
                                        var new_team_type=[];
                                        if(new_team_type_name.length!=0){
                                            for(var i=0;i<new_team_type_name.length;i++){
                                                for(var j=0;j<all_team_type.length;j++){
                                                    if(all_team_type[j].name==new_team_type_name[i]){
                                                        new_team_type.push(all_team_type[j].id);
                                                    }
                                                }
                                            }
                                        }
                                        else{
                                            for(var i=0;i<team_type.length;i++){
                                                new_team_type.push(team_type[i]);
                                            }
                                        }


                                        if (tag_logo_change == 1) {//表示有上传新的logo,保存
                                            var formData = new FormData();
                                            formData.append('name', $("#update_photo").val());
                                            formData.append('photo', $('#update_photo')[0].files[0]);
                                            //上传照片
                                            $.ajax({
                                                url: cur_site + "team/upload_logo/",
                                                type: "POST",
                                                cache: false,
                                                dataType: 'json',
                                                data: formData,
                                                processData: false,
                                                contentType: false
                                            }).done(function (res) {
                                                console.log(res);
                                                var new_team_logo=res.msg;
                                                var result = {
                                                    tid: tid,
                                                    name: newName,
                                                    logo_path: new_team_logo.replace(cur_media,""),
                                                    slogan: newSlogan,
                                                    about: team_about,
                                                    history: team_history,
                                                    b_type: new_team_type
                                                };
                                                $.ajax({
                                                    type: 'POST',
                                                    data: result,
                                                    url: cur_site + "team/update_team_info/",
                                                    xhrFields: {withCredentials: true},
                                                    dataType: 'json',
                                                    success: function (data) {
                                                        console.log(data.msg);
                                                        $("#fix_msg_button").css("opacity", '1');
                                                        $("#remove_basic_msg").empty().append(
                                                            '<div id="team_logo_div"><img src="' +cur_media+ new_team_logo+ '" id="team_logo"></div>' +
                                                            '<div id="information"><p id="p1">' + newName+ '</p><p id="p2">' + new_team_type_name[0] + '</p>' +
                                                            '<p id="p3">' + team_about + '</p> ' +
                                                            '<p id="p4">' + team_member_num + "人团队" + '</p>'+
                                                            '<p id="p5">' + newSlogan + '</p></div>'+
                                                            '<div id="information_three"></div>'
                                                        );
                                                        //动态加载div
                                                        var tag_cnt = new_team_label.length;
                                                        for (var j = 0; j < tag_cnt; j++) {
                                                            $("#information_three").append('<div class="tag"></div>');
                                                        }
                                                        var tag = $(".tag");
                                                        for (var j = 0; j < new_team_label.length; j++) {
                                                            $(tag[j]).html(new_team_label[j]);
                                                        }
                                                    }
                                                });



                                            });

                                        }

                                        else {//表示没有改变
                                            var result = {
                                                tid: tid,
                                                name: newName,
                                                logo_path: team_logo,
                                                slogan: newSlogan,
                                                about: team_about,
                                                history: team_history,
                                                b_type: new_team_type
                                            };

                                            $.ajax({
                                                type: 'POST',
                                                data: result,
                                                url: cur_site + "team/update_team_info/",
                                                xhrFields: {withCredentials: true},
                                                dataType: 'json',
                                                success: function (data) {

                                                    console.log(data.msg);
                                                    $("#fix_msg_button").css("opacity", '1');
                                                    $("#remove_basic_msg").empty().append(
                                                        '<div id="team_logo_div"><img src="' +cur_media+ team_logo + '" id="team_logo"></div>' +
                                                        '<div id="information"><p id="p1">' + newName+ '</p><p id="p2">' + new_team_type_name[0] + '</p>' +
                                                        '<p id="p3">' + team_about + '</p> ' +
                                                        '<p id="p4">' + team_member_num + "人团队" + '</p>'+
                                                        '<p id="p5">' + newSlogan + '</p></div>'+
                                                        '<div id="information_three"></div>'
                                                    );
                                                    //动态加载div
                                                    var tag_cnt = new_team_label.length;

                                                    for (var j = 0; j < tag_cnt; j++) {
                                                        $("#information_three").append('<div class="tag"></div>');
                                                    }
                                                    var tag = $(".tag");
                                                    for (var j = 0; j < new_team_label.length; j++) {
                                                        $(tag[j]).html(new_team_label[j]);
                                                    }
                                                    new_team_type.length=0;
                                                    new_team_label.length=0;
                                                }
                                            });

                                        }

                                    });


                                    //取消对基本信息的编辑
                                    $("#cancelButton").on("click", function () {
                                        var length_temp=new_label.length;
                                        if(length_temp!=0){
                                            for (var i = 0; i < new_label.length; i++) {
                                                var result = {
                                                    tid: tid,
                                                    name: new_label[i]
                                                };
                                                $.ajax({
                                                    type: 'POST',
                                                    data: result,
                                                    url: cur_site + "team/rm_team_label/",
                                                    xhrFields: {withCredentials: true},
                                                    dataType: 'json',
                                                    success: function (data) {
                                                        console.log(data);
                                                            $("#fix_msg_button").css("opacity", '1');
                                                            $("#remove_basic_msg").empty().append(
                                                                '<div id="team_logo_div"><img src="' +cur_media+ team_logo + '" id="team_logo"></div>' +
                                                                '<div id="information"><p id="p1">' + team_name+ '</p><p id="p2">' + team_type_name[0] + '</p>' +
                                                                '<p id="p3">' + team_about + '</p> ' +
                                                                '<p id="p4">' + team_member_num + "人团队" + '</p>'+
                                                                '<p id="p5">' + team_slogan + '</p></div>'+
                                                                '<div id="information_three"></div>'
                                                            );
                                                            //动态加载div
                                                            var tag_cnt = old_label.length;
                                                            for (var j = 0; j < tag_cnt; j++) {
                                                                $("#information_three").append('<div class="tag"></div>');
                                                            }
                                                            var tag = $(".tag");
                                                            for (var j = 0; j < old_label.length; j++) {
                                                                $(tag[j]).html(old_label[j]);
                                                            }
                                                    }
                                                });
                                            }
                                        }
                                        else{
                                            $("#fix_msg_button").css("opacity", '1');
                                            $("#remove_basic_msg").empty().append(
                                                '<div id="team_logo_div"><img src="' +cur_media+ team_logo + '" id="team_logo"></div>' +
                                                '<div id="information"><p id="p1">' + team_name+ '</p><p id="p2">' + team_type_name[0] + '</p>' +
                                                '<p id="p3">' + team_about + '</p> ' +
                                                '<p id="p4">' + team_member_num + "人团队" + '</p>'+
                                                '<p id="p5">' + team_slogan + '</p></div>' +
                                                '<div id="information_three"></div>'
                                            );
                                            //动态加载div
                                            var tag_cnt = old_label.length;
                                            for (var i = 0; i < tag_cnt; i++) {
                                                $("#information_three").append('<div class="tag"></div>');
                                            }
                                            var tag = $(".tag");
                                            for (var i = 0; i < old_label.length; i++) {
                                                $(tag[i]).html(old_label[i]);
                                            }
                                        }
                                    });


                                },
                                error: function (data) {
                                    console.log('get team info error');
                                },
                                headers: {
                                    "Access-Control-Allow-Origin": "*"
                                }
                            });

                        },
                        error: function (data) {
                            console.log('get job_type error');
                        },
                        headers: {
                            "Access-Control-Allow-Origin": "*"
                        }

                    });
                }

        });
        
        function editlabel(old_label,new_label,delete_old_label) {
            var label_num;
            //对label进行添加
            $('.chips-initial').on('chip.add', function (e, chip) {//监听只允许添加八个
                label_num=old_label.length+new_label.length-delete_old_label.length;
                new_label.push(chip.tag);//把添加到的新的push,纯数据
                label_num++;
                //Post新增标签的请求
                var result = {
                    tid: tid,
                    name: chip.tag
                };
                $.ajax({
                    type: 'POST',
                    data: result,
                    url: cur_site + "team/add_team_label/",
                    xhrFields: {withCredentials: true},
                    dataType: 'json',
                    success: function (data) {
                        console.log(data.msg);
                        if (label_num == 8) {
                            //console.log($('.chips-initial')[0]);
                            $('.chips-initial .input').remove();
                        }
                    }
                });
            });
            
        }

        function deletelabel(old_label,new_label,delete_old_label){
            var label_num;
            $('.chips-initial').on('chip.delete', function (e, chip) {
                //label_dym_name.splice($.inArray(chip.tag, label_dym_name), 1);//把删除的label从数组中去掉
                label_num=old_label.length+new_label.length-delete_old_label.length;
                label_num--;
                //如果删除的是新增的标签直接删除
                if($.inArray(chip.tag, old_label)==-1){
                    //Post删除标签的请求
                    var result = {
                        tid: tid,
                        name: chip.tag
                    };
                    $.ajax({
                        type: 'POST',
                        data: result,
                        url: cur_site + "team/rm_team_label/",
                        xhrFields: {withCredentials: true},
                        dataType: 'json',
                        success: function (data) {
                            console.log(data.msg);
                            console.log(label_num);
                            new_label.splice($.inArray(chip.tag, new_label), 1);//把删除的label从数组中去掉
                            if (label_num == 7) {//允许继续添加
                                $('.chips-initial').append('<input class="input" placeholder>');
                            }
                        }
                    });
                }
                //如果是旧的标签进行记录
                else{
                    delete_old_label.push(chip.tag);
                    //console.log(delete_old_label);
                }


            });
        }

        function showtype(team_type_name,all_team_type){
            $("#type_line1").empty();
            $("#type_line2").empty();
           if(team_type_name.length<3){
               $("#type_table").css("width",120*(team_type_name.length+2)+'px');
               for(var i=0;i<team_type_name.length;i++){
                   $("#type_line1").append('<td><div class="chip team_type_fix">' + team_type_name[i] +
                   '<i class="close material-icons" id=' + team_type_name[i] + '>close</i> </div></td>');
               }
               $("#type_line1").append('<td><div class="input-field job_type"><select class="browser-default tag_select">'+
                   '<option value="" disabled selected>行业类型</option></select></div></td>');
               $("#type_line1").append('<a class="add_type btn-floating btn-small waves-effect waves white">'+
                   '<i class="material-icons" style="color:orange">add</i></a>');
               for (var i = 0; i < all_team_type.length; i++) {
                   $(".tag_select").append('<option id="option' + i + '" value=' + all_team_type[i].id + '>' + all_team_type[i].name + '</option>');
               }
           }
            else{
               $("#type_table").css("width","400px");
               for(var i=0;i<3;i++){
                   $("#type_line1").append('<td><div class="chip team_type_fix">' + team_type_name[i] +
                       '<i class="close material-icons" id=' + team_type_name[i] + '>close</i> </div></td>');
               }
               for(var i=3;i<team_type_name.length;i++){
                   $("#type_line2").append('<td><div class="chip team_type_fix">' + team_type_name[i] +
                       '<i class="close material-icons" id=' + team_type_name[i] + '>close</i> </div></td>');
                   if(i==4){
                       $("#type_table").css("width","500px");
                   }
               }
               $("#type_line2").append('<td><div class="input-field job_type"><select class="browser-default tag_select">'+
                   '<option value="" disabled selected>行业类型</option></select></div></td>');
               $("#type_line2").append('<a class="add_type btn-floating btn-small waves-effect waves white">'+
                   '<i class="material-icons" style="color:orange">add</i></a>');
               for (var i = 0; i < all_team_type.length; i++) {
                   $(".tag_select").append('<option id="option' + i + '" value=' + all_team_type[i].id + '>' + all_team_type[i].name + '</option>');
               }
           }
        }

        function addType(new_team_type_name,all_team_type){
            var type_num=new_team_type_name.length;
            //对行业类型进行添加操作
            $(".add_type").on("click", function () {
                //获取到在selector中选择的行业类型
                var select_tag = $(".tag_select option:selected").text();
                //-------------判断是否添加-------
                //不能为空,且不能冲突
                if (select_tag != '行业类型' && $.inArray(select_tag, new_team_type_name) < 0 && type_num != 5) {
                    new_team_type_name.push(select_tag);
                    showtype(new_team_type_name,all_team_type);
                    addType(new_team_type_name,all_team_type);
                    deleteType(new_team_type_name,all_team_type)
                }
                else if (type_num == 5)
                    alert("行业类型上限为5!");

            });

        }

        function deleteType(new_team_type_name,all_team_type){
            var type_num=new_team_type_name.length;
            $(".team_type_fix .close").on('click',function(){
                new_team_type_name.splice($.inArray(this.id, new_team_type_name), 1);//从数组中删除特定元素
                type_num--;//行业类型的数目减1
                showtype(new_team_type_name,all_team_type);
                addType(new_team_type_name,all_team_type);
                deleteType(new_team_type_name,all_team_type)
            });

        }


    });

    
    //团队照片的编辑
    $(".edit_team_photo").on("click", function () {
        $.ajax({
            type: 'GET',
            url: cur_site + "team/info/",
            // url: "../data/team_index.json",
            dataType: "json",
            data: {'tid': tid},
            success: function (data) {
                var team_img = data.res.imgs;//初始化团队照片
                var cancel_display=[];
                for(var i=0;i<team_img.length;i++){
                    old_photo_remainder.push(team_img[i]);
                    cancel_display.push(team_img[i]);
                }
                var photo_num = team_img.length;//记录照片的数目
                $.ajax({
                    type: "get",
                    url: "add_team_photo.html",
                    dataType: "html",
                    success: function (result) {
                        //初始化团队照片编辑页面
                        $("#edit_photo_area").html(result);
                        append_photo_add(photo_num,team_img);//设计布局
                        listentomousemove();//设置监听
                        listentodelete(team_img);//监听删除

                        $("#save_photo_edit").on('click',function(){//保存改变
                            var record_length=old_delete.length;
                            if(old_delete.length!=0) {//没有删除旧的照片
                                for (var i = 0; i < old_delete.length; i++) {
                                    var result = {'tid': tid, 'img_id': old_delete[i]};
                                    $.ajax({
                                        type: "post",
                                        url: cur_site + "team/rm_team_photo/",
                                        dataType: "json",
                                        xhrFields: {withCredentials: true},
                                        data: result,
                                        success: function (res) {
                                            if (i == record_length) {
                                                $.ajax({
                                                    type: 'GET',
                                                    url: cur_site + "team/info/",
                                                    // url: "../data/team_index.json",
                                                    dataType: "json",
                                                    data: {'tid': tid},
                                                    success: function (data) {
                                                        var new_team_img = data.res.imgs;//初始化团队照片
                                                        //console.log(new_team_img.length);
                                                        $("#edit_photo_area").empty().append('<div class="slider"><ul class="slides"> </ul>');
                                                        // 团队图片动态加载
                                                        for (var i = 0; i < new_team_img.length; i++) {
                                                            $(".slides").append('<li><img src="' + cur_media + new_team_img[i].path + '" class="piture "></li>')
                                                        }
                                                        // 开启slider
                                                        $('.slider').slider({
                                                            full_width: true,
                                                            height: 250
                                                        });
                                                    }
                                                });
                                            }

                                        }
                                    });
                                }
                            }
                            else{
                                $.ajax({
                                    type: 'GET',
                                    url: cur_site + "team/info/",
                                    // url: "../data/team_index.json",
                                    dataType: "json",
                                    data: {'tid': tid},
                                    success: function (data) {
                                        var new_team_img = data.res.imgs;//初始化团队照片
                                        console.log(new_team_img.length);
                                        $("#edit_photo_area").empty().append('<div class="slider"><ul class="slides"> </ul>');
                                        // 团队图片动态加载
                                        for (var i = 0; i < new_team_img.length; i++) {
                                            $(".slides").append('<li><img src="' + cur_media + new_team_img[i].path + '" class="piture "></li>')
                                        }
                                        // 开启slider
                                        $('.slider').slider({
                                            full_width: true,
                                            height: 250
                                        });
                                    }
                                });
                            }
                            old_delete.length = 0;//清除
                            cancel_display.length=0;//清除
                            new_increase_photo.length=0;//清除
                        });

                        //监听取消事件
                        $("#cancel_photo_edit").on('click',function(){
                            //删除新上传的照片
                            //console.log(new_increase_photo);
                            if(new_increase_photo.length!=0) {//有新上传的照片
                                for (var i = 0; i < new_increase_photo.length; i++) {
                                    var result = {'tid': tid, 'img_id': new_increase_photo[i].id};
                                    $.ajax({
                                        type: "post",
                                        url: cur_site + "team/rm_team_photo/",
                                        dataType: "json",
                                        xhrFields: {withCredentials: true},
                                        data: result,
                                        success: function (res) {
                                            console.log(res);
                                            $("#edit_photo_area").empty().append('<div class="slider"><ul class="slides"> </ul>');
                                            // 团队图片动态加载
                                            for (var i = 0; i < cancel_display.length; i++) {
                                                $(".slides").append('<li><img src="' + cur_media + cancel_display[i].path + '" class="piture "></li>')
                                            }
                                            // 开启slider
                                            $('.slider').slider({
                                                full_width: true,
                                                height: 250
                                            });
                                        }
                                    });
                                }
                            }
                            else{
                                $("#edit_photo_area").empty().append('<div class="slider"><ul class="slides"> </ul>');
                                // 团队图片动态加载
                                for (var i = 0; i < cancel_display.length; i++) {
                                    $(".slides").append('<li><img src="' + cur_media + cancel_display[i].path + '" class="piture "></li>')
                                }
                                // 开启slider
                                $('.slider').slider({
                                    full_width: true,
                                    height: 250
                                });
                            }
                            old_delete.length = 0;//清除
                            cancel_display.length=0;//清除
                            new_increase_photo.length=0;//清除

                        });

                    }
                });
            }
        });
    });

    function append_photo_add(photo_num,team_img){
        //调整table的高度
        $("#team_photo_table").css('height',parseInt(photo_num/3+1)*160+'px');
        for(var i=0;i<parseInt(photo_num/3)+1;i++){
            $("#team_photo_table").append('<tr id="line'+i+'"></tr>');
            for(var j=0;j<3;j++)
                $("#line"+i).append('<td id="row'+(i*3+j)+'"></td>');
        }
        for(var i=0;i<photo_num/3;i++) {
            if (i < parseInt(photo_num / 3)) {
                for (var j = 0; j < 3; j++) {
                    $("#row" + (i*3+j)).append('<div class="team_photo_div"><i class="material-icons delete_team_photo">close</i>'+
                        '<img src="' + cur_media + team_img[i * 3 + j].path + '" class="team_photo " id="'+team_img[i*3+j].id+'"></div>')
                }
            }
            else {
                for (var j = 0; j < photo_num % 3; j++) {
                    $("#row" + (i*3+j)).append('<div class="team_photo_div"><i class="material-icons delete_team_photo">close</i>'+
                        '<img src="' + cur_media + team_img[i * 3 + j].path + '" class="team_photo " id="'+team_img[i*3+j].id+'"></div>')
                }
            }
        }
        $("#row" + photo_num).append('<div class="put_team_photo_here" onclick="F_Open_team_img()">'+
            '<i class="material-icons" id="team_photo_adding">add</i>'+
            '<form id="post_team_photo"  enctype="multipart/form-data">'+
            '<input type="file" name="photo" id="update_team_photo" style="display: none" onchange="show_team_local_img(this)">'+
            '<button id="upload_team_photo" type="button" style="display: none"></button></form>'+
            '<p style="margin-left: 25px;color:#fff;margin-top:-10px;">(图片上限为8)</p></div>');

    }

    function listentomousemove(){
        //监听鼠标的移入事件
        $(".team_photo_div .team_photo").on("mouseover", function () {
            $(this).css("opacity", "0.3");
            $(this).parent().children('.delete_team_photo').css("visibility", "visible");
        }).on("mouseout", function () {//监听鼠标的移出事件
            $(this).css("opacity", "1");
            $(this).parent().children('.delete_team_photo').css("visibility", "hidden");
        });
    }


    function listentodelete(team_img){
        //监听点击删除事件
        $("#team_photo_table .team_photo").on("click", function () {
            $(document).ready(function(){
                $('.modal-trigger').leanModal();
            });
            var delete_id = parseInt($(this).attr("id"));
            var new_team_img=[];
            $('#confirm_delete').openModal();
            $("#yes").unbind('click').on('click',function(){
                old_delete.push(delete_id);
                //console.log(old_delete);
                for(var i=0;i<team_img.length;i++){
                    if(team_img[i].id!=delete_id){
                        new_team_img.push(team_img[i]);
                    }
                }
                team_img.length=0;
                for(var i=0;i<new_team_img.length;i++){
                    team_img.push(new_team_img[i]);
                }
                for(var i=0;i<new_increase_photo.length;i++){
                    team_img.push(new_increase_photo[i]);
                }
                new_team_img.length=0;
                old_photo_remainder=team_img;
                //console.log(new_increase_photo);
                $("#team_photo_table").empty();
                $("#confirm_delete").closeModal();
                //console.log(new_team_img);
                console.log(team_img);
                append_photo_add(team_img.length,team_img);
                listentomousemove();
                listentodelete(team_img);
            });
        });
    }


    //团队成员编辑
    $("#edit_member").on('click',function() {
        $.ajax({
            type: 'GET',
            url: cur_site + "team/info/",
            // url: "../data/team_index.json",
            dataType: "json",
            data: {'tid': tid},
            success: function (data) {
                console.log(data);
                var team_member = data.res.stus;
                var edit_team_member = [];
                for(var i=0;i<team_member.length;i++){
                    edit_team_member.push(team_member[i]);
                }
                var member_cnt = team_member.length;
                $("#team_member_icon").empty().append(/*'<div class="leader_div"><img src="' + cur_media + team_member[0].logo_path + '" alt="头像" id ="leader" class="leader" />' +
                    '<br>创始人<br><span id="leaderName" class="name">' + team_member[0].name + '</span></div>' +*/
                    '<table id="team_member_table"></table>');
                $("#complete_edit_member").css("opacity", "1.0");//显示保存取消按钮
                show_team_member(team_member, member_cnt);//显示团队成员为编辑态
                member_moveon();//监听鼠标的移入移出事件
                add_member(edit_team_member);//监听增加团队成员
                delete_member(edit_team_member);//监听删除成员
                $("#member_cancelButton").on("click",function(){//取消对成员的编辑,全部删除,重新post
                    var length_temp=edit_team_member.length;
                    var cnt=0;
                    for(var i=0;i<edit_team_member.length;i++){
                        var result={"tid":tid,"sid":edit_team_member[i].id};
                        $.ajax({
                            type: 'POST',
                            url: cur_site + "team/rm_team_stu/",
                            dataType: "json",
                            data: result,
                            success: function (data) {
                                //console.log(data);
                                cnt++;
                                if(cnt==length_temp){
                                    for(var j=0;j<team_member.length;j++) {
                                        var update = {"tid": tid, "sid": team_member[j].id};
                                        $.ajax({
                                            type: 'POST',
                                            url: cur_site + "team/add_team_stu/",
                                            dataType: "json",
                                            data: update,
                                            success: function (data) {
                                                //console.log(data);
                                                edit_team_member.length=0;
                                                team_member.length=0;
                                            }
                                        });
                                    }
                                }
                            }
                        });
                    }
                    $("#team_member_icon").empty();
                    $("#complete_edit_member").css("opacity","0");
                    $("#team_member_icon").append('<table id="team_member_table"></table>');
                    var line=parseInt(team_member.length/3)+1;//如果一行加三个成员,得到行数
                    for(var i=1;i<=line;i++){
                        $("#team_member_table").append('<tr id="line'+i+'"></tr>');
                        if(i!=line){
                            for(var j=0;j<3;j++){
                                $("#line"+i).append('<div class="Head_portrait_div "><div class="team_member_logo">'+
                                    '<img id="'+team_member[(i-1)*3+j].id+'" src="'+cur_media+team_member[(i-1)*3+j].logo_path+'" alt="头像" class="Head_portrait" /></div>'
                                    +'<span class="name">'+dealName(team_member[(i-1)*3+j].name)+'</span></div>')
                            }
                        }
                        else{
                            for(var j=0;j<edit_team_member.length%3;j++){
                                $("#line"+i).append('<div class="Head_portrait_div "><div class="team_member_logo">'+
                                    '<img id="'+team_member[(i-1)*3+j].id+'" src="'+cur_media+team_member[(i-1)*3+j].logo_path+'" alt="头像" class="Head_portrait" /></div>'
                                    +'<span class="name">'+dealName(team_member[(i-1)*3+j].name)+'</span></div>')
                            }
                        }
                    }


                });

                $("#member_saveButton").on("click",function(){//不需要做任何操作直接返回显示
                    $("#team_member_icon").empty();
                    $("#complete_edit_member").css("opacity","0");
                    $("#team_member_icon").append('<table id="team_member_table"></table>');
                    var line=parseInt(edit_team_member.length/3)+1;//如果一行加三个成员,得到行数
                    for(var i=1;i<=line;i++){
                        $("#team_member_table").append('<tr id="line'+i+'"></tr>');
                        if(i!=line){
                            for(var j=0;j<3;j++){
                                $("#line"+i).append('<div class="Head_portrait_div "><div class="team_member_logo">'+
                                    '<img id="'+edit_team_member[(i-1)*3+j].id+'" src="'+cur_media+edit_team_member[(i-1)*3+j].logo_path+'" alt="头像" class="Head_portrait" /></div>'
                                    +'<span class="name">'+dealName(edit_team_member[(i-1)*3+j].name)+'</span></div>')
                            }
                        }
                        else{
                            for(var j=0;j<edit_team_member.length%3;j++){
                                $("#line"+i).append('<div class="Head_portrait_div "><div class="team_member_logo">'+
                                    '<img id="'+edit_team_member[(i-1)*3+j].id+'" src="'+cur_media+edit_team_member[(i-1)*3+j].logo_path+'" alt="头像" class="Head_portrait" /></div>'
                                    +'<span class="name">'+dealName(edit_team_member[(i-1)*3+j].name)+'</span></div>')
                            }
                        }
                    }
                    edit_team_member.length=0;
                    team_member.length=0;

                });

            }
        });
    });

    function dealName(name){//对邮箱中间添加*省略
        var new_name;
        if(name.split('@')[1]!=null){
            new_name=name.split('@')[0][0]+name.split('@')[0][1]+'*@'+name.split('@')[1];
        }
        else{
            new_name=name;
        }
        return new_name;
    }

    function show_team_member(team_member,member_cnt){
        $("#team_member_table").empty();
        var line=parseInt(member_cnt/3)+1;//如果一行加三个成员,得到行数
        for(var i=1;i<=line;i++){
            $("#team_member_table").append('<tr id="line'+i+'"></tr>');
            if(i!=line){
                for(var j=0;j<3;j++){
                    $("#line"+i).append('<div class="Head_portrait_div_edit "><div class="team_member_logo"><i class="material-icons delete_team_member">close</i>'+
                        '<img id="'+team_member[(i-1)*3+j].id+'" src="'+cur_media+team_member[(i-1)*3+j].logo_path+'" alt="头像" class="Head_portrait_edit" /></div>'
                        +'<span class="name">'+dealName(team_member[(i-1)*3+j].name)+'</span></div>')
                }
            }
            else{
                for(var j=0;j<member_cnt%3;j++){
                    $("#line"+i).append('<div class="Head_portrait_div_edit "><div class="team_member_logo"><i class="material-icons delete_team_member">close</i>'+
                        '<img id="'+team_member[(i-1)*3+j].id+'" src="'+cur_media+team_member[(i-1)*3+j].logo_path+'" alt="头像" class="Head_portrait_edit" /></div>'
                        +'<span class="name">'+dealName(team_member[(i-1)*3+j].name)+'</span></div>')
                }
                $("#line"+i).append('<a class="btn-floating add_member_btn waves-effect waves orange">'
                    +'<i class="material-icons" style="color:#fff">add</i></a>');
            }
        }
    }

    function member_moveon(){
        //监听鼠标的移入事件
        $(".team_member_logo .Head_portrait_edit").on("mouseover", function () {
            $(this).css("opacity", "0.3");
            $(this).parent().children('.delete_team_member').css("visibility", "visible");
        }).on("mouseout", function () {//监听鼠标的移出事件
            $(this).css("opacity", "1");
            $(this).parent().children('.delete_team_member').css("visibility", "hidden");
        });
    }

    function add_member(edit_team_member){
        $(document).ready(function(){
            // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
            $('.modal-trigger').leanModal();
        });
        $(".add_member_btn").unbind("click").on('click',function(){
            $('#add_member_dialog').openModal();
        });
        $("#add_member_action").unbind("click").on('click',function(){//点击弹出框的功能键
            var funBtn=$("#add_member_action").text();
            if(funBtn=="搜索"){
                var search_name=$("#member_name").val();
                if(search_name=="")
                    Materialize.toast("输入要搜索的姓名",2000);
                $.ajax({
                    type: 'GET',
                    url: cur_site + "team/name2mail",
                    dataType: "json",
                    data: {'name': search_name},
                    success: function (data) {
                        //console.log(data);
                        var result_cnt=data.res.length;
                        var search_result=data.res;
                        if(result_cnt!=0) {
                            $(".search_member_mail").show();
                            for (var i = 0; i < result_cnt; i++) {
                                $("#member_mail").append('<option value="' + search_result[i].sid + '">' + search_result[i].mail + '</option>');
                            }

                            var search_result_sid=search_result[0].sid;

                            $.ajax({
                                type: 'post',
                                url: cur_site + "student/info/get/",
                                dataType: "json",
                                data: {'id': search_result_sid},
                                success: function (data) {
                                    //console.log(data);
                                    $(".search_member_logo").show().attr("src", cur_media+data.avatar_path).attr("id",search_result_sid);
                                    $("#add_member_action").empty().html("添加");
                                }
                            });
                        }
                        else{
                            $("#remainder_msg").show();
                            $("#invite_msg").show();
                            $("#new_member_mail_div").show();
                            $("#add_member_action").html("邀请");
                        }
                    }
                });
                
            }
            else if(funBtn=="添加"){
                var add_id=$(".search_member_logo").attr("id");
                var add_logo=$(".search_member_logo").attr("src").replace(cur_media,"");
                for(var i=0;i<edit_team_member.length;i++){
                    if(edit_team_member[i].id==add_id){
                        Materialize.toast("该成员已存在",2000);
                        return;
                    }
                }
                var result={
                    "tid":tid,
                    "sid":add_id
                };
                edit_team_member.push({
                    "name":$("#member_name").val(),
                    "logo_path":add_logo,
                    "id":add_id
                });
                $.ajax({
                    type: 'POST',
                    url: cur_site + "team/add_team_stu/",
                    dataType: "json",
                    data: result,
                    success: function (data) {
                        $('#add_member_dialog').closeModal();
                        $("#member_mail").empty();
                        $(".search_member_mail").css("display","none");
                        $(".search_member_logo").css("display","none");
                        $("#remainder_msg").css("display","none");
                        $("#invite_msg").css("display","none");
                        $("#new_member_mail_div").css("display","none");
                        $("#member_name").val("");
                        $("#add_member_action").html("搜索");
                        show_team_member(edit_team_member,edit_team_member.length);
                        member_moveon();
                        add_member(edit_team_member);
                        delete_member(edit_team_member);

                    }
                });

            }

            else if(funBtn=="邀请"){
                var invite_mail=$("#new_member_mail").val();
                if(invite_mail=="") {
                    Materialize.toast("邮箱不能为空", 2000);
                }
                else{
                    var res={"tid":tid,mail:invite_mail};
                    $.ajax({
                        type: 'POST',
                        url: cur_site + "team/invite_stu/",
                        dataType: "json",
                        data: res,
                        success: function (data) {
                            console.log(data);
                            if(data.err=='-3') {
                                Materialize.toast("帐号已存在", 2000);
                            }
                            else{
                                edit_team_member.push({
                                    "name":invite_mail,
                                    "logo_path":"student/avatar/default.jpg",
                                    "id":data.msg
                                });
                                $('#add_member_dialog').closeModal();
                                $("#member_mail").empty();
                                $(".search_member_mail").css("display","none");
                                $(".search_member_logo").css("display","none");
                                $("#remainder_msg").css("display","none");
                                $("#invite_msg").css("display","none");
                                $("#new_member_mail_div").css("display","none");
                                $("#member_name").val("");
                                $("#new_member_mail").val("");
                                $("#add_member_action").html("搜索");
                                show_team_member(edit_team_member,edit_team_member.length);
                                member_moveon();
                                add_member(edit_team_member);
                                delete_member(edit_team_member);
                            }

                        }
                    });
                }


            }

        });

        $(".close_dialog").on("click",function(){
            $('#add_member_dialog').closeModal();
            $("#member_mail").empty();
            $(".search_member_mail").css("display","none");
            $(".search_member_logo").css("display","none");
            $("#remainder_msg").css("display","none");
            $("#invite_msg").css("display","none");
            $("#new_member_mail_div").css("display","none");
            $("#member_name").val("");
            $("#new_member_mail").val("");
            $("#add_member_action").html("搜索");
        });

    }

    function  delete_member(edit_team_member) {
        var team_member_temp=[];
        $(".team_member_logo").on("click",function(){
            var delete_sid=$(this).children("img").attr("id");
            $("#confirm_delete_member").openModal();
            $("#certain_delete_member").unbind('click').on('click',function(){
                $("#confirm_delete_member").closeModal();
                var result={
                    "tid":tid,
                    "sid":delete_sid
                };
                $.ajax({
                    type: 'POST',
                    url: cur_site + "team/rm_team_stu/",
                    dataType: "json",
                    data: result,
                    success: function (data) {
                        for(var i=0;i<edit_team_member.length;i++){
                            if(edit_team_member[i].id!=delete_sid) {
                                team_member_temp.push(edit_team_member[i]);
                            }
                        }
                        edit_team_member.length=0;
                        for(var j=0;j<team_member_temp.length;j++)
                            edit_team_member.push(team_member_temp[j]);
                        team_member_temp.length=0;
                        $('#add_member_dialog').closeModal();
                        $("#member_mail").empty();
                        $(".search_member_mail").css("display","none");
                        $(".search_member_logo").css("display","none");
                        $("#remainder_msg").css("display","none");
                        $("#invite_msg").css("display","none");
                        $("#new_member_mail_div").css("display","none");
                        $("#member_name").val("");
                        $("#new_member_mail").val("");
                        $("#add_member_action").html("搜索");
                        show_team_member(edit_team_member,edit_team_member.length);
                        member_moveon();
                        add_member(edit_team_member);
                        delete_member(edit_team_member);
                    }
                });
            });

        });
    }

});

var tid=getId();
var tag_logo_change=0;//记录团队logo是否上传
//基本信息的编辑
function F_Open_img() {
    document.getElementById("update_photo").click();

}

function show_local_img(file) {//预览图片
    tag_logo_change=1;
    var img = document.getElementById("local_photo");
    var reader = new FileReader();
    reader.onload = function (evt) {
        img.src = evt.target.result;
    };
    reader.readAsDataURL(file.files[0]);
}

function F_Open_team_img() {
    var team_photo_num = $(".team_photo").length;
    if (team_photo_num == 8) {
        alert('团队照片的上限为8!');
        return;
    }
    document.getElementById("update_team_photo").click();

}

var new_increase_photo=[];//新增的照片,在取消的时候需要删除
var old_photo_remainder=[];//记录最初的旧照片
var old_delete=[];//记录删除的旧照片

function show_team_local_img(file) {//预览图片,添加团队照片

    document.getElementById("upload_team_photo").click();
    var reader = new FileReader();
    var team_photo_num=team_photo_num = $(".team_photo_div").length;
    //console.log(team_photo_num);
    reader.onload = function (evt) {
        //新增团队照片
        var formData = new FormData();
        formData.append('tid', tid);
        formData.append('photo', $('#update_team_photo')[0].files[0]);

        $.ajax({
            type: 'POST',
            data: formData,
            cache:false,
            url: cur_site + "team/add_team_photo/",
            processData: false,
            contentType: false,
            dataType: 'json'
        }).done(function(res){
            console.log(res.msg);
            var team_photo_num=$(".team_photo").length+1;//得到现在的照片数目
            if(team_photo_num%3==0){
                $("#team_photo_table").append('<tr id="line'+team_photo_num/3+'"></tr>');
                for(var j=0;j<3;j++)
                    $("#line"+team_photo_num/3).append('<td id="row'+(team_photo_num+j)+'"></td>');
            }
            $("#team_photo_table").css('height',parseInt(team_photo_num/3+1)*160+'px');
            var current_photo_row=$(".put_team_photo_here").parent().attr('id');
            $(".put_team_photo_here").parent().empty();

            $('#'+current_photo_row).append('<div class="team_photo_div"><i class="material-icons delete_team_photo">close</i>'+
                '<img src="' + evt.target.result + '" class="team_photo " id="'+res.msg+'"></div>');

            $("#row" + team_photo_num).append('<div class="put_team_photo_here" onclick="F_Open_team_img()">'+
                '<i class="material-icons" id="team_photo_adding">add</i>'+
                '<form id="post_team_photo"  enctype="multipart/form-data">'+
                '<input type="file" name="photo" id="update_team_photo" style="display: none" onchange="show_team_local_img(this)">'+
                '<button id="upload_team_photo" type="button" style="display: none"></button></form>'+
                '<p style="margin-left: 25px;color:#fff;margin-top:-10px;">(图片上限为8)</p></div>');

            var temp_photo_path;
            $.ajax({
                type: 'GET',
                url: cur_site + "team/info/",
                // url: "../data/team_index.json",
                dataType: "json",
                data: {'tid': tid},
                success: function (data) {
                    //var team_img=data.res.imgs;
                    for(var i=0;i<data.res.imgs.length;i++){
                        if(data.res.imgs[i].id==res.msg) {
                            temp_photo_path = data.res.imgs[i].path;
                            var temp_photo_object = {'id': res.msg, 'path': temp_photo_path};
                            new_increase_photo.push(temp_photo_object);
                        }
                    }
                }
            });

            //监听点击删除事件
            $("#"+res.msg).on("click", function () {
                //console.log(old_photo_remainder);
                //console.log(old_delete);
                var delete_id = ($(this).attr("id"));

                //console.log(new_increase_photo);
                var new_photo_temp=[];
                $(document).ready(function(){
                    $('.modal-trigger').leanModal();
                });
                $('#confirm_delete').openModal();
                $("#yes").unbind('click').on('click',function() {
                    for(var j=0;j<new_increase_photo.length;j++){
                        if(new_increase_photo[j].id!=delete_id)
                            new_photo_temp.push(new_increase_photo[j]);
                    }
                    new_increase_photo.length=0;
                    for(var i=0;i<new_photo_temp.length;i++){
                        new_increase_photo.push(new_photo_temp[i]);
                    }
                    new_photo_temp.length=0;
                    /*for(var i=0;i<old_photo_remainder.length;i++){
                        if(old_photo_remainder[i].id!=delete_id){
                            new_photo_temp.push(old_photo_remainder[i]);
                        }
                        else{
                            tag=1;
                        }
                    }
                    old_photo_remainder.length=0;
                    for(var i=0;i<new_photo_temp.length;i++){
                        old_photo_remainder.push(new_photo_temp[i]);
                    }
                    new_photo_temp.length=0;*/

                    //console.log(new_increase_photo);

                    var result = {'tid': tid, 'img_id': delete_id};
                    $.ajax({
                        type: "post",
                        url: cur_site + "team/rm_team_photo/",
                        dataType: "json",
                        xhrFields: {withCredentials: true},
                        data: result,
                        success: function (res) {
                            console.log(res);
                            $.ajax({
                                type: 'GET',
                                url: cur_site + "team/info/",
                                // url: "../data/team_index.json",
                                dataType: "json",
                                data: {'tid': tid},
                                success: function (data) {
                                    var team_img = data.res.imgs;
                                    for(var i=0;i<team_img.length;i++){
                                        var tag=0;
                                        for(var j=0;j<old_delete.length;j++){
                                            if(old_delete[j]==team_img[i].id)
                                                tag=1;
                                        }
                                        if(tag==0)
                                            new_photo_temp.push(team_img[i]);
                                    }
                                    team_img.length=0;
                                    for(var i=0;i<new_photo_temp.length;i++){
                                        team_img.push(new_photo_temp[i]);
                                    }
                                    new_photo_temp.length=0;
                                    $("#team_photo_table").empty();
                                    $("#confirm_delete").closeModal();
                                    append_photo_add(team_img.length, team_img);
                                    listentomousemove();
                                    listentodelete(new_increase_photo,old_photo_remainder);
                                }
                            });
                        }
                    });

                });
            });


            //监听鼠标的移入事件
            $("#"+res.msg).on("mouseover", function () {
                $(this).css("opacity", "0.3");
                $(this).parent().children('.delete_team_photo').css("visibility", "visible");
            });
            //监听鼠标的移出事件
            $("#"+res.msg).on("mouseout", function () {
                $(this).css("opacity", "1");
                $(this).parent().children('.delete_team_photo').css("visibility", "hidden");
            });



        })

    };
    reader.readAsDataURL(file.files[0]);
    function append_photo_add(photo_num,team_img){
        //调整table的高度
        $("#team_photo_table").css('height',parseInt(photo_num/3+1)*160+'px');
        for(var i=0;i<parseInt(photo_num/3)+1;i++){
            $("#team_photo_table").append('<tr id="line'+i+'"></tr>');
            for(var j=0;j<3;j++)
                $("#line"+i).append('<td id="row'+(i*3+j)+'"></td>');
        }
        for(var i=0;i<photo_num/3;i++) {
            if (i < parseInt(photo_num / 3)) {
                for (var j = 0; j < 3; j++) {
                    $("#row" + (i*3+j)).append('<div class="team_photo_div"><i class="material-icons delete_team_photo">close</i>'+
                        '<img src="' + cur_media + team_img[i * 3 + j].path + '" class="team_photo " id="'+team_img[i*3+j].id+'"></div>')
                }
            }
            else {
                for (var j = 0; j < photo_num % 3; j++) {
                    $("#row" + (i*3+j)).append('<div class="team_photo_div"><i class="material-icons delete_team_photo">close</i>'+
                        '<img src="' + cur_media + team_img[i * 3 + j].path + '" class="team_photo " id="'+team_img[i*3+j].id+'"></div>')
                }
            }
        }
        $("#row" + photo_num).append('<div class="put_team_photo_here" onclick="F_Open_team_img()">'+
            '<i class="material-icons" id="team_photo_adding">add</i>'+
            '<form id="post_team_photo"  enctype="multipart/form-data">'+
            '<input type="file" name="photo" id="update_team_photo" style="display: none" onchange="show_team_local_img(this)">'+
            '<button id="upload_team_photo" type="button" style="display: none"></button></form>'+
            '<p style="margin-left: 25px;color:#fff;margin-top:-10px;">(图片上限为8)</p></div>');

    }

    function listentomousemove(){
        //监听鼠标的移入事件
        $(".team_photo_div .team_photo").on("mouseover", function () {
            $(this).css("opacity", "0.3");
            $(this).parent().children('.delete_team_photo').css("visibility", "visible");
        });
        //监听鼠标的移出事件
        $(".team_photo_div .team_photo").on("mouseout", function () {
            $(this).css("opacity", "1");
            $(this).parent().children('.delete_team_photo').css("visibility", "hidden");
        });
    }

    function listentodelete(new_increase_photo,old_photo_remainder){
        //监听点击删除事件
        $(".team_photo_div .team_photo").on("click", function () {
            //console.log(old_photo_remainder);
            //console.log(old_delete);
            var delete_id = ($(this).attr("id"));
            var tag=0;
            //console.log(new_increase_photo);
            var new_photo_temp=[];
            $(document).ready(function(){
                $('.modal-trigger').leanModal();
            });
            $('#confirm_delete').openModal();
            $("#yes").unbind('click').on('click',function() {
                for(var j=0;j<new_increase_photo.length;j++){
                    if(new_increase_photo[j].id!=delete_id)
                        new_photo_temp.push(new_increase_photo[j]);
                }
                new_increase_photo.length=0;
                for(var i=0;i<new_photo_temp.length;i++){
                    new_increase_photo.push(new_photo_temp[i]);
                }
                new_photo_temp.length=0;
                for(var i=0;i<old_photo_remainder.length;i++){
                    if(old_photo_remainder[i].id!=delete_id){
                        new_photo_temp.push(old_photo_remainder[i]);
                    }
                    else{
                        tag=1;
                    }
                }
                old_photo_remainder.length=0;
                for(var i=0;i<new_photo_temp.length;i++){
                    old_photo_remainder.push(new_photo_temp[i]);
                }
                new_photo_temp.length=0;

                //console.log(new_increase_photo);
                if(tag==0){
                    var result = {'tid': tid, 'img_id': delete_id};
                    $.ajax({
                        type: "post",
                        url: cur_site + "team/rm_team_photo/",
                        dataType: "json",
                        xhrFields: {withCredentials: true},
                        data: result,
                        success: function (res) {
                            console.log(res);
                            $.ajax({
                                type: 'GET',
                                url: cur_site + "team/info/",
                                // url: "../data/team_index.json",
                                dataType: "json",
                                data: {'tid': tid},
                                success: function (data) {
                                    var team_img = data.res.imgs;
                                    for(var i=0;i<team_img.length;i++){
                                        var tag=0;
                                        for(var j=0;j<old_delete.length;j++){
                                            if(old_delete[j]==team_img[i].id)
                                                tag=1;
                                        }
                                        if(tag==0)
                                            new_photo_temp.push(team_img[i]);
                                    }
                                    team_img.length=0;
                                    for(var i=0;i<new_photo_temp.length;i++){
                                        team_img.push(new_photo_temp[i]);
                                    }
                                    new_photo_temp.length=0;
                                    $("#team_photo_table").empty();
                                    $("#confirm_delete").closeModal();
                                    append_photo_add(team_img.length, team_img);
                                    listentomousemove();
                                    listentodelete(new_increase_photo,old_photo_remainder);
                                }
                            });
                        }
                    });
                }
                else{
                    var new_team_img=[];
                    old_delete.push(delete_id);
                    $.ajax({
                        type: 'GET',
                        url: cur_site + "team/info/",
                        // url: "../data/team_index.json",
                        dataType: "json",
                        data: {'tid': tid},
                        success: function (data) {
                            var team_img = data.res.imgs;
                            //console.log(team_img);
                            for(var i=0;i<team_img.length;i++){
                                var tp=0;
                                for(var j=0;j<old_delete.length;j++){
                                    if(team_img[i].id==old_delete[j]){
                                        tp=1;
                                        break;
                                    }

                                }
                                if(tp==0){
                                    new_team_img.push(team_img[i]);
                                }
                            }
                            team_img.length=0;
                            for(var i=0;i<new_team_img.length;i++){
                                team_img.push(new_team_img[i]);
                            }
                            new_team_img.length=0;
                            console.log(team_img);
                            /*for(var i=0;i<team_img.length;i++){
                                if(team_img[i].id!=delete_id){
                                    new_team_img.push(team_img[i]);
                                }
                            }
                            team_img.length=0;
                            for(var i=0;i<new_team_img.length;i++){
                                team_img.push(new_team_img[i]);
                            }
                            new_team_img.length=0;*/
                            //console.log(new_increase_photo);
                            $("#team_photo_table").empty();
                            $("#confirm_delete").closeModal();
                            //console.log(new_team_img);
                            append_photo_add(team_img.length,team_img);
                            listentomousemove();
                            listentodelete(new_increase_photo,old_photo_remainder);
                        }
                    });
                }
            });
        });
    }
}




