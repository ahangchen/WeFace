// 简历处理的js
$(function(){
    // 获得参数数组
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
    function getSex(id){
        if(id == 1){
            return "男";
        }
        if(id == 2){
            return "女";
        }
        else {
            return "未定";
        }
    }
    // 从URL中获取投递的id
    var apply_id = getUrlVar('a_id');
    var t_id = getUrlVar('t_id');
    var postData ={
        apply_id:apply_id
    };
    var wefaceBace_site = "http://110.64.69.101:8080/";
    $('#resumeBtn').attr('href',wefaceBace_site + 'team/resumeManage/resume.html?t_id='+t_id);
    $('#positionBtn').attr('href',wefaceBace_site + 'team/position/showPosition.html?t_id='+t_id);
    $("#returnBtn").attr("href","resume.html?t_id="+t_id);

    var resumeInfo = {
        imgSrc:"",
        name:"",
        sex:"",
        age:"",
        mail:"",
        tel:"",
        school:"",
        depart:"",
        grade:"",
        addr:"",
        resumePath:""
    };
    $.ajax({
        type:'post',
        data:postData,
        url:cur_site + "team/apply/info/",
        dataType:"json",
        success:function(data){
            resumeInfo.imgSrc = cur_media + data.avatar_path;
            resumeInfo.name = data.name;
            resumeInfo.sex = getSex(data.sex);
            resumeInfo.age = data.age;
            resumeInfo.mail = data.mail;
            resumeInfo.tel = data.tel;
            resumeInfo.school = data.school;
            resumeInfo.depart = data.major;
            resumeInfo.addr = data.location;
            resumeInfo.resumePath = data.resume_path;
            resumeInfo.grade = data.grade;
            initForm(resumeInfo);
        },
        error:function(data){
            console.log(data.msg);
        },
        headers:{
            "Access-Control-Allow-Origin":"*"
        }
    });

    $('#send').click(function(){
        $('.sendMail').css('display','block');

    });
    $('#unsend').click(function(){
        $('.sendMail').css('display','none');
    });
    $("#solveBtn").click(function(){
        var mailText = $('.mailContent').val();
        var mailData = {
            apply_id:apply_id,
            text:mailText
        };
        var selectVar = $('input[name="group1"]:checked').val();
        var solveData = {
            apply_id:apply_id,
            state:selectVar
        };
        var isSend = $('input[name="mailGroup"]:checked').val();
        if(isSend) {
            $.ajax({
                type: "post",
                url: cur_site + "team/apply/mail/",
                data: mailData,
                dataType: "json",
                success: function (data) {
                    console.log("邮件发送成功");
                },
                error: function (data) {
                    console.log(data.msg);
                },
                headers: {
                    "Access-Control-Allow-Origin": "*"
                }
            });
        }
        $.ajax({
            type:"post",
            url:cur_site + "team/apply/handle/",
            data:solveData,
            dataType:"json",
            success:function(data){
                alert("处理成功");
            },
            error:function(data){
                console.log(data.msg);
            },
            headers:{
                "Access-Control-Allow-Origin":"*"
            }
        });
    });
    // 点击链接下载文件
    $('.resumeName').click(function(){
        window.location.href = resumeInfo.resumePath;
    });

    function initForm(info){
        $('.infoCard .imgBox img').attr('src',info.imgSrc);
        if(info.school == ""){
            $(".schoolChip").css('display','none');
        }
        else{
            $(".school").html(info.school);
        }
        if(info.addr == ''){
            $('addr').css('display','none');
        }
        else {
            $(".addr").html(info.addr);
        }
        $(".name").html(info.name);
        $(".sex").html(info.sex);
        $(".age").html(info.age+"岁");
        $(".mail").html(info.mail);
        $(".tel").html(info.tel);
        $(".department").html(info.depart);
        $(".grade").html(info.grade);
        var subPath = info.resumePath.split('/');
        var pathLen = subPath.length;
        var fileName = subPath[pathLen-1];
        $(".resumeName").html(fileName);
    }
});



















