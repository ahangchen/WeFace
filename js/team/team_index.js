// 实现四个标签页的切换
$(document).ready(function () {
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
    $("i:contains('play_arrow')").css("color", "rgb(255,147,74)");
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
            // 团队logo路径加载
            var logo = cur_media + data.res.logo_path;
            $("#team_logo").attr('src', logo);
            // 团队标签加载
            var tag = $(".tag");
            for (var i = 0; i < tag.length; i++) {
                $(tag[i]).html(data.res.label[i]);
            }

            // 团队名称加载
            $("#p1").html(data.res.name);
            // 团队标语加载
            $("#p2").html(data.res.slogan);
            // 团队介绍加载
            $("#team_introuduction").html(data.res.about);
            // 团队发展历程加载
            $("#history_text").html(data.res.history);
            //团队联系方式加载
            $("#member_information").html(data.res.tel + "<br/>" + data.res.mail);

            // 团队图片动态加载
            for (var i = 0; i < data.res.imgs.length; i++) {
                $(".slides").append('<li><img src="'+data.res.imgs[i]+'" class="piture "></li>')
            }
            // 开启slider
            $('.slider').slider({
                full_width: true,
                height: 250,
            });
            // 团队创始人头像姓名加载
            if(data.res.stus.length < 1) {
                console.log('no team stu');
            } else {
                $("#leader").attr('src',data.res.stus[0].logo_path);
                $("#leaderName").html(data.res.stus[0].name);
                // 团队非创始人成员头像加载
                var stuNum = data.res.stus.length;
                for (var i = 1; i < stuNum; i++) {
                    $("#team_member_icon").append('<div class="Head_portrait_div "><img src="'+data.res.stus[i].logo_path+'" alt="头像" class="Head_portrait" /><br><span class="name">'+data.res.stus[i].name+'</span></div>')
                }
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

       });
       