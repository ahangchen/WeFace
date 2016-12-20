$(document).ready(function(){
    var tid=getId();
    var team_info={};
    var team_product;
    var temp_class;
    var i;

    $.ajax({
        url: cur_site + 'team/product/search/',
        type: 'POST',
        dataType: 'json',
        data: {"teamId": tid},
        success:function(data) {
            team_product=data.msg;
        }
    });

    $.ajax({
        type: 'GET',
        url: cur_site + "team/info/",
        dataType: "json",
        data: {'tid': tid} ,
        success: function (data) {
            team_info.name=data.res.name;
            team_info.label=data.res.label;
            team_info.slogan=data.res.slogan;
            team_info.intro=data.res.about;
            team_info.logo=data.res.logo_path;
            team_info.photo=data.res.imgs;
            team_info.mail=data.res.mail;
            team_info.tel=data.res.tel;
            team_info.member=data.res.stus;

            $("#team_logo").attr('src',cur_media+team_info.logo);
            $("#team_name").html(team_info.name);
            $(".slogan_div").append('<span id="team_slogan">'+team_info.slogan+'</span>');

            for(i=0;i<team_info.label.length;i++){
                $(".label_div").append('<div class="team_label chip">'+team_info.label[i]+'</div>');
            }
            temp_class=".team_nav";
            //console.log( $(temp_class).css('width'));
            // $(temp_class).css("background-size","1440px "+$(temp_class).css("height")).css("background-image","url('../res/imgs/team/team_bg.svg')");

            load_team_homepage();
        }
    });

    //监听标签页的改变
    $(".function_tabs ul li").on("click",function(){
        $(".function_tabs ul li").css("border-bottom","none");
        $(this).css("border-bottom","3px solid");

        if($(this).attr('id')=='team_product'){//点击的团队产品的标签加载对应的内容
            $(".switch_tab").empty().append('<div class="product_div"><div class=team_products></div></div>');
            load_team_product();

        }

        if($(this).attr('id')=='team_homepage'){//加载团队的主页面
            $(".switch_tab").empty().append('<div class="introduction_div"><p class="sub_title">团队介绍</p><p id="team_intro"></p></div> ' +
                '<div class="member_div"><p class="sub_title">团队成员</p><div class="member_slider carousel"></div>'+
                '</div><div class="photo_div"><p class="sub_title">团队风采</p><div class="slider team_photo_slider">'+
                '<ul class="slides"></ul></div></div><div class="product_div"><p class="sub_title">团队产品</p><div class=team_products></div></div>'+
                '<div class="footer"><p class="sub_title" style="color:white">联系我们</p><div  class="contact"><i class="material-icons">language</i>'+
                '<span id="web_site"></span></div><div  class="contact"><i class="material-icons" >mail</i><span id="mail_address"></span>'+
                '</div></div>');
            load_team_homepage();
        }

        if($(this).attr('id')=='communicate'){
            $(".switch_tab").empty().append('<div class="topic_module"><div class="team_topic_div"><div class="team_topic"><div class="topic_title">' +
                '<img class="question_icon" src="../res/imgs/team/问题.svg" align="AbsMiddle"><span class="question_title">如果在这个软件中增加一个小天使的功能，大家觉得怎么样？</span> ' +
                '<p class="submit_date">12月5日</p></div><div class="topic_detail"> ' +
                '<p>在这个软件中增加一个小天使的功能，当你在忙碌的时候可以激活小天使来帮你，然后可以给小天使一个合理的回报，比如请吃饭，你们觉得怎么样？</p> </div> ' +
                '<div class="topic_function"><img class="agree_icon" src="../res/imgs/team/赞.svg" align="AbsMiddle"> ' +
                '<span class="agree_num">17</span><img class="commit_icon" src="../res/imgs/team/评论.svg" align="AbsMiddle">' +
                '<span class="commit_num">15</span></div></div></div>' +
                '<div class="team_topic_div"><div class="team_topic"><div class="topic_title">' +
                '<img class="question_icon" src="../res/imgs/team/问题.svg" align="AbsMiddle"><span class="question_title">如果在这个软件中增加一个小天使的功能，大家觉得怎么样？</span> ' +
                '<p class="submit_date">12月5日</p></div><div class="topic_detail"> ' +
                '<p>在这个软件中增加一个小天使的功能，当你在忙碌的时候可以激活小天使来帮你，然后可以给小天使一个合理的回报，比如请吃饭，你们觉得怎么样？</p> </div> ' +
                '<div class="topic_function"><img class="agree_icon" src="../res/imgs/team/赞.svg" align="AbsMiddle"> ' +
                '<span class="agree_num">17</span><img class="commit_icon" src="../res/imgs/team/评论.svg" align="AbsMiddle">' +
                '<span class="commit_num">15</span></div></div></div></div>');
        }
    });

    //加载团队主页标签下的内容
    function load_team_homepage(){
        $("#team_intro").html(team_info.intro);
        temp_class=".member_slider";
        $(temp_class).append('<a class="carousel-item"><img src="'+cur_media+team_info.member[0].logo_path+'">'+
            '<span class="member_name">'+team_info.member[0].name+'</span>'+
            '<span class="member_id">创始人</span></a>');

        for(i=1;i<team_info.member.length;i++){
            $(temp_class).append('<a class="carousel-item"><img src="'+cur_media+team_info.member[i].logo_path+'">'+
                '<span class="member_name">'+team_info.member[i].name+'</span>'+
                '<span class="member_id">成员</span></a>');
        }

        $('.carousel').carousel();


        for(i=0;i<team_info.photo.length;i++){
            var temp_photo=cur_media+team_info.photo[i].path;
            $(".team_photo_slider .slides").append('<li><img class="team_photo" src="'+temp_photo+'" style="background-size:800px 500px;"></li>');
        }

        $('.slider').slider({
            full_width: true,
            height: 500
        });

        for(i=0;i<team_product.length;i++){
            if(team_product[i].img_path!="")
                $(".team_products").append('<div class="team_product"><img src="'+cur_media+team_product[i].img_path+'">'+
                    '<div class="product_name_area"><p class="product_number">产品'+(i+1)+'</p><p class="product_name">'+team_product[i].name+'</p></div></div>');
        }

        $("#web_site").html(team_info.tel);
        $("#mail_address").html(team_info.mail);
    }

    //加载团队产品标签下的内容
    function load_team_product(){
        $(".product_div").css("background","none");
        temp_class=".team_products";
        $(temp_class).css("width","940px");
        for(i=0;i<team_product.length;i++){
            if(team_product[i].img_path!="")
                $(temp_class).append('<div class="team_product" id="product_'+i+'"><img src="'+cur_media+team_product[i].img_path+'">'+
                    '<div class="product_name_area"><p class="product_number">产品'+(i+1)+'</p><p class="product_name">'+team_product[i].name+'</p></div>'+
                    '<div class="product_content_area"><p class="product_content">'+team_product[i].content+'</p></div>');
        }

        //监听鼠标移动
        $(".team_product").css("margin-left","60px").on("mouseover",function(){
            $(this).children('img').css("filter","blur(3px)");
            $(this).children('.product_name_area').css("opacity","0");
            $(this).children('.product_content_area').css("opacity","1");
        }).on("mouseout",function(){
            $(this).children('img').css("filter","blur(0)");
            $(this).children('.product_name_area').css("opacity","1");
            $(this).children('.product_content_area').css("opacity","0");
        });
    }

    //加载互动社区的话题内容
    function load_team_topic(){

    }




});