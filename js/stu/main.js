$(function () {
    /*下面代码是导航栏*/
    $(".circle3").click(function () {
        $(".circle3").css("background", "transparent");
        $(".circle2").css("background", "transparent");
        $(".list-choice").css("font-weight", "normal");
    });
    $("#cir1a").click(function () {
        $("#cir1a").css("background", "#ff8f00");
        $("#cir1b").css("background", "#ffffff");
        $("#choice1").css("font-weight", "bold");
    });
    $("#cir2a").click(function () {
        $("#cir2a").css("background", "#ff8f00");
        $("#cir2b").css("background", "#ffffff");
        $("#choice2").css("font-weight", "bold");
    });
    $("#cir3a").click(function () {
        $("#cir3a").css("background", "#ff8f00");
        $("#cir3b").css("background", "#ffffff");
        $("#choice3").css("font-weight", "bold");
    });
    $("#cir4a").click(function () {
        $("#cir4a").css("background", "#ff8f00");
        $("#cir4b").css("background", "#ffffff");
        $("#choice4").css("font-weight", "bold");
    });
    $("#cir5a").click(function () {
        $("#cir5a").css("background", "#ff8f00");
        $("#cir5b").css("background", "#ffffff");
        $("#choice5").css("font-weight", "bold");
    });
    /*下面代码是收起展开*/
    $("#prac-toggle").click(function () {
        if ($("#prac2").is(":hidden")) {
            $(".prac-show").css("display", "block");
        }
        else {
            $(".prac-show").css("display", "none");
            $("#prac1").css("display", "block");
        }
    });
    $("#proj-toggle").click(function () {
        if ($("#proj2").is(":hidden")) {
            $(".proj-show").css("display", "block");
        }
        else {
            $(".proj-show").css("display", "none");
            $("#proj1").css("display", "block");
        }


    });


});