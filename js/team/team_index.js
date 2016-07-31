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
        // url: "http://110.64.69.66:8081/team/info/",
        url: "../../data/team_index.json",
        dataType: "json",
        data: {'tid': tid} ,
        success: function (data) {
            // 团队logo路径加载
            var logo = data.res.logo_path;
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

            // 团队成员头像加载
            var Head_portrait = $(".Head_portrait");
            for (var i = 0; i < Head_portrait.length; i++) {
                $(Head_portrait[i]).attr('src', data.res.stus[i].logo_path);
            }
            // 团队图片加载
            var piture = $(".piture");
            for (var i = 0; i < piture.length; i++) {
                $(piture[i]).attr('src', data.res.imgs[i]);
            }

            // 团队成员姓名加载
            var name_arr = $(".name");
            for (var i = 0; i < name_arr.length; i++) {
                $(name_arr[i]).html(data.res.stus[i].name);
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
});
       