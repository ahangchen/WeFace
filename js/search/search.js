$(function() {
    var searchKey;//用户输入的搜索关键字
    var pageSize=10; //一面放的记录个数
    var total;   //第一次默认的记录数目
    var pageNum; //记录总共的页数
    var currentPage=1;  //记录当前所在页面
    var url; //记录当前打开的文件
    var job_id = [];//唯一标识职位ID
    var team_id=[];//唯一标识团队名字
    var job_name = [];//职位名字
    var team_name = [];//团队名字
    var min_salary = [];//提供的最低薪水
    var max_salary=[];//提供的最高薪水
    var job_summary = [];//基本要求
    var team_type=[];//团队所属类型
    var team_about = [];//团队特点
    var team_logo=[];//团队logo
    var project_id=[];//项目ID
    var project_name=[];//项目名称
    var project_content=[];//项目信息
    var project_about=[];//项目简介
    var project_img_path=[];//项目图片信息
    var remain;//剩余页数


    function calculatePage(total,pageSize)  //计算需要几页
    {
        var page=total/pageSize;
        if(total%pageSize>0)
            return Math.ceil(page);
        else
            return page;
    }

    function getPageSize(total){//计算加载记录的条数
        if(total>10)
            return 10;
        else
            return total;
    }
    
    //点击导航栏的搜索实现跳转
    $("#searchDiv").click(function () {
        window.location="search.html";
    });


    //导航栏切换,跳转到首页
    $("#indexBtn").click(function(){
        window.location="index.html";
    });

    //提取搜索框中的关键字,显示搜索页面
    $("#startSearch").click(function () {
        url="../data/job.json";//默认首先返回职位的信息
        searchKey=$(".start").val();
        $("#selector").css("visibility","visible");
        for(var load=0;load<pageSize;load++) {  //加载显示结果的块
            var temp="msg"+load;
            $("#searchResult").append("<div id="+temp+" style='height: 180px;width: 100%;margin-top: 10px;'></div>");
            $("#"+temp).css("background-color","rgba(255, 255, 255, 1)").css("-moz-box-shadow","inset 0 0 10px #CCC")
                .css("-webkit-box-shadow","inset 0 0 10px #CCC").css("box-shadow","inset 0 0 10px #CCC");
        }
        $("#changePage").css("visibility","visible");
        $.getJSON(url, function (result) {  //读取json文件分类存到数组中
            total=result["job"].length;
            for (var key in result) {
                for (var k = 0; k < total; k++) {
                    job_id.push(result[key][k].job_id);
                    job_name.push(result[key][k].job_name);
                    team_name.push(result[key][k].team_name);
                    job_summary.push(result[key][k].job_summary);
                    team_type.push(result[key][k].team_type);
                    team_about.push(result[key][k].team_about);
                    min_salary.push(result[key][k].min_salary);
                    max_salary.push(result[key][k].max_salary);
                }
            }
            pageNum=calculatePage(total,pageSize); //记录总共的页数

            for(var i=(currentPage-1)*10;i<pageSize*currentPage;i++){
                var salary=min_salary[i]+'~'+max_salary[i];
                $("#msg"+i).append("<div style='height:60px;width:350px;padding: 18px 5px 18px 5px;'><div class='container'><div style='font-size: 20px;font-weight: 100;'>"+job_name[i]+"</div></div></div>");
                $("#msg"+i).append("<div style='height:60px;width:350px;padding: 18px 5px 18px 5px;'><div class='container'><div style='font-size: 18px;font-weight: 100;'>"+job_summary[i]+"</div></div></div>");
                $("#msg"+i).append("<div style='height:60px;width:350px;padding: 18px 5px 18px 5px;'><div class='container'><div style='font-size: 18px;font-weight: 100;'>"+salary+"</div></div></div>");
                $("#msg"+i).append("<div style='height:60px;width: 350px;margin-left: 350px;margin-top: -180px;padding: 18px 5px 18px 5px;'><div class='container'><div style='font-size: 20px;font-weight: 100;'>"+team_name[i]+"</div></div></div>");
                $("#msg"+i).append("<div style='height:60px;width: 350px;margin-left: 350px;padding: 18px 5px 18px 5px;'><div class='container'><div style='font-size: 18px;font-weight: 100;'>"+team_about[i]+"</div></div></div>");
            }
        });
        
        
    });

    $("#selectPosition").click(function () {
        url="../data/job.json";
        job_id.length=0;
        job_name.length=0;
        team_name.length=0;
        job_summary.length=0;
        team_type.length=0;
        team_about.length=0;
        min_salary.length=0;
        max_salary.length=0;
        currentPage=1;
        for(var t=0;t<pageSize;t++){
            $("#msg"+t).remove();
        }
        $.getJSON(url, function (result) {  //读取json文件分类存到数组中
            total=result["job"].length;
          pageSize=getPageSize(total);
            for(var load=0;load<pageSize;load++) {
                var temp="msg"+load;
                $("#searchResult").append("<div id="+temp+" style='height: 180px;width: 100%;margin-top: 10px;'></div>");
                $("#"+temp).css("background-color","rgba(255, 255, 255, 1)").css("-moz-box-shadow","inset 0 0 10px #CCC")
                    .css("-webkit-box-shadow","inset 0 0 10px #CCC").css("box-shadow","inset 0 0 10px #CCC");
            }
            for (var key in result) {
                for (var k = 0; k < total; k++) {
                    job_id.push(result[key][k].job_id);
                    job_name.push(result[key][k].job_name);
                    team_name.push(result[key][k].team_name);
                    job_summary.push(result[key][k].job_summary);
                    team_type.push(result[key][k].team_type);
                    team_about.push(result[key][k].team_about);
                    min_salary.push(result[key][k].min_salary);
                    max_salary.push(result[key][k].max_salary);
                }
            }
            pageNum=calculatePage(total,pageSize); //记录总共的页数

            for(var i=(currentPage-1)*10;i<pageSize*currentPage;i++){
                var salary=min_salary[i]+'~'+max_salary[i];
                $("#msg"+i).append("<div class='positionText1'><div class='container'><div class='textMessage'>"+job_name[i]+"</div></div></div>");
                $("#msg"+i).append("<div class='positionText1'><div class='container'><div class='textMessage'>"+job_summary[i]+"</div></div></div>");
                $("#msg"+i).append("<div class='positionText1'><div class='container'><div class='textMessage'>"+salary+"</div></div></div>");
                $("#msg"+i).append("<div class='positionText2'><div class='container'><div class='textMessage'>"+team_name[i]+"</div></div></div>");
                $("#msg"+i).append("<div class='positionText3'><div class='container'><div class='textMessage'>"+team_about[i]+"</div></div></div>");
            }
        });
    });

    $("#selectTeam").click(function () {
        url="../data/team.json";
        team_id.length=0;
        team_name.length=0;
        team_logo.length=0;
        team_type.length=0;
        team_about.length=0;
        currentPage=1;
        for(var t=0;t<pageSize;t++){
            $("#msg"+t).remove();
        }
        $.getJSON(url, function (result) {  //读取json文件分类存到数组中
            total=result["team"].length;
            pageSize=getPageSize(total);
            for(var load=0;load<pageSize;load++) {
                var temp="msg"+load;
                $("#searchResult").append("<div id="+temp+" style='height: 180px;width: 100%;margin-top: 10px;'></div>");
                $("#"+temp).css("background-color","rgba(255, 255, 255, 1)").css("-moz-box-shadow","inset 0 0 10px #CCC")
                    .css("-webkit-box-shadow","inset 0 0 10px #CCC").css("box-shadow","inset 0 0 10px #CCC");
            }
            for (var key in result) {
                for (var k = 0; k < total; k++) {
                    team_id.push(result[key][k].team_id);
                    team_name.push(result[key][k].team_name);
                    team_logo.push(result[key][k].team_logo);
                    team_about.push(result[key][k].team_about);
                    team_type.push(result[key][k].team_type);
                }
            }
            pageNum=calculatePage(total,pageSize); //记录总共的页数

            for(var i=(currentPage-1)*10;i<pageSize*currentPage;i++){
                $("#msg"+i).append("<div class='teamText1'><div class='container'><div class='textMessage'>"+team_name[i]+"</div></div></div>");
                $("#msg"+i).append("<div class='teamText2'><div class='container'><div class='textMessage'>"+team_about[i]+"</div></div></div>");
                $("#msg"+i).append("<div class='teamText3'><div class='container'><div class='textMessage'>"+team_type[i]+"</div></div></div>");
            }
        });

    });

    $("#selectProject").click(function () {
        url="../data/project.json";
        project_id.length=0;
        project_name.length=0;
        project_img_path.length=0;
        project_content.length=0;
        project_about.length=0;
        team_about.length=0;
        team_name.length=0;
        team_type.length=0;
        for(var t=0;t<pageSize;t++){
            $("#msg"+t).remove();
        }
        $.getJSON(url, function (result) {  //读取json文件分类存到数组中
            total=result["project"].length;
            pageSize=getPageSize(total);
            for(var load=0;load<pageSize;load++) {
                var temp="msg"+load;
                $("#searchResult").append("<div id="+temp+" style='height: 180px;width: 100%;margin-top: 10px;'></div>");
                $("#"+temp).css("background-color","rgba(255, 255, 255, 1)").css("-moz-box-shadow","inset 0 0 10px #CCC")
                    .css("-webkit-box-shadow","inset 0 0 10px #CCC").css("box-shadow","inset 0 0 10px #CCC");
            }
            for (var key in result) {
                for (var k = 0; k < total; k++) {
                    project_id.push(result[key][k].project_id);
                    project_name.push(result[key][k].project_name);
                    project_content.push(result[key][k].project_content);
                    project_about.push(result[key][k].project_about);
                    project_img_path.push(result[key][k].project_img_path);
                    team_name.push(result[key][k].team_name);
                    team_type.push(result[key][k].team_type);
                    team_about.push(result[key][k].team_about);
                }
            }
            pageNum=calculatePage(total,pageSize); //记录总共的页数

            for(var i=(currentPage-1)*10;i<pageSize*currentPage;i++){
                $("#msg"+i).append("<div class='projectText1'><div class='container'><div class='textMessage'>"+project_name[i]+"</div></div></div>");
                $("#msg"+i).append("<div class='projectText2'><div class='container'><div class='smalltextMessage'>"+project_about[i]+"</div></div></div>");
                $("#msg"+i).append("<div class='projectText3'><div class='container'><div class='textMessage'>"+team_name[i]+"</div></div></div>");
                $("#msg"+i).append("<div class='projectText4'><div class='container'><div class='smalltextMessage'>"+team_about[i]+"</div></div></div>");
            }
        });

    });
    

    $("#nextPage").click(function() {
        if(currentPage==pageNum)
            return;
        for (var t = 0; t < pageSize; t++) {
            $("#msg" + t).remove();
        }
        pageSize = getPageSize(total - currentPage * 10);
        currentPage++;
        scrollTo(0, 0);
        for (var load = 0; load < pageSize; load++) {  //加载显示结果的块
            var temp = "msg" + load;
            $("#searchResult").append("<div id=" + temp + " style='height: 180px;width: 100%;margin-top: 10px;'></div>");
            $("#" + temp).css("background-color", "rgba(255, 255, 255, 1)").css("-moz-box-shadow", "inset 0 0 10px #CCC")
                .css("-webkit-box-shadow", "inset 0 0 10px #CCC").css("box-shadow", "inset 0 0 10px #CCC");
        }
        switch (url) {
            case "../data/job.json":
            {
                for (var i = (currentPage - 1) * 10; i < 10*(currentPage - 1) + pageSize; i++) {
                    var salary = min_salary[i] + '~' + max_salary[i];
                    var j = i % 10;
                    $("#msg" + i).append("<div class='positionText1'><div class='container'><div class='textMessage'>" + job_name[i] + "</div></div></div>");
                    $("#msg" + i).append("<div class='positionText1'><div class='container'><div class='textMessage'>" + job_summary[i] + "</div></div></div>");
                    $("#msg" + i).append("<div class='positionText1'><div class='container'><div class='textMessage'>" + salary + "</div></div></div>");
                    $("#msg" + i).append("<div class='positionText2'><div class='container'><div class='textMessage'>" + team_name[i] + "</div></div></div>");
                    $("#msg" + i).append("<div class='positionText3'><div class='container'><div class='textMessage'>" + team_about[i] + "</div></div></div>");
                }
                break;
            }

            case "../data/team.json":
            {
                for(var i=(currentPage-1)*10;i < 10*(currentPage - 1) + pageSize;i++){
                    var j = i % 10;
                    $("#msg"+i).append("<div class='teamText1'><div class='container'><div class='textMessage'>"+team_name[i]+"</div></div></div>");
                    $("#msg"+i).append("<div class='teamText2'><div class='container'><div class='textMessage'>"+team_about[i]+"</div></div></div>");
                    $("#msg"+i).append("<div class='teamText3'><div class='container'><div class='textMessage'>"+team_type[i]+"</div></div></div>");
                }

                break;

            }

            case "../data/project.json":
            {
                for(var i=(currentPage-1)*10;i < 10*(currentPage - 1) + pageSize;i++){
                    var j = i % 10;
                    $("#msg"+i).append("<div class='projectText1'><div class='container'><div class='textMessage'>"+project_name[i]+"</div></div></div>");
                    $("#msg"+i).append("<div class='projectText2'><div class='container'><div class='smalltextMessage'>"+project_about[i]+"</div></div></div>");
                    $("#msg"+i).append("<div class='projectText3'><div class='container'><div class='textMessage'>"+team_name[i]+"</div></div></div>");
                    $("#msg"+i).append("<div class='projectText4'><div class='container'><div class='smalltextMessage'>"+team_about[i]+"</div></div></div>");
                }
                break;

            }
        }
    });


    $("#previousPage").click(function () {
        if(currentPage==1)
            return;
        for(var t=0;t<pageSize;t++){
            $("#msg"+t).remove();
        }
        currentPage--;
        pageSize=getPageSize(total-(currentPage-1)*10);
        scrollTo(0,0);
        for(var load=0;load<pageSize;load++) {  //加载显示结果的块
            var temp="msg"+load;
            $("#searchResult").append("<div id="+temp+" style='height: 180px;width: 100%;margin-top: 10px;'></div>");
            $("#"+temp).css("background-color","rgba(255, 255, 255, 1)").css("-moz-box-shadow","inset 0 0 10px #CCC")
                .css("-webkit-box-shadow","inset 0 0 10px #CCC").css("box-shadow","inset 0 0 10px #CCC");
        }

        switch(url){
            case "../data/job.json":{
                for (var i = (currentPage - 1) * 10; i < 10*currentPage; i++) {
                    var salary = min_salary[i] + '~' + max_salary[i];
                    var j = i % 10;
                    $("#msg" + i).append("<div class='positionText1'><div class='container'><div class='textMessage'>" + job_name[i] + "</div></div></div>");
                    $("#msg" + i).append("<div class='positionText1'><div class='container'><div class='textMessage'>" + job_summary[i] + "</div></div></div>");
                    $("#msg" + i).append("<div class='positionText1'><div class='container'><div class='textMessage'>" + salary + "</div></div></div>");
                    $("#msg" + i).append("<div class='positionText2'><div class='container'><div class='textMessage'>" + team_name[i] + "</div></div></div>");
                    $("#msg" + i).append("<div class='positionText3'><div class='container'><div class='textMessage'>" + team_about[i] + "</div></div></div>");
                }
                break;

            }

            case "../data/team.json":{
                for(var i=(currentPage-1)*10;i<10*currentPage;i++){
                    var j = i % 10;
                    $("#msg"+i).append("<div class='teamText1'><div class='container'><div class='textMessage'>"+team_name[i]+"</div></div></div>");
                    $("#msg"+i).append("<div class='teamText2'><div class='container'><div class='textMessage'>"+team_about[i]+"</div></div></div>");
                    $("#msg"+i).append("<div class='teamText3'><div class='container'><div class='textMessage'>"+team_type[i]+"</div></div></div>");
                }

                break;

            }

            case "../data/project.json":{
                for(var i=(currentPage-1)*10;i<10*currentPage;i++){
                    var j = i % 10;
                    $("#msg"+i).append("<div class='projectText1'><div class='container'><div class='textMessage'>"+project_name[i]+"</div></div></div>");
                    $("#msg"+i).append("<div class='projectText2'><div class='container'><div class='smalltextMessage'>"+project_about[i]+"</div></div></div>");
                    $("#msg"+i).append("<div class='projectText3'><div class='container'><div class='textMessage'>"+team_name[i]+"</div></div></div>");
                    $("#msg"+i).append("<div class='projectText4'><div class='container'><div class='smalltextMessage'>"+team_about[i]+"</div></div></div>");
                }

                break;

            }
        }

    });

    $("#firstPage").click(function () {
        for(var t=0;t<pageSize;t++){
            $("#msg"+t).remove();
        }
        pageSize=getPageSize(total);
        scrollTo(0,0);
        for(var load=0;load<pageSize;load++) {  //加载显示结果的块
            var temp="msg"+load;
            $("#searchResult").append("<div id="+temp+" style='height: 180px;width: 100%;margin-top: 10px;'></div>");
            $("#"+temp).css("background-color","rgba(255, 255, 255, 1)").css("-moz-box-shadow","inset 0 0 10px #CCC")
                .css("-webkit-box-shadow","inset 0 0 10px #CCC").css("box-shadow","inset 0 0 10px #CCC");
        }
        currentPage=1;
        switch(url){
            case "../data/job.json":{
                for (var i = (currentPage - 1) * 10; i < pageSize; i++) {
                    var salary = min_salary[i] + '~' + max_salary[i];
                    $("#msg" + i).append("<div class='positionText1'><div class='container'><div class='textMessage'>" + job_name[i] + "</div></div></div>");
                    $("#msg" + i).append("<div class='positionText1'><div class='container'><div class='textMessage'>" + job_summary[i] + "</div></div></div>");
                    $("#msg" + i).append("<div class='positionText1'><div class='container'><div class='textMessage'>" + salary + "</div></div></div>");
                    $("#msg" + i).append("<div class='positionText2'><div class='container'><div class='textMessage'>" + team_name[i] + "</div></div></div>");
                    $("#msg" + i).append("<div class='positionText3'><div class='container'><div class='textMessage'>" + team_about[i] + "</div></div></div>");
                }
                break;

            }

            case "../data/team.json":{
                for(var i=(currentPage-1)*10;i<pageSize;i++){
                    var j = i % 10;
                    $("#msg"+i).append("<div class='teamText1'><div class='container'><div class='textMessage'>"+team_name[i]+"</div></div></div>");
                    $("#msg"+i).append("<div class='teamText2'><div class='container'><div class='textMessage'>"+team_about[i]+"</div></div></div>");
                    $("#msg"+i).append("<div class='teamText3'><div class='container'><div class='textMessage'>"+team_type[i]+"</div></div></div>");
                }

                break;

            }

            case "../data/project.json":{
                for(var i=(currentPage-1)*10;i<pageSize;i++){
                    var j = i % 10;
                    $("#msg"+i).append("<div class='projectText1'><div class='container'><div class='textMessage'>"+project_name[i]+"</div></div></div>");
                    $("#msg"+i).append("<div class='projectText2'><div class='container'><div class='smalltextMessage'>"+project_about[i]+"</div></div></div>");
                    $("#msg"+i).append("<div class='projectText3'><div class='container'><div class='textMessage'>"+team_name[i]+"</div></div></div>");
                    $("#msg"+i).append("<div class='projectText4'><div class='container'><div class='smalltextMessage'>"+team_about[i]+"</div></div></div>");
                }

                break;

            }
        }


    });

    $("#lastPage").click(function () {
        for(var t=0;t<pageSize;t++){
            $("#msg"+t).remove();
        }
        pageSize=getPageSize(total%10);
        scrollTo(0,0);
        for(var load=0;load<pageSize;load++) {  //加载显示结果的块
            var temp="msg"+load;
            $("#searchResult").append("<div id="+temp+" style='height: 180px;width: 100%;margin-top: 10px;'></div>");
            $("#"+temp).css("background-color","rgba(255, 255, 255, 1)").css("-moz-box-shadow","inset 0 0 10px #CCC")
                .css("-webkit-box-shadow","inset 0 0 10px #CCC").css("box-shadow","inset 0 0 10px #CCC");
        }
        currentPage=pageNum;
        switch(url){
            case "../data/job.json":{
                for (var i = (currentPage - 1) * 10; i < 10*(currentPage - 1) + pageSize; i++) {
                    var salary = min_salary[i] + '~' + max_salary[i];
                    var j = i % 10;
                    $("#msg" + i).append("<div class='positionText1'><div class='container'><div class='textMessage'>" + job_name[i] + "</div></div></div>");
                    $("#msg" + i).append("<div class='positionText1'><div class='container'><div class='textMessage'>" + job_summary[i] + "</div></div></div>");
                    $("#msg" + i).append("<div class='positionText1'><div class='container'><div class='textMessage'>" + salary + "</div></div></div>");
                    $("#msg" + i).append("<div class='positionText2'><div class='container'><div class='textMessage'>" + team_name[i] + "</div></div></div>");
                    $("#msg" + i).append("<div class='positionText3'><div class='container'><div class='textMessage'>" + team_about[i] + "</div></div></div>");
                }
                break;

            }

            case "../data/team.json":{
                for(var i=(currentPage-1)*10;i<(currentPage - 1) * 10+pageSize;i++){
                    $("#msg"+i).append("<div class='teamText1'><div class='container'><div class='textMessage'>"+team_name[i]+"</div></div></div>");
                    $("#msg"+i).append("<div class='teamText2'><div class='container'><div class='textMessage'>"+team_about[i]+"</div></div></div>");
                    $("#msg"+i).append("<div class='teamText3'><div class='container'><div class='textMessage'>"+team_type[i]+"</div></div></div>");
                }
                break;

            }

            case "../data/project.json":{
                for(var i=(currentPage-1)*10;i<(currentPage - 1) * 10+pageSize;i++){
                    var j = i % 10;
                    $("#msg"+j).append("<div style='height:60px;width:350px;padding: 18px 5px 18px 5px;'><div class='container'><div style='font-size: 20px;font-weight: 100;'>"+project_name[i]+"</div></div></div>");
                    $("#msg"+j).append("<div style='height:60px;width:350px;padding: 30px 5px 30px 5px;'><div class='container'><div style='font-size: 16px;font-weight: 100;'>"+project_about[i]+"</div></div></div>");
                    $("#msg"+j).append("<div style='height:60px;width: 350px;margin-left: 350px;margin-top: -120px;padding: 18px 5px 18px 5px;'><div class='container'><div style='font-size: 20px;font-weight: 100;'>"+team_name[i]+"</div></div></div>");
                    $("#msg"+j).append("<div style='height:60px;width: 350px;margin-left: 350px;padding: 30px 5px 30px 5px;'><div class='container'><div style='font-size: 16px;font-weight: 100;'>"+team_about[i]+"</div></div></div>");
                }

                break;

            }
        }


    })


});

