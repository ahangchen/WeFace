$(function () {
    $("#fix_msg_button").click(function () {
        $("#information").empty().css("height","500px");
        //$("#basic_team_information").css("opacity","1").css("height","600px");
        //$("#orgin_page").css("top","-100px");
         $.ajax({
            type:"get",
            url: "basic_msg_for_team.html",
            dataType:"html",
            success:function(data){
                $("#information").html(data);
            }
        })
    });

$("#add_tag").click(function () {
    alert();

})



});
