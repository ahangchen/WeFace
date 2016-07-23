/**
 * Created by jewel on 16/7/23.
 */
$(function(){
    // 学生点击职位名字后，主页在url上传职位id
    var jId = $.url().param('jId');
    var sId = $.url().param('sId');
    var tId,jName,min,max,prov,city,town,addr,edu,exp,jobType,workType,sum,date,state,jobCmd,workCmd;
    var tName,tLogo,tAbout,tTel,tMail;
    var tLabel = new Array();
    var jobId = {
        id:jId
    };
    var a =  $.ajax({
        type:'post',
        data:jobId,
        url:"http://110.64.69.66:8081/team/job_info/",
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
                var teamUrl = "http://110.64.69.66.8081/team/info?tid="+tId;
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
        $('#jobName').html(jName);
        $('#minSalary').html(min);
        $('#maxSalary').html(max);
        $('#city').html(city);
        $('#edu').html(edu);
        $('#exp').html(exp);
        $('#workType').html(wType);
        $('#sum').html(sum);
        $('#pubDate').html(date);
        $('#jobCmd p').html(jobCmd);
        $('#workCmd p').html(workCmd);
    }
    function initTeamDetail(){
        $('.name').html(tName);
        $('.teamLogoBar img').attr('src',tLogo);
        $('#teamDesc ').html(tAbout);
        $('#email').html(tMail);
        $('#phone').html(tTel);
        for (var i = 0; i < tLabel.length; i++) {
            $('.teamTags').append('<div class="chip">'+tLabel[i]+'</div>');
        }
    }
    var submitRes = {
        stu_id:stu_id,
        job_id:JId
    };
     var sId = {
       id : sId
     };
    $.ajax({
        type:'post',
        url:'http://110.64.69.66:8081/student/resume/get/',
         data:sId,
        dataType:'json',
        success:function(data){
            $('#resume').html(data.path);
            //$('#subResTime').html(data.date);
        },
        error:function(data){
            $('#resume').html(data.msg);
            $('#resume').css('color','red');
        },
        headers:{
            "Access-Control-Allow-Origin":"*"
        }
    });

    $('#submitBtn').click(function(){
        $.ajax({
            type:'post',
            url:"http://110.64.69.66:8081/student/resume/apply/",
            data:submitRes,
            dataType:'json',
            success:function(data){
                if (data.msg == 0) {
                    alert("投递成功");
                }
            },
            error:function(data){
                alert(data.msg);
            },
            headers:{
                "Access-Control-Allow-Origin":"*"
            }
        });
    });

});