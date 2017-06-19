$(document).ready(function(){
   $('select').material_select();
   var sid = (location.search.split("=")[1]).split('&')[0];
   var token=location.search.split("token=")[1];
   var stu_msg,about_me;
   //记录新的头像
    var new_avatar;
    var new_file;
   $.ajax({
       type:'POST',
       url:cur_site + 'student/info/get/',
       dataType:'json',
       data:{id:sid},
       success:function(data){
           console.log(data);
           if(data.err=='0'){
               stu_msg = data;
               $.ajax({
                   type:'POST',
                   url:cur_site+'student/resume/get/',
                   dataType:'json',
                   data:{stu_id:sid},
                   success:function(res){
                       if(res.err=='0'){
                           data.resume_path = res.resume_path;
                       }
                       else{
                           data.resume_path = '';
                       }
                       load_stu_basic(stu_msg);
                       listenToFileUpdate();
                       listenStudentBasicEdit(stu_msg);
                       $("#edit_stu_basic").click(function(){
                           $(this).css('display','none');
                           edit_stu_basic(stu_msg);
                       });
                       $(".stu_label_div .label_choice").click(function(){
                           if($(this).hasClass('active')){
                               $(this).removeClass('active');
                           }
                           else{
                               $(this).addClass('active');
                           }
                       });
                   }
               });
           }
       }
   });

   $.ajax({
       type:'POST',
       url:cur_site+'student/aboutme/get/',
       dataType:'json',
       data:{stu_id:sid},
       success:function(data){
           console.log(data);
           if(data.err=='0'){
               about_me=data;
               load_about_me(about_me);
               listenToEditaboutme();
               $("#edit_about_me").click(function(){
                   $(this).css('display','none');
                   edit_about_me(about_me);
               })
           }
       }
   });

   //加载学生的基本信息
   function load_stu_basic(data){
       $(".stu_nav_edit").removeClass('stu_nav_edit').addClass('stu_nav');
       $(".stu_nav_content").removeClass('no-display');
       $(".edit_stu_nav_content").addClass('no-display');
       var label_div = $(".label_div");
       label_div.empty();
       $("#edit_stu_basic").show();
       //加载喜欢个数
       $("#like_count").html(data.likes);
       //加载头像
       $("#stu_logo").attr('src',cur_media+data.avatar_path);
       //加载名字
       if(data.name!=""){
           $("#stu_name").html(data.name);
       }
       else{
           $("#stu_name").html('姓名');
       }
       //加载性别
       if(data.sex!=-1){
           if(data.sex==1){
               $("#sex").attr('src','../res/imgs/stu/male.svg');
           }
           else{
               $("#sex").attr('src','../res/imgs/stu/female.svg');
           }
       }
       else{
           $("#sex").css('opacity','0');
       }
       //加载头衔
       if(data.title!=''){
           $("#stu_title").html(data.title);
       }
       else{
           $("#stu_title").html('头衔');
       }
       //加载个性签名
       if(data.personal_signature!=''){
           $("#stu_slogan").html(data.personal_signature);
       }
       else{
           $("#stu_slogan").html('个性签名');
       }
       //加载标签
       if(data.is_engineering!=0){
           label_div.append('<div class="stu_label chip">工程</div>');
       }
       if(data.is_humanity!=0){
           label_div.append('<div class="stu_label chip">艺术</div>');
       }
       if(data.is_literature!=0){
           label_div.append('<div class="stu_label chip">人文</div>');
       }
       if(data.is_management!=0){
           label_div.append('<div class="stu_label chip">经管</div>');
       }
       //加载简历
       if(data.resume_path!=''){
           $("#upload_resume").html("我的原始简历");
       }
   }

   //加载关于我的信息
    function load_about_me(data){
       var about_me_container = $(".about_me_container");
       $("#edit_about_me").show();
       about_me_container.removeClass('no-display');
       $(".about_me_container .about_me_div").remove();
       $(".edit_about_me_container").addClass('no-display');
       if(data.about_me_list.length!=0){
           $(".about_me_container .empty_remainder").addClass('no-display');
           for(var i=0;i<data.about_me_list.length;i++){
               about_me_container.append('<div class="about_me_div card"><div class="about_me_title">'+data.about_me_list[i].title+'</div>' +
                   '<div class="about_me_content">'+data.about_me_list[i].text+'</div></div>');
           }
       }
       else{
           $(".about_me_container .empty_remainder").removeClass('no-display');
       }
    }

    //编辑关于我
    function edit_about_me(data){
        $(".edit_about_me_div .input-field .edit_title").val('');
        $(".edit_about_me_div .input-field .edit_content").val('');
        var placeholder_text = {
            "0":['输入板块名称(比如:我)','综合的自我介绍描述，可以古怪机灵，可以逗趣，让别人感受到你的与众不同；你的生活学习给你带来了什么擅长的东西；' +
            '你有哪些传奇的经历和感受；你给自己的标签和定位；'],
            "1":['输入板块名称(比如:个人经历)','描述你的在校和个人经历、成就，充分展示你的个性和实力。不管是专业领域还是兴趣爱好，更具个性风格的描述会吸引更多人的关注哟。'],
            "2":['输入板块名称(比如:实习经历)','你的社会经历和实习经历。你在这些经历中培养出的专业技能，以及你所擅长的职责。']
        };
        $(".about_me_container").addClass('no-display');
        $(".edit_about_me_container").removeClass('no-display');
        var j=0;
        for(var i=0;i<data.about_me_list.length;i++){
            $(".edit_title").eq(i).val(data.about_me_list[i].title);
            $(".edit_about_me_div .input-field").eq(i).attr('id','module'+data.about_me_list[i].about_me_id);
            $(".edit_content").eq(i).val(data.about_me_list[i].text);
        }
        while(j<3){
            $(".edit_title").eq(j).attr('placeholder',placeholder_text[j][0]);
            $(".edit_content").eq(j).attr('placeholder',placeholder_text[j][1]);
            j++;
        }

    }

    //编辑学生基本信息
    function edit_stu_basic(stu_msg){
        var edit_stu_nav_img = $(".edit_stu_nav_img img");
        $(".stu_nav").removeClass('stu_nav').addClass('stu_nav_edit');
        $(".stu_nav_content").addClass('no-display');
        $(".edit_stu_nav_content").removeClass('no-display');
        //加载已有信息
        edit_stu_nav_img.attr('src',cur_media+stu_msg.avatar_path);
        if(stu_msg.name!=''){
            var stu_name_input = $("#stu_name_input");
            stu_name_input.next('label').attr('class','active');
            stu_name_input.val(stu_msg.name);
        }
        if(stu_msg.title!=''){
            var stu_title_input = $("#stu_title_input");
            stu_title_input.next('label').attr('class','active');
            stu_title_input.val(stu_msg.title);
        }
        if(stu_msg.personal_signature!=''){
            var person_signature_input = $("#personal_signature");
            person_signature_input.next('label').attr('class','active');
            person_signature_input.val(stu_msg.personal_signature);
        }
        if(stu_msg.school!=''){
            var school_name_input =  $("#school_name");
            school_name_input.next('label').attr('class','active');
            school_name_input.val(stu_msg.school);
        }
        if(stu_msg.sex!=-1){
            var sex_seletor = $(".stu_basic_edit_div #stu_sex");
            sex_seletor.find('option[value="'+stu_msg.sex+'"]').attr("selected",true);
            sex_seletor.material_select();
        }
        if(stu_msg.grade!=-1){
            var grade_seletor = $(".stu_basic_edit_div #stu_grade");
            grade_seletor.find('option[value="'+stu_msg.grade+'"]').attr("selected",true);
            grade_seletor.material_select();
        }
        if(stu_msg.is_engineering!=0){
            $(".label_choice").eq(0).addClass('active');
        }
        if(stu_msg.is_humanity!=0){
            $(".label_choice").eq(1).addClass('active');
        }
        if(stu_msg.is_literature!=0){
            $(".label_choice").eq(2).addClass('active');
        }
        if(stu_msg.is_management!=0){
            $(".label_choice").eq(3).addClass('active');
        }
    }

    //关于上传简历和头像的监听
    function listenToFileUpdate(){
        //上传头像
        $("#orign_stu_avatar").click(function(e){
            $("#upload_stu_logo").click();
        });
        $("#upload_stu_logo").change(function(){
            var reader = new FileReader();
            new_avatar = $(this)[0].files[0];
            reader.onload = function (evt) {
                $("#orign_stu_avatar").attr("src", evt.target.result);
            };
            reader.readAsDataURL(new_avatar);
        });

        //上传简历
        $("#upload_resume").click(function(){
            $("#upload_stu_resume").click();
        });
        $("#upload_stu_resume").change(function(){
            new_file = $(this)[0].files[0];
            if(new_file.name.length<15){
                $("#upload_resume").html(new_file.name);
            }
            else{
                $("#upload_resume").html(new_file.name.split('.')[0].slice(0,5)+'XXX.'+new_file.name.split('.')[1]);
            }
        });
    }

    //关于对保存和取消对基本信息的修改
    function listenStudentBasicEdit(stu_msg){
        //取消
        $("#cancel_stu_info").click(function(){
            $("#edit_stu_basic").show();
            $(".stu_nav").addClass('stu_nav').removeClass('stu_nav_edit');
            $(".label_choice").removeClass('active');
            $(".stu_nav_content").removeClass('no-display');
            $(".edit_stu_nav_content").addClass('no-display');
            load_stu_basic(stu_msg);
        });

        //保存
        $("#save_stu_info").click(function(){
            //得到填写的基本信息
            var name = $("#stu_name_input").val();
            var title = $("#stu_title_input").val();
            var personal_signature = $("#personal_signature").val();
            var school_name = $("#school_name").val();
            var stu_sex = $("#stu_sex").val();
            var stu_grade = $("#stu_grade").val();
            var is_engineering = 0;
            var is_humanity = 0;
            var is_literature = 0;
            var is_management = 0;
            var label_choice = $('.label_choice');
            for(var i=0;i<label_choice.length;i++){
                if(label_choice.eq(i).hasClass('active')){
                    switch(i){
                        case 0:
                            is_engineering = 1;
                            break;
                        case 1:
                            is_humanity = 1;
                            break;
                        case 2:
                            is_literature = 1;
                            break;
                        case 3:
                            is_management = 1;
                            break;
                    }
                }
            }
            var formData;

            if(new_file!=undefined){
                //上传简历
                formData = new FormData();
                formData.append('id', sid);
                formData.append('resume', new_file);
                // formData.append('token', token);
                $.ajax({
                    url: cur_site + "student/resume/upload/",
                    type: "POST",
                    cache: false,
                    dataType: 'json',
                    data: formData,
                    processData: false,
                    contentType: false
                }).done(function (res) {
                    console.log(res);
                    stu_msg.resume_path = res.path;
                });
            }

            if(new_avatar!=undefined){
                //上传头像
                formData = new FormData();
                formData.append('id', sid);
                formData.append('avatar', new_avatar);
                // formData.append('token', token);
                //上传logo
                $.ajax({
                    url: cur_site + "student/info/avatar/",
                    type: "POST",
                    cache: false,
                    dataType: 'json',
                    data: formData,
                    processData: false,
                    contentType: false
                }).done(function (res) {
                    console.log(res);
                    stu_msg.avatar_path=res.path;
                    //上传其他基本信息
                    $.ajax({
                        url:cur_site+"student/info/update/",
                        type:'POST',
                        dataType:'json',
                        data:{stu_id:sid,name:name,title:title,personal_signature:personal_signature,sex:stu_sex,school:school_name,grade:stu_grade,
                            avatar_path:stu_msg.avatar_path,is_engineering:is_engineering,is_humanity:is_humanity,is_literature:is_literature,is_management:is_management},
                        success:function(data){
                            console.log(data);
                            stu_msg.name = name;
                            stu_msg.title = title;
                            stu_msg.personal_signature = personal_signature;
                            stu_msg.school = school_name;
                            stu_msg.grade = stu_grade;
                            stu_msg.is_engineering = is_engineering;
                            stu_msg.is_literature = is_literature;
                            stu_msg.is_management = is_management;
                            stu_msg.is_humanity = is_humanity;
                            load_stu_basic(stu_msg);
                        }
                    })
                });
            }
            else{
                var post_data = {stu_id:sid,name:name,title:title,personal_signature:personal_signature,sex:stu_sex,school:school_name,grade:stu_grade,
                    avatar_path:stu_msg.avatar_path,is_engineering:is_engineering,is_humanity:is_humanity,is_literature:is_literature,is_management:is_management};
                //上传其他基本信息
                $.ajax({
                    url:cur_site+"student/info/update/",
                    type:'POST',
                    dataType:'json',
                    data:post_data,
                    success:function(data){
                        console.log(data);
                        stu_msg.name = name;
                        stu_msg.title = title;
                        stu_msg.personal_signature = personal_signature;
                        stu_msg.school = school_name;
                        stu_msg.grade = stu_grade;
                        stu_msg.is_engineering = is_engineering;
                        stu_msg.is_literature = is_literature;
                        stu_msg.is_management = is_management;
                        stu_msg.is_humanity = is_humanity;
                        load_stu_basic(stu_msg);
                    }
                })
            }
        });

    }

    //关于我保存取消的监听
    function listenToEditaboutme(){
        //取消对关于我的修改
        $("#cancel_about_me").click(function(){
            load_about_me(about_me);
        });

        //保存关于我
        $("#save_about_me").click(function(){
            var delete_id = [];
            var modify_id = [];
            var modify_title = [];
            var modify_content = [];
            var new_id = [];
            var new_title = [];
            var new_content = [];
            var title,content;
            var i=0;
            for(i=0;i<about_me.about_me_list.length;i++){
                title = $(".edit_title").eq(i).val();
                content = $(".edit_content").eq(i).val();
                var id= $(".edit_about_me_div .input-field").eq(i).attr('id').split('module')[1];
                if(title=='' && content==''){
                    delete_id.push(id);
                }
                else if(title!='' && content!=''){
                    modify_id.push(id);
                    modify_title.push(title);
                    modify_content.push(content);
                }
                else{
                    Materialize.toast('内容或标题不能为空',2000);
                    return;
                }
            }

            for(var k=0;k<modify_id.length;k++){
                for(var z=0;z<about_me.about_me_list.length;z++){
                    if(about_me.about_me_list[z].about_me_id==modify_id[k]) {
                        about_me.about_me_list[z].title = modify_title[k];
                        about_me.about_me_list[z].content = modify_content[k];
                    }
                }
                $.ajax({
                    type:'post',
                    url:cur_site+'student/aboutme/update/',
                    dataType:'json',
                    data:{about_me_id:modify_id[k],stu_id:sid,title:modify_title[k],text:modify_content[k]},
                    success:function(res){
                        console.log(res);
                    }
                });
            }

            for(var j=0;j<delete_id.length;j++){
                for(var r=0;r<about_me.about_me_list.length;r++){
                    if(about_me.about_me_list[r].about_me_id==delete_id[j])
                        about_me.about_me_list.splice(r,1);
                }
                $.ajax({
                    type:'post',
                    url:cur_site+'student/aboutme/del/',
                    dataType:'json',
                    data:{about_me_id:delete_id[j],stu_id:sid},
                    success:function(res){
                        console.log(res);
                    }
                });
            }

            while(i<3){
                title = $(".edit_title").eq(i).val();
                content = $(".edit_content").eq(i).val();
                if(title!=''&&content!=''){
                    new_title.push(title);
                    new_content.push(content);
                    $.ajax({
                        type:'post',
                        url:cur_site+'student/aboutme/add/',
                        dataType:'json',
                        data:{stu_id:sid,title:title,text:content},
                        success:function(res){
                            console.log(res);
                            new_id.push(res.about_me_id);
                            if(new_title.length==new_id.length) {
                                for (var t = 0; t < new_id.length; t++) {
                                    about_me.about_me_list.push({
                                        'about_me_id': new_id[t],
                                        'title': new_title[t],
                                        'text': new_content[t]
                                    });
                                }
                                console.log(about_me);
                                load_about_me(about_me);
                            }
                        }
                    });
                }
                else if((title==''&&content!='')||(title!=''&&content=='')){
                    Materialize.toast('内容或标题不能为空',2000);
                    return;
                }
                i++;
            }

            if(new_id==0){
                console.log(about_me);
                load_about_me(about_me);
            }
        });

        //清除输入
        $(".clear_content").click(function(){
            $(this).siblings().val('');
        });
    }


});