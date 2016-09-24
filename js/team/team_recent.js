/**
 * Created by cwh on 16-7-30.
 */
//图片轮播；
$(document).ready(function () {
    // var slide = $('.slider');
    // slide.slider({full_width: true, height: 290});
});


$.ajax({
    type: "GET",
    url: cur_site + "team/all/newest",
    dataType: "json",
    success: function (data) {
        console.log(data);
        console.log(data.res.jobs.length);
        var resArray = [];
        for (var i = 0; i < data.res.teams.length; i++) {
            resArray.push({"type": 1, "value": data.res.teams[i]});
        }
        for (var i = 0; i < data.res.jobs.length; i++) {
            resArray.push({"type": 2, "value": data.res.jobs[i]});
        }
        for (var i = 0; i < data.res.products.length; i++) {
            resArray.push({"type": 3, "value": data.res.products[i]});
        }
        console.log(resArray);
        console.log(resArray.length / 3);
        var curIndex = 0;
        var resLi = [];
        for (var rec_idx in resArray) {
            var recent = resArray[rec_idx];
            if (curIndex % 3 == 0) {
                resLi.push($('<li></li>'));
                $("#show_team").append(resLi);
            }
            console.log(resLi);
            console.log(curIndex);
            console.log(parseInt(curIndex / 3));
            switch (recent["type"]) {
                case 1:
                    resLi[parseInt(curIndex / 3)].append(show("jobDetail.html?data=", recent["value"].tid, recent["value"].logo_path, recent["value"].name, "成立了新团队"));
                    break;
                case 2:
                    resLi[parseInt(curIndex / 3)].append(show("jobDetail.html?data=", recent["value"].jid, recent["value"].team_logo, recent["value"].t_name, "发布了新职位:" + recent["value"].j_name));
                    break;
                case 3:
                    resLi[parseInt(curIndex / 3)].append(show("index.html?tid=", recent["value"].tid, recent["value"].p_img, recent["value"].t_name, "发布了新项目:" + recent["value"].p_name));
                    break;
            }
            curIndex++;
        }

        var slide = $('.slider');
        slide.slider({full_width: true, height: 290});
    },
    error: function (jqXHR) {
        alert("发生错误" + jqXHR.status);
    }

});

function show(toUrl, id, logo, teamName, recentContain) {
    var linkDiv = $('<a></a>');
    linkDiv.attr("href", toUrl + id);

    var recentDiv = $('<div></div>');
    linkDiv.append(recentDiv);
    recentDiv.attr("class", "show_team shadow");
    var recentImg = $('<img/>');
    recentDiv.append(recentImg);
    recentImg.attr("src", cur_media + logo);
    var recentText = $('<div></div>');
    recentDiv.append(recentText);
    recentText.attr("class", "show_text");
    var recent_h1 = $('<h1></h1>');
    recent_h1.text(teamName);
    recentText.append(recent_h1);
    var recent_h2 = $('<h2></h2>');
    recent_h2.text(recentContain);
    recentText.append(recent_h2);
    return linkDiv;
}

$.ajax({
    type: "GET",
    url: cur_site + "team/team/newest",
    dataType: "json",
    success: function (data) {
        for(var i=0;i<data.res.length;i++){
            var link_a=$('<a></a>');
            link_a.attr("href",data.res[i].tid);
            $("#team_card").append(link_a);
            var cardContainer=$('<div></div>');
            cardContainer.attr("class","card shadow");
            link_a.append(cardContainer);
            var team_logo=$('<img/>');
            team_logo.attr("src",cur_media+data.res[i].logo_path);
            cardContainer.append(team_logo);
            var cardText=$('<div></div>');
            cardText.attr("class","card_text");
            cardContainer.append(cardText);
            var team_name=$('<span></span>');
            team_name.text(data.res[i].name);
            cardText.append(team_name);
            var aboutTeam=$('<h2></h2>');
            aboutTeam.text(data.res[i].about);
            cardText.append(aboutTeam);
            var teamProject=$('<h3></h3>');
            teamProject.text(data.res[i].proj_cnt+"个团队项目");
            cardText.append(teamProject);
            var teamMember=$('<h3></h3>');
            teamMember.text(data.res[i].stu_cnt+"个团队成员");
            cardText.append(teamMember);
            var teamJob=$('<h3></h3>');
            teamJob.text(data.res[i].job_cnt+"个团队任务");
            cardText.append(teamJob);
            var teamSlogan=$('<p></p>');
            teamSlogan.text("团队标语:"+data.res[i].slogan);
            cardContainer.append(teamSlogan);
        }
        var addMore=$('<div></div>');
        addMore.attr("class","more");
        $("#team_card").append(addMore);
        var moreLink=$('<a></a>');
        moreLink.attr("class","waves-effect waves-light btn  orange accent-2");
        moreLink.attr("href","../main/search.html");
        addMore.append(moreLink);
        moreLink.text("加载更多");
        var icons=$('<i></i>');
        icons.attr("class","material-icons right");
        icons.text("cloud");
        moreLink.append(icons);

    },
    error: function (jqXHR) {
        alert("发生错误" + jqXHR.status);
    }

});


