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
                    resLi[parseInt(curIndex / 3)].append(show("index.html?data=", recent["value"].tid, recent["value"].p_img, recent["value"].t_name, "发布了新项目:" + recent["value"].p_name));
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
