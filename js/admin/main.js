/**
 * Created by cwh on 16-5-27.
 */
// $('.button-collapse').sideNav({
//         menuWidth: 240, // Default is 240
//         // edge: 'right', // Choose the horizontal origin
//         closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
//     }
// );
$(document).ready(function() {
    $('#nav_about').click(function (e) {
        $('#content-frame').attr('src', 'about.html');
    });
    $('#nav_invite').click(function (e) {
        $('#content-frame').attr('src', 'team/invite.html');
    });
    $('#nav_team_info').click(function (e) {
        $('#content-frame').attr('src', 'team/info.html');
    });
    $('#nav_job_info').click(function (e) {
        $('#content-frame').attr('src', 'job/info.html');
    });
    $("#content-frame").load(function(){
        var content_height = $(this).contents().find("body").height();
        $(this).height(content_height);
    });
    var nav_show = false;
    $("#nav_menu").click(function(e) {
        if(nav_show){
            $(".button-collapse").sideNav('hide');
            nav_show = false;
        } else {
            $(".button-collapse").sideNav('show');
            nav_show = true;
        }
    });
});

