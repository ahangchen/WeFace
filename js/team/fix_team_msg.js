$(document).ready(function() {
    $('select').material_select();
    $('.modal-trigger').leanModal();
});

$(document).ready(function(){
    var tid=getId();
    var team_info={"tid":"","team_name":"","team_logo":"","team_member_cnt":"","team_slogan":"","team_about":"","team_history":"","team_type":"","team_label":"","team_tel":"","team_mail":"","team_imgs":"","team_member":""};//团队的基本信息
    var team_type=[];//团队的种类
    var id_temp;//用来保存冗余的id
    var class_temp;//用来保存冗余的class
    basic_team_msg(team_info);//得到团队的基本信息
    get_team_type(team_type);

    //监听照片的改变
    $(".put_photo_here").on("click",function(){
        $("#update_photo").click();
    });
    var photo_tag=0;//记录是否改变logo

    //监听是否有新照片上传
    $("#update_photo").on("change",function(){
        photo_tag=1;
        var reader = new FileReader();
        reader.onload = function (evt) {
            $("#local_photo").attr("src", evt.target.result);
        };
        reader.readAsDataURL(this.files[0]);
    });

    var old_label = [];//原始的label
    var new_label = [];//新加的label
    var delete_old_label = [];//删除的旧标签
    //对基本信息进行编辑
    $("#fix_msg_button").on("click",function(){
        var duplicate_id;
        old_label.length=0;
        new_label.length=0;
        delete_old_label.length=0;
        $("#remove_basic_msg").css("display","none");
        $("#fix_basic_msg_div").show();
        $("#fix_msg_button").css("opacity","0");
        $("#local_photo").attr('src', cur_media + team_info.team_logo);
        duplicate_id="#team_name";
        $(duplicate_id).next('label').attr('class','active');
        $(duplicate_id).val(team_info.team_name);
        duplicate_id="#team_number";
        $(duplicate_id).next('label').attr('class','active');
        $(duplicate_id).val(team_info.team_member_cnt+'人团队');
        duplicate_id="#team_slogan";
        $(duplicate_id).next('label').attr('class','active');
        $(duplicate_id).val(team_info.team_slogan);
        if (team_info.team_label.length == 0) {
            $('.chips-placeholder').material_chip({
                secondaryPlaceholder: '请输入团队标签(回车进行添加)'
            });
        }
        else {
            var team_label_data = [];
            for (var i = 0; i < team_info.team_label.length; i++) {
                var tag_temp = {
                    tag: team_info.team_label[i],
                    id: i
                };
                team_label_data.push(tag_temp);
            }
            $('.chips-initial').material_chip({//要用一定的格式
                data: team_label_data,
                placeholder: "请输入团队标签(回车进行添加)"
            });
            if (team_info.team_label.length == 8) {
                $('.chips-initial .input').remove();
            }
        }
        //初始化行业类型
        $('select').material_select('destroy');
        $(".select_type_div").append(' <select class="type_select"><option value="" disabled selected>选择行业类型</option></select>'+
        '<label>行业类型</label>');
        //初始化行业类型的选择框
        for(var j=0;j<team_type.length;j++){
            if(team_type[j].id!=team_info.team_type){
                $(".type_select").append('<option value="'+team_type[j].id+'">'+team_type[j].name+'</option>')
            }
            else
                $(".type_select").append('<option selected value="'+team_type[j].id+'">'+team_type[j].name+'</option>')
        }
        $(document).ready(function() {
            $('select').material_select();
        });

        //对团队标签进行增加和删除
        //对label的操作,对最原始的label,删除,不post,对新加的label删除直接post,记录新加的label,在取消的时候删除

        for(var k=0;k<team_info.team_label.length;k++){
            old_label.push(team_info.team_label[k]);
        }

        editlabel(old_label, new_label, delete_old_label);//增加标签
        deletelabel(old_label, new_label, delete_old_label);//删除标签
    });

    //完成修改对基本信息进行保存
    $("#saveButton").on('click',function(){
        //删除保留的旧的label,并得到当前需要保存的团队标签
        var new_team_label=[];
        if(delete_old_label.length!=0) {
            for (var p = 0;  p< old_label.length; p++) {
                var mark=0;
                for(var q=0;q<delete_old_label.length;q++){
                    if (old_label[p] == delete_old_label[q]) {
                        mark=1;
                    }
                }
                if(mark==0)
                    new_team_label.push(old_label[p]);
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
                    //console.log(data);
                }
            });
        }

        else{
            for (var w = 0; w < old_label.length; w++) {
                new_team_label.push(old_label[w]);
            }
        }
        for(var k=0;k<new_label.length;k++){
            new_team_label.push(new_label[k]);
        }

        //得到需要新上传的团队的名字
        var new_team_name=$("#team_name").val();
        //得到需要新上传的团队的标语
        var new_team_slogan= $("#team_slogan").val();
        //得到需要上传的团队类型
        class_temp=".type_select option:selected";
        var new_team_type_id=$(class_temp).val();
        var new_team_type_name;
        if(new_team_type_id==""){
            new_team_type_name="校园服务";
            new_team_type_id='1';
        }
        else
            new_team_type_name=$(class_temp).text();

        if (photo_tag == 1) {//表示有上传新的logo,保存
            var formData = new FormData();
            id_temp="#update_photo";
            formData.append('name', $(id_temp).val());
            formData.append('photo', $(id_temp)[0].files[0]);
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
                var new_logo_path=res.msg;//得到新的logo的路径
                //对team_info的一些内容进行修改
                team_info.team_name=new_team_name;
                team_info.team_slogan=new_team_slogan;
                team_info.team_logo=new_logo_path;
                team_info.team_label=new_team_label;
                team_info.team_type=new_team_type_id;
                update_basic(team_info,new_team_type_name);

            });
        }
        else{//没有上传新的logo
            //对team_info的一些内容进行修改
            team_info.team_name=new_team_name;
            team_info.team_slogan=new_team_slogan;
            team_info.team_label=new_team_label;
            team_info.team_type=new_team_type_id;
            update_basic(team_info,new_team_type_name);
        }
    });

    //取消对基本信息的修改
    $("#cancelButton").on("click",function(){
        var team_type_name;
        if(team_info.team_type==""){
            team_info.team_type='1';
        }
        for(var i=0;i<team_type.length;i++){
           if(team_type[i].id==team_info.team_type)
                team_type_name=team_type[i].name;
        }
        var length_temp=new_label.length;//是否有新增的label,如果有需要删除
        if(length_temp!=0){//存在新增的label
            for (var j = 0; j < new_label.length; j++) {
                var result = {
                    tid: tid,
                    name: new_label[j]
                };
                $.ajax({
                    type: 'POST',
                    data: result,
                    url: cur_site + "team/rm_team_label/",
                    xhrFields: {withCredentials: true},
                    dataType: 'json',
                    success: function (data) {
                        if(data.err=="0"){
                            update_basic(team_info,team_type_name);
                        }
                    }
                });
            }

        }
        else{//不存在新增的label
            update_basic(team_info,team_type_name);
        }
    });

    //点击对团队介绍进行分点
    click_to_dot("#intro_list_auto","#team_intro");
    var new_team_about;

    //对团队介绍进行修改
    $("#fix_team_intro").on("click",function(){
        $("#fix_team_intro").css("opacity","0");
        $("#team_introuduction").css("display","none");
        $(".team_intro").show();
        //加载团队介绍
        $("#team_intro").val(team_info.team_about);
    });
    //点击保存团队介绍的修改
    $("#intro_saveButton").on("click",function(){
        //得到修改过的团队介绍,并修改team_info
        new_team_about= $("#team_intro").val();
        team_info.team_about=new_team_about;
        update_other_msg(team_info,"#team_introuduction","about");
    });
    //点击取消团队介绍的修改
    $("#intro_cancelButton").on("click", function () {
        cancel_update_other_msg(team_info,"#team_introuduction","about");
    });

    //点击对团队历史进行分点
    click_to_dot("#history_list_auto","#team_history");
    var new_team_history;
    //对团队历史进行修改
    $("#fix_team_history").on("click",function(){
        $("#fix_team_history").css("opacity","0");
        $("#history_text").css("display","none");
        $(".team_history").show();
        //加载团队历史
        $("#team_history").val(team_info.team_history);
    });
    //点击保存团队历史的修改
    $("#history_saveButton").on("click",function(){
        //得到修改过的团队历史,并修改team_info
        new_team_history=$("#team_history").val();
        team_info.team_history=new_team_history;
        update_other_msg(team_info,"#history_text","history");
    });
    //点击取消团队历史的修改
    $("#history_cancelButton").on("click",function(){
        cancel_update_other_msg(team_info,"#history_text","history");
    });

    //对团队的联系方式进行编辑
    $("#team_connect").on("click",function(){
        var duplicate_id;
        $("#main_right_two").css("display","none");
        $(".connect").show();
        //加载团队联系方式的信息
        duplicate_id="#connect_tel";
        $(duplicate_id).next('label').attr('class','active');
        $(duplicate_id).val(team_info.team_tel);
        duplicate_id="#connect_mail";
        $(duplicate_id).next('label').attr('class','active');
        $(duplicate_id).val(team_info.team_mail);
        
    });
    //保存对团队联系方式的编辑
    $("#connect_saveButton").on("click",function(){
        team_info.team_mail=$("#connect_mail").val();
        team_info.team_tel=$("#connect_tel").val();
        var update_msg = {
            "tid": team_info.tid,
            "tel": team_info.team_tel,
            "mail": team_info.team_mail
        };
        $.ajax({
            type: 'POST',
            data: update_msg,
            url: cur_site + 'team/update_team_contact/',
            xhrFields: {withCredentials: true},
            dataType: 'json',
            success: function (data) {
                if(data.err=="0"){
                    $(".connect").css("display","none");
                    $("#main_right_two").show();
                    $("#member_information").html(team_info.team_tel + "<br>" + team_info.team_mail);
                }
            }
        })
    });

    //取消对团队联系方式的编辑
    $("#connect_cancelButton").on("click",function(){
        $(".connect").css("display","none");
        $("#main_right_two").show();
        $("#member_information").html(team_info.team_tel + "<br>" + team_info.team_mail);
    });

    var new_team_photo=[];//新增加的团队照片
    var old_team_photo=[];//记录一开始的团队照片
    var old_photo_delete=[];//记录删除掉的旧照片,只在保存的时候删除
    //对团队照片进行编辑
    $(".edit_team_photo").on("click",function(){
        new_team_photo.length=0;
        old_photo_delete.length=0;
        old_team_photo.length=0;
        for(var i=0;i<team_info.team_imgs.length;i++){
            old_team_photo.push(team_info.team_imgs[i]);
        }
        $(".edit_team_photo").css("opacity","0");
        $("#edit_photo_area").css("display","none");
        $(".team_photo_edit_div").show();
        //对团队照片进行显示
        append_photo_add(team_info.team_imgs.length,team_info.team_imgs);
        //监听对照片的移入移出事件
        listentomousemove();
        //监听对团队照片的增加
        click_load_team_photo(team_info,new_team_photo);
        //监听对团队照片的删除
        delete_team_photo(team_info,new_team_photo,old_photo_delete,old_team_photo);
    });

    //保存对团队照片的更改
    $("#save_photo_edit").on("click",function(){
        $(".team_photo_edit_div").css("display","none");
        $(".edit_team_photo").css("opacity","1");
        //对旧照片进行删除
        if(old_photo_delete.length==0){//没有删除旧照片
            if(team_info.team_imgs.length!=0){
                $("#edit_photo_area").show().empty().append('<div class="slider"><ul class="slides"> </ul>');
                // 团队图片动态加载
                for (var j = 0; j < team_info.team_imgs.length; j++) {
                    $(".slides").append('<li><img src="' + cur_media + team_info.team_imgs[j].path + '" class="piture "></li>')
                }
                // 开启slider
                $('.slider').slider({
                    full_width: true,
                    height: 250
                });
            }
            else{
                $("#edit_photo_area").empty().show();
            }
        }
        else{//有对旧照片进行操作
            for(var i=0;i<old_photo_delete.length;i++){
                var result = {'tid': tid, 'img_id': old_photo_delete[i].id};
                $.ajax({
                    type: "post",
                    url: cur_site + "team/rm_team_photo/",
                    dataType: "json",
                    xhrFields: {withCredentials: true},
                    data: result,
                    success: function () {
                        if(team_info.team_imgs.length!=0){
                            $("#edit_photo_area").show().empty().append('<div class="slider"><ul class="slides"> </ul>');
                            // 团队图片动态加载
                            for (var i = 0; i < team_info.team_imgs.length; i++) {
                                $(".slides").append('<li><img src="' + cur_media + team_info.team_imgs[i].path + '" class="piture "></li>')
                            }
                            // 开启slider
                            $('.slider').slider({
                                full_width: true,
                                height: 250
                            });
                        }
                        else{
                            $("#edit_photo_area").empty().show();
                        }

                    }
                });
            }
        }
    });

    //取消对团队照片的更改
    $("#cancel_photo_edit").on("click",function(){
        $(".team_photo_edit_div").css("display","none");
        $(".edit_team_photo").css("opacity","1");
        //删除新上传的照片,并更新team_info
        var temp_photo=[];
        for(var a=0;a<old_team_photo.length;a++){
            temp_photo.push(old_team_photo[a]);
        }
        for(var b=0;b<old_photo_delete.length;b++){
            temp_photo.push(old_photo_delete[b]);
        }
        team_info.team_imgs=temp_photo;
        if(new_team_photo.length==0){//没有新上传的照片
            if(team_info.team_imgs.length!=0){
                $("#edit_photo_area").show().empty().append('<div class="slider"><ul class="slides"> </ul>');
                // 团队图片动态加载
                for (var j = 0; j < team_info.team_imgs.length; j++) {
                    $(".slides").append('<li><img src="' + cur_media + team_info.team_imgs[j].path + '" class="piture "></li>')
                }
                // 开启slider
                $('.slider').slider({
                    full_width: true,
                    height: 250
                });
            }
            else{
                $("#edit_photo_area").empty().show();
            }
        }
        else{//存在新上传的照片删除
            for (var i = 0; i < new_team_photo.length; i++) {
                var result = {'tid': tid, 'img_id': new_team_photo[i].id};
                $.ajax({
                    type: "post",
                    url: cur_site + "team/rm_team_photo/",
                    dataType: "json",
                    xhrFields: {withCredentials: true},
                    data: result,
                    success: function () {
                        if(team_info.team_imgs.length!=0){
                            $("#edit_photo_area").show().empty().append('<div class="slider"><ul class="slides"> </ul>');
                            // 团队图片动态加载
                            for (var i = 0; i < team_info.team_imgs.length; i++) {
                                $(".slides").append('<li><img src="' + cur_media + team_info.team_imgs[i].path + '" class="piture "></li>')
                            }
                            // 开启slider
                            $('.slider').slider({
                                full_width: true,
                                height: 250
                            });
                        }
                        else{
                            $("#edit_photo_area").empty().show();
                        }
                    }
                });
            }

        }
    });


    //对团队成员进行编辑
    var new_team_member = [];
    $("#edit_member").on('click',function() {
        new_team_member.length=0;
        for(var i=0;i<team_info.team_member.length;i++){
            new_team_member.push(team_info.team_member[i]);
        }
        $("#edit_member").css("opacity","0");
        $("#team_member_icon").empty().append('<table id="team_member_table"></table>');
        $("#complete_edit_member").css("opacity", "1.0");//显示保存取消按钮
        show_team_member(team_info.team_member, team_info.team_member.length);//显示团队成员为编辑态
        member_moveon();//监听鼠标的移入移出事件
        add_member(new_team_member);//监听添加团队成员
        delete_member(new_team_member);//监听删除团队成员
    });

    //保存对团队成员的编辑,并对team_info进行修改
    $("#member_saveButton").on("click",function(){
        $("#complete_edit_member").css("opacity","0");
        $("#edit_member").css("opacity","1");
        $("#team_member_icon").empty().append('<table id="team_member_table"></table>');
        var temp_member=[];
        for(var a=0;a<new_team_member.length;a++){
            temp_member.push(new_team_member[a]);
        }
        team_info.team_member=temp_member;
        var line=parseInt(new_team_member.length/3)+1;//如果一行加三个成员,得到行数
        for(var i=1;i<=line;i++){
            $("#team_member_table").append('<tr id="line'+i+'"></tr>');
            if(i!=line){
                for(var j=0;j<3;j++){
                    $("#line"+i).append('<div class="Head_portrait_div "><div class="team_member_logo">'+
                        '<img id="'+new_team_member[(i-1)*3+j].id+'" src="'+cur_media+new_team_member[(i-1)*3+j].logo_path+'" alt="头像" class="Head_portrait" /></div>'
                        +'<span class="name">'+dealName(new_team_member[(i-1)*3+j].name)+'</span></div>')
                }
            }
            else{
                for(var k=0;k<new_team_member.length%3;k++){
                    $("#line"+i).append('<div class="Head_portrait_div "><div class="team_member_logo">'+
                        '<img id="'+new_team_member[(i-1)*3+k].id+'" src="'+cur_media+new_team_member[(i-1)*3+k].logo_path+'" alt="头像" class="Head_portrait" /></div>'
                        +'<span class="name">'+dealName(new_team_member[(i-1)*3+k].name)+'</span></div>')
                }
            }
        }
    });

    //取消对团队成员的编辑
    $("#member_cancelButton").on("click",function(){//取消对成员的编辑,全部删除,重新post
        var length_temp=new_team_member.length;
        var cnt=0;
        for(var i=0;i<new_team_member.length;i++){
            var result={"tid":tid,"sid":new_team_member[i].id};
            $.ajax({
                type: 'POST',
                url: cur_site + "team/rm_team_stu/",
                dataType: "json",
                data: result,
                success: function () {
                    cnt++;
                    if(cnt==length_temp){
                        for(var j=0;j<new_team_member.length;j++) {
                            var update = {"tid": tid, "sid": new_team_member[j].id};
                            $.ajax({
                                type: 'POST',
                                url: cur_site + "team/add_team_stu/",
                                dataType: "json",
                                data: update,
                                success: function (data) {
                                    //console.log(data);
                                }
                            });
                        }
                    }
                }
            });
        }
        $("#complete_edit_member").css("opacity","0");
        $("#edit_member").css("opacity","1");
        $("#team_member_icon").empty().append('<table id="team_member_table"></table>');
        var line=parseInt(team_info.team_member.length/3)+1;//如果一行加三个成员,得到行数
        for(var p=1;p<=line;p++){
            $("#team_member_table").append('<tr id="line'+p+'"></tr>');
            if(p!=line){
                for(var q=0;q<3;q++){
                    $("#line"+p).append('<div class="Head_portrait_div "><div class="team_member_logo">'+
                        '<img id="'+team_info.team_member[(p-1)*3+q].id+'" src="'+cur_media+team_info.team_member[(p-1)*3+q].logo_path+'" alt="头像" class="Head_portrait" /></div>'
                        +'<span class="name">'+dealName(team_info.team_member[(p-1)*3+q].name)+'</span></div>')
                }
            }
            else{
                for(var j=0;j<team_info.team_member.length%3;j++){
                    $("#line"+p).append('<div class="Head_portrait_div "><div class="team_member_logo">'+
                        '<img id="'+team_info.team_member[(p-1)*3+j].id+'" src="'+cur_media+team_info.team_member[(p-1)*3+j].logo_path+'" alt="头像" class="Head_portrait" /></div>'
                        +'<span class="name">'+dealName(team_info.team_member[(p-1)*3+j].name)+'</span></div>')
                }
            }
        }


    });


    
function basic_team_msg(team_info){
    $.ajax({
        type: 'GET',
        url: cur_site + "team/info/",
        dataType: "json",
        data: {'tid': tid},
        success: function (data) {
            console.log(data);
            team_info.tid=getId();
            team_info.team_name=data.res.name;
            team_info.team_logo=data.res.logo_path;
            team_info.team_slogan=data.res.slogan;
            team_info.team_about=data.res.about;
            team_info.team_history=data.res.history;
            team_info.team_type=data.res.b_type;
            team_info.team_member_cnt=data.res.man_cnt;
            team_info.team_label=data.res.label;
            team_info.team_mail=data.res.mail;
            team_info.team_tel=data.res.tel;
            team_info.team_imgs=data.res.imgs;
            team_info.team_member=data.res.stus;
        }
    });
}

    function get_team_type(team_type){
        $.ajax({
            type: "get",
            url: cur_site + "team/business/",
            dataType: "json",
            success: function (data) {
                for(var i=0;i<data.msg.length;i++){
                    team_type.push(data.msg[i]);
                }
            }
        });
    }

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
                    if(data.err=="0"){
                        if (label_num == 8) {
                            $('.chips-initial .input').remove();
                        }
                    }
                }
            });
        });

    }

    function deletelabel(old_label,new_label,delete_old_label){
        var label_num;
        $('.chips-initial').on('chip.delete', function (e, chip) {
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
                        if(data.err=="0"){
                            new_label.splice($.inArray(chip.tag, new_label), 1);//把删除的label从数组中去掉
                            if (label_num == 7) {//允许继续添加
                                $('.chips-initial').append('<input class="input" placeholder="请输入团队标签(回车进行添加)">');
                            }
                        }
                    }
                });
            }
            //如果是旧的标签进行记录
            else{
                delete_old_label.push(chip.tag);
            }
        });
    }

    function update_basic(team_info,new_team_type_name){
        var update_msg = {
            tid: team_info.tid,
            name: team_info.team_name,
            logo_path: team_info.team_logo.replace(cur_media,""),
            slogan: team_info.team_slogan,
            about: team_info.team_about,
            history: team_info.team_history,
            btype: parseInt(team_info.team_type)
        };
        $.ajax({
            type: 'POST',
            data: update_msg,
            url: cur_site + "team/update_team_info/",
            xhrFields: {withCredentials: true},
            dataType: 'json',
            success: function (data) {
                if(data.err=="0"){
                    $(".team_label_edit").empty().append('<div class="chips chips-initial chips-placeholder"></div>');
                    $(".select_type_div").empty();//清空行业类型的select
                    $("#fix_basic_msg_div").css("display","none");
                    $("#fix_msg_button").css("opacity", '1');
                    $("#remove_basic_msg").show();
                    $("#team_logo").attr("src",cur_media+ update_msg.logo_path);
                    $("#p1").text(update_msg.name);
                    $("#p2").text(new_team_type_name);
                    $("#p3").text(team_info.team_member_cnt+'人团队');
                    $("#p4").text(update_msg.slogan);
                    //动态加载div
                    var tag_cnt = team_info.team_label.length;
                    var temp="#information_three";
                    $(temp).empty();
                    for (var i = 0; i < tag_cnt; i++) {
                        $(temp).append('<div class="tag"></div>');
                    }
                    var tag = $(".tag");
                    for (var j = 0; j < team_info.team_label.length; j++) {
                        $(tag[j]).html(team_info.team_label[j]);
                    }
                }

            }
        });
    }

    function click_to_dot(list_id,dot_id){//点击进行分点,对团队介绍和团队历史
        $(list_id).on("click", function () {
            var team_dot=$(dot_id).val();
            $(dot_id).val(team_dot + '\n' + '◆').trigger('autoresize');
        });
    }

    function update_other_msg(team_info,show_where,update_what){//对历史和介绍进行更新
        var update_msg = {
            tid: team_info.tid,
            name: team_info.team_name,
            logo_path: team_info.team_logo.replace(cur_media,""),
            slogan: team_info.team_slogan,
            about: team_info.team_about,
            history: team_info.team_history,
            btype: parseInt(team_info.team_type)
        };
        $.ajax({
            type: 'POST',
            data: update_msg,
            url: cur_site + "team/update_team_info/",
            xhrFields: {withCredentials: true},
            dataType: 'json',
            success: function (data) {
                if (data.err == "0") {
                    if(update_what=="about")
                        $(show_where).show().html(team_info.team_about.replace(/\n/gm,'<br />'));
                    else
                        $(show_where).show().html(team_info.team_history.replace(/\n/gm,'<br />'));
                    $(show_where).parent().children(".row").css("display","none");
                    $(show_where).parent().children("a").css("opacity","1");
                }
            }
        });
    }

    function cancel_update_other_msg(team_info,show_where,update_what){
        if(update_what=="about")
            $(show_where).show().html(team_info.team_about.replace(/\n/gm,'<br />'));
        else
            $(show_where).show().html(team_info.team_history.replace(/\n/gm,'<br />'));
        $(show_where).parent().children(".row").css("display","none");
        $(show_where).parent().children("a").css("opacity","1");
    }

    function append_photo_add(photo_num,team_img) {//对团队照片进行布局
        //调整table的高度
        var temp="#team_photo_table";
        $(temp).empty().css('height', parseInt(photo_num / 3 + 1) * 160 + 'px');
        for(var i=0;i<parseInt(photo_num/3)+1;i++){
            $(temp).append('<tr id="line'+i+'"></tr>');
            for(var j=0;j<3;j++)
                $("#line"+i).append('<td id="row'+(i*3+j)+'"></td>');
        }
        for(var p=0;p<photo_num/3;p++) {
            if (p < parseInt(photo_num / 3)) {
                for (var q = 0; q < 3; q++) {
                    $("#row" + (p*3+q)).append('<div class="team_photo_div"><i class="material-icons delete_team_photo">close</i>'+
                        '<img src="' + cur_media + team_img[p * 3 + q].path + '" class="team_photo " id="'+team_img[p*3+q].id+'"></div>')
                }
            }
            else {
                for (var k = 0; k < photo_num % 3; k++) {
                    $("#row" + (p*3+k)).append('<div class="team_photo_div"><i class="material-icons delete_team_photo">close</i>'+
                        '<img src="' + cur_media + team_img[p * 3 + k].path + '" class="team_photo " id="'+team_img[p*3+k].id+'"></div>')
                }
            }
        }
        $("#row" + photo_num).append('<div class="put_team_photo_here">'+
            '<i class="material-icons" id="team_photo_adding">add</i>'+
            '<p style="margin-left: 25px;color:#fff;margin-top:-10px;">(图片上限为8)</p></div>'+
            '<form id="post_team_photo"  enctype="multipart/form-data">'+
            '<input type="file" name="photo" id="update_team_photo" style="display: none"></form>');

    }

    function listentomousemove(){//监听团队照片的移入移出事件
        //监听鼠标的移入事件
        $(".team_photo_div .team_photo").on("mouseover", function () {
            $(this).css("opacity", "0.3");
            $(this).parent().children('.delete_team_photo').css("visibility", "visible");
        }).on("mouseout", function () {//监听鼠标的移出事件
            $(this).css("opacity", "1");
            $(this).parent().children('.delete_team_photo').css("visibility", "hidden");
        });
    }

    function click_load_team_photo(team_info,new_team_photo){
        //监听添加团队照片的按钮
        $(".put_team_photo_here").on("click",function(){
            var team_photo_num = $(".team_photo").length;
            if (team_photo_num == 8) {
                alert('团队照片的上限为8!');
                return;
            }
            $("#update_team_photo").click();
        });
        $("#update_team_photo").on("change",function(){
            var reader = new FileReader();
            reader.onload = function () {
                //新增团队照片
                var formData = new FormData();
                formData.append('tid', team_info.tid);
                formData.append('photo', $('#update_team_photo')[0].files[0]);

                $.ajax({
                    type: 'POST',
                    data: formData,
                    cache: false,
                    url: cur_site + "team/add_team_photo/",
                    processData: false,
                    contentType: false,
                    dataType: 'json'
                }).done(function (res) {
                    var new_photo_id=res.msg;
                    $.ajax({
                        type: 'GET',
                        url: cur_site + "team/info/",
                        dataType: "json",
                        data: {'tid': team_info.tid},
                        success: function (data) {
                            team_info.team_imgs=data.res.imgs;
                            for(var i=0;i<team_info.team_imgs.length;i++){
                                if(team_info.team_imgs[i].id==new_photo_id)
                                    new_team_photo.push(team_info.team_imgs[i]);
                            }
                            append_photo_add(team_info.team_imgs.length,team_info.team_imgs);
                            listentomousemove();
                            delete_team_photo(team_info,new_team_photo,old_photo_delete,old_team_photo);
                            click_load_team_photo(team_info,new_team_photo);
                        }
                    });

                });
            };
            reader.readAsDataURL(this.files[0]);
        });
    }

    function delete_team_photo(team_info,new_team_photo,old_photo_delete,old_team_photo){
        //监听删除团队照片
        $(".team_photo_div .team_photo").on("click", function () {
            var delete_id = ($(this).attr("id"));
            var tag=0;//标志
            var photo_temp=[];//临时存放照片的位置
            var new_photo_temp=[];//临时存放新照片地方
            var all_photo_update=[];//临时存放所有照片的地方
            $('#confirm_delete').openModal();
            $("#yes").unbind('click').on('click',function() {//确认要对该团队照片进行删除
                $("#confirm_delete").closeModal();
                for(var i=0;i<old_team_photo.length;i++){
                    if(delete_id==old_team_photo[i].id) {
                        old_photo_delete.push(old_team_photo[i]);
                        tag = 1;
                    }
                    else{
                        photo_temp.push(old_team_photo[i]);
                    }
                }

                if(tag==1){//表示不应该删除,记录
                    old_team_photo.length=0;
                    for(var a=0;a<photo_temp.length;a++){
                        old_team_photo.push(photo_temp[a]);
                    }
                    photo_temp.length=0;

                }
                else{//表示删除的是新加的照片直接删除
                    for(var b=0;b<new_team_photo.length;b++){
                        if(new_team_photo[b].id!=delete_id){
                            new_photo_temp.push(new_team_photo[b]);
                        }
                    }
                    new_team_photo.length=0;
                    for(var c=0;c<new_photo_temp.length;c++){
                        new_team_photo.push(new_photo_temp[c]);
                    }
                    new_photo_temp.length=0;

                    var delete_photo = {'tid': tid, 'img_id': delete_id};
                    $.ajax({
                        type: "post",
                        url: cur_site + "team/rm_team_photo/",
                        dataType: "json",
                        xhrFields: {withCredentials: true},
                        data: delete_photo,
                        success: function (res) {
                            //console.log(res);
                        }
                    });
                }

                for(var d=0;d<new_team_photo.length;d++){
                    all_photo_update.push(new_team_photo[d]);
                }
                for(var e=0;e<old_team_photo.length;e++){
                    all_photo_update.push(old_team_photo[e]);
                }
                team_info.team_imgs=all_photo_update;
                append_photo_add(team_info.team_imgs.length,team_info.team_imgs);
                listentomousemove();
                delete_team_photo(team_info,new_team_photo,old_photo_delete,old_team_photo);
                click_load_team_photo(team_info,new_team_photo);
            });
        });
    }

    function show_team_member(team_member,member_cnt){
        var temp="#team_member_table";
        $(temp).empty();
        var line=parseInt(member_cnt/3)+1;//如果一行加三个成员,得到行数
        for(var i=1;i<=line;i++){
            var temp_line_id="#line"+i;
            $(temp).append('<tr id="line'+i+'"></tr>');
            if(i!=line){
                for(var j=0;j<3;j++){
                    $(temp_line_id).append('<div class="Head_portrait_div_edit "><div class="team_member_logo"><i class="material-icons delete_team_member">close</i>'+
                        '<img id="'+team_member[(i-1)*3+j].id+'" src="'+cur_media+team_member[(i-1)*3+j].logo_path+'" alt="头像" class="Head_portrait_edit" /></div>'
                        +'<span class="name">'+dealName(team_member[(i-1)*3+j].name)+'</span></div>')
                }
            }
            else{
                for(var k=0;k<member_cnt%3;k++){
                    $(temp_line_id).append('<div class="Head_portrait_div_edit "><div class="team_member_logo"><i class="material-icons delete_team_member">close</i>'+
                        '<img id="'+team_member[(i-1)*3+k].id+'" src="'+cur_media+team_member[(i-1)*3+k].logo_path+'" alt="头像" class="Head_portrait_edit" /></div>'
                        +'<span class="name">'+dealName(team_member[(i-1)*3+k].name)+'</span></div>')
                }
                $(temp_line_id).append('<a class="btn-floating add_member_btn waves-effect waves orange">'
                    +'<i class="material-icons" style="color:#fff">add</i></a>');
            }
        }
    }

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
        $(".add_member_btn").on('click',function(){
            $('#add_member_dialog').openModal();
        });
        $("#add_member_action").unbind("click").on('click',function(){//点击弹出框的功能键
            var funBtn=$("#add_member_action").text();
            if(funBtn=="搜索"){
                show_search_result();
            }
            else if(funBtn=="添加"){
                var temp=".search_member_logo";
                var add_id=$(temp).attr("id");
                var add_logo=$(temp).attr("src").replace(cur_media,"");
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
                    success: function () {
                        $('#add_member_dialog').closeModal();
                        $("#member_mail").empty();
                        $(".search_member_mail").css("display","none");
                        $(".search_member_logo").css("display","none");
                        $("#remainder_msg").css("display","none");
                        $("#invite_msg").css("display","none");
                        $("#new_member_mail_div").css("display","none");
                        $("#member_name").val("").parent().attr("class","input-field col s12");
                        $("#add_member_action").html("搜索");
                        $("#search_member_again").css("opacity","0");
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
                                $("#member_name").val("").parent().attr("class","input-field col s12");
                                $("#new_member_mail").val("");
                                $("#add_member_action").html("搜索");
                                $("#search_member_again").css("opacity","0");
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
            $("#member_name").val("").parent().attr("class","input-field col s12");
            $("#new_member_mail").val("");
            $("#add_member_action").html("搜索");
            $("#search_member_again").css("opacity","0");
        });

        $("#search_member_again").on("click",function(){
            show_search_result();
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
                    success: function () {
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

    function show_search_result(){
        $("#member_mail").empty();
        $(".search_member_mail").css("display","none");
        $(".search_member_logo").css("display","none");
        $("#remainder_msg").css("display","none");
        $("#invite_msg").css("display","none");
        $("#new_member_mail_div").css("display","none");
        $("#new_member_mail").val("");
        var temp_id="#member_name";
        var search_name=$(temp_id).val();
        if(search_name=="") {
            Materialize.toast("输入要搜索的姓名", 2000);
            return;
        }
        //显示重复搜索的button
        $("#search_member_again").css("opacity","1");
        $(temp_id).parent().attr("class","input-field col s12 m6 l6");
        $.ajax({
            type: 'GET',
            url: cur_site + "team/name2mail",
            dataType: "json",
            data: {'name': search_name},
            success: function (data) {
                var result_cnt=data.res.length;
                var search_result=data.res;
                var temp="#member_mail";
                if(result_cnt!=0) {
                    $('select').material_select('destroy');
                    $(".search_member_mail").empty().show().append('<select id="member_mail"></select>');
                    for (var i = 0; i < result_cnt; i++) {
                        $(temp).append('<option value="' + search_result[i].sid + '">' + search_result[i].mail + '</option>');
                    }
                    $(document).ready(function() {
                        $('select').material_select();
                    });
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

                    $(temp).on("change",function(){//如果改变了select中的值,头像跟着变
                        var select_temp="#member_mail option:selected";
                        //var mail_temp=$("#member_mail option:selected").text();//得到选择的邮箱
                        var sid_temp=$(select_temp).val();//得到邮箱对应的sid
                        $.ajax({
                            type: 'post',
                            url: cur_site + "student/info/get/",
                            dataType: "json",
                            data: {'id': sid_temp},
                            success: function (data) {
                                $(".search_member_logo").show().attr("src", cur_media+data.avatar_path).attr("id",sid_temp);
                            }
                        });

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

});