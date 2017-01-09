$(document).ready(function(){
    $(".team_nav").css("background","rgb(242,242,242)");
    $(".footer").css("background-color","#fff");
    //监听对团队标签的点击事件
    choose_label();

    var tid=getId();
    var team_info={};
    var team_product;
    var label_type=[];
    var i,j;
    var label_choice=$(".label_choice");
    for(i=0;i<label_choice.length;i++){
        label_type.push(label_choice[i].innerText);
    }

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
            if(team_info.logo!=""){
                $(".team_img_edit_div").empty().css("padding","0").css("border","none").append('<img  src="'+cur_media+team_info.logo+'" id="team_logo_origin">')
            }
            //加载团队名称和标语
            if(team_info.name!=""){
                var team_name_input=$("#team_name_input");
                team_name_input.next('label').attr('class','active');
                team_name_input.val(team_info.name);
            }
            if(team_info.name!=""){
                var team_slogan_input=$("#team_slogan_input");
                team_slogan_input.next('label').attr('class','active');
                team_slogan_input.val(team_info.slogan);
            }

            //加载团队的label
            if(team_info.label.length!=0){
                for(i=0;i<team_info.label.length;i++) {
                    for(j=0;j<label_type.length;j++){
                        if(team_info.label[i]==label_type[j]){
                            label_choice[j].click();
                        }
                    }
                }
            }

            //加载团队介绍
            if(team_info.intro==""){
                var team_intro_input=$("#team_intro_input");
                var placeholder="团队简介(总体团队构成、运营内容介绍、发展方向、定位等)\n模版：大学生创业团队是由高校大学生自发组建的一个销售性质的团队，它以销售" +
                    "学生兼容机和电脑周边硬件设备为主，其他学生喜好的产品为辅的团队，团队有规范的组织和统一的管理。其活动的目的是为武汉市各大高校的有志大学生" +
                    "提供一个施展才华和能力的平台，让广大的学生朋友能够得到更多的社会实践机会和经验。";
                team_intro_input.val(placeholder);
            }
            else{
                $("#team_intro_input").val(team_info.intro);
            }

            //加载团队联系方式
            if(team_info.tel!=""){
                var team_website_input=$("#team_website_input");
                team_website_input.next('label').attr('class','active');
                team_website_input.val(team_info.tel);
            }
            if(team_info.mail!=""){
                var team_mail_input=$("#team_mailAddress_input");
                team_mail_input.next('label').attr('class','active');
                team_mail_input.val(team_info.mail);
            }

            //加载团队成员

            //加载团队照片
            // if(team_info.photo.length>0){
            //     $(".photo_div").append('<div class="slider team_photo_slider"><ul class="slides"></ul></div>');
            //     for(i=0;i<team_info.photo.length;i++){
            //         var temp_photo=cur_media+team_info.photo[i].path;
            //         $(".team_photo_slider .slides").append('<li><img class="team_photo" src="'+temp_photo+'" style="background-size:800px 500px;"></li>');
            //     }
            //     $('.slider').slider({
            //         full_width: true,
            //         height: 500
            //     });
            // }


        }
    });

    //监听对团队标签的点击
    function choose_label(){
        $(".label_choice").on("click",function(){
            if($(this).attr('class')=='chip active_choice'){
                $(this).attr('class','chip label_choice');
            }
            else{
                $(this).attr('class','chip active_choice');
            }
        });
    }

});
