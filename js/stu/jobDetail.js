/**
 * Created by jewel on 16/7/23.
 */
$(function(){
    //得到参数数组

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
    // 学生点击职位名字后，主页在url上传职位id
    var jId = getUrlVar('job_id');
    var stu_id = getUrlVar('stu_id');
    var tId,jName,min,max,prov,city,town,addr,edu,exp,jobType,workType,sum,date,state,jobCmd,workCmd;
    var tName,tLogo,tAbout,tTel,tMail;
    var tLabel = new Array();
    var jobId = {
        id:jId
    };
    var a =  $.ajax({
        type:'post',
        data:jobId,
        url:cur_site + "team/job_info/",
        // url:"../js/stu/jobDetail.json",
        dataType:'json',
        success:function(data){
            if (data.err == 0){
                tId = data.team_id;
                jName = data.job_name;
                min = data.min_salary;
                max = data.max_salary;
                prov = data.prince;
                city = data.city;
                town = data.town;
                addr = data.address;
                edu = data.edu_cmd;
                exp = data.exp_cmd;
                jobType = data.job_type;
                workType = data.work_type;
                sum = data.summary;
                date = data.pub_date;
                state = data.pub_state;
                jobCmd = data.job_cmd;
                workCmd = data.work_cmd;
                initJobDetail();
                var teamId = {
                    tid:tId
                };
                var teamUrl = cur_site + "team/info/?tid="+tId;
                $.ajax({
                    type:'post',
                    url:teamUrl,
                    // url:'../js/stu/teamDetail.json',
                    data:teamId,
                    dataType:"json",
                    success:function(data){
                        tName = data.res.name;
                        tLogo= data.res.logo_path;
                        tAbout = data.res.about;
                        tTel = data.res.tel;
                        tMail = data.res.mail;
                        for (var i = 0; i < data.res.label.length; i++) {
                            tLabel[i] = data.res.label[i];
                        }
                        initTeamDetail();
                    },
                    error:function(data){
                        alert(data.msg);
                    },
                    headers:{
                        "Access-Control-Allow-Origin":"*"
                    }
                });
            }
        },
        error:function(data){
            alert("获取失败");
        },
        headers:{
            "Access-Control-Allow-Origin":"*"
        }
    });
    function initJobDetail(){
        var wType ;
        switch(workType){
            case "0":wType = "全职";break;
            case "1":wType = "兼职";break;
            case "2":wType = "实习";break;
        }
        if(jName != "") {
            $('#jobName').html(jName);
        }else {
            $('#jobName').html("暂无");
        }
        if(min != "") {
            $('#minSalary').html(min);
        }else {
            $('#minSalary').html("暂无");
        }
        if(max != "") {
            $('#maxSalary').html(max);
        }else {
            $('#maxSalary').html("暂无");
        }
        if(city != "") {
            $('#city').html(city);
        }else {
            $('#city').html("暂无");
        }
        if(edu != "") {

            $('#edu').html(edu);
        }else {
            $('#edu').html("暂无");
        }
        if(exp != "") {
            $('#exp').html(exp);
        }else{
            $('#exp').html("暂无");
        }
        if(wType != "") {
            $('#workType').html(wType);
        }else{
            $('#workType').html("暂无");
        }
        if(sum != "") {
            $('#sum').html(sum);
        }else{
            $('#sum').html("暂无");
        }
        if(date != "") {
            $('#pubDate').html(date);
        }else {
            $('#pubDate').html("");
        }
        if(jobCmd != "") {
            $('#jobCmd p').html(jobCmd);
        }else {
            $('#jobCmd p').html("暂无");
        }
        if(workCmd != "") {
            $('#workCmd p').html(workCmd);
        }else {
            $('#workCmd p').html("暂无");
        }

    }
    function initTeamDetail(){
        $('.name').html(tName);
        $('.teamLogoBar img').attr('src',cur_media+tLogo);
        $('#teamDesc ').html(tAbout);
        $('#email').html(tMail);
        $('#phone').html(tTel);
        for (var i = 0; i < tLabel.length; i++) {
            $('.teamTags').append('<div class="chip">'+tLabel[i]+'</div>');
        }
    }
    var submitRes = {
        stu_id:stu_id,
        job_id:jId
    };
     var sId = {
       stu_id : stu_id
     };

    $('#submitBtn').click(function(){
        $.ajax({
            type:'post',
            url:cur_site + "student/resume/apply/",
            data:submitRes,
            dataType:'json',
            success:function(data){
                if (data.msg == 0) {
                    alert("投递成功");
                }
            },
            error:function(data){
                console.log(data.msg);
            },
            headers:{
                "Access-Control-Allow-Origin":"*"
            }
        });
    });
    var wefaceBace_site = "http://110.64.69.101:8080/";
    $.ajax({
        type:'post',
        url:cur_site + 'student/resume/get/',
        data:sId,
        dataType:'json',
        success:function(data){

            if(data.msg=="未上传简历"){
                $('.hintText').html("您还没<a class='submitResume'>上传简历</a>,请尽快上传");
                $('.submitResume').attr("href",wefaceBace_site + "stu/main.html?std_id="+sId);
                $('#submitBtn').click(function(){
                    alert("请完善简历");
                })
            }
            else {
                var subPath = data.resume_path.split('/');
                var pathLen = subPath.length;
                var fileName = subPath[pathLen-1];
                $('#resume').html(fileName);
            }
            //$('#subResTime').html(data.date);
        },
        headers:{
            "Access-Control-Allow-Origin":"*"
        }
    });



});