$(function(){


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
        url: "pages/roles_team.html",
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
    var curIndex_team = 0;
    $.getJSON('../js/main/teams.json',function(data){
        for (var i = 0; i < 3; i++) {
            var firstTeamImg = data.teams[i].teamImg;
            var firstTeamName = data.teams[i].teamName;
            var firstTeamDesc = data.teams[i].teamDesc;
            $(teamlis[i]).attr("src",firstTeamImg);
            $(teamNames[i]).html(firstTeamName);
            $(teamsDesc[i]).html(firstTeamDesc);
        }
        curIndex_team += 3;
    })

// －－－－－－－－－－－－－－－－－动态加载团队－－－－－－－－－－－－－－－－－－－－－－－－－
    var triTeamLen = $(".teamList li").length;
    $(".nextBtn_teams").click(function(){
        var a = $.ajax({
            type: "post",
            url: "../js/main/teams.json",
            dataType: "json",
            success: function(data){
                if (curIndex_team == triTeamLen) {
                    curIndex_team = 0 ;
                }
                else{
                    for (var i = curIndex_team ; i < curIndex_team + 3; i++) {
                        var teamImg = data.teams[i].teamImg;
                        var teamName = data.teams[i].teamName;
                        var teamDesc = data.teams[i].teamDesc;
                        $(teamlis[i]).attr("src",teamImg);
                        $(teamNames[i]).html(teamName);
                        $(teamsDesc[i]).html(teamDesc);
                    }
                }
                changeToNextTeam(curIndex_team);
                curIndex_team += 3;
            }
        });

    });
    $(".preBtn_teams").click(function(){
        var a = $.ajax({
            type: "post",
            url: "../js/main/teams.json",
            dataType: "json",
            success: function(data){
                if (curIndex_team == 0) {
                    for (var i = triTeamLen - 3 ; i < triTeamLen ; i++) {
                        var teamImg = data.teams[i].teamImg;
                        var teamName = data.teams[i].teamName;
                        var teamDesc = data.teams[i].teamDesc;
                        $(teamlis[i]).attr("src",teamImg);
                        $(teamNames[i]).html(teamName);
                        $(teamsDesc[i]).html(teamDesc);
                    }
                    curIndex_team = triTeamLen - 3;
                }
                else{
                    for (var i = curIndex_team - 3; i < curIndex_team ; i++) {
                        var teamImg = data.teams[i].teamImg;
                        var teamName = data.teams[i].teamName;
                        var teamDesc = data.teams[i].teamDesc;
                        $(teamlis[i]).attr("src",teamImg);
                        $(teamNames[i]).html(teamName);
                        $(teamsDesc[i]).html(teamDesc);
                    }
                    curIndex_team -= 3;
                }
                changeToNextTeam(curIndex_team);
                
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
    var curIndex_project = 0;
    $.getJSON('../js/main/projects.json',function(data){
        for (var i = 0; i < 3; i++) {
            var firstProjectImg = data.projects[i].projectImg;
            var firstProjectName = data.projects[i].projectName;
            var firstProjectDesc = data.projects[i].projectDesc;
            $(projectlis[i]).attr("src",firstProjectImg);
            $(projectNames[i]).html(firstProjectName);
            $(projectsDesc[i]).html(firstProjectDesc);
        }
        curIndex_project += 3;
    })

// －－－－－－－－－－－－－－－－－动态加载项目－－－－－－－－－－－－－－－－－－－－－－－－－
    var triProjectLen = $(".projectList li").length;
    $(".nextBtn_project").click(function(){
        var a = $.ajax({
            type: "post",
            url: "../js/main/projects.json",
            dataType: "json",
            success: function(data){
                if (curIndex_project == triProjectLen) {
                    curIndex_project = 0 ;
                }
                else{
                    for (var i = curIndex_project ; i < curIndex_project + 3; i++) {
                        var projectImg = data.projects[i].projectImg;
                        var projectName = data.projects[i].projectName;
                        var projectDesc = data.projects[i].projectDesc;
                        $(projectlis[i]).attr("src",projectImg);
                        $(projectNames[i]).html(projectName);
                        $(projectsDesc[i]).html(projectDesc);
                    }
                }
                changeToNextProject(curIndex_project);
                curIndex_project += 3;
            }
        });

    });
    $(".preBtn_project").click(function(){
        var a = $.ajax({
            type: "post",
            url: "../js/main/projects.json",
            dataType: "json",
            success: function(data){
                if (curIndex_project == 0) {
                    for (var i = triProjectLen - 3 ; i < triProjectLen ; i++) {
                        var projectImg = data.projects[i].projectImg;
                        var projectName = data.projects[i].projectName;
                        var projectDesc = data.projects[i].projectDesc;
                        $(projectlis[i]).attr("src",projectImg);
                        $(projectNames[i]).html(projectName);
                        $(projectsDesc[i]).html(projectDesc);
                    }
                    curIndex_project = triProjectLen - 3;
                }
                else{
                    for (var i = curIndex_project - 3; i < curIndex_project ; i++) {
                        var projectImg = data.projects[i].projectImg;
                        var projectName = data.projects[i].projectName;
                        var projectDesc = data.projects[i].projectDesc;
                        $(projectlis[i]).attr("src",projectImg);
                        $(projectNames[i]).html(projectName);
                        $(projectsDesc[i]).html(projectDesc);
                    }
                    curIndex_project -= 3;
                }
                changeToNextProject(curIndex_project);
                
            }
        });
    });
    function changeToNextProject(projectNum){
                var goProject = projectNum / 3 * 840;
                $(".projectList").animate({left: "-" + goProject + "px"},500);
       }

})


   