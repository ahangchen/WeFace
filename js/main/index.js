
//-----------------------------------------------首页的js代码-----------------------------------------------------

$(function(){
//------------------------------------------------按钮显示-----------------------------------
    $('.preBtn').hover(function(){
        $('.preBtn i').css("visibility","visible");
    },function() {
        $('.preBtn i').css("visibility","hidden");
        $('.preBtn').css("background-color","transparent");

    }).trigger("mouseleave");

    $('.nextBtn').hover(function(){
        $('.nextBtn i').css("visibility","visible");
    },function() {
        $('.nextBtn i').css("visibility","hidden");
        $('.nextBtn').css("background-color","transparent");

    }).trigger("mouseleave");

    $('.preBtnOfTeams').hover(function(){
        $('.preBtnOfTeams i').css("visibility","visible");
    },function() {
        $('.preBtnOfTeams i').css("visibility","hidden");
        $('.preBtnOfTeams').css("background-color","transparent");
    }).trigger("mouseleave");

    $('.nextBtnOfTeams').hover(function(){
        $('.nextBtnOfTeams i').css("visibility","visible");
    },function() {
        $('.nextBtnOfTeams i').css("visibility","hidden");
        $('.nextBtnOfTeams').css("background-color","transparent");
    }).trigger("mouseleave");

    $('.preBtnOfProject').hover(function(){
        $('.preBtnOfProject i').css("visibility","visible");
    },function() {
        $('.preBtnOfProject i').css("visibility","hidden");
        $('.preBtnOfProject').css("background-color","transparent");
    }).trigger("mouseleave");

    $('.nextBtnOfProject').hover(function(){
        $('.nextBtnOfProject i').css("visibility","visible");
    },function() {
        $('.nextBtnOfProject i').css("visibility","hidden");
        $('.nextBtnOfProject').css("background-color","transparent");
    }).trigger("mouseleave");


// －－－－－－－－－－－－－－－banner初始化－－－－－－－－－－－－－－－－－－

    $.getJSON('../data/banners.json',function(data){
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
    var teamLi = $('.teamList li');
    var curIndexOfTeam = 0;
    $.getJSON('http://110.64.69.66:8081/team/hot_team/',function(data){
        for (var i = 0; i < 3; i++) {
            var firstTeamImg = data.msg[i].logo_path;
            var firstTeamName = data.msg[i].name;
            var firstTeamDesc = data.msg[i].about;
            var firstTeamid = data.msg[i].id;
            $(teamlis[i]).attr("src",firstTeamImg);
            $(teamNames[i]).html(firstTeamName);
            $(teamsDesc[i]).html(firstTeamDesc);
            $(teamLi[i]).attr("id",firstTeamid);
        }
        curIndexOfTeam += 3;
    });
    //$.ajax({
    //    type:"get",
    //    url:"http://110.64.69.66:8081/team/hot_team/",
    //    dataType:"json",
    //    success:function(data){
    //        for (var i = 0; i < 3; i++) {
    //            var firstTeamImg = data.msg[i].logo_path;
    //            var firstTeamName = data.msg[i].name;
    //            var firstTeamDesc = data.msg[i].about;
    //            var firstTeamid = data.msg[i].id;
    //            $(teamlis[i]).attr("src",firstTeamImg);
    //            $(teamNames[i]).html(firstTeamName);
    //            $(teamsDesc[i]).html(firstTeamDesc);
    //            $(teamLi[i]).attr("id",firstTeamid);
    //        }
    //        curIndexOfTeam += 3;
    //    },
    //    error:function(data){
    //        alert(data.msg);
    //    },
    //    headers:{
    //        "Access-Control-Allow-Origin":"*"
    //    }
    //});
// －－－－－－－－－－－－－－－－－动态加载团队－－－－－－－－－－－－－－－－－－－－－－－－－
    var triTeamLen = $(".teamList li").length;
    $(".nextBtnOfTeams").click(function(){
        var a = $.ajax({
            type: "get",
            url: "http://110.64.69.66:8081/team/hot_team/",
            dataType: "json",
            success: function(data){
                var maxLength = data.msg.length;
                if (curIndexOfTeam == maxLength) {
                    curIndexOfTeam = 0;
                }
                else {
                    if (triTeamLen < maxLength) {
                        for (var j = 0; j < 3; j++) {
                            $(".teamList").append('<li><a  target="_blank"><img ><div class="desc">团队名称</div><span></span></a></li>');
                        }
                    }
                    triTeamLen += 3;
                    var len = 840 * (triTeamLen / 3);
                    var lenCss = len + "px";
                    $(".teamList").css("width", lenCss);

                    teamlis = $(".teamList li img");
                    teamLink = $(".teamList li a");
                    teamNames = $(".teamList li div");
                    teamsDesc = $(".teamList li span");
                    teamLi = $(".teamList li");
                    for (var i = curIndexOfTeam; i < curIndexOfTeam + 3; i++) {
                        var teamImg = data.msg[i].logo_path;

                        var teamName = data.msg[i].name;
                        var teamDesc = data.msg[i].about;
                        var teamid = data.msg[i].id;
                        $(teamlis[i]).attr("src", teamImg);
                        $(teamNames[i]).html(teamName);
                        $(teamsDesc[i]).html(teamDesc);
                        $(teamLi[i]).attr("id",teamid);
                    }
                }
                changeToNextTeam(curIndexOfTeam);
                curIndexOfTeam += 3;
            },
            error:function(data){
                alert(data.msg);
            },
            headers: {
                "Access-Control-Allow-Origin":"*"
            }
        });
    });
    $(".preBtnOfTeams").click(function(){
        var a = $.ajax({
            type: "get",
            url: "http://110.64.69.66:8081/team/hot_team/",
            dataType: "json",
            success: function(data){
                var maxLength = data.msg.length;

                if (curIndexOfTeam == 0) {
                    if(triTeamLen < maxLength) {
                        for (var j = 0; j < maxLength - triTeamLen; j++) {
                            $(".teamList").append('<li><a  target="_blank"><img ><div class="desc">团队名称</div><span></span></a></li>');
                        }
                        triTeamLen = maxLength;
                        var len = 840 * (triTeamLen / 3);
                        var lenCss = len + "px";
                        $(".teamList").css("width", lenCss);
                    }


                    teamlis = $(".teamList li img");
                    teamLink = $(".teamList li a");
                    teamNames = $(".teamList li div");
                    teamsDesc = $(".teamList li span");
                    teamLi = $('.teamList li');
                    for (var i = triTeamLen - 3 ; i < triTeamLen ; i++) {
                        var teamImg = data.msg[i].logo_path;
                        var teamName = data.msg[i].name;
                        var teamDesc = data.msg[i].about;
                        var teamid = data.msg[i].id;
                        $(teamlis[i]).attr("src",teamImg);
                        $(teamNames[i]).html(teamName);
                        $(teamsDesc[i]).html(teamDesc);
                        $(teamLi[i]).attr("id",teamid);
                    }
                    curIndexOfTeam = maxLength - 3;
                }
                else{
                    for (var i = curIndexOfTeam - 3; i < curIndexOfTeam ; i++) {
                        var teamImg = data.msg[i].logo_path;
                        var teamName = data.msg[i].name;
                        var teamDesc = data.msg[i].about;
                        var teamid = data.msg[i].id;
                        $(teamlis[i]).attr("src",teamImg);
                        $(teamNames[i]).html(teamName);
                        $(teamsDesc[i]).html(teamDesc);
                        $(teamLi[i]).attr("id",teamid);
                    }
                    curIndexOfTeam -= 3;
                }
                changeToNextTeam(curIndexOfTeam);

            },
            error:function(data){
                alert(data.msg);
            },
            headers: {
                "Access-Control-Allow-Origin":"*"
            }
        });
    });
    function changeToNextTeam(teamNum){

        var goTeam = teamNum / 3 * 827;
        $(".teamList").animate({left: "-" + goTeam + "px"},500);
    }




// －－－－－－－－－－－－－－－热门项目－－－－－－－－－－－－－－－－－－－－－－－－－－－
// －－－－－－－－－－－－－热门项目初始化－－－－－－－－－－－－－－－－－－－－－－－－－－
    var projectlis = $(".projectList li img");
    var projectLink = $(".projectList li a");
    var projectNames = $(".projectList li div");
    var projectsDesc = $(".projectList li span");
    var projectLi = $(".projectList li");
    var curIndexOfProject = 0;
    $.getJSON('http://110.64.69.66:8081/team/hot_product/',function(data){
        for (var i = 0; i < 3; i++) {
            var firstProjectImg = data.msg[i].img_path;
            var firstProjectName = data.msg[i].name;
            var firstProjectDesc = data.msg[i].content;
            var proId = data.msg[i].id;
            $(projectlis[i]).attr("src",firstProjectImg);
            $(projectNames[i]).html(firstProjectName);
            $(projectsDesc[i]).html(firstProjectDesc);
            $(projectLi[i]).attr("id",proId);
        }
        curIndexOfProject += 3;
    });

// －－－－－－－－－－－－－－－－－动态加载项目－－－－－－－－－－－－－－－－－－－－－－－－－
    var triProjectLen = $(".projectList li").length;
    $(".nextBtnOfProject").click(function(){
        var a = $.ajax({
            type: "get",
            url: "http://110.64.69.66:8081/team/hot_product/",
            dataType: "json",
            success: function(data){
                var maxLength = data.msg.length;
                if (curIndexOfProject == maxLength) {
                    curIndexOfProject = 0 ;
                }
                else{
                    if (triProjectLen < maxLength) {
                        for (var j = 0; j < 3; j++) {
                            $(".projectList").append('<li><a  target="_blank"><img ><div class="desc">项目名称</div><span></span></a></li>');
                        }
                    }
                    triProjectLen += 3;
                    var len = 840 * (triProjectLen / 3);
                    var lenCss = len + "px";
                    $(".projectList").css("width", lenCss);

                    projectlis = $(".projectList li img");
                    projectNames = $(".projectList li div");
                    projectsDesc = $(".projectList li span");
                    projectLi = $(".projectList li");

                    for (var i = curIndexOfProject ; i < curIndexOfProject + 3; i++) {
                        var projectImg = data.msg[i].img_path;
                        var projectName = data.msg[i].name;
                        var projectDesc = data.msg[i].content;
                        var proId = data.msg[i].id;
                        $(projectlis[i]).attr("src",projectImg);
                        $(projectNames[i]).html(projectName);
                        $(projectsDesc[i]).html(projectDesc);
                        $(projectLi[i]).attr("id",proId);
                    }
                }
                changeToNextProject(curIndexOfProject);
                curIndexOfProject += 3;
            },
            error:function(data){
                alert(data.msg);
            },
            headers: {
                "Access-Control-Allow-Origin":"*"
            }
        });

    });
    $(".preBtnOfProject").click(function(){
        var a = $.ajax({
            type: "get",
            url: "http://110.64.69.66:8081/team/hot_product/",
            dataType: "json",
            success: function(data){
                var maxLength = data.msg.length;
                if (curIndexOfProject == 0) {
                    if (triProjectLen < maxLength) {
                        for (var j = 0; j < maxLength - triProjectLen; j++) {
                            $(".projectList").append('<li><a  target="_blank"><img ><div class="desc">项目名称</div><span></span></a></li>');
                        }
                        triProjectLen = maxLength;
                        var len = 840 * (triProjectLen / 3);
                        var lenCss = len + "px";
                        $(".projectList").css("width", lenCss);
                    }
                    projectlis = $(".projectList li img");
                    projectNames = $(".projectList li div");
                    projectsDesc = $(".projectList li span");
                    projectLi = $(".projectList li");
                    for (var i = maxLength - 3 ; i < maxLength ; i++) {
                        var projectImg = data.msg[i]. img_path;
                        var projectName = data.msg[i].name;
                        var projectDesc = data.msg[i].content;
                        var proId = data.msg[i].id;
                        $(projectlis[i]).attr("src",projectImg);
                        $(projectNames[i]).html(projectName);
                        $(projectsDesc[i]).html(projectDesc);
                        $(projectLi[i]).attr("id",proId);
                    }
                    curIndexOfProject = triProjectLen - 3;
                }
                else{
                    for (var i = curIndexOfProject - 3; i < curIndexOfProject ; i++) {
                        var projectImg = data.msg[i].img_path;
                        var projectName = data.msg[i].name;
                        var projectDesc = data.msg[i].content;
                        $(projectlis[i]).attr("src",projectImg);
                        $(projectNames[i]).html(projectName);
                        $(projectsDesc[i]).html(projectDesc);
                        $(projectLi[i]).attr("id",proId);
                    }
                    curIndexOfProject -= 3;
                }
                changeToNextProject(curIndexOfProject);

            },
            error:function(data){
                alert(data.msg);
            },
            headers: {
                "Access-Control-Allow-Origin":"*"
            }
        });
    });
    function changeToNextProject(projectNum){
        var goProject = projectNum / 3 * 827;
        $(".projectList").animate({left: "-" + goProject + "px"},500);
    }

});


   