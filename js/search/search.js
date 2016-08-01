$(function () {
    //点击导航栏的搜索实现跳转
    $("#searchDiv").click(function () {
        window.location = "search.html";
    });


    //导航栏切换,跳转到首页
    $("#indexBtn").click(function () {
        window.location = "index.html";
    });

    //导航栏切换,跳转到团队页面
    $("#teamBtn").click(function () {
        window.location = "_blank";
    });

    function calculatePage(total, pageSize)  //计算需要几页
    {
        var page = total / pageSize;
        if (total % pageSize > 0)
            return Math.ceil(page);
        else
            return page;
    }

    function getPageSize(total) {//计算加载记录的条数
        if (total > 10)
            return 10;
        else
            return total;
    }

    var job_id = [];//职位ID
    var job_name = [];//职位的名称
    var job_type = [];//职位的类型
    var team_id = [];//团队ID
    var team_name = [];//团队的名字
    var team_type = [];//团队的类型
    var min_salary = [];//最低工资
    var max_salary = [];//最高工资
    var job_summary = [];//基本要求
    var team_about = [];//团队业务类型,特点
    var team_logo_path = [];//团队的logo
    var team_logo=[];
    var img = [];//所有的图片
    var keyForJob = ['job_id', 'job_name', 'job_type', 'team_id', 'team_name', 'team_type', 'min_salary', 'max_salary', 'job_summary', 'team_about', 'team_logo_path'];//从后端返回的JOB数据类型
    var keyForJobArray = [job_id, job_name, job_type, team_id, team_name, team_type, min_salary, max_salary, job_summary, team_about, team_logo_path];
    var keyForTeam = ['team_id','team_name','team_logo','team_about','team_type'];//从后端返回的team数据类型
    var keyForTeamArray = [team_id,team_name,team_logo,team_about,team_type];
    var keyForProject = [];//从后端返回的Project数据类型
    var keyForProjectArray = [];
    var keyFromBack = [keyForJob, keyForTeam, keyForProject];//从后端返回的总的数据类型
    var keyFromBackArray = [keyForJobArray, keyForTeamArray, keyForProjectArray];//从后端返回的总的数据类型
    var url = ["../data/job.json", "../data/team.json", "../data/project.json"];//得到后端数据的url
    var urlNum;//记录当前的url
    var selector = ["job", "team", "project"];//主要用于total的计算
    var total;//总共的记录数目
    var pageSize = 10; //一面放的记录个数
    var pageNum; //记录总共的页数
    var currentPage = 1;  //记录当前所在页面
    var searchKey;//用户的搜索关键字

    function createDiv(pagesize) {
        for (var load = 0; load < pagesize; load++) {  //加载显示结果的块,创建10个
            var temp = "msg" + load;
            $("#searchResult").append("<div id=" + temp + " class='resultBox'></div>");
        }
    }

    //提取搜索框中的关键字,显示搜索页面
    $("#startSearch").click(function () {
        searchKey = $(".start").val();//得到用户的关键字
        $("#search_result").css("opacity", "1");
        showPosition(0,pageSize);//默认读取job的前十条记录
        $("#changePage").css("visibility","visible").css("top",pageSize*198);

    });

    $("#selectTeam").click(function () {
        currentPage=1;
        pageSize=10;
        for (var t = 0; t < pageSize; t++) {
            $("#msg" + t).remove();
        }
        for (var j = 0; j < keyFromBack[1].length; j++) {
            keyFromBackArray[1][j].length = 0;
        }
        showTeam(0,10);
        $("#changePage").css("top",pageSize*198);
    });
    
    $("#nextPage").click(function () {
        for (var t = 0; t < pageSize; t++) {
            $("#msg" + t).remove();
        }
        currentPage++;
        scrollTo(0, 0);
        if(urlNum==0) {//在job页
            for (var j = 0; j < keyFromBack[0].length; j++) {
                keyFromBackArray[0][j].length = 0;
            }
            pageSize=getPageSize(total-(currentPage-1)*10);
            showPosition((currentPage-1)*10,pageSize+(currentPage-1)*10);
            $("#changePage").css("top",pageSize*198+50);
        }

    });

    function showPosition(recordStart, recordEnd) {//显示job信息
        urlNum=0;
        $.getJSON(url[urlNum], function (result) {  //读取json文件分类存到数组中
            total = result[selector[urlNum]].length;
            createDiv(recordEnd-recordStart);
            for (var k = 0; k < total; k++) {
                for (var j = 0; j < keyFromBack[urlNum].length; j++) {
                    (keyFromBackArray[urlNum][j]).push(result[selector[urlNum]][j][keyFromBack[urlNum][j]]);
                }
            }
            for (var i = recordStart; i < recordEnd; i++) {
                var salary = min_salary[i] + '~' + max_salary[i];
                var msg_id="#msg"+i%10;
                $(msg_id).append("<div id='job_name'>" + job_name[i] + "</div>");
                $(msg_id).append("<div id='job_summary'>" + job_summary[i] + "</div>");
                $(msg_id).append("<div id='job_salary'>" + salary + "</div>");
                $(msg_id).append("<div id='team_name'>" + team_name[i] + "</div>");
                $(msg_id).append("<div id='team_about'>" + team_about[i] + "</div>");
                $(msg_id).append("<img id='team_logo' src="+team_logo_path[i] + '>'+"</img>");
            }
        });

    }

    function showTeam(recordStart, recordEnd) {//显示job信息
        urlNum=1;
        $.getJSON(url[urlNum], function (result) {  //读取json文件分类存到数组中
            total = result[selector[urlNum]].length;
            createDiv(recordEnd-recordStart);
            for (var k = 0; k < total; k++) {
                for (var j = 0; j < keyFromBack[urlNum].length; j++) {
                    (keyFromBackArray[urlNum][j]).push(result[selector[urlNum]][j][keyFromBack[urlNum][j]]);
                }
            }
            for (var i = recordStart; i < recordEnd; i++) {
                var msg_id="#msg"+i%10;
                $(msg_id).append("<div id='team_name'>" + team_name[i] + "</div>");
                $(msg_id).append("<div id='team_about'>" + team_about[i] + "</div>");
                $(msg_id).append("<div id='team_type'>" + team_type[i] + "</div>");
                $(msg_id).append("<img id='team_logo' src="+team_logo[i] + '>'+"</img>");
            }
        });

    }
});
