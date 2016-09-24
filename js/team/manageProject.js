$(document).ready(function () {
    var wefaceBase_site = "http://110.64.69.101:8080/";

    $("#projectBtn").attr("href",wefaceBase_site+'team/manageProject/manageProject.html?tid='+getId());
    $('#resumeBtn').attr('href',wefaceBase_site + 'team/resumeManage/resume.html?t_id='+getId());
    $('#positionBtn').attr('href',wefaceBase_site + 'team/position/showPosition.html?t_id='+getId());

    var ajax_data={teamId:getId()};//获取信息的data
    var project=[];//记录该团队拥有的项目
    var team_id=getId();//得到团队的ID
    var tag=0;//记录是否有上传照片
    var pageActive=1;//记录当前所在页
    $.ajax({
        type: 'POST',
        data: ajax_data,
        url: cur_site + "team/product/search/",
        xhrFields: {withCredentials: true},
        dataType: 'json',
        success: function (data) {
            console.log(data);
            for(var i=0;i<data.msg.length;i++){
                project.push(data.msg[i]);
            }
            showProject(project,pageActive);
            showPage(project,pageActive);
            addProject(project);
            changePage(project,pageActive);
            deleteProject(project,pageActive);
            rewriteProject(project);
            showDetail(pageActive);
        }
    });

    function showProject(project,pageActive){//显示出记录
        var begin=(pageActive-1)*10;
        if(project.length-begin<=10){
            for(var i=begin;i<project.length;i++){
                $(".show_project").append('<div class="project_card" id="'+project[i].id+'"><p class="project_name">'+project[i].name+'</p>'+
                    '<span id="function_btn"><a class="btn-floating btn-large waves-effect waves-light white delete_project">'+
                    '<i class="material-icons" style="color:orange">remove</i></a>'+'' +
                    '<a class="btn-floating btn-large waves-effect waves-light white edit_project">'+
                    '<i class="material-icons" style="color:orange">edit</i></a></span> </div>');
            }
        }
        else{
            for(var j=begin;j<begin+10;j++){
                $(".show_project").append('<div class="project_card" id="'+project[j].id+'"><p class="project_name">'+project[j].name+'</p>'+
                    '<span id="function_btn"><a class="btn-floating btn-large waves-effect waves-light white delete_project">'+
                    '<i class="material-icons" style="color:orange">remove</i></a>'+'' +
                    '<a class="btn-floating btn-large waves-effect waves-light white edit_project">'+
                    '<i class="material-icons" style="color:orange">edit</i></a></span> </div>');
            }
        }
    }

    function showDetail(pageActive){//点击显示详情
        $(".project_name").on("click",function(){
            pageActive=$('.active_page a').text();
           var project_showId=$(this).parent().attr('id');
            $.ajax({
                type: 'POST',
                data: {productId: project_showId},
                url: cur_site + "team/product/info/",
                xhrFields: {withCredentials: true},
                dataType: 'json',
                success: function (text) {
                    $.ajax({
                        type: "get",
                        url: "showProject.html",
                        dataType: "html",
                        success: function (data) {
                            $("#main_page").html(data);
                            $("#show_product_name").text(text.msg.name+'项目');
                            $("#show_introduce").text(text.msg.content);
                            $("#show_achieve").text(text.msg.reward);
                            if(text.msg.img_path!="")
                                $("#show_photo").show().attr('src',cur_media+text.msg.img_path);
                            $("#goBackButton").on('click',function(){
                                updateShow(project,pageActive);
                            });
                        }
                    });

                }
            });

        });
    }

    function deleteProject(project,pageActive){//删除项目
        var delete_id;
        $(".delete_project").on("click",function(){
            $("#confirm_delete_project").openModal();
            delete_id=$(this).parent().parent().attr('id');//得到要被删除项目的id
        });
        $("#certain_delete_project").unbind('click').on("click",function(){//确定删除项目
            $.ajax({
                type: 'POST',
                data: {productId:delete_id},
                url: cur_site + "team/product/delete/",
                xhrFields: {withCredentials: true},
                dataType: 'json',
                success: function () {

                }
            });
            $("#confirm_delete_project").closeModal();
            var project_temp=[];
            for(var i=0;i<project.length;i++){
                project_temp.push(project[i]);
            }
            project.length=0;
            for(var j=0;j<project_temp.length;j++){
                if(project_temp[j].id!=delete_id)
                    project.push(project_temp[j]);
            }
            updateShow(project,pageActive);
        });
    }

    function rewriteProject(project){//对项目进行修改
        $(".edit_project").on('click',function(){
            var rewrite_id=$(this).parent().parent().attr('id');//进行修改的项目ID
            $.ajax({
                type: 'POST',
                data: {productId:rewrite_id},
                url: cur_site + "team/product/info/",
                xhrFields: {withCredentials: true},
                dataType: 'json',
                success: function (text) {
                    $.ajax({
                        type: "get",
                        url: "addProject.html",
                        dataType: "html",
                        success: function (data) {
                            $("#main_page").html(data);
                            var temp_id;
                            var project_msg = {
                                id: rewrite_id,
                                name: text.msg.name,
                                img_path: text.msg.img_path,
                                content: text.msg.content,
                                reward: text.msg.reward,
                                team_id: team_id
                            };
                            temp_id="#product_name";
                            $(temp_id).next('label').attr('class','active');
                            $(temp_id).val(project_msg.name);
                            if(project_msg.img_path!="")
                            $("#local_photo").attr("src",cur_media+project_msg.img_path);
                            temp_id="#introduce";
                            $(temp_id).next('label').attr('class','active');
                            $(temp_id).val(project_msg.content);
                            temp_id="#achieve";
                            $(temp_id).next('label').attr('class','active');
                            $(temp_id).val(project_msg.reward);
                            $(".put_photo_here").on("click",function(){
                                $("#update_photo").click().on("change",function(){
                                    var reader = new FileReader();
                                    reader.onload = function (evt) {
                                        $("#local_photo").attr("src", evt.target.result);
                                    };
                                    reader.readAsDataURL(this.files[0]);
                                    var formData = new FormData();
                                    formData.append('id', project_msg.id);
                                    formData.append('prod_img', this.files[0]);
                                    $.ajax({
                                        type: 'POST',
                                        data: formData,
                                        cache:false,
                                        url: cur_site + "team/product/save_img/",
                                        processData: false,
                                        contentType: false,
                                        dataType: 'json'
                                    }).done(function(res){
                                        console.log(res);
                                        project_msg.img_path=res.msg;//得到项目的照片
                                    })
                                });
                            });
                            //保存修改
                            $("#saveButton").on("click",function(){
                                project_msg.name=$("#product_name").val();
                                project_msg.content=$("#introduce").val();
                                project_msg.reward=$("#achieve").val();
                                //对project里的内容进行修改
                                for(var i=0;i<project.length;i++){
                                    if(project_msg.id==project[i].id){
                                        project[i]=project_msg;
                                    }
                                }
                                $.ajax({
                                    type: 'POST',
                                    data: project_msg,
                                    url: cur_site + "team/product/update/",
                                    xhrFields: {withCredentials: true},
                                    dataType: 'json',
                                    success: function () {
                                        updateShow(project,pageActive);
                                    }
                                });
                            });
                            //取消修改
                            $("#cancelButton").on("click",function(){
                                var up;
                                for(var i=0;i<project.length;i++){
                                    if(project_msg.id==project[i].id){
                                        up=project[i];
                                    }
                                }
                                $.ajax({
                                    type: 'POST',
                                    data: up,
                                    url: cur_site + "team/product/update/",
                                    xhrFields: {withCredentials: true},
                                    dataType: 'json',
                                    success: function () {
                                        updateShow(project,pageActive);
                                    }
                                });
                            });
                        }
                    });
                }
            });
        });
    }


    function showPage(project,pageActive){
        var pageNum=parseInt(project.length/11)+1;
        var temp_page=".show_page";
        $(temp_page).css('opacity','1').css('width',100*pageNum+'px');
        var temp_class=".pagination";
        if(pageNum!=1){//如果不止一页,进行追加
            $(temp_class).empty().append(' <li id="upPage"><a><i class="material-icons">chevron_left</i></a></li>');
            for(var i=1;i<=pageNum;i++){
                $(temp_class).append(' <li id="page'+i+'"><a>'+i+'</a></li>');
            }
            $(temp_class).append('<li id="downPage"><a><i class="material-icons">chevron_right</i></a></li>');
        }
        else{
            $(temp_page).css('width','200px');
            $(temp_class).empty().append(' <li id="upPage"><a><i class="material-icons">chevron_left</i></a></li> <li id="page1"><a>1</a></li><li id="downPage"><a><i class="material-icons">chevron_right</i></a></li>');

        }
        if(pageActive==1){
            $("#upPage").attr('class','disabled');
            $("#downPage").attr('class','waves-effect');
            $("#page1").attr('class','active_page');
        }
        else if(pageActive==pageNum){
            $("#downPage").attr('class','disabled');
            $("#upPage").attr('class','waves-effect');
            $("#page"+pageNum).attr('class','active_page');
        }
        else{
            $("#page"+pageActive).attr('class','active_page');
        }
    }

    function addProject(project){
        $("#add_project_btn").on("click",function() {
            $.ajax({
                type: "get",
                url: "addProject.html",
                dataType: "html",
                success: function (data) {
                    $("#main_page").html(data);
                    var project_msg={
                        id:"",
                        name:"",
                        img_path:"",
                        content:"",
                        reward:"",
                        team_id:team_id
                    };
                    addPhoto(project_msg);//添加项目照片,获得product的完整信息
                    //监听对项目的保存
                    $("#saveButton").on("click",function(){
                        if(tag==0){//表示没有得到项目的ID
                            project_msg.name=$("#product_name").val();
                            project_msg.img_path="";
                            project_msg.content=$("#introduce").val();
                            project_msg.reward=$("#achieve").val();
                            $.ajax({
                                type: 'POST',
                                data: project_msg,
                                url: cur_site + "team/product/insert/",
                                xhrFields: {withCredentials: true},
                                dataType: 'json',
                                success: function (data) {
                                    project_msg.id=data.msg;
                                    $.ajax({
                                        type: 'POST',
                                        data: project_msg,
                                        url: cur_site + "team/product/update/",
                                        xhrFields: {withCredentials: true},
                                        dataType: 'json',
                                        success: function () {
                                            project.push(project_msg);
                                            updateShow(project,pageActive);
                                        }
                                    });
                                }
                            });
                        }
                        else{
                            $.ajax({
                                type: 'POST',
                                data: project_msg,
                                url: cur_site + "team/product/update/",
                                xhrFields: {withCredentials: true},
                                dataType: 'json',
                                success: function () {
                                    project.push(project_msg);
                                    updateShow(project,pageActive);
                                }
                            });
                        }
                    });

                    //监听取消修改,删除之前上传的项目
                    $("#cancelButton").on("click",function(){
                        if(tag==0)//表示新项目没有上传到服务器
                            updateShow(project,pageActive);
                        else{
                            $.ajax({
                                type: 'POST',
                                data: {productId:project_msg.id},
                                url: cur_site + "team/product/delete/",
                                xhrFields: {withCredentials: true},
                                dataType: 'json',
                                success: function () {
                                    updateShow(project,pageActive);
                                }
                            });
                        }
                    });
                }
            });
        });
    }

    function addPhoto(project_msg){
        $(".put_photo_here").on("click",function(){
            project_msg.name=$("#product_name").val();
            project_msg.img_path="";
            project_msg.content=$("#introduce").val();
            project_msg.reward=$("#achieve").val();
            //点击添加照片之前需要需要先post,得到项目的ID
            $.ajax({
                type: 'POST',
                data: project_msg,
                url: cur_site + "team/product/insert/",
                xhrFields: {withCredentials: true},
                dataType: 'json',
                success: function (data) {
                    console.log(data);
                    project_msg.id=data.msg;
                    tag=1;
                    $("#update_photo").click();
                }
            });
            $("#update_photo").click().on("change",function(){
                var reader = new FileReader();
                reader.onload = function (evt) {
                    $("#local_photo").attr("src", evt.target.result);
                };
                reader.readAsDataURL(this.files[0]);
                var formData = new FormData();
                formData.append('id', project_msg.id);
                formData.append('prod_img', this.files[0]);
                $.ajax({
                    type: 'POST',
                    data: formData,
                    cache:false,
                    url: cur_site + "team/product/save_img/",
                    processData: false,
                    contentType: false,
                    dataType: 'json'
                }).done(function(res){
                    console.log(res);
                    project_msg.img_path=res.msg;//得到项目的照片
                })
            });
        });
    }

    function updateShow(project,pageActive){
        $("#main_page").empty().append('<div class="comWidth add_project_div"><div id="add_msg">添加更多项目'+
            '<a class="btn-floating btn-large waves-effect waves-light orange" id="add_project_btn">'+
            '<i class="material-icons">add</i></a></div></div>'+
            '<div class="comWidth show_project"></div><div class="show_page">'+
            '<ul class="pagination"></ul></div>');
        showProject(project,pageActive);
        showPage(project,pageActive);
        addProject(project);
        changePage(project,pageActive);
        deleteProject(project,pageActive);
        rewriteProject(project);
        showDetail();
        tag=0;
    }

    function changePage(project,pageActive){//换页操作
        var total=project.length;
        var newPageProject=[];//记录新的一页的记录
        $(".show_page li").on("click",function(){

            if($(this).attr('id')=='upPage') {
                if (pageActive == 1) {
                    Materialize.toast('已经是第一页了', 2000);
                    return;
                }
                else {
                    pageActive = pageActive - 1;
                }
            }
            else if($(this).attr('id')=='downPage'){
                if (pageActive == parseInt(project.length/11)+1) {
                    Materialize.toast('已经是最后一页了', 2000);
                    return;
                }
                else {
                    pageActive = pageActive + 1;
                }
            }
            else{
                pageActive=parseInt($(this).children('a').text());
            }
            /*if(total-(pageActive-1)*10>10) {
                for (var i = 0; i < 10; i++) {
                    newPageProject.push(project[(pageActive - 1) * 10 + i]);
                }
            }
            else{
                for(i=0;i<project.length%10;i++){
                    newPageProject.push(project[(pageActive-1)*10+i]);
                }
            }*/
            $(".show_project").empty();
            showProject(project,pageActive);
            showPage(project,pageActive);
            changePage(project,pageActive);
            deleteProject(project,pageActive);
            rewriteProject(project);
            showDetail(pageActive);
        });
    }

});