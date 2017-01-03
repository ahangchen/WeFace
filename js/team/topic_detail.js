$(document).ready(function() {
    var tid = getId();
    var team_info = {};
    var temp_class;
    var i;

    $.ajax({
        type: 'GET',
        url: cur_site + "team/info/",
        dataType: "json",
        data: {'tid': tid},
        success: function (data) {
            team_info.name = data.res.name;
            team_info.slogan = data.res.slogan;
            team_info.logo = data.res.logo_path;
            team_info.mail = data.res.mail;
            team_info.tel = data.res.tel;

            $("#team_logo").attr('src', cur_media + team_info.logo);
            $("#team_name").html(team_info.name);
            $("#team_slogan").html(team_info.slogan);
            $("#web_site").html(team_info.tel);
            $("#mail_address").html(team_info.mail);
        }
    });


});
