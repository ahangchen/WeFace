// 实现四个标签页的切换
$(document).ready(function () {
    $("#projectBtn").on("click",function(){
        $("#projectBtn").attr("href",'manageProject/manageProject.html?tid='+getId());
    });

    var tabhosts = $(".four a");
    $('.slider').slider({
        full_width: true
    });
    tabhosts.each(function () {
        $($(this).attr("href")).hide();

        if ($(this).hasClass("selected")) {
            $($(this).attr("href")).show();
            $(this).parent().css("border-bottom", "5px rgb(255,147,74) solid");
        }

        $(this).click(function (event) {
            event.preventDefault();

            if (!$(this).hasClass("selected")) {
                tabhosts.each(function () {
                    $(this).removeClass("selected");
                    $($(this).attr("href")).hide();
                    $(this).parent().css("border-bottom", "");
                });

                $(this).addClass("selected");
                $($(this).attr("href")).show();
                $(this).parent().css("border-bottom", "5px rgb(255,147,74) solid");
            }
        });
    });
    // 开启slider
    $('.slider').slider({
        full_width: true,
        height: 250,
    });
    // 改变箭头图标的颜色
    // $("i:contains('play_arrow')").css("color", "rgb(255,147,74)");
    // JSON数据加载
    // 获取url中的参数
    function getUrlVars(){

        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for(var i = 0; i < hashes.length; i++)
        {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    }

    //得到指定参数的value
    function getUrlVar(name){
        return getUrlVars()[name];
    }

    // 团队点击职位名字后，在url上获取传职位id
    var tid = getUrlVar('tid');
    $.ajax({
        type: 'GET',
        url: cur_site + "team/info/",
        // url: "../data/team_index.json",
        dataType: "json",
        data: {'tid': tid} ,
        success: function (data) {
            //console.log(data);
            // 团队logo路径加载
            var logo = cur_media + data.res.logo_path;
            $("#team_logo").attr('src', logo);
            // 团队标签加载
            var tag_cnt = data.res.label.length;
            for (var j = 0; j < tag_cnt; j++) {
                $("#information_three").append('<div class="tag"></div>');
            }
            var tag = $(".tag");
            for (var i = 0; i < tag.length; i++) {
                $(tag[i]).html(data.res.label[i]);
            }
            //团队行业类型
            /*var team_type=[];
            team_type.push(data.res.b_type);
            var team_type_name=[];
            $.ajax({
                type: "get",
                url: cur_site + "team/business/",
                dataType: "json",
                success: function (data) {
                    var all_team_type = data.msg;
                    for(var i=0;i<team_type.length;i++){
                        for(var j=0;j<all_team_type.length;j++){
                            if(all_team_type[j].id==team_type[i]){
                                team_type_name.push(all_team_type[j].name);
                            }
                        }
                    }
                    $("#p2").html(team_type_name[0]);
                }
            });*/
            var team_type=data.res.b_type;
            var team_type_name;
            $.ajax({
                type: "get",
                url: cur_site + "team/business/",
                dataType: "json",
                success: function (data) {
                    var all_team_type = data.msg;
                    for(var j=0;j<all_team_type.length;j++){
                        if(all_team_type[j].id==team_type){
                            team_type_name=all_team_type[j].name;
                        }
                    }

                    $("#p2").html(team_type_name);
                }
            });
            // 团队名称加载
            $("#p1").html(data.res.name);
            // 团队标语加载
            $("#p3").html(data.res.man_cnt+'人团队');
            $("#p4").html(data.res.slogan);
            
            // 团队介绍加载
            $("#team_introuduction").html(data.res.about.replace(/\n/gm,"<br />"));
            // 团队发展历程加载
            $("#history_text").html(data.res.history.replace(/\n/gm,"<br />"));
            //团队联系方式加载
            $("#member_information").html(data.res.tel + "<br/>" + data.res.mail);

            // 团队图片动态加载
            if(data.res.imgs.length!=0){
                $("#edit_photo_area").empty().append('<div class="slider"><ul class="slides"> </ul>');
                for (var i = 0; i < data.res.imgs.length; i++) {
                    $(".slides").append('<li><img src="'+cur_media+data.res.imgs[i].path+'" class="piture "></li>')
                }
                // 开启slider
                $('.slider').slider({
                    full_width: true,
                    height: 250
                });
            }
            else{
                $("#edit_photo_area").empty();
            }

            // 团队创始人头像姓名加载
            if(data.res.stus.length < 1) {
                console.log('no team stu');
            } else {
               // $("#leader").attr('src',data.res.stus[0].logo_path);
                //$("#leaderName").html(data.res.stus[0].name);
                // 团队成员头像加载
                $("#team_member_icon").append('<table id="team_member_table"></table>');
                var stuNum = data.res.stus.length;
                var line=parseInt(stuNum/3)+1;//如果一行加三个成员,得到行数
                for(var i=1;i<=line;i++){
                    $("#team_member_table").append('<tr id="line'+i+'"></tr>');
                    if(i!=line){
                        for(var j=0;j<3;j++){
                            $("#line"+i).append('<div class="Head_portrait_div "><div class="team_member_logo">'+
                                '<img id="'+data.res.stus[(i-1)*3+j].id+'" src="'+cur_media+data.res.stus[(i-1)*3+j].logo_path+'" alt="头像" class="Head_portrait" /></div>'
                                +'<span class="name">'+dealName(data.res.stus[(i-1)*3+j].name)+'</span></div>')
                        }
                    }
                    else{
                        for(var j=0;j<stuNum%3;j++){
                            $("#line"+i).append('<div class="Head_portrait_div "><div class="team_member_logo">'+
                                '<img id="'+data.res.stus[(i-1)*3+j].id+'" src="'+cur_media+data.res.stus[(i-1)*3+j].logo_path+'" alt="头像" class="Head_portrait" /></div>'
                                +'<span class="name">'+dealName(data.res.stus[(i-1)*3+j].name)+'</span></div>')
                        }
                    }
                }
                /*for (var i = 0; i < stuNum; i++) {
                    var name;
                    if(data.res.stus[i].name.split('@')[1]!=null){
                        name=data.res.stus[i].name.split('@')[0][0]+data.res.stus[i].name.split('@')[0][1]+'*@'+data.res.stus[i].name.split('@')[1];
                    }
                    else{
                        name=data.res.stus[i].name;
                    }
                    $("#team_member_icon").append('<div class="Head_portrait_div "><img src="'+cur_media+data.res.stus[i].logo_path+'" alt="头像" class="Head_portrait" /><br><span class="name">'+name+'</span></div>')
                }*/
            }


        },
        error: function (data) {
            console.log('get team info error');
            console.log(data);
        },
        headers: {
            "Access-Control-Allow-Origin":"*"
        }
    });

               $(this).addClass("selected");
               $($(this).attr("href")).show();
               $(this).parent().css("border-bottom", "5px rgb(255,147,74) solid");

       
       
         // 改变箭头图标的颜色
         $("i:contains('play_arrow')").css("color", "rgb(255,147,74)");
         // // JSON数据加载
         // $.getJSON('../data/team_index.json', function(data) {
         //  // 团队logo路径加载
         //   var logo = data.res.logo_path;
         //   $("#team_logo").attr('src', logo);
         //   // 团队标签加载
         //   var tag_cnt=data.res.label.length;//动态加载div
         //   for(var i=0;i<tag_cnt;i++){
         //     $("#information_three").append('<div class="tag"></div>');
         //   }
         //   var tag = $(".tag");
         //   for (var i = 0; i < tag.length; i++) {
         //     $(tag[i]).html(data.res.label[i]);
         //   }
         //   // 团队名称加载
         //   $("#p1").html(data.res.name);
         //   // 团队简介,人数加载
         //   $("#p3").html(data.res.about+","+data.res.man_cnt+"人团队");
         //   // 团队标语
         //   $("#p4").html(data.res.slogan);
         //   // 团队行业类型加载
         //   var type_temp='';
         //   for(var i=0;i<(data.res.b_type).length;i++)
         //   type_temp=type_temp+data.res.b_type[i]+' ';
         //   $("#p2").html(type_temp);
         //   // 团队介绍加载
         //   $("#team_introuduction").html(data.res.about);
         //   // 团队发展历程加载
         //   $("#history_text").html(data.res.history);
         //   //团队联系方式加载
         //   $("#member_information").html(data.res.tel+"<br>"+data.res.mail);
         //  // 团队图片动态加载
         //  for (var i = 0; i < data.res.imgs.length; i++) {
         //    $(".slides").append('<li><img src="'+data.res.imgs[i]+'" class="piture "></li>')
         //  };
         //    // 开启slider
         // $('.slider').slider({
         //   full_width: true,
         //   height: 250,
         // });
         // // 团队创始人头像姓名加载
         // $("#leader").attr('src',data.res.stus[0].logo_path);
         // $("#leaderName").html(data.res.stus[0].name);
         //   // 团队非创始人成员头像加载
         //   var stuNum = data.res.stus.length;
         //   for (var i = 1; i < stuNum; i++) {
         //    $("#team_member_icon").append('<div class="Head_portrait_div "><img src="'+data.res.stus[i].logo_path+'" alt="头像" class="Head_portrait" /><br><span class="name">'+data.res.stus[i].name+'</span></div>')
         //   }
         // });

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

       });
       