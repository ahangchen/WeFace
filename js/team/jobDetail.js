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
    //获取city的字符串
    function getCity(cityId){
        switch (cityId){
            case 0:
                return "其他";
            case 1:
                return "广州";
        }
    }
    // 学生点击职位名字后，主页在url上传职位id
    var jId = getUrlVar('data');
    var wefaceBace_site = "http://wemeet.tech:8080/";
    var tId,jName,min,max,prov,city,town,addr,edu,exp,jobType,workType,sum,date,state,jobCmd,workCmd;
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
                city = getCity(data.city);
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
                $('#resumeBtn').attr('href',wefaceBace_site + 'team/resumeManage/resume.html?t_id='+tId);
                $('#positionBtn').attr('href',wefaceBace_site + 'team/position/showPosition.html?t_id='+tId);
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

});