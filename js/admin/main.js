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
        console.log('joninfo');
        $('#content-frame').attr('src', 'job/info.html');
    });
});

