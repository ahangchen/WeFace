/**
 * Created by jewel on 2017/1/8.
 */
$(function() {
    //广告栏的交互
    $('.preBtn').hover(function () {
        $('.preBtn i').css("visibility", "visible");
    }, function () {
        $('.preBtn i').css("visibility", "hidden");
        $('.preBtn').css("background-color", "transparent");

    }).trigger("mouseleave");

    $('.nextBtn').hover(function () {
        $('.nextBtn i').css("visibility", "visible");
    }, function () {
        $('.nextBtn i').css("visibility", "hidden");
        $('.nextBtn').css("background-color", "transparent");

    }).trigger("mouseleave");

    //广告栏的数据处理以及跳转
    $.getJSON('../data/banners.json', function (data) {
        var lis = $(".imgList li img");
        var link = $(".imgList li a");
        for (var i = 0; i < lis.length; i++) {
            var bannerUrl = data.banner[i].bannerImg;
            var imgHref = data.banner[i].bannerUrl;
            console.log(bannerUrl);
            // $(lis[i]).attr("src",cur_media + bannerUrl);
            $(lis[i]).attr("src", bannerUrl);
            $(link[i]).attr("href", imgHref);
        }
    });
    var curIndexBanner = 0;
    var imgLen_banner = $(".imgList li").length;
    $(".preBtn").click(function () {
        curIndexBanner = (curIndexBanner > 0) ? (--curIndexBanner) : (imgLen_banner - 1);
        changeTo(curIndexBanner);
    });
    $(".nextBtn").click(function () {

        if (curIndexBanner == imgLen_banner - 1) {
            curIndexBanner = 0;
        }
        else {
            curIndexBanner++;
        }
        changeTo(curIndexBanner);

    });
    function changeTo(num) {
        var goLeft = num * 100;
        $(".imgList").animate({left: "-" + goLeft + "%"}, 500);
    }

    $(".imgList").hover(function () {
        clearInterval(picTimer);
    }, function () {
        picTimer = setInterval(function () {
            changeTo(curIndexBanner);
            curIndexBanner++;
            if (curIndexBanner == imgLen_banner) {
                curIndexBanner = 0;
            }
        }, 5000); //此5000代表自动播放的间隔，单位：毫秒
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
    // －－－－－－－－－－－－－－－热门团队－－－－－－－－－－－－－－－－－－－－－－－－－－－
// －－－－－－－－－－－－－热门团队初始化－－－－－－－－－－－－－－－－－－－－－－－－－－
    var wefaceBace_site = "http://wemeet.tech:8080/";
    var teamlis = $(".teamList .imgFrame img");
    var teamLink = $(".teamList li a");
    var teamNames = $(".teamList li .desc");
    var teamsDesc = $(".teamList li span");
    var teamLi = $('.teamList li');
    var curIndexOfTeam = 0;
    $.getJSON(cur_site + 'team/hot_team/',function(data){
        console.log(data);
        for (var i = 0; i < data.message.length; i++) {
            var firstTeamImg = data.message[i].logo_path;
            var firstTeamName = data.message[i].name;
            var firstTeamDesc = data.message[i].about;
            var firstTeamid = data.message[i].id;
            $(teamlis[i]).attr("src",cur_media + firstTeamImg);
            $(teamLink[i]).attr("href",wefaceBace_site+'team/team_index.html?tid='+firstTeamid);
            $(teamNames[i]).html(firstTeamName);
            $(teamsDesc[i]).html(firstTeamDesc);
            $(teamLi[i]).attr("id",firstTeamid);
        }
        curIndexOfTeam += 4;
    });


// －－－－－－－－－－－－－－－－－动态加载团队－－－－－－－－－－－－－－－－－－－－－－－－－
    var triTeamLen = $(teamLi).length;
    $(".nextBtnOfTeams").click(function(){
        var a = $.ajax({
            type: "get",
            url: cur_site + "team/hot_team/",
            dataType: "json",
            success: function(data){
                var maxLength = data.message.length;
                if (curIndexOfTeam == maxLength) {
                    curIndexOfTeam = 0;
                }
                else {
                    if (triTeamLen < maxLength) {
                        for (var j = 0; j < 4; j++) {
                            $(".teamList").append('<li><a  target="_blank"><img ><div class="desc">团队名称</div><span></span></a></li>');
                        }
                    }
                    triTeamLen += 4;
                    var len = 840 * (triTeamLen / 4);
                    var lenCss = len + "px";
                    $(".teamList").css("width", lenCss);

                    teamlis = $(".teamList li img");
                    teamLink = $(".teamList li a");
                    teamNames = $(".teamList li div");
                    teamsDesc = $(".teamList li span");
                    teamLi = $(".teamList li");
                    for (var i = curIndexOfTeam; i < curIndexOfTeam + 4; i++) {
                        var teamImg = data.msg[i].logo_path;

                        var teamName = data.msg[i].name;
                        var teamDesc = data.msg[i].about;
                        var teamid = data.msg[i].id;
                        $(teamlis[i]).attr("src", cur_media + teamImg);
                        $(teamLink[i]).attr("href",wefaceBace_site+'team/team_index.html?tid='+teamid);
                        $(teamNames[i]).html(teamName);
                        $(teamsDesc[i]).html(teamDesc);
                        $(teamLi[i]).attr("id",teamid);
                    }
                }
                changeToNextTeam(curIndexOfTeam);
                curIndexOfTeam += 4;
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
            url: cur_site + "team/hot_team/",
            dataType: "json",
            success: function(data){
                var maxLength = data.message.length;

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
                        $(teamlis[i]).attr("src",cur_media + teamImg);
                        $(teamLink[i]).attr("href",wefaceBace_site+'team/team_index.html?tid='+teamid);
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
                        $(teamlis[i]).attr("src",cur_media + teamImg);
                        $(teamLink[i]).attr("href",wefaceBace_site+'team/team_index.html?tid='+teamid);
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

//-------互动社区最新话题
    $.ajax({
        type: 'get',
        url: cur_site+ 'team/topic/newest/',
        dataType: 'json',
        success: function(data){
            console.log(data.res.length);
            let topicArray = [];
            for(let i = 0; i < data.res.length; i++){
                let topicInfo = {
                    time: data.res[i].topic_time,
                    title: data.res[i].topic_title,
                    team_id: data.res[i].team_id,
                    team_name: data.res[i].team_name,
                    topic_id: data.res[i].topic_id,
                    team_logo: data.res[i].team_logo,
                    topic_content: data.res[i].topic_content
                };
                topicArray.push(topicInfo)
            }
            showTopics(topicArray)
        },
        error: function(data){
            console.log('获取最新话题失败，请刷新')
        }
    });
    function showTopics(array){
        for(let i = 0; i < array.length; i++ ){
            $('.communityCards').append(`<div class="comunityCard z-depth-2">
            <div class="teamInfo">
                <div class="teamImg">
                    <img src="${cur_media+array[i].team_logo}">
                </div>
                <div class="teamInfoRight">
                    <div class="teamName">${array[i].team_name}</div>
                    <div class="date">${array[i].time}</div>
                </div>
            </div>
            <div class="question">
                ${array[i].title}
            </div>
            <div class="quesDesc">${array[i].topic_content}</div>
            <div class="response">
                <div class="notes">17个留言</div>
                <div class="goods">2个赞</div>
            </div>
        </div>`)
        }

    }



});

