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
            team_info.label = data.res.label;
            team_info.logo = data.res.logo_path;
            team_info.mail = data.res.mail;
            team_info.tel = data.res.tel;

            $("#team_logo").attr('src', cur_media + team_info.logo);
            $("#team_name").html(team_info.name);
            if(team_info.tel.length>25){
                var team_tel_show=team_info.tel.slice(0,25)+"...";
                $("#web_site").append('<a href="'+team_info.tel+'">'+team_tel_show+'</a>');
            }
            else{
                $("#web_site").append('<a href="'+team_info.tel+'">'+team_info.tel+'</a>');
            }
            $("#mail_address").html(team_info.mail);
            var team_label_div=".team_label_div";
            var topic_detail=".topic_detail";
            for(i=0;i<team_info.label.length;i++){
                $(team_label_div).append('<div class="chip team_label">'+team_info.label[i]+'</div>');
            }
            var topic_detail_height=parseInt($(topic_detail).css("height").split('px')[0]);
            var question_div_height=40+topic_detail_height;
            var team_label_div_height=parseInt($(team_label_div).css("height").split('px')[0]);
            var basic_div_height=110+team_label_div_height;
            console.log(basic_div_height);
            if(question_div_height<basic_div_height){
                $(topic_detail).css("height",topic_detail_height+basic_div_height-question_div_height);
            }
            else{
                $(team_label_div).css("height",team_label_div_height-basic_div_height+question_div_height);
            }

        }
    });


});
