
//-----------------------------------------------首页的js代码-----------------------------------------------------

$(function(){
// －－－－－－－－－－－－－－－banner初始化－－－－－－－－－－－－－－－－－－

    $.getJSON('../js/main/banners.json',function(data){
        var lis = $(".imgList li img");
        var link = $(".imgList li a");
        for (var i = 0; i < lis.length; i++) {
            var bannerUrl = data.banner[i].bannerImg;
            var imgHref = data.banner[i].bannerUrl;
            $(lis[i]).attr("src",bannerUrl);
            $(link[i]).attr("href",imgHref);
        }
    });
    var curIndexBanner = 0;
    var imgLen_banner = $(".imgList li").length;
    $(".preBtn").click(function(){
        curIndexBanner = (curIndexBanner > 0) ? (--curIndexBanner) : (imgLen_banner - 1);
        changeTo(curIndexBanner);
    });
    $(".nextBtn").click(function(){
        // curIndexBanner = (curIndexBanner < imgLen_banner - 1) ? (++curIndexBanner) : 0;
        if (curIndexBanner == imgLen_banner - 1) {
            curIndexBanner = 0;
        }
        else{
            curIndexBanner++;
        }
        changeTo(curIndexBanner);

    });
    function changeTo(num){
        var goLeft = num * 775;
        $(".imgList").animate({left: "-" + goLeft + "px"},500);
    }
    $(".imgList").hover(function() {
        clearInterval(picTimer);
    },function() {
        picTimer = setInterval(function() {
            changeTo(curIndexBanner);
            curIndexBanner++;
            if(curIndexBanner == imgLen_banner) {curIndexBanner = 0;}
        },5000); //此5000代表自动播放的间隔，单位：毫秒
    }).trigger("mouseleave");

// －－－－－－－－－－－－－－－导航的切换－－－－－－－－－－－－－－－－－－－－－－－－－－
    $("#indexBtn").click(function(){
        $("#teamBtn").css("text-decoration","none");
        $(this).css("text-decoration","underline");
        var a = $.ajax({
            type:"get",
            url: "pages/indexForMainPage.html",
            dataType:"html",
            success:function(data){
                $("#indexDiv").html(data);
            }
        })
    });
    $("#teamBtn").click(function(){
        $("#indexBtn").css("text-decoration","none");
        $("#teamBtn").css("text-decoration","underline");
        var a = $.ajax({
            type:"get",
            url: "../team/roles_team.html",
            dataType:"html",
            success:function(data){
                $("#indexDiv").html(data);
            }
        })
    });
// －－－－－－－－－－－－－－－热门团队－－－－－－－－－－－－－－－－－－－－－－－－－－－
// －－－－－－－－－－－－－热门团队初始化－－－－－－－－－－－－－－－－－－－－－－－－－－
    var teamlis = $(".teamList li img");
    var teamLink = $(".teamList li a");
    var teamNames = $(".teamList li div");
    var teamsDesc = $(".teamList li span");
    var curIndexOfTeam = 0;
    $.getJSON('../js/main/teams.json',function(data){
        for (var i = 0; i < 3; i++) {
            var firstTeamImg = data.teams[i].teamImg;
            var firstTeamName = data.teams[i].teamName;
            var firstTeamDesc = data.teams[i].teamDesc;
            $(teamlis[i]).attr("src",firstTeamImg);
            $(teamNames[i]).html(firstTeamName);
            $(teamsDesc[i]).html(firstTeamDesc);
        }
        curIndexOfTeam += 3;
    });

// －－－－－－－－－－－－－－－－－动态加载团队－－－－－－－－－－－－－－－－－－－－－－－－－
    var triTeamLen = $(".teamList li").length;
    $(".nextBtn_teams").click(function(){
        var a = $.ajax({
            type: "post",
            url: "../js/main/teams.json",
            dataType: "json",
            success: function(data){

                var maxlength = data.teams.length;
                if (curIndexOfTeam == maxlength) {
                    curIndexOfTeam = 0;
                } else {

                    for (var j = 0; j < 3; j++) {
                        $('.teamList').append('<li> <a  target="_blank"><img ><div class="desc">团队名称</div><span></span></a></li>');
                    }
                    triTeamLen += 3;
                    var len = 840 * teamLength / 3 + "px";
                    $("#teamList").css("width",len);

                    teamlis = $(".teamList li img");
                    teamLink = $(".teamList li a");
                    teamNames = $(".teamList li div");
                    teamsDesc = $(".teamList li span");
                    for (var i = curIndexOfTeam; i < curIndexOfTeam + 3; i++) {
                        var teamImg = data.teams[i].teamImg;
                        var teamName = data.teams[i].teamName;
                        var teamDesc = data.teams[i].teamDesc;
                        $(teamlis[i]).attr("src", teamImg);
                        $(teamNames[i]).html(teamName);
                        $(teamsDesc[i]).html(teamDesc);
                    }

                }
                changeToNextTeam(triTeamLen,curIndexOfTeam);
                curIndexOfTeam += 3;
            }
        });
    });
    $(".preBtn_teams").click(function(){
        var a = $.ajax({
            type: "post",
            url: "../js/main/teams.json",
            dataType: "json",
            success: function(data){
                var maxlength = data.teams.length;
                if (curIndexOfTeam == 0) {
                    for (var i = triTeamLen - 3 ; i < triTeamLen ; i++) {
                        var teamImg = data.teams[i].teamImg;
                        var teamName = data.teams[i].teamName;
                        var teamDesc = data.teams[i].teamDesc;
                        $(teamlis[i]).attr("src",teamImg);
                        $(teamNames[i]).html(teamName);
                        $(teamsDesc[i]).html(teamDesc);
                    }
                    curIndexOfTeam = maxlength - 3;
                }
                else{
                    for (var i = curIndexOfTeam - 3; i < curIndexOfTeam ; i++) {
                        var teamImg = data.teams[i].teamImg;
                        var teamName = data.teams[i].teamName;
                        var teamDesc = data.teams[i].teamDesc;
                        $(teamlis[i]).attr("src",teamImg);
                        $(teamNames[i]).html(teamName);
                        $(teamsDesc[i]).html(teamDesc);
                    }
                    curIndexOfTeam -= 3;
                }
                changeToNextTeam(curIndexOfTeam);

            }
        });
    });
    function changeToNextTeam(teamNum){

        var goTeam = teamNum / 3 * 840;
        $(".teamList").animate({left: "-" + goTeam + "px"},500);
    }




// －－－－－－－－－－－－－－－热门项目－－－－－－－－－－－－－－－－－－－－－－－－－－－
// －－－－－－－－－－－－－热门项目初始化－－－－－－－－－－－－－－－－－－－－－－－－－－
    var projectlis = $(".projectList li img");
    var projectLink = $(".projectList li a");
    var projectNames = $(".projectList li div");
    var projectsDesc = $(".projectList li span");
    var curIndexOfProject = 0;
    $.getJSON('../js/main/projects.json',function(data){
        for (var i = 0; i < 3; i++) {
            var firstProjectImg = data.projects[i].projectImg;
            var firstProjectName = data.projects[i].projectName;
            var firstProjectDesc = data.projects[i].projectDesc;
            $(projectlis[i]).attr("src",firstProjectImg);
            $(projectNames[i]).html(firstProjectName);
            $(projectsDesc[i]).html(firstProjectDesc);
        }
        curIndexOfProject += 3;
    });

// －－－－－－－－－－－－－－－－－动态加载项目－－－－－－－－－－－－－－－－－－－－－－－－－
    var triProjectLen = $(".projectList li").length;
    $(".nextBtn_project").click(function(){
        var a = $.ajax({
            type: "post",
            url: "../js/main/projects.json",
            dataType: "json",
            success: function(data){
                if (curIndexOfProject == triProjectLen) {
                    curIndexOfProject = 0 ;
                }
                else{
                    for (var i = curIndexOfProject ; i < curIndexOfProject + 3; i++) {
                        var projectImg = data.projects[i].projectImg;
                        var projectName = data.projects[i].projectName;
                        var projectDesc = data.projects[i].projectDesc;
                        $(projectlis[i]).attr("src",projectImg);
                        $(projectNames[i]).html(projectName);
                        $(projectsDesc[i]).html(projectDesc);
                    }
                }
                changeToNextProject(curIndexOfProject);
                curIndexOfProject += 3;
            }
        });

    });
    $(".preBtn_project").click(function(){
        var a = $.ajax({
            type: "post",
            url: "../js/main/projects.json",
            dataType: "json",
            success: function(data){
                if (curIndexOfProject == 0) {
                    for (var i = triProjectLen - 3 ; i < triProjectLen ; i++) {
                        var projectImg = data.projects[i].projectImg;
                        var projectName = data.projects[i].projectName;
                        var projectDesc = data.projects[i].projectDesc;
                        $(projectlis[i]).attr("src",projectImg);
                        $(projectNames[i]).html(projectName);
                        $(projectsDesc[i]).html(projectDesc);
                    }
                    curIndexOfProject = triProjectLen - 3;
                }
                else{
                    for (var i = curIndexOfProject - 3; i < curIndexOfProject ; i++) {
                        var projectImg = data.projects[i].projectImg;
                        var projectName = data.projects[i].projectName;
                        var projectDesc = data.projects[i].projectDesc;
                        $(projectlis[i]).attr("src",projectImg);
                        $(projectNames[i]).html(projectName);
                        $(projectsDesc[i]).html(projectDesc);
                    }
                    curIndexOfProject -= 3;
                }
                changeToNextProject(curIndexOfProject);

            }
        });
    });
    function changeToNextProject(projectNum){
        var goProject = projectNum / 3 * 840;
        $(".projectList").animate({left: "-" + goProject + "px"},500);
    }

});


   