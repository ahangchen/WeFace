$(function () {

    var oldIntro, oldHistory, team_tel, team_mail, oldTid, oldName, oldLogoPath, oldSlogan, oldAbout, oldBType, oldLabel;

    //修改团队介绍
    $("#fix_team_intro").on("click", function () {
        //获取旧的团队介绍
        $.getJSON(cur_site + "team/info?tid=1"/*"../data/team_index.json"*/, function (data) {
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
        });
    });

    //团队发展历史的编辑
    $("#history_button").on("click", function () {
        //获取旧的团队历史
        $.getJSON(cur_site + "team/info?tid=1", function (data) {
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
        });
    });

    //修改团队的联系方式
    $("#team_connect").on("click", function () {
        //获取旧的团队联系方式
        $.getJSON(cur_site + "team/info?tid=1", function (data) {
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
        })
    });


    //对团队的基本信息进行修改
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
                var b_type_id = [];
                var b_type_name = [];
                //请求团队的职业类型
                $.getJSON(cur_site + "team/business/", function (data) {
                    if (data.err == 0) {
                        for (var i = 0; i < data.msg.length; i++) {
                            $(".tag_select").append('<option id="option' + i + '"value=' + data.msg[i].id + '>' + data.msg[i].name + '</option>');
                            b_type_id.push(data.msg[i].id);
                            b_type_name.push(data.msg[i].name);
                        }
                    }
                    else
                        console.log(data.err);
                });


                //option的value是id,后面查找的时候根据这个就行了
                var tag_type_num;
                $.ajax({
                    type: 'GET',
                    url: cur_site + "team/info/",
                    // url: "../data/team_index.json",
                    dataType: "json",
                    data: {'tid': 1/*tid*/},
                    success: function (data) {
                        //得到有多少个行业类型
                        tag_type_num = $(".tag_select option").length - 1;

                        //先只得到一个行业类型
                        for (var i = 0; i < tag_type_num; i++) {
                            if (data.res.b_type + 1 == $("#option" + i).attr("value"))
                                oldBType = [$("#option" + i).text()];
                        }

                        //记录之前所有的值
                        oldHistory = data.res.history;
                        oldIntro = data.res.about;
                        oldTid = data.res.tid;
                        oldName = data.res.name;
                        oldLogoPath = cur_media + data.res.logo_path;
                        oldSlogan = data.res.slogan;
                        oldAbout = data.res.about;
                        oldLabel = data.res.label;
                        var type_num = oldBType.length;//记录标签的个数
                        var type_dym_name = oldBType;//动态记录标签的名字,删除,添加
                        var move_distance = 0;//记录下拉框的移动距离
                        var label_num = oldLabel.length;//记录label的个数
                        var label_dym_name = oldLabel;//动态记录label的名字,删除,添加
                        var newLogo = cur_media + oldLogoPath;//新的logo
                        var newSlogan = oldSlogan;//新的slogan
                        var newName = oldName;//新的名字
                        //-----------初始化之前的信息------------
                        //初始化团队的logo
                        $("#local_photo").attr("src", oldLogoPath);
                        //初始化团队名称
                        $("#team_name").val(oldName);
                        //动态加载tag,初始化tag的信息
                        for (var i = 0; i < oldBType.length; i++) {
                            $("#show_type_as_tag").append('<div class="chip team_type_fix">' + oldBType[i] +
                                '<i class="close material-icons" id=' + oldBType[i] + '>close</i> </div>');
                        }

                        //计算移动距离
                        if (oldBType.length > 3) {//需要换行处理
                            for (var i = 3; i < oldBType.length; i++) {
                                move_distance = move_distance + oldBType[i].length + 4;
                            }
                        }
                        else {//不需要换行处理
                            for (var i = 0; i < oldBType.length; i++)
                                move_distance = move_distance + oldBType[i].length + 4;
                        }
                        //移动下拉选择框
                        $(".job_type").css("margin-left", move_distance + 'em');
                        //初始化团队人数,人数不可修改
                        $("#team_number").val(data.res.man_cnt + "人团队");
                        //初始化团队标语
                        $("#team_slogan").val(oldSlogan);
                        //初始化团队标签
                        var chip_data = [];
                        for (var i = 0; i < label_num; i++) {
                            var tag_temp = {
                                tag: oldLabel[i],
                                id: oldLabel[i]
                            };
                            chip_data.push(tag_temp);
                        }
                        $('.chips-initial').material_chip({//要用一定的格式
                            data: chip_data,
                            placeholder: '输入新标签'
                        });

                        //-------------初始化完成-----------------

                        //对Label进行添加,上限八个
                        $('.chips-initial').on('chip.add', function (e, chip) {//监听只允许添加八个
                            label_dym_name.push(chip.tag);//把添加到的新的push,纯数据
                            label_num++;
                            //Post新增标签的请求
                            var result = {
                                tid: oldTid,
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
                                }
                            });
                            if (label_num == 8) {
                                //console.log($('.chips-initial')[0]);
                                $('.chips-initial .input').remove();
                            }
                        });
                        //对label进行删除
                        $('.chips-initial').on('chip.delete', function (e, chip) {
                            label_dym_name.splice($.inArray(chip.tag, label_dym_name), 1);//把删除的label从数组中去掉
                            label_num--;
                            //Post删除标签的请求
                            var result = {
                                tid: oldTid,
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
                                }
                            });
                            if (label_num == 7) {//允许继续添加
                                $('.chips-initial').append('<input class="input" placeholder>');
                            }
                        });

                        //对行业类型进行修改,行业类型的上限是五个
                        //对行业类型的删除操作
                        $(".team_type_fix .close").on("click", function () {//如果点击了关闭按钮,在删除标签的同时需要记录
                            type_dym_name.splice($.inArray(this.id, type_dym_name), 1);//从数组中删除特定元素
                            type_num--;//行业类型的数目减1
                            //计算移动距离
                            if (type_num == 3) {//需要换行处理
                                move_distance = 0;
                                for (var i = 0; i < type_num; i++) {
                                    move_distance = move_distance + type_dym_name[i].length + 4;
                                }
                            }
                            else//不需要换行处理
                                move_distance = move_distance - this.id.length - 4;
                            //移动下拉选择框
                            $(".job_type").css("margin-left", move_distance + 'em');
                        });
                        //对行业类型进行添加操作
                        $(".add_type").on("click", function () {
                            //获取到在selector中选择的行业类型
                            var select_tag = $(".tag_select option:selected").text();
                            //-------------判断是否添加-------
                            //不能为空,且不能冲突
                            if (select_tag != '行业类型' && $.inArray(select_tag, type_dym_name) < 0 && type_num != 5) {
                                type_dym_name.push(select_tag);
                                type_num++;
                                $("#show_type_as_tag").append('<div class="chip team_type_fix">' + select_tag +
                                    '<i class="close material-icons" id=' + select_tag + '>close</i> </div>');

                                //新的没绑定,可能有好的办法解决
                                $(".team_type_fix .close").unbind("click").on("click", function () {//如果点击了关闭按钮,在删除标签的同时需要记录
                                    type_dym_name.splice($.inArray(this.id, type_dym_name), 1);//从数组中删除特定元素
                                    type_num--;//行业类型的数目减1
                                    //计算移动距离
                                    if (type_num == 3) {//需要换行处理
                                        move_distance = 0;
                                        for (var i = 0; i < type_num; i++) {
                                            move_distance = move_distance + type_dym_name[i].length + 4;
                                        }
                                    }
                                    else//不需要换行处理
                                        move_distance = move_distance - this.id.length - 4;
                                    //移动下拉选择框
                                    $(".job_type").css("margin-left", move_distance + 'em');
                                });
                                //计算移动距离
                                if (type_num == 4) {//需要换行处理
                                    move_distance = select_tag.length + 4;
                                }
                                else//不需要换行处理
                                    move_distance = move_distance + select_tag.length + 4;
                                //移动下拉选择框
                                $(".job_type").css("margin-left", move_distance + 'em');
                            }
                            else if (type_num == 5)
                                alert("行业类型上限为5!");

                        });


                        //取消修改
                        var type_temp = '';//加载行业类型
                        for (var i = 0; i < (oldBType).length; i++)
                            type_temp = type_temp + oldBType[i] + ' ';
                        $("#cancelButton").on("click", function () {
                            $("#fix_msg_button").css("opacity", '1');
                            $("#remove_basic_msg").empty().append(
                                '<div id="team_logo_div"><img src="' + oldLogoPath + '" id="team_logo"></div>' +
                                '<div id="information"><p id="p1">' + data.res.name + '</p><p id="p2">' + type_temp + '</p>' +
                                '<p id="p3">' + oldAbout + "," + data.res.man_cnt + "人团队" + '</p> ' +
                                '<p id="p4">' + oldSlogan + '</p></div>' +
                                '<div id="information_three"></div>'
                            );
                            //动态加载div
                            var tag_cnt = data.res.label.length;
                            for (var i = 0; i < tag_cnt; i++) {
                                $("#information_three").append('<div class="tag"></div>');
                            }
                            var tag = $(".tag");
                            for (var i = 0; i < tag.length; i++) {
                                $(tag[i]).html(data.res.label[i]);
                            }
                        });


                        //上传照片返回地址,赋给新的logo
                        $("#upload").on("click", function () {
                            var formData = new FormData();
                            formData.append('name', $("#update_photo").val());
                            formData.append('photo', $('#update_photo')[0].files[0]);
                            var update_typeID;

                            //先只得到一个行业类型
                            for (var i = 0; i < tag_type_num; i++) {
                                if (type_dym_name[1] == $("#option" + i).text())
                                    update_typeID = $("#option" + i).attr('value');
                            }

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
                                newLogo = res.msg;
                                //对团队的名字进行修改
                                newName = $("#team_name").val();
                                //对团队的slogan进行修改
                                newSlogan = $("#team_slogan").val();
                                //加载新的信息
                                $("#remove_basic_msg").empty().append(
                                    '<div id="team_logo_div"><img src="' + newLogo + '" id="team_logo"></div>' +
                                    '<div id="information"><p id="p1">' + newName + '</p><p id="p2">' + type_dym_name + '</p>' +
                                    '<p id="p3">' + oldAbout + "," + data.res.man_cnt + "人团队" + '</p> ' +
                                    '<p id="p4">' + newSlogan + '</p></div>' +
                                    '<div id="information_three"></div>'
                                );
                                //动态加载div,加载新的label
                                for (var i = 0; i < label_num; i++) {
                                    $("#information_three").append('<div class="tag"></div>');
                                }
                                var tag = $(".tag");
                                for (var i = 0; i < tag.length; i++) {
                                    $(tag[i]).html(label_dym_name[i]);
                                }
                                //console.log(newLogo);
                                //post的result
                                //console.log(type_dym_name[1]);


                                var result = {
                                    tid: oldTid,
                                    name: newName,
                                    logo_path: newLogo.replace(cur_media, ""),
                                    slogan: newSlogan,
                                    about: oldIntro,
                                    history: oldHistory,
                                    b_type: update_typeID
                                };

                                $.ajax({
                                    type: 'POST',
                                    data: result,
                                    url: cur_site + "team/update_team_info/",
                                    xhrFields: {withCredentials: true},
                                    dataType: 'json',
                                    success: function (data) {
                                        console.log(data.msg);
                                    }
                                });

                            });
                        });

                        //点击保存修改
                        $("#saveButton").on("click", function () {
                            $("#fix_msg_button").css("opacity", '1');
                            if (tag_logo_change == 1)
                                document.getElementById("upload").click();
                            else {
                                var update_typeID;

                                //先只得到一个行业类型
                                for (var i = 0; i < tag_type_num; i++) {
                                    if (type_dym_name[1] == $("#option" + i).text())
                                        update_typeID = $("#option" + i).attr('value');
                                }

                                //对团队的名字进行修改
                                newName = $("#team_name").val();
                                //对团队的slogan进行修改
                                newSlogan = $("#team_slogan").val();
                                //加载新的信息
                                $("#remove_basic_msg").empty().append(
                                    '<div id="team_logo_div"><img src="' + oldLogoPath + '" id="team_logo"></div>' +
                                    '<div id="information"><p id="p1">' + newName + '</p><p id="p2">' + type_dym_name + '</p>' +
                                    '<p id="p3">' + oldAbout + "," + data.res.man_cnt + "人团队" + '</p> ' +
                                    '<p id="p4">' + newSlogan + '</p></div>' +
                                    '<div id="information_three"></div>'
                                );
                                //动态加载div,加载新的label
                                for (var i = 0; i < label_num; i++) {
                                    $("#information_three").append('<div class="tag"></div>');
                                }
                                var tag = $(".tag");
                                for (var i = 0; i < tag.length; i++) {
                                    $(tag[i]).html(label_dym_name[i]);
                                }
                                //console.log(newLogo);
                                //post的result
                                //console.log(type_dym_name[1]);


                                var result = {
                                    tid: oldTid,
                                    name: newName,
                                    logo_path: oldLogoPath.replace(cur_media, ""),
                                    slogan: newSlogan,
                                    about: oldIntro,
                                    history: oldHistory,
                                    b_type: update_typeID
                                };

                                $.ajax({
                                    type: 'POST',
                                    data: result,
                                    url: cur_site + "team/update_team_info/",
                                    xhrFields: {withCredentials: true},
                                    dataType: 'json',
                                    success: function (data) {
                                        console.log(data.msg);
                                    }
                                })
                            }


                        });
                    }

                })

            },
            error: function (data) {
                console.log('get team info error');
                console.log(data);
            },
            headers: {
                "Access-Control-Allow-Origin": "*"
            }

        });

    });

    var tid = getId();
    //团队照片的编辑
    $(".edit_team_photo").on("click", function () {
        $.ajax({
            type: 'GET',
            url: cur_site + "team/info/",
            // url: "../data/team_index.json",
            dataType: "json",
            data: {'tid': 1/*tid*/},
            success: function (data) {
                var team_img = data.res.imgs;//初始化团队照片
                var team_new_img = team_img;//团队增加删除后的照片
                $.ajax({
                    type: "get",
                    url: "add_team_photo.html",
                    dataType: "html",
                    success: function (result) {
                        //初始化团队照片编辑页面
                        $("#edit_photo_area").html(result);
                        for (var i = 0; i < team_img.length; i++) {
                            if (i % 3 == 0) {
                                $("#team_photo_edit").append('<div class="team_photo_div" style="margin-top:10px">' +
                                    '<i class="material-icons delete_team_photo">close</i><img id='+team_img[i].id+' src="' + cur_media + team_img[i].path + '" class="team_photo "></div>');
                            }
                            else {
                                var margin_left_temp = i % 3 * 170 + 'px';
                                $("#team_photo_edit").append('<div class="team_photo_div" style="margin-left:' + margin_left_temp + ';margin-top: -150px;">' +
                                    '<i class="material-icons delete_team_photo">close</i><img id='+team_img[i].id+' src="' + cur_media + team_img[i].path + '" class="team_photo "></div>');
                            }
                        }

                        //根据当前照片的数量初始化添加照片按钮的位置
                        if (team_img.length % 3 == 0)
                            $(".put_team_photo_here").css("margin-top", "10px");
                        else
                            $(".put_team_photo_here").css("margin-top", "-150px");
                        $(".put_team_photo_here").css("margin-left", team_img.length % 3 * 170);

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



                        //监听点击删除事件
                        $("#team_photo_edit .team_photo").on("click", function () {
                            var delete_id = ($(this).attr("id"));
                            var result={
                                'tid':1,
                                'img_id':delete_id
                            };
                            $.ajax({
                                type:"post",
                                url:cur_site+"team/rm_team_photo/",
                                dataType: "json",
                                xhrFields: {withCredentials: true},
                                data:result,
                                success:function (res) {
                                    console.log(res);

                                }

                            })
                            //动态改变团队照片数组中的地址,删除掉该删除的
                            $(this).remove();
                            $(this).parent().children('.delete_team_photo').css("visibility", "visible");
                        });


                        //取消对团队照片的编辑
                        $("#cancel_photo_edit").on("click", function () {
                            $("#edit_photo_area").empty().append('<div class="slider"><ul class="slides"> </ul>');
                            // 团队图片动态加载
                            for (var i = 0; i < team_img.length; i++) {
                                $(".slides").append('<li><img src="' + team_img[i] + '" class="piture "></li>')
                            }
                            // 开启slider
                            $('.slider').slider({
                                full_width: true,
                                height: 250
                            });
                        });

                    }
                });
            },
            error: function (data) {
                console.log('get team info error');
                console.log(data);
            },
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        });

    });

})


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

function show_team_local_img(file) {//预览图片,添加团队照片
    document.getElementById("upload_team_photo").click();
    var reader = new FileReader();
    var team_photo_num = $(".team_photo").length;
    reader.onload = function (evt) {
        //新增团队照片
        var formData = new FormData();
        formData.append('tid', 1);
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
            if ((team_photo_num) % 3 == 0) {
                $("#team_photo_edit").append('<div class="team_photo_div" style="margin-top:10px">' +
                    '<i class="material-icons delete_team_photo">close</i><img src="' + evt.target.result + '" class="team_photo " id="'+res.msg+'"></div>');
            }
            else {
                var margin_left_temp = (team_photo_num) % 3 * 170 + 'px';
                $("#team_photo_edit").append('<div class="team_photo_div" style="margin-left:' + margin_left_temp + ';margin-top: -150px;">' +
                    '<i class="material-icons delete_team_photo">close</i><img src="' + evt.target.result + '" class="team_photo " id="'+res.msg+'"></div>');
            }

            if ((team_photo_num + 1) % 3 == 0)
                $(".put_team_photo_here").css("margin-top", "10px");
            else
                $(".put_team_photo_here").css("margin-top", "-150px");
            $(".put_team_photo_here").css("margin-left", (team_photo_num + 1) % 3 * 170);
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



}




