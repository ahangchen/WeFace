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
    $('#nav_publish').click(function (e) {
        $('#content-frame').attr('src', 'job/publish.html');
    });
    $('#nav_modify').click(function (e) {
        $('#content-frame').attr('src', 'job/modify.html');
    });
    $('#nav_job_list').click(function (e) {
        $('#content-frame').attr('src', 'job/list.html');
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

