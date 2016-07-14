$(function() {

    var key;  //用户输入的关键字

    var total=52;   //第一次默认的记录数目
    var pageSize=10; //一面放的记录个数
    var currentPage=1;  //记录当前所在页面
    var jobID = [];//唯一标识职位ID
    var teamID=[];//唯一标识团队名字
    var jobName = [];//职位名字
    var teamName = [];//团队名字
    var salary = [];//提供薪水
    var basicRequest = [];//基本要求
    var teamCharacter = [];//团队特点
    var homePgae=[];//团队主页
    var teamDescribe=[];//团队信息,发布岗位
    var projectID=[];//项目ID
    var projectName=[];//项目名称
    var projectDescribe=[];//项目信息
    var type=[jobName,teamName,basicRequest,teamCharacter,salary]; //默认关键字
    var url="../../data/job.json"; //记录当前打开的文件
    var idMsg="span[id^='msg']"; //要更新适应显示内容的变化

    function calculatePage(total,pageSize)  //计算需要几页
    {
        var page=total/pageSize;
        if(total%pageSize>0)
            return Math.ceil(page);
        else
            return page;
    }

    var pageNum=calculatePage(total,pageSize); //记录总共的页数

    $("#topSearch").click(function () {
        window.location.href="pages/search.html";
    });

    $("#btn1").click(function(){
        $(".select").css("visibility","visible");
        $(".message").css("visibility","visible");
        $(".searchguide").css("left","240px").css("top","120px");
        $(".button").css("left","640px").css("top","120px");

    })

    $(".button").click(function () {
        key = $(".topSearchButton").val();  //得到用户搜索的关键字,去后台查找,返回json文件.
        /*$.ajax({
            type: "post",
            url: "js/searchresult.php",
            dataType: 'json'
        });*/

        $.getJSON(url, function (result) {  //读取json文件分类存到数组中

            for (var key in result) {
                for (var k = 0; k < total; k++) {
                    jobID.push(result[key][k].jobID);
                    jobName.push(result[key][k].jobName);
                    teamID .push(result[key][k].teamID);
                    teamName.push(result[key][k].teamName);
                    basicRequest.push(result[key][k].basicRequest);
                    teamCharacter.push(result[key][k].teamCharacter);
                    salary.push(result[key][k].salary);
                }
            }

            for(var i=(currentPage-1)*10;i<10*currentPage;i++){
                for(var j=0;j<5;j++){
                    var id="#msg" + (i%10 + 1) + "-" + (j + 1);
                    switch(j) {
                        case 0:
                            $(id).addClass("text");
                            $(id).css("margin-top", "20px").css("margin-left","50px");
                            break;

                        case 1:
                            $(id).addClass("text");
                            $(id).css("margin-top", "20px").css("margin-left","340px");
                            break;

                        case 2:
                            $(id).addClass("subtext");
                            $(id).css("margin-top", "60px").css("margin-left","50px");
                            break;

                        case 3:
                            $(id).addClass("subtext");
                            $(id).css("margin-top", "60px").css("margin-left","340px").css("width","220px");
                            break;

                        case 4:
                            $(id).addClass("salary");
                            $(id).css("margin-top", "90px").css("margin-left","50px");
                            break;


                    }
                    $(id).text(type[j][i]);
                }
            }

        })
    });

    $("#downpage").click(function(){
        if(currentPage==pageNum){
            $("#downpage").css("cursor","Default");
            return;
        }
        else
            $("#downpage").css("cursor","pointer");
        $(idMsg).removeClass();
        $(idMsg).empty();
        scrollTo(0,0);
        currentPage++;

        switch(url){
            case "../../data/job.json":{
                for(var i=(currentPage-1)*10;i<10*currentPage;i++){
                    for(var j=0;j<5;j++){
                        var id="#msg" + (i%10 + 1) + "-" + (j + 1);
                        switch(j) {
                            case 0:
                                $(id).addClass("text");
                                $(id).css("margin-top", "20px").css("margin-left","50px");
                                break;

                            case 1:
                                $(id).addClass("text");
                                $(id).css("margin-top", "20px").css("margin-left","340px");
                                break;

                            case 2:
                                $(id).addClass("subtext");
                                $(id).css("margin-top", "60px").css("margin-left","50px");
                                break;

                            case 3:
                                $(id).addClass("subtext");
                                $(id).css("margin-top", "60px").css("margin-left","340px").css("width","220px");
                                break;

                            case 4:
                                $(id).addClass("salary");
                                $(id).css("margin-top", "90px").css("margin-left","50px");
                                break;

                        }
                        $(id).text(type[j][i]);
                    }
                }
                break;

            }

            case "../../data/team.json":{
                for(var i=(currentPage-1)*10;i<10*currentPage;i++){
                    for(var j=0;j<3;j++){
                        var id="#msg" + (i%10 + 1) + "-" + (j + 1);
                        switch(j) {
                            case 0:
                                $(id).addClass("text");
                                $(id).css("margin-top", "20px").css("margin-left","340px");
                                break;

                            case 1:
                                $(id).addClass("subtext");
                                $(id).css("margin-top", "60px").css("margin-left","340px").css("width","220px");
                                break;

                            case 2:
                                $(id).addClass("page");
                                $(id).css("margin-top", "55px").css("margin-left","600px");
                                break;

                        }
                        $(id).text(type[j][i]);
                    }
                }
                break;

            }

            case "../../data/project.json":{
                for(var i=(currentPage-1)*10;i<10*currentPage;i++){
                    for(var j=0;j<4;j++){
                        var id="#msg" + (i%10 + 1) + "-" + (j + 1);
                        switch(j) {
                            case 0:
                                $(id).addClass("text");
                                $(id).css("margin-top", "20px").css("margin-left","50px");
                                break;

                            case 1:
                                $(id).addClass("text");
                                $(id).css("margin-top", "20px").css("margin-left","340px");
                                break;

                            case 2:
                                $(id).addClass("subtext");
                                $(id).css("margin-top", "60px").css("margin-left","50px").css("width","220px");
                                break;

                            case 3:
                                $(id).addClass("subtext");
                                $(id).css("margin-top", "60px").css("margin-left","340px").css("width","220px");
                                break;

                        }
                        $(id).text(type[j][i]);
                    }
                }

                break;

            }
        }

        if(currentPage==pageNum){
            var temp=pageNum*10-total;
            for(var t=10-temp;t<10;t++){
                var a=document.getElementById("msg"+(t+1));
                a.style.visibility="hidden"
            }
            var top=1735-temp*160;
            $(".pageAll").css("margin-top",top);
        }

    });

    $("#uppage").click(function () {
        if(currentPage==1){
            $("#uppage").css("cursor","Default");
            return;
        }
        else {
            $("#uppage").css("cursor", "pointer");
            $(".pageAll").css("margin-top", "1735px");
            for (var t = 0; t < 10; t++) {
                var a = document.getElementById("msg" + (t + 1));
                a.style.visibility = "visible";
            }
        }

        $(idMsg).removeClass();
        $(idMsg).empty();
        scrollTo(0, 0);
        currentPage--;

        switch(url){
            case "../../data/job.json":{
                for(var i=(currentPage-1)*10;i<10*currentPage;i++){
                    for(var j=0;j<5;j++){
                        var id="#msg" + (i%10 + 1) + "-" + (j + 1);
                        switch(j) {
                            case 0:
                                $(id).addClass("text");
                                $(id).css("margin-top", "20px").css("margin-left","50px");
                                break;

                            case 1:
                                $(id).addClass("text");
                                $(id).css("margin-top", "20px").css("margin-left","340px");
                                break;

                            case 2:
                                $(id).addClass("subtext");
                                $(id).css("margin-top", "60px").css("margin-left","50px");
                                break;

                            case 3:
                                $(id).addClass("subtext");
                                $(id).css("margin-top", "60px").css("margin-left","340px").css("width","220px");
                                break;

                            case 4:
                                $(id).addClass("salary");
                                $(id).css("margin-top", "90px").css("margin-left","50px");
                                break;

                        }
                        $(id).text(type[j][i]);
                    }
                }
                break;

            }

            case "../../data/team.json":{
                for(var i=(currentPage-1)*10;i<10*currentPage;i++){
                    for(var j=0;j<3;j++){
                        var id="#msg" + (i%10 + 1) + "-" + (j + 1);
                        switch(j) {
                            case 0:
                                $(id).addClass("text");
                                $(id).css("margin-top", "20px").css("margin-left","340px");
                                break;

                            case 1:
                                $(id).addClass("subtext");
                                $(id).css("margin-top", "60px").css("margin-left","340px").css("width","220px");
                                break;

                            case 2:
                                $(id).addClass("page");
                                $(id).css("margin-top", "55px").css("margin-left","600px");
                                break;

                        }
                        $(id).text(type[j][i]);
                    }
                }
                break;

            }

            case "../../data/project.json":{
                for(var i=(currentPage-1)*10;i<10*currentPage;i++){
                    for(var j=0;j<4;j++){
                        var id="#msg" + (i%10 + 1) + "-" + (j + 1);
                        switch(j) {
                            case 0:
                                $(id).addClass("text");
                                $(id).css("margin-top", "20px").css("margin-left","50px");
                                break;

                            case 1:
                                $(id).addClass("text");
                                $(id).css("margin-top", "20px").css("margin-left","340px");
                                break;

                            case 2:
                                $(id).addClass("subtext");
                                $(id).css("margin-top", "60px").css("margin-left","50px").css("width","220px");
                                break;

                            case 3:
                                $(id).addClass("subtext");
                                $(id).css("margin-top", "60px").css("margin-left","340px").css("width","220px");
                                break;

                        }
                        $(id).text(type[j][i]);
                    }
                }

                break;

            }
        }

    });

    $("#select1").click(function () {
        url="../../data/job.json";
        $(".pageAll").css("margin-top", "1735px");  //恢复十条记录
        for (var t = 0; t < 10; t++) {
            var a = document.getElementById("msg" + (t + 1));
            a.style.visibility = "visible";
        }
        $(idMsg).removeClass();
        $(idMsg).empty();
        $("#select1").css("border-bottom", "solid 1.5px #000");
        $("#select2").css("border-bottom", "");
        $("#select3").css("border-bottom", "");
        type=[jobName,teamName,basicRequest,teamCharacter,salary];
        currentPage=1;
        total=52;
        pageNum=calculatePage(total,pageSize);

        $.getJSON(url, function (result) {  //读取json文件分类存到数组中
            //清除之前数组中的记录
            jobID.length=0;
            jobName.length=0;
            teamID.length=0;
            teamName.length=0;
            basicRequest.length=0;
            teamCharacter.length=0;
            salary.length=0;
            for (var key in result) {
                for (var k = 0; k < total; k++) {
                    jobID.push(result[key][k].jobID);
                    jobName.push(result[key][k].jobName);
                    teamID .push(result[key][k].teamID);
                    teamName.push(result[key][k].teamName);
                    basicRequest.push(result[key][k].basicRequest);
                    teamCharacter.push(result[key][k].teamCharacter);
                    salary.push(result[key][k].salary);
                }
            }

            for(var i=(currentPage-1)*10;i<10*currentPage;i++){
                for(var j=0;j<5;j++){
                    var id="#msg" + (i%10 + 1) + "-" + (j + 1);
                    switch(j) {
                        case 0:
                            $(id).addClass("text");
                            $(id).css("margin-top", "20px").css("margin-left","50px");
                            break;

                        case 1:
                            $(id).addClass("text");
                            $(id).css("margin-top", "20px").css("margin-left","340px");
                            break;

                        case 2:
                            $(id).addClass("subtext");
                            $(id).css("margin-top", "60px").css("margin-left","50px");
                            break;

                        case 3:
                            $(id).addClass("subtext");
                            $(id).css("margin-top", "60px").css("margin-left","340px").css("width","220px");
                            break;

                        case 4:
                            $(id).addClass("salary");
                            $(id).css("margin-top", "90px").css("margin-left","50px");
                            break;


                    }
                    $(id).text(type[j][i]);
                }
            }


        })

    });

    $("#select2").click(function () {
        $(idMsg).removeClass();
        $(idMsg).empty();
        $("#select1").css("border-bottom", "");
        $("#select2").css("border-bottom", "solid 1.5px #000");
        $("#select3").css("border-bottom", "");
        $(".pageAll").css("margin-top", "1735px");
        for (var t = 0; t < 10; t++) {
            var a = document.getElementById("msg" + (t + 1));
            a.style.visibility = "visible";
        }
        url="../../data/team.json";
        type=[teamName,teamDescribe,homePgae];
        currentPage=1;
        total=12;
        pageNum=calculatePage(total,pageSize);
        teamID.length=0;
        teamName.length=0;
        teamDescribe.length=0;
        homePgae.length=0;

        $.getJSON(url, function (result) {  //读取json文件分类存到数组中

            for (var key in result) {
                for (var k = 0; k < total; k++) {
                    teamID.push(result[key][k].teamID);
                    teamName.push(result[key][k].teamName);
                    teamDescribe.push(result[key][k].teamDescribe);
                    homePgae.push(result[key][k].homePage);
                }
                for(var i=(currentPage-1)*10;i<10*currentPage;i++){
                    for(var j=0;j<3;j++){
                        var id="#msg" + (i%10 + 1) + "-" + (j + 1);
                        switch(j) {
                            case 0:
                                $(id).addClass("text");
                                $(id).css("margin-top", "20px").css("margin-left","340px");
                                break;

                            case 1:
                                $(id).addClass("subtext");
                                $(id).css("margin-top", "60px").css("margin-left","340px").css("width","220px");
                                break;

                            case 2:
                                $(id).addClass("page");
                                $(id).css("margin-top", "55px").css("margin-left","600px");
                                break;

                        }
                        $(id).text(type[j][i]);
                    }
                }
            }
        });

    });

    $("#select3").click(function () {
        $(idMsg).removeClass();
        $(idMsg).empty();
        $("#select1").css("border-bottom", "");
        $("#select2").css("border-bottom", "");
        $("#select3").css("border-bottom", "solid 1.5px #000");
        $(".pageAll").css("margin-top", "1735px");
        for (var t = 0; t < 10; t++) {
            var a = document.getElementById("msg" + (t + 1));
            a.style.visibility = "visible";
        }
        url="../../data/project.json";
        currentPage=1;
        total=22;
        pageNum=calculatePage(total,pageSize);
        projectID.length=0;
        projectName.length=0;
        teamName.length=0;
        projectDescribe.length=0;
        teamCharacter.length=0;
        $.getJSON(url,function(result)
        {
            for(var key in result) {
                for(var k=0;k<total;k++) {
                    projectID.push(result[key][k].projectID);
                    projectName.push(result[key][k].projectName);
                    teamName.push(result[key][k].teamName);
                    projectDescribe.push(result[key][k].projectDescribe);
                    teamCharacter.push(result[key][k].teamCharacter);
                }
            }
            type=[projectName,teamName,projectDescribe,teamCharacter];

            for(var i=(currentPage-1)*10;i<10*currentPage;i++){
                for(var j=0;j<4;j++){
                    var id="#msg" + (i%10 + 1) + "-" + (j + 1);
                    switch(j) {
                        case 0:
                            $(id).addClass("text");
                            $(id).css("margin-top", "20px").css("margin-left","50px");
                            break;

                        case 1:
                            $(id).addClass("text");
                            $(id).css("margin-top", "20px").css("margin-left","340px");
                            break;

                        case 2:
                            $(id).addClass("subtext");
                            $(id).css("margin-top", "60px").css("margin-left","50px").css("width","220px");
                            break;

                        case 3:
                            $(id).addClass("subtext");
                            $(id).css("margin-top", "60px").css("margin-left","340px").css("width","220px");
                            break;

                    }
                    $(id).text(type[j][i]);
                }
            }
        });



    });


});

