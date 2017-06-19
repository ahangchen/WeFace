$(document).ready(function(){
    var tid=(location.search.split("=")[1]).split('&')[0];
    var token=location.search.split("token=")[1];
    var team_info={};
    var team_product;
    var i,j,k;
    $('.modal-trigger').leanModal();

    $("#nav_function_btn").click(function(){
        var nav_function_div=$(".nav_function_div");
        if(nav_function_div.css("opacity")=="0"){
            nav_function_div.css("opacity","1");
        }
        else{
            nav_function_div.css("opacity","0");
        }

    });

    $("#product_manage").click(function(){
        window.location.href="product/product_list.html?tid="+tid;
    });

    $("#topic_manage").click(function(){
        window.location.href="topic/topic_list.html?tid="+tid;
    });

    $("#position_manage").click(function(){
        window.location.href="position/showPosition.html?tid="+tid;
    });

    $("#resume_manage").click(function(){
       window.location.href = "resumeManage/resume.html?tid="+tid;
    });



    //如果没有token隐藏所有的编辑按钮
    if(token==undefined){
        $("#edit_team_basic").remove();
        $("#edit_team_intro").remove();
        $("#edit_team_member").remove();
        $("#edit_team_photo").remove();
        $("#edit_team_contact").remove();
        $(".nav_function_div").remove();
        $(".nav_function_icon").remove();
    }

    $.ajax({
        url: cur_site + 'team/product/search/',
        type: 'POST',
        dataType: 'json',
        data: {"teamId": tid},
        success:function(res) {
            team_product=res.msg;
            $.ajax({
                type: 'GET',
                url: cur_site + "team/info/",
                dataType: "json",
                data: {'tid': tid} ,
                success: function (data) {
                    console.log(data);
                    team_info.name=data.res.name;
                    team_info.label=data.res.label;
                    team_info.slogan=data.res.slogan;
                    team_info.intro=(data.res.about).replace('\n','<br />');
                    team_info.logo=data.res.logo_path;
                    team_info.photo=data.res.imgs;
                    team_info.mail=data.res.mail;
                    team_info.tel=data.res.tel;
                    team_info.member=data.res.stus;
                    //没有用到的字段
                    team_info.history=data.res.history;
                    team_info.b_type=data.res.b_type;

                    load_team_nav();
                    load_team_homepage();
                }
            });
        }
    });

    //监听标签页的改变
    listen_change_page();

    //加载团队基本信息修改页面
    edit_team_basic();

    //加载团队介绍修改页面
    edit_team_intro();

    //加载团队联系方式修改页面
    edit_team_contact();

    //加载团队风采编辑页面
    edit_team_photo();

    //加载团队成员编辑页面
    edit_team_member();

    //加载团队基本信息导航
    function load_team_nav(){
        if(team_info.logo!=""){
            $("#team_logo").attr('src',cur_media+team_info.logo);
        }
        else{//如果团队没有上传头像则显示空白
            $("#team_logo").remove();
            $(".team_nav_img").append('<div id="team_logo" style="background: #fff"></div>');
        }

        $("#team_name").html(team_info.name);
        $(".slogan_div").append('<span id="team_slogan">'+team_info.slogan+'</span>');

        for(i=0;i<team_info.label.length;i++){
            $(".label_div").append('<div class="team_label chip">'+team_info.label[i]+'</div>');
        }
    }

    //对团队四个标签页的变化监听
    function listen_change_page(){
        $(".function_tabs ul li").on("click",function(){
            $(".function_tabs ul li").css("border-bottom","none");
            $(this).css("border-bottom","3px solid");

            if($(this).attr('id')=='team_product'){//点击的团队产品的标签加载对应的内容
                $(".switch_tab").empty().append('<div class="product_div"><div class=team_products></div></div>');
                load_team_product();

            }

            if($(this).attr('id')=='team_homepage'){//加载团队的主页面
                $(".switch_tab").empty().append('<div class="introduction_div"><div class="sub_title"><span>团队介绍</span>'+
                    '<a id="edit_team_intro" class="btn-floating waves-effect waves-light"><i class="material-icons" id="edit_team_intro_icon">edit</i></a>'+
                    '</div><p id="team_intro"></p></div> ' +
                    '<div class="member_div"><div class="sub_title"><span>团队成员</span>'+
                    '<a id="edit_team_member" class="btn-floating waves-effect waves-light"><i class="material-icons" id="edit_team_member_icon">edit</i></a>'+
                    '</div></div><div class="photo_div"><div class="sub_title"><span>团队风采</span>'+
                    '<a id="edit_team_photo" class="btn-floating waves-effect waves-light"><i class="material-icons" id="edit_team_photo_icon">edit</i></a>'+
                    '</div></div>'+
                    '<div class="footer"><div class="sub_title"><span style="color:white">联系我们</span>'+
                    '<a id="edit_team_contact" class="btn-floating waves-effect waves-light"><i class="material-icons" id="edit_team_contact_icon">edit</i></a>'+
                    '</div><div  class="contact"><i class="material-icons">language</i>'+
                    '<span id="web_site"></span></div><div  class="contact"><i class="material-icons" >mail</i><span id="mail_address"></span>'+
                    '</div></div>');

                //如果没有token隐藏所有的编辑按钮
                if(token==undefined){
                    $("#edit_team_basic").remove();
                    $("#edit_team_intro").remove();
                    $("#edit_team_member").remove();
                    $("#edit_team_photo").remove();
                    $("#edit_team_contact").remove();
                }

                load_team_homepage();

                //加载团队基本信息修改页面
                edit_team_basic();

                //加载团队介绍修改页面
                edit_team_intro();

                //加载团队联系方式修改页面
                edit_team_contact();

                //加载团队风采编辑页面
                edit_team_photo();

                //加载团队成员编辑页面
                edit_team_member();
            }

            if($(this).attr('id')=='communicate'){
                // $(".switch_tab").empty().append('<div class="topic_module"><div class="team_topic_div"><div class="team_topic"><div class="topic_title">' +
                //     '<img class="question_icon" src="../res/imgs/team/问题.svg" align="AbsMiddle"><span class="question_title">如果在这个软件中增加一个小天使的功能，大家觉得怎么样？</span> ' +
                //     '<p class="submit_date">12月5日</p></div><div class="topic_detail"> ' +
                //     '<p>在这个软件中增加一个小天使的功能，当你在忙碌的时候可以激活小天使来帮你，然后可以给小天使一个合理的回报，比如请吃饭，你们觉得怎么样？</p> </div> ' +
                //     '<div class="topic_function"><img class="agree_icon" src="../res/imgs/team/赞.svg" align="AbsMiddle"> ' +
                //     '<span class="agree_num">17</span><img class="commit_icon" src="../res/imgs/team/评论.svg" align="AbsMiddle">' +
                //     '<span class="commit_num">15</span></div></div></div>' +
                //     '<div class="team_topic_div"><div class="team_topic"><div class="topic_title">' +
                //     '<img class="question_icon" src="../res/imgs/team/问题.svg" align="AbsMiddle"><span class="question_title">如果在这个软件中增加一个小天使的功能，大家觉得怎么样？</span> ' +
                //     '<p class="submit_date">12月5日</p></div><div class="topic_detail"> ' +
                //     '<p>在这个软件中增加一个小天使的功能，当你在忙碌的时候可以激活小天使来帮你，然后可以给小天使一个合理的回报，比如请吃饭，你们觉得怎么样？</p> </div> ' +
                //     '<div class="topic_function"><img class="agree_icon" src="../res/imgs/team/赞.svg" align="AbsMiddle"> ' +
                //     '<span class="agree_num">17</span><img class="commit_icon" src="../res/imgs/team/评论.svg" align="AbsMiddle">' +
                //     '<span class="commit_num">15</span></div></div></div></div>');

                $(".switch_tab").empty().append('<div class="topic_module"></div>');

                $.ajax({
                    url: cur_site + 'team/topic/list/',
                    type: 'GET',
                    dataType: 'json',
                    data: {"tid": tid},
                    success:function(data) {
                        if(data.err=="0"){
                            var topic=data.msg;
                            for(var i=0;i<topic.length;i++){
                                var time=topic[i].time.split('-');
                                var publish_time=time[0]+'年'+time[1]+'月'+time[2]+'日';
                                $(".topic_module").append('<div class="team_topic_div"><div class="team_topic"><div class="topic_title" id="topic'+topic[i].topic_id+'">' +
                                    '<img class="question_icon" src="../res/imgs/team/问题.svg" align="AbsMiddle"><span class="question_title">'+topic[i].title+'</span> ' +
                                    '<p class="submit_date">'+publish_time+'</p></div><div class="topic_detail"> ' +
                                    '<p>'+topic[i].content+'</p></div></div></div>');
                            }
                            load_team_topic();
                        }
                    }
                });
            }

            if($(this).attr('id')=='position'){
                $(".switch_tab").empty();
                load_position();
            }
        });
    }


    //加载团队主页标签下的内容
    function load_team_homepage(){
        if(team_info.intro==""){
            $(".introduction_div").append('<p class="empty_remainder">精彩等待开启</p>');
        }
        else{
            $(".introduction_div").append('<p id="team_intro"></p>');
            $("#team_intro").html(team_info.intro);
        }

        //在有团队成员的情况下才显示
        if(team_info.member.length>0){
            $(".member_div").append('<div class="member_slider carousel"></div>');
            var member_slider=$(".member_slider");
            member_slider.append('<a class="carousel-item"><img src="'+cur_media+team_info.member[0].logo_path+'">'+
                '<span class="member_name">'+team_info.member[0].name+'</span>'+
                '<span class="member_id">创始人</span></a>');
            for(i=1;i<team_info.member.length;i++){
                member_slider.append('<a class="carousel-item"><img src="'+cur_media+team_info.member[i].logo_path+'">'+
                    '<span class="member_name">'+team_info.member[i].name+'</span>'+
                    '<span class="member_id">成员</span></a>');
            }
            $('.carousel').carousel();
        }
        else{
            $(".member_div").append('<p class="empty_remainder">精彩等待开启</p>');
        }

        //如果没有团队照片显示空白
        if(team_info.photo.length>0){
            $(".photo_div").append('<div class="slider team_photo_slider"><ul class="slides"></ul></div>');
            for(i=0;i<team_info.photo.length;i++){
                var temp_photo=cur_media+team_info.photo[i].path;
                $(".team_photo_slider .slides").append('<li><img class="team_photo" src="'+temp_photo+'" style="background-size:800px 450px;"></li>');
            }
            $('.slider').slider({
                full_width: true,
                height: 450
            });
        }
        else{
            $(".photo_div").append('<p class="empty_remainder">精彩等待开启</p>');
        }

        // if(team_product.length>0){
        //     $(".product_div").append('<div class=team_products></div>');
        //     for(i=0;i<team_product.length;i++){
        //         if(team_product[i].img_path!="")
        //             $(".team_products").append('<div class="team_product" id="team_product'+team_product[i].id+'"><img src="'+cur_media+team_product[i].img_path+'">'+
        //                 '<div class="product_name_area"><p class="product_number">产品'+(i+1)+'</p><p class="product_name">'+team_product[i].name+'</p></div></div>');
        //     }
        // }
        // else{
        //     $(".product_div").append('<p class="empty_remainder">精彩等待开启</p>');
        // }
        //
        // $(".team_product").on('click',function(){
        //     var productId=$(this).attr('id').split('team_product')[1];
        //     window.location.href="product/product_detail.html?productId="+productId;
        // });

        if(team_info.tel.length>25){
            var team_tel_show=team_info.tel.slice(0,25)+"...";
            $("#web_site").append('<a href="'+team_info.tel+'">'+team_tel_show+'</a>');
        }
        else{
            $("#web_site").append('<a href="'+team_info.tel+'">'+team_info.tel+'</a>');
        }
        $("#mail_address").html(team_info.mail);
    }

    //加载团队产品标签下的内容
    function load_team_product(){
        $(".product_div").css("background","none");
        var team_products=$(".team_products");
        team_products.css("width","940px");
        for(i=0;i<team_product.length;i++){
            if(team_product[i].img_path!="")
                team_products.append('<div class="team_product" id="team_product'+team_product[i].id+'"><img src="'+cur_media+team_product[i].img_path+'">'+
                    '<div class="product_name_area"><p class="product_number">产品'+(i+1)+'</p><p class="product_name">'+team_product[i].name+'</p></div>'+
                    '<div class="product_content_area"><p class="product_content">'+JSON.parse(team_product[i].reward).slogan+'</p></div>');
        }

        //监听鼠标移动，点击
        $(".team_product").css("margin-left","60px").on("mouseover",function(){
            $(this).children('img').css("filter","blur(3px)");
            $(this).children('.product_name_area').css("opacity","0");
            $(this).children('.product_content_area').css("opacity","1");
        }).on("mouseout",function(){
            $(this).children('img').css("filter","blur(0)");
            $(this).children('.product_name_area').css("opacity","1");
            $(this).children('.product_content_area').css("opacity","0");
        }).on('click',function(){
            var productId=$(this).attr('id').split('team_product')[1];
            window.location.href="product/product_detail.html?productId="+productId;
        });


    }

    //加载互动社区的话题内容
    function load_team_topic(){
        //点击话题进行页面的跳转
        $(".topic_title").on('click',function(){
            var topic_id=$(this).attr('id').split('topic')[1];
            window.location.href="topic/topic_detail.html?tid="+tid+"&topic_id="+topic_id;
        });

    }

    //加载职位信息
    function load_position(){
        $.ajax({
            type:'post',
            url:cur_site + "team/job_type/",
            dataType:'json',
            success:function(data) {
                if(data.err == 0) {
                    var job_type=data.msg;
                    $(".switch_tab").append('<div class="position_tag_container"><div class="position_tag_div">' +
                        '<div class="pos_tips">职位</div><div class="chip position_tag" id="positionAll">全部</div></div>' +
                        '</div><div class="position_detail_area"></div><div class="page_area"></div>');
                    console.log(job_type);
                    for(var i=0;i<job_type.length;i++){
                        $(".position_tag_div").append('<div class="chip position_tag" id="position_tag'+job_type[i].id+'">'+job_type[i].name+'</div>');
                    }
                    listen_to_position();
                }
            }
        });
    }

    //监听搜索的职位类型变化
    function listen_to_position(){
        $(".position_tag").on('click',function(){
           $(this).addClass('active_tag').siblings().removeClass('active_tag');
           var jobTags=[];
           if($(this).attr('id')=='positionAll'){
               jobTags=[1,2,3,4,5,6,7,8,9];
           }
           else{
               jobTags.push(parseInt($(this).attr('id').split('position_tag')[1]));
           }
           var uploadData={'teamId':tid,'jobTags':jobTags};
           $('.position_detail_area').empty();
            $.ajax({
                type:'post',
                data:uploadData,
                url:cur_site + "team/search_job/",
                dataType:'json',
                success:function(data) {
                    var position_detail=data.message;
                    for(var i=0;i<position_detail.length;i++){
                        var city = position_detail[i].city==1?'广州市':'其他';
                        var status = position_detail[i].job_state==1?['broadcast','已发布']:['stay','暂存'];
                        $(".position_detail_area").append('<div class="position_detail_div" id=position'+position_detail[i].jobId+'>' +
                            '<div class="position_basic"><div class="position_title"><span class="title">'+position_detail[i].name+'/</span><span class="city">'+city+'</span></div>' +
                            '<div class="position_salary">' +
                            '<span class="salary">'+position_detail[i].minSaraly+'~'+position_detail[i].maxSaraly+'/月</span></div></div>' +
                            '<div class="position_extra"><div class="chip '+status[0]+'">'+status[1]+'</div>' +
                            '<div class="postion_describe">'+position_detail[i].exp+'</div></div></div>');
                    }
                    $(".position_detail_div").on('click',function(){
                       var data = $(this).attr('id').split('position')[1];
                       window.location.href = 'jobDetail.html?data='+data;
                    });
                }
            });
        }).eq(0).click();
    }

    //监听修改团队的基本信息
    function edit_team_basic(){
        $("#edit_team_basic").on("click",function(){
            $(".team_nav").empty().append('<div class="team_basic_edit_area"><div class="collection nav_function_div"><a href="" class="collection-item">' +
                '<img src="../res/imgs/team/简历管理.svg" class="downIcon"><span class="downWord">简历管理</span><span class="new_msg_num">7</span></a>' +
                '<a href="" class="collection-item"><img src="../res/imgs/team/职位管理.svg" class="downIcon"><span class="downWord">职位管理</span></a>' +
                '<a class="collection-item" id="product_manage"><img src="../res/imgs/team/产品管理.svg" class="downIcon"><span class="downWord">产品管理</span>' +
                '<span class="new_msg_num">2</span></a><a id="topic_manage" class="collection-item"><img src="../res/imgs/team/社区管理.svg" class="downIcon">' +
                '<span class="downWord">社区管理</span></a></div><div class="team_img_edit_div">'+
                '<i class="medium material-icons" id="photo_camera">photo_camera</i> </div> <form id="post_logo"  enctype="multipart/form-data">'+
                '<input type="file" id="upload_team_logo" style="display: none"></form><div class="team_msg_edit_div">'+
                '<div class="input-field"><input  id="team_name_input" type="text" class="validate"><label for="team_name_input">团队名称</label>'+
                '</div><div class="input-field"><input  id="team_slogan_input" type="text" class="validate"><label for="team_slogan_input">团队定位/宣传语</label>'+
                '</div><div class="team_label_edit_area"><p class="placeholder_text">团队标签(可多选 上限为8)</p><div class="chip label_choice">移动互联网</div>'+
                '<div class="chip label_choice">电子商务</div><div class="chip label_choice">医疗健康</div><div class="chip label_choice">金融</div>'+
                '<div class="chip label_choice">法务</div><div class="chip label_choice">数据安全</div><div class="chip label_choice">咨询</div>'+
                '<div class="chip label_choice">O2O</div><div class="chip label_choice">广告营销</div><div class="chip label_choice">游戏</div>'+
                '<div class="chip label_choice">招聘</div><div class="chip label_choice">旅游</div><div class="chip label_choice">教育</div>'+
                '<div class="chip label_choice">分类信息</div><div class="chip label_choice">学生服务</div><div class="chip label_choice">文化娱乐</div>'+
                '<div class="chip label_choice">其他</div></div></div></div><div class="team_basic_function_area">'+
                '<a class="waves-effect waves-light btn" id="save_team_basic">保存</a>' +
                '<a class="waves-effect waves-light btn" id="cancel_team_basic">取消</a></div>').css("background","rgb(242,242,242)");

            $("#product_manage").click(function(){
                window.location.href="product/product_list.html?tid="+tid;
            });

            $("#topic_manage").click(function(){
                window.location.href="topic/topic_list.html?tid="+tid;
            });

            var label_choice=$(".label_choice");
            var label_type=[];
            for(i=0;i<label_choice.length;i++){
                label_type.push(label_choice[i].innerText);
            }

            //监听对团队标签的点击事件
            choose_label();

            var team_img_edit_div=$(".team_img_edit_div");
            if(team_info.logo!=""){
                team_img_edit_div.empty().css("padding","0").css("border","none").append('<img  src="'+cur_media+team_info.logo+'" id="team_logo_origin">')
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

            //点击上传上传团队头像
            team_img_edit_div.on("click",function(){
                $("#upload_team_logo").click();
            });
            $("#upload_team_logo").on("change",function(){
                var formData = new FormData();
                formData.append('name', "new_team_logo");
                formData.append('photo', $(this)[0].files[0]);
                formData.append('token', token);
                //上传logo
                $.ajax({
                    url: cur_site + "team/upload_logo/",
                    type: "POST",
                    cache: false,
                    dataType: 'json',
                    data: formData,
                    processData: false,
                    contentType: false
                }).done(function (res) {
                    if(res.err==0){
                        if(team_info.logo==""){
                            team_img_edit_div.empty().css("padding","0").css("border","none").append('<img  src="'+cur_media+res.msg+'" id="team_logo_origin">')
                        }
                        else{
                            $("#team_logo_origin").attr("src", cur_media+res.msg);
                        }
                    }
                    else{
                        console.log("团队logo上传错误");
                    }
                });
            });

            //点击取消团队基本信息的编辑
            $("#cancel_team_basic").on("click",function(){
                $(".team_nav").empty().append('<div class="team_nav_content"><div class="team_nav_img"><img  src="" id="team_logo"></div>' +
                    '<div class="team_nav_word"><div class="name_slogan_area"><div class="name_slogan_div"><div class="team_nav_word_title">' +
                    '<p id="team_name"></p><a id="favourite" class="btn-floating  waves-effect waves-light white"><img src="../res/imgs/team/收藏.svg"></a> ' +
                    '<a id="chat" class="btn-floating waves-effect waves-light white"><img src="../res/imgs/team/私信.svg"></a> ' +
                    '<a id="edit_team_basic" class="btn-floating waves-effect waves-light"><i class="material-icons" id="edit_team_basic_icon">edit</i></a> ' +
                    '</div><div class="slogan_div"></div></div><div class="collection nav_function_div"><a href="" class="collection-item">' +
                    '<img src="../res/imgs/team/简历管理.svg" class="downIcon"><span class="downWord">简历管理</span><span class="new_msg_num">7</span></a>' +
                    '<a href="" class="collection-item"><img src="../res/imgs/team/职位管理.svg" class="downIcon"><span class="downWord">职位管理</span></a> ' +
                    '<a href="" class="collection-item"><img src="../res/imgs/team/产品管理.svg" class="downIcon"><span class="downWord">产品管理</span>' +
                    '<span class="new_msg_num">2</span></a><a href="" class="collection-item"><img src="../res/imgs/team/社区管理.svg" class="downIcon">' +
                    '<span class="downWord">社区管理</span></a></div></div><div class="label_div"></div></div></div><div class="function_tabs"><ul>' +
                    '<li id="team_homepage">团队主页</li><li id="team_product">团队产品</li><li id="position">需求职位</li><li id="communicate">互动社区</li>' +
                    '</ul></div>').css("background-image","url('../res/imgs/team/team_bg.svg')").css("background-size","100% auto");
                load_team_nav();
                listen_change_page();
                edit_team_basic();
            });

            //点击保存团队基本信息的编辑
            $("#save_team_basic").on("click",function(){
                var team_name=$("#team_name_input").val();
                var team_slogan=$("#team_slogan_input").val();
                var team_logo_tmp=$("#team_logo_origin").attr("src");
                var team_logo;
                if(team_logo_tmp!="undefined"){
                    team_logo=team_logo_tmp.split(cur_media)[1];
                }
                else{
                    team_logo="";
                }

                //删除所有旧的标签
                for(i=0;i<team_info.label.length;i++){
                    $.ajax({
                        type: 'POST',
                        data: {tid: tid, name: team_info.label[i],token:token},
                        url: cur_site + "team/rm_team_label/",
                        dataType: 'json',
                        success: function () {
                        }
                    });
                }

                //上传所有新的标签
                var label_tmp=[];
                var label_choice=$(".team_label_edit_area .chip");
                for(i=0;i<label_choice.length;i++){
                    if(label_choice[i].className=='chip active_choice'){
                        label_tmp.push(label_choice[i].innerText);
                        $.ajax({
                            type: 'POST',
                            data: {tid: tid, name: label_choice[i].innerText,token:token},
                            url: cur_site + "team/add_team_label/",
                            dataType: 'json',
                            success: function () {
                            }
                        });
                    }
                }

                //保存其他信息
                var update_msg = {
                    tid: tid,
                    name: team_name,
                    logo_path: team_logo,
                    slogan: team_slogan,
                    about: team_info.intro,
                    history: team_info.history,
                    btype: parseInt(team_info.b_type),
                    token:token
                };
                $.ajax({
                    type: 'POST',
                    data: update_msg,
                    url: cur_site + "team/update_team_info/",
                    dataType: 'json',
                    success: function () {
                        team_info.name=team_name;
                        team_info.slogan=team_slogan;
                        team_info.logo=team_logo;
                        team_info.label=label_tmp;
                        $(".team_nav").empty().append('<div class="team_nav_content"><div class="team_nav_img"><img  src="" id="team_logo"></div>' +
                            '<div class="team_nav_word"><div class="name_slogan_area"><div class="name_slogan_div"><div class="team_nav_word_title">' +
                            '<p id="team_name"></p><a id="favourite" class="btn-floating  waves-effect waves-light white"><img src="../res/imgs/team/收藏.svg"></a> ' +
                            '<a id="chat" class="btn-floating waves-effect waves-light white"><img src="../res/imgs/team/私信.svg"></a> ' +
                            '<a id="edit_team_basic" class="btn-floating waves-effect waves-light"><i class="material-icons" id="edit_team_basic_icon">edit</i></a> ' +
                            '</div><div class="slogan_div"></div></div><div class="collection nav_function_div"><a href="" class="collection-item">' +
                            '<img src="../res/imgs/team/简历管理.svg" class="downIcon"><span class="downWord">简历管理</span><span class="new_msg_num">7</span></a>' +
                            '<a href="" class="collection-item"><img src="../res/imgs/team/职位管理.svg" class="downIcon"><span class="downWord">职位管理</span></a> ' +
                            '<a href="" class="collection-item"><img src="../res/imgs/team/产品管理.svg" class="downIcon"><span class="downWord">产品管理</span>' +
                            '<span class="new_msg_num">2</span></a><a href="" class="collection-item"><img src="../res/imgs/team/社区管理.svg" class="downIcon">' +
                            '<span class="downWord">社区管理</span></a></div></div><div class="label_div"></div></div></div><div class="function_tabs"><ul>' +
                            '<li id="team_homepage">团队主页</li><li id="team_product">团队产品</li><li id="position">需求职位</li><li id="communicate">互动社区</li>' +
                            '</ul></div>').css("background-image","url('../res/imgs/team/team_bg.svg')").css("background-size","100% auto");
                        load_team_nav();
                        listen_change_page();
                        edit_team_basic();
                    }
                });



            });



        });

        //监听对团队标签的点击
        function choose_label(){
            $(".label_choice").on("click",function(){
                if($(this).attr('class')=='chip active_choice'){
                    $(this).attr('class','chip label_choice');
                }
                else{
                    if(team_label_num()==8){
                        Materialize.toast("最多只能选8个！",2000);
                    }
                    else
                        $(this).attr('class','chip active_choice');
                }

            });
        }

        //得到已选标签的数目
        function team_label_num(){
            var num=0;
            var label_choice=$(".team_label_edit_area .chip");
            for(k=0;k<label_choice.length;k++){
                if(label_choice[k].className=='chip active_choice'){
                    num++;
                }
            }
             return num;
        }
    }

    //监听对团队介绍的编辑
    function edit_team_intro(){
        $("#edit_team_intro").on("click",function(){
            $(".introduction_div").empty().append('<div class="sub_title"><span>团队介绍</span></div><div class="input-field team_intro_edit_area">'+
                '<textarea id="team_intro_input" class="materialize-textarea"></textarea><label for="team_intro_input"></label></div>'+
                '<div class="team_intro_function_area"><a class="waves-effect waves-light btn" id="save_team_intro">保存</a>'+
                '<a class="waves-effect waves-light btn" id="cancel_team_intro">取消</a></div>');

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

            //取消对团队介绍的编辑
            $("#cancel_team_intro").on("click",function(){
                var introduction_div=$(".introduction_div");
                introduction_div.empty().append('<div class="sub_title"><span>团队介绍</span>'+
                    '<a id="edit_team_intro" class="btn-floating waves-effect waves-light"><i class="material-icons" id="edit_team_intro_icon">edit</i></a>'+
                    '</div>');
                if(team_info.intro==""){
                    introduction_div.append('<p class="empty_remainder">精彩等待开启</p>');
                }
                else{
                    introduction_div.append('<p id="team_intro"></p>');
                    $("#team_intro").html(team_info.intro);
                }
                edit_team_intro();
            });

            //保存对团队介绍的编辑
            $("#save_team_intro").on("click",function(){
                var team_intro=$("#team_intro_input").val();
                var update_msg = {
                    tid: tid,
                    name: team_info.name,
                    logo_path: team_info.logo,
                    slogan: team_info.slogan,
                    about: team_intro,
                    history: team_info.history,
                    btype: parseInt(team_info.b_type),
                    token:token
                };
                $.ajax({
                    type: 'POST',
                    data: update_msg,
                    url: cur_site + "team/update_team_info/",
                    dataType: 'json',
                    success: function (data) {
                        if(data.err=="0"){
                            team_info.intro=team_intro.replace('\n','<br />');
                            var introduction_div=$(".introduction_div");
                            introduction_div.empty().append('<div class="sub_title"><span>团队介绍</span>'+
                                '<a id="edit_team_intro" class="btn-floating waves-effect waves-light"><i class="material-icons" id="edit_team_intro_icon">edit</i></a>'+
                                '</div>');
                            if(team_info.intro==""){
                                introduction_div.append('<p class="empty_remainder">精彩等待开启</p>');
                            }
                            else{
                                introduction_div.append('<p id="team_intro"></p>');
                                $("#team_intro").html(team_info.intro);
                            }
                            edit_team_intro();
                        }
                    }
                });
            });

        });
    }

    //监听对团队联系方式的编辑
    function edit_team_contact(){
        $("#edit_team_contact").on("click",function(){
            $(".footer").empty().append('<div class="sub_title"><span>联系我们</span></div><div class="team_contact_edit_div">'+
                '<div class="input-field"><input  id="team_website_input" type="text" class="validate">' +
                '<label for="team_website_input">输入团队网站链接</label></div><div class="input-field">' +
                '<input  id="team_mailAddress_input" type="text" class="validate"><label for="team_mailAddress_input">输入团队邮箱地址</label>'+
                '</div></div><div class="team_contact_function_area">'+
                '<a class="waves-effect waves-light btn" id="save_team_contact">保存</a>'+
                '<a class="waves-effect waves-light btn" id="cancel_team_contact">取消</a></div>').css("background-color","#fff");

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

            //取消对团队联系方式的修改
            $("#cancel_team_contact").on("click",function(){
                $(".footer").empty().append('<div class="sub_title"><span style="color:white">联系我们</span>'+
                    '<a id="edit_team_contact" class="btn-floating waves-effect waves-light"><i class="material-icons" id="edit_team_contact_icon">edit</i></a>'+
                    '</div><div  class="contact"><i class="material-icons">language</i><div id="web_site"></div></div><div  class="contact">'+
                    '<i class="material-icons">mail</i><div id="mail_address"></div></div>').css("background-color","rgb(244,171,35)");

                if(team_info.tel.length>25){
                    var team_tel_show=team_info.tel.slice(0,25)+"...";
                    $("#web_site").append('<a href="'+team_info.tel+'">'+team_tel_show+'</a>');
                }
                else{
                    $("#web_site").append('<a href="'+team_info.tel+'">'+team_info.tel+'</a>');
                }

                $("#mail_address").html(team_info.mail);
                edit_team_contact();
            });

            //保存对团队联系方式的修改
            $("#save_team_contact").on("click",function(){
                var team_website=$("#team_website_input").val();
                var team_mailaddress=$("#team_mailAddress_input").val();
                var update_msg = {
                    "tid": tid,
                    "tel": team_website,
                    "mail": team_mailaddress,
                    "token":token
                };
                $.ajax({
                    type: 'POST',
                    data: update_msg,
                    url: cur_site + 'team/update_team_contact/',
                    dataType: 'json',
                    success: function (data) {
                        if(data.err=="0"){
                            team_info.tel=team_website;
                            team_info.mail=team_mailaddress;
                            $(".footer").empty().append('<div class="sub_title"><span style="color:white">联系我们</span>'+
                                '<a id="edit_team_contact" class="btn-floating waves-effect waves-light"><i class="material-icons" id="edit_team_contact_icon">edit</i></a>'+
                                '</div><div  class="contact"><i class="material-icons">language</i><div id="web_site"></div></div><div  class="contact">'+
                                '<i class="material-icons">mail</i><div id="mail_address"></div></div>').css("background-color","rgb(244,171,35)");

                            if(team_info.tel.length>25){
                                var team_tel_show=team_info.tel.slice(0,25)+"...";
                                $("#web_site").append('<a href="'+team_info.tel+'">'+team_tel_show+'</a>');
                            }
                            else{
                                $("#web_site").append('<a href="'+team_info.tel+'">'+team_info.tel+'</a>');
                            }
                            $("#mail_address").html(team_info.mail);
                            edit_team_contact();
                        }
                    }
                })
            });
        });
    }

    //监听团队照片的编辑
    function edit_team_photo(){
        $("#edit_team_photo").on("click",function(){

            var photo_div=$(".photo_div");
            photo_div.empty().append('<div class="sub_title"><span>团队风采</span></div>');
            if(team_info.photo.length>0){
                photo_div.append('<div class="slider team_photo_slider"><ul class="slides"></ul></div>');
                for(i=0;i<team_info.photo.length;i++){
                    var temp_photo=cur_media+team_info.photo[i].path;
                    $(".team_photo_slider .slides").append('<li><img class="team_photo" src="'+temp_photo+'" style="background-size:800px 450px;"></li>');
                }
                $('.slider').slider({
                    full_width: true,
                    height: 450
                });
            }
            var new_photo=[];
            var delete_photo=[];
            show_edit_photo_area(new_photo,delete_photo);

            //取消对照片的编辑
            $("#cancel_team_photo").on("click",function(){
                for(i=0;i<new_photo.length;i++){
                    $.ajax({
                        type: "post",
                        url: cur_site + "team/rm_team_photo/",
                        dataType: "json",
                        data: {'tid': tid, 'img_id': new_photo[i].id,'token':token},
                        success: function () {
                        }
                    });
                }

                photo_div.empty().append('<div class="sub_title"><span>团队风采</span>'+
                    '<a id="edit_team_photo" class="btn-floating waves-effect waves-light"><i class="material-icons" id="edit_team_photo_icon">edit</i></a>'+
                    '</div>');

                if(team_info.photo.length>0){
                    photo_div.append('<div class="slider team_photo_slider"><ul class="slides"></ul></div>');
                    for(i=0;i<team_info.photo.length;i++){
                        var temp_photo=cur_media+team_info.photo[i].path;
                        $(".team_photo_slider .slides").append('<li><img class="team_photo" src="'+temp_photo+'" style="background-size:800px 450px;"></li>');
                    }
                    $('.slider').slider({
                        full_width: true,
                        height: 450
                    });
                }
                else{
                    photo_div.append('<p class="empty_remainder">精彩等待开启</p>');
                }
                edit_team_photo();
            });

            //保存对照片的编辑
            $("#save_team_photo").on('click',function(){
                for(j=0;j<new_photo.length;j++){
                    team_info.photo.push(new_photo[j]);
                }
                for(j=0;j<delete_photo.length;j++){
                    for(k=0;k<team_info.photo.length;k++){
                        if(team_info.photo[k].id==delete_photo[j]){
                            team_info.photo.splice(k, 1);
                        }
                    }
                }
                for(i=0;i<delete_photo.length;i++){
                    $.ajax({
                        type: "post",
                        url: cur_site + "team/rm_team_photo/",
                        dataType: "json",
                        data: {'tid': tid, 'img_id': delete_photo[i],'token':token},
                        success: function () {
                        }
                    });
                }

                photo_div.empty().append('<div class="sub_title"><span>团队风采</span>'+
                    '<a id="edit_team_photo" class="btn-floating waves-effect waves-light"><i class="material-icons" id="edit_team_photo_icon">edit</i></a>'+
                    '</div>');

                if(team_info.photo.length>0){
                    photo_div.append('<div class="slider team_photo_slider"><ul class="slides"></ul></div>');
                    for(i=0;i<team_info.photo.length;i++){
                        var temp_photo=cur_media+team_info.photo[i].path;
                        $(".team_photo_slider .slides").append('<li><img class="team_photo" src="'+temp_photo+'" style="background-size:800px 450px;"></li>');
                    }
                    $('.slider').slider({
                        full_width: true,
                        height: 450
                    });
                }
                else{
                    photo_div.append('<p class="empty_remainder">精彩等待开启</p>');
                }
                edit_team_photo();
            });

        });

        //更新编辑区的图片
        function show_edit_photo_area(new_photo,delete_photo){
            var photo_edit_div;
            if(new_photo.length!=0||delete_photo.length!=0){
                photo_edit_div=$(".photo_edit_div");
                photo_edit_div.empty();
            }
            else{
                $(".photo_div").append('<div class="photo_edit_div"></div>').append('<div class="team_photo_function_area">'+
                    '<a class="waves-effect waves-light btn" id="save_team_photo">保存</a>'+
                    '<a class="waves-effect waves-light btn" id="cancel_team_photo">取消</a></div>');
                photo_edit_div=$(".photo_edit_div");
            }
            var status;
            for(i=0;i<team_info.photo.length;i++){
                status=0;
                for(k=0;k<delete_photo.length;k++){
                    if(delete_photo[k]==team_info.photo[i].id){
                        status=1;
                    }
                }
                if(status==0){
                    var photo_path=cur_media+team_info.photo[i].path;
                    var photo_id='team_photo'+team_info.photo[i].id;
                    photo_edit_div.append('<div class="photo_origin"><img src="'+photo_path+'" />'+
                        '<div id="'+photo_id+'" class="delete_photo"><i class="material-icons">remove</i></div></div>');
                }
            }
            for(j=0;j<new_photo.length;j++){
                status=0;
                for(k=0;k<delete_photo.length;k++){
                    if(delete_photo[k]==new_photo[j].id){
                        status=1;
                    }
                }
                if(status==0){
                    photo_edit_div.append('<div class="photo_origin"><img src="'+cur_media+new_photo[j].path+'" />'+
                        '<div id=team_photo'+new_photo[j].id+' class="delete_photo"><i class="material-icons">remove</i></div></div>');
                }
            }
            photo_edit_div.append('<div class="add_photo_div"><div id="add_photo_btn"><i class="material-icons">add</i>' +
                '</div><form enctype="multipart/form-data">'+
                '<input type="file" id="upload_team_photo" style="display: none"></form></div>');

            add_photo(new_photo,delete_photo);
            delete_team_photo(new_photo,delete_photo);
        }

        //监听添加照片
        function add_photo(new_photo,delete_photo){
            $("#add_photo_btn").on("click",function(){
                $("#upload_team_photo").click();
            });
            $("#upload_team_photo").on("change",function(){
                var formData = new FormData();
                formData.append('tid', tid);
                formData.append('photo', $(this)[0].files[0]);
                formData.append('token',token);
                //上传logo
                $.ajax({
                    url: cur_site + "team/add_team_photo/",
                    type: "POST",
                    cache: false,
                    dataType: 'json',
                    data: formData,
                    processData: false,
                    contentType: false
                }).done(function (res) {
                    if(res.err=="0"){
                        new_photo.push({'id':res.msg.img_id,'path':res.msg.path});
                        show_edit_photo_area(new_photo,delete_photo);
                    }
                    else{
                        console.log("新增团队照片失败");
                    }
                });
            });
        }

        //监听删除照片
        function delete_team_photo(new_photo,delete_photo){
            $(".delete_photo").on("click",function(){
                $("#delete_modal").openModal();
                var delete_id=$(this).attr('id').split('team_photo')[1];
                $("#confirm_delete_photo").click(function(){
                    delete_photo.push(delete_id);
                    show_edit_photo_area(new_photo,delete_photo);
                });
            });
        }
    }

    //监听团队成员的编辑
    function edit_team_member(){
        $("#edit_team_member").on('click',function(){
            $(".member_div").empty().append('<div class="sub_title"><span>团队成员</span></div>' +
                '<div class="member_edit_div"></div><div class="team_member_function_area">'+
                '<a class="waves-effect waves-light btn" id="save_team_member">保存</a>'+
                '<a class="waves-effect waves-light btn" id="cancel_team_member">取消</a></div>');

            var new_member=[];
            var delete_member=[];
            show_team_member_edit_area(new_member,delete_member);

            //取消对团队成员的修改
            $("#cancel_team_member").on("click",function(){
                //对新成员删除
                for(i=0;i<new_member.length;i++){
                    $.ajax({
                        type: "post",
                        url: cur_site + "team/rm_team_stu/",
                        dataType: "json",
                        data: {'tid': tid, 'sid': new_member[i].id},
                        success: function () {
                        }
                    });
                }

                var member_div=$(".member_div");
                member_div.empty().append('<div class="sub_title"><span>团队成员</span>'+
                    '<a id="edit_team_member" class="btn-floating waves-effect waves-light"><i class="material-icons" id="edit_team_member_icon">edit</i></a>'+
                    '</div>');

                //在有团队成员的情况下才显示
                if(team_info.member.length>0){
                    member_div.append('<div class="member_slider carousel"></div>');
                    var member_slider=$(".member_slider");
                    member_slider.append('<a class="carousel-item"><img src="'+cur_media+team_info.member[0].logo_path+'">'+
                        '<span class="member_name">'+team_info.member[0].name+'</span>'+
                        '<span class="member_id">创始人</span></a>');
                    for(i=1;i<team_info.member.length;i++){
                        member_slider.append('<a class="carousel-item"><img src="'+cur_media+team_info.member[i].logo_path+'">'+
                            '<span class="member_name">'+team_info.member[i].name+'</span>'+
                            '<span class="member_id">成员</span></a>');
                    }
                    $('.carousel').carousel();
                }
                else{
                    member_div.append('<p class="empty_remainder">精彩等待开启</p>');
                }
                edit_team_member();
            });

            //保存对团队成员的编辑
            $("#save_team_member").on("click",function(){
                for(j=0;j<new_member.length;j++){
                    team_info.member.push(new_member[j]);
                }
                for(j=0;j<delete_member.length;j++){
                    for(k=0;k<team_info.member.length;k++){
                        if(team_info.member[k].id==delete_member[j]){
                            team_info.member.splice(k, 1);
                        }
                    }
                }
                for(i=0;i<delete_member.length;i++){
                    $.ajax({
                        type: "post",
                        url: cur_site + "team/rm_team_stu/",
                        dataType: "json",
                        data: {'tid': tid, 'sid': delete_member[i],'token':token},
                        success: function () {
                        }
                    });
                }

                var member_div=$(".member_div");
                member_div.empty().append('<div class="sub_title"><span>团队成员</span>'+
                    '<a id="edit_team_member" class="btn-floating waves-effect waves-light"><i class="material-icons" id="edit_team_member_icon">edit</i></a>'+
                    '</div>');

                //在有团队成员的情况下才显示
                if(team_info.member.length>0){
                    member_div.append('<div class="member_slider carousel"></div>');
                    var member_slider=$(".member_slider");
                    member_slider.append('<a class="carousel-item"><img src="'+cur_media+team_info.member[0].logo_path+'">'+
                        '<span class="member_name">'+team_info.member[0].name+'</span>'+
                        '<span class="member_id">创始人</span></a>');
                    for(i=1;i<team_info.member.length;i++){
                        member_slider.append('<a class="carousel-item"><img src="'+cur_media+team_info.member[i].logo_path+'">'+
                            '<span class="member_name">'+team_info.member[i].name+'</span>'+
                            '<span class="member_id">成员</span></a>');
                    }
                    $('.carousel').carousel();
                }
                else{
                    member_div.append('<p class="empty_remainder">精彩等待开启</p>');
                }
                edit_team_member();
            });

        });

        function add_team_member(new_member,delete_member){
            $("#add_member_btn").on("click",function(){
                $("#add_member_modal").openModal();
                $(".add_member_modal_footer").append('<div class="modal_function"><a id="search_member_btn" class="waves-effect waves-light btn modal-action">' +
                    '<i class="material-icons">search</i><p>搜索</p></a></div>');
                search_student(new_member,delete_member);
                $("#close_add_member_modal").click(function(){
                    reverse_modal();
                });

            });
        }

        //搜索学生
        function search_student(new_member,delete_member){
            $("#search_member_btn").on('click',function(){
                var search_member_name=$("#search_member_name").val();
                if(search_member_name==""){
                    Materialize.toast("搜索内容不能为空",2000);
                }
                else{
                    $.ajax({
                        type: 'GET',
                        url: cur_site + "team/name2mail",
                        dataType: "json",
                        data: {'name': search_member_name,'token':token},
                        success: function (data) {
                            if(data.res.length==0){
                                student_not_exist(search_member_name,new_member,delete_member);
                            }
                            else{
                                student_exist(data.res,new_member,delete_member,search_member_name);
                            }
                        }
                    });
                }
            });
        }

        //搜索的学生不存在
        function student_not_exist(search_member_name,new_member,delete_member){
            $(".add_member_modal_content").append('<div class="not_find_div"><p id="not_find_msg">未找到该名字匹配的账号</p>'+
                '<p id="invite_msg">请在下方填写该成员的一个邮箱,我们将发送一份邀请注册的邮件至此邮箱,即可完成注册,在该成员完成注册之前,无法在成员列表显示该成员的姓名和头像</p>'+
                '<div class="input-field search_member_mail_area"><input id="enter_member_mail" type="text" class="validate">'+
                '<label for="enter_member_mail">输入一个该成员的邮箱</label></div></div>');
            $(".add_member_modal_footer").empty().append('<div class="modal_function"><a id="invite_member_btn" class="waves-effect waves-light btn modal-action"><p>添加成员</p></a></div>');
            $(".search_member_name_area").empty().append('<input id="search_member_name" type="text" class="validate">' +
                '<label for="search_member_name">输入成员姓名</label>'+
                '<a id="search_again" class="waves-effect waves-light btn modal-action">搜索</a>');

            var search_member_name_id=$("#search_member_name");
            search_member_name_id.next('label').attr('class','active');
            search_member_name_id.css('width','200px').val(search_member_name);
            search_again(new_member,delete_member);
            $("#enter_member_mail").val("");

            $("#invite_member_btn").on("click",function(){
                var member_mail_address=$("#enter_member_mail").val();
                if(member_mail_address==""){
                    Materialize.toast('添加邮箱不能为空',2000);
                }
                else{
                    $.ajax({
                        type: 'POST',
                        url: cur_site + "team/invite_stu/",
                        dataType: "json",
                        data: {"tid":tid,mail:member_mail_address,token:token},
                        success: function (data) {
                            if(data.err=='-3') {
                                Materialize.toast("帐号已存在", 2000);
                            }
                            else{
                                //对太长的邮箱做处理
                                if(member_mail_address.length>16) {
                                    member_mail_address = member_mail_address.slice(0, 1) + '***' + member_mail_address.slice(-12);
                                }
                                new_member.push({"name":member_mail_address,"logo_path":"student/avatar/default.jpg","id":data.msg});
                                $("#close_add_member_modal").click();
                                show_team_member_edit_area(new_member,delete_member);
                            }
                        }
                    });
                }
            });
        }

        //搜索的学生存在
        function student_exist(mail,new_member,delete_member,name){
            $(".add_member_modal_content").append('<div class="find_div"><select id="member_possible_mail"></select>'+
                '<label for="member_possible_mail"></label><div class="member_possible_avatar_area"><img id="member_avatar" src="">'+
                '</div></div>');
            $(".add_member_modal_footer").empty().append('<div class="modal_function"><a id="add_new_member_btn" class="waves-effect waves-light btn modal-action">' +
                '<i class="material-icons">add</i><p>添加</p></a></div>');

            var member_possible_mail=$("#member_possible_mail");
            for (i = 0; i < mail.length; i++) {
                member_possible_mail.append('<option value="' + mail[i].sid + '">' + mail[i].mail + '</option>');
            }
            $('select').material_select();

            //加载第一个选项的头像
            $.ajax({
                type: 'post',
                url: cur_site + "student/info/get/",
                dataType: "json",
                data: {'id': mail[0].sid},
                success: function (data) {
                    $("#member_avatar").attr("src", cur_media+data.avatar_path);
                }
            });

            //监听更换头像的动作
            member_possible_mail.on('change',function(){
                var select_temp="#member_possible_mail option:selected";
                var sid_temp=$(select_temp).val();//得到邮箱对应的sid
                $.ajax({
                    type: 'post',
                    url: cur_site + "student/info/get/",
                    dataType: "json",
                    data: {'id': sid_temp},
                    success: function (data) {
                        $("#member_avatar").attr("src", cur_media+data.avatar_path);
                    }
                });
            });

            //添加该成员
            $("#add_new_member_btn").on('click',function(){
                var select_temp="#member_possible_mail option:selected";
                var sid_temp=$(select_temp).val();//得到邮箱对应的sid
                var stu_path=($("#member_avatar").attr('src')).replace(cur_media,"");
                $.ajax({
                    type: 'POST',
                    url: cur_site + "team/add_team_stu/",
                    dataType: "json",
                    data: {"tid":tid,sid:sid_temp,token:token},
                    success: function (data) {
                        if(data.err=='0') {
                            new_member.push({"name":name,"logo_path":stu_path,"id":sid_temp});
                            $("#close_add_member_modal").click();
                            show_team_member_edit_area(new_member,delete_member);
                        }
                        else{
                            console.log('添加失败');
                        }
                    }
                });
            });


        }

        //二次搜索学生是否存在
        function search_again(new_member,delete_member){
            $("#search_again").on('click',function(){
                var search_member_name=$("#search_member_name").val();
                $.ajax({
                    type: 'GET',
                    url: cur_site + "team/name2mail",
                    dataType: "json",
                    data: {'name': search_member_name},
                    success: function (data) {
                        if(data.res.length!=0){
                            $(".not_find_div").remove();
                            $("#search_member_name").css('width','350px');
                            $("#search_again").remove();
                            student_exist(data.res,new_member,delete_member);
                        }
                    }
                });

            });
        }

        //关掉模态框的时候，恢复原来的内容
        function reverse_modal(){
            $('.add_member_modal_content').empty().append('<div id="add_member_modal_content">'+
            '输入姓名，搜索匹配头像和账号，可通过点击成员头像查看该成员个人主页。若有重名，请核对后进行选择。若成员未注册推荐注册，完善个人主页。</div>'+
            '<div class="input-field search_member_name_area"><input id="search_member_name" type="text" class="validate">' +
                '<label for="search_member_name">输入成员姓名</label></div>');
            $(".add_member_modal_footer").empty();
        }

        function show_team_member_edit_area(new_member,delete_member){
            var member_edit_div;
            if(new_member.length!=0||delete_member.length!=0){
                member_edit_div=$(".member_edit_div");
                member_edit_div.empty();
            }
            else{
                $(".member_div").empty().append('<div class="sub_title"><span>团队成员</span></div>' +
                    '<div class="member_edit_div"></div><div class="team_member_function_area">'+
                    '<a class="waves-effect waves-light btn" id="save_team_member">保存</a>'+
                    '<a class="waves-effect waves-light btn" id="cancel_team_member">取消</a></div>');
                member_edit_div=$(".member_edit_div");
            }
            var status;
            var has_creator=0;//记录是否有加载过创始人

            for(i=0;i<team_info.member.length;i++){
                status=0;
                for(k=0;k<delete_member.length;k++){
                    if(delete_member[k]==team_info.member[i].id){
                        status=1;
                    }
                }
                if(status==0){
                    var member_path=cur_media+team_info.member[i].logo_path;
                    var member_id='member_photo'+team_info.member[i].id;
                    var member_name=team_info.member[i].name;
                    //对太长的名字做处理
                    if(member_name.length>16) {
                        member_name = member_name.slice(0, 1) + '***' + member_name.slice(-12);
                    }
                    if(has_creator==0) {
                        has_creator=1;
                        member_edit_div.append('<div class="member_origin"><img src="'+member_path+'">'+
                            '<div class="delete_member" id="'+member_id+'"><i class="material-icons">remove</i></div><p class="member_origin_name">'+member_name+'</p>'+
                            '<p class="member_id">创始人</p></div>');
                    }
                    else {
                        member_edit_div.append('<div class="member_origin"><img src="'+member_path+'">'+
                            '<div class="delete_member" id="'+member_id+'"><i class="material-icons">remove</i></div><p class="member_origin_name">'+member_name+'</p>'+
                            '<p class="member_id">成员</p></div>');
                    }
                    
                }
            }
            for(j=0;j<new_member.length;j++){
                status=0;
                for(k=0;k<delete_member.length;k++){
                    if(delete_member[k]==new_member[j].id){
                        status=1;
                    }
                }
                if(status==0){
                    //对太长的名字做处理
                    if(new_member[j].name.length>16) {
                        new_member[j].name = new_member[j].name.slice(0, 1) + '***' + new_member[j].name.slice(-12);
                    }

                    if(has_creator==0){
                        has_creator=1;
                        member_edit_div.append('<div class="member_origin"><img src="'+cur_media+new_member[j].logo_path+'">'+
                            '<div class="delete_member" id=member_photo'+new_member[j].id+'><i class="material-icons">remove</i></div><p class="member_origin_name">'+new_member[j].name+'</p>'+
                            '<p class="member_id">创始人</p></div>');
                    }
                    else{
                        member_edit_div.append('<div class="member_origin"><img src="'+cur_media+new_member[j].logo_path+'">'+
                            '<div class="delete_member" id=member_photo'+new_member[j].id+'><i class="material-icons">remove</i></div><p class="member_origin_name">'+new_member[j].name+'</p>'+
                            '<p class="member_id">成员</p></div>');
                    }
                }
            }

            member_edit_div.append('<div class="add_member_div"><div id="add_member_btn"><i class="material-icons">add</i></div>'+
                '<p style="color:rgb(244,171,35);font-size: 17px;margin-top: 5px;">添加成员</p></div>');

            add_team_member(new_member,delete_member);
            delete_team_member(new_member,delete_member);
        }

        function delete_team_member(new_member,delete_member){
            $(".delete_member").on("click",function(){
                $("#delete_modal").openModal();
                var delete_id=$(this).attr('id').split('member_photo')[1];
                $("#confirm_delete_photo").click(function(){
                    delete_member.push(delete_id);
                    show_team_member_edit_area(new_member,delete_member);
                });
            });
        }
    }



});