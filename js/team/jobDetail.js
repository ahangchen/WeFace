/**
 * Created by jewel on 16/7/23.
 */
$(function(){
    // 团队点击职位名字后，在url传递职位id
    var jId = $.url().param('data');
    var tId,jName,min,max,prov,city,town,addr,edu,exp,jobType,workType,sum,date,state,jobCmd,workCmd;
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

});