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


            $("#team_intro").html(team_info.intro);
            temp_class=".team_nav";
            $(temp_class).css("background-size","100% "+$(temp_class).css("height")).css("background-image","url('../res/imgs/team/team_bg.jpg')");

            // temp_class=".member_slider";
            // $(temp_class).append('<i class="material-icons" id="pre_member">chevron_left</i>');
            // $(temp_class).append('<div class="team_member"><img  src="'+cur_media+team_info.member[0].logo_path+'">'+
            //     '<span class="member_name">'+team_info.member[0].name+'</span><span class="member_id">创始人</span></div>');
            //
            // for(i=1;i<team_info.member.length;i++){
            //     $(temp_class).append('<div class="team_member"><img  src="'+cur_media+team_info.member[i].logo_path+'">'+
            //         '<span class="member_name">'+team_info.member[i].name+'</span><span class="member_id">成员</span></div>');
            // }
            // $(temp_class).append('<i class="material-icons" id="next_member">chevron_right</i>');
            // if(team_info.member.length<=5){
            //     $(".member_slider i").css("opacity","0");
            // }

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
    });




});