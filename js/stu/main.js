$(function () {
    /*下面代码是导航栏*/
    $(".go-page").click(function () {
        $(".circle3").css("background", "transparent");
        $(".circle2").css("background", "transparent");
        $(".list-choice").css("font-weight", "normal");
    });
    $("#goto1").click(function () {
        $("#cir1a").css("background", "#ff8f00");
        $("#cir1b").css("background", "#ffffff");
        $("#choice1").css("font-weight", "bold");
    });
    $("#goto2").click(function () {
        $("#cir2a").css("background", "#ff8f00");
        $("#cir2b").css("background", "#ffffff");
        $("#choice2").css("font-weight", "bold");
    });
    $("#goto3").click(function () {
        $("#cir3a").css("background", "#ff8f00");
        $("#cir3b").css("background", "#ffffff");
        $("#choice3").css("font-weight", "bold");
    });
    $("#goto4").click(function () {
        $("#cir4a").css("background", "#ff8f00");
        $("#cir4b").css("background", "#ffffff");
        $("#choice4").css("font-weight", "bold");
    });
    $("#goto5").click(function () {
        $("#cir5a").css("background", "#ff8f00");
        $("#cir5b").css("background", "#ffffff");
        $("#choice5").css("font-weight", "bold");
    });
    /*下面代码是收起展开*/
    $("#prac-toggle").click(function () {
        if ($("#prac2").is(":hidden")) {
            $(".prac-show").css("display", "block");
            for (var i = 1; i <= 5; i++) {
                var pracia = "prac" + i + "a";
                var pracia_value = document.getElementById(pracia);
                var praci = "#prac" + i;
                if (pracia_value.innerHTML == "") {
                    $(praci).css("display", "none");
                }
            }
            $(this).css("transform", "rotate(180deg)");
        }
        else {
            $(".prac-show").css("display", "none");
            $("#prac1").css("display", "block");
            $(this).css("transform", "rotate(0deg)");
        }
    });


    $("#proj-toggle").click(function () {
        if ($("#proj2").is(":hidden")) {
            $(".proj-show").css("display", "block");
            for (var i = 1; i <= 5; i++) {
                var projia = "proj" + i + "a";
                var projia_value = document.getElementById(projia);
                var proji = "#proj" + i;
                if (projia_value.innerHTML == "") {
                    $(proji).css("display", "none");
                }
            }
            $(this).css("transform", "rotate(180deg)");
        }
        else {
            $(".proj-show").css("display", "none");
            $("#proj1").css("display", "block");
            $(this).css("transform", "rotate(0deg)");
        }
    });
    //下面是导航栏
    function nav() {
        var startPos = $("#nav-list").offset().top;
        var x = document.documentElement.clientWidth;
        if (x <= 970) {
            var left = "770px";
        }
        if (x > 970) {
            var left = (x - 970) / 2 + 770 + "px";
        }
        $.event.add(window, "scroll", function () {
            var p = $(window).scrollTop();
            $("#nav-list").css('position', ((p) > startPos) ? 'fixed' : '');
            $("#nav-list").css('top', ((p) > startPos) ? '0px' : '');
            $("#nav-list").css('left', ((p) > startPos) ? left : '');
        });
    };

    window.onload = function () {
        nav();
        //var id;获取url中id;
        var stu_id = 1;
        var data_info = {"id": stu_id};
        var data_file = {"stu_id": stu_id};

        /*-----------------------------获取学生个人信息---------------------------*/
        $.ajax({
            type: "POST",
            data: data_info,
            url: "../data/stu_main/info.json",
            dataType: "json",
            success: function (data) {
                var err = data.err;
                if (err == '-8') {
                    alert("学生不存在");
                }
                if (err == '-1') {
                    alert("学生不存在");
                }
                if (err == '-10') {
                    alert("操作失败");
                }
                if (err == '0') {
                    var avatar_path = data.avatar_path;
                    var name = data.name;
                    var school = data.school;
                    var sex = data.sex;
                    var age = data.age;
                    var edu_background = data.edu_background;
                    var location = data.location;
                    var tel = data.tel;
                    var mail = data.mail;
                    document.getElementById("avatar_path").src = avatar_path;
                    document.getElementById("detail-name").innerHTML = name;
                    document.getElementById("detail-school").innerHTML = school;
                    if (sex == 0) {
                    }
                    if (sex == 1) {
                        $("#boy").css("display", "inline");
                    }
                    if (sex == 2) {
                        $("#girl").css("display", "inline");
                    }
                    document.getElementById("detail-age").innerHTML = age;
                    document.getElementById("detail-background").innerHTML = edu_background;
                    document.getElementById("detail-tel").innerHTML = tel;
                    document.getElementById("detail-mail").innerHTML = mail;
                }
            }
        });

        /*-----------------------------获取学生教育经历---------------------------*/
        $.ajax({
            type: "POST",
            data: data_file,
            url: "../data/stu_main/edu.json",
            dataType: "json",
            success: function (data) {
                var err = data.err;
                if (err == '-18') {
                    document.getElementById("edu-show").innerHTML = "无教育经历";
                }
                if (err == '-1') {
                    alert("请求方法错误");
                }
                if (err == '-10') {
                    alert("操作失败");
                }
                if (err == '0') {
                    var grade = data.grade;
                    var major = data.major;
                    document.getElementById("detail-grade").innerHTML = " " + grade;
                    document.getElementById("detail-major").innerHTML = " " + major;
                    var edu_list = data.edu_list;
                    for (var i = 0; i < edu_list.length; i++) {
                        var edui = "edu" + (i + 1);
                        var e_major = edu_list[i].major;
                        var e_year = edu_list[i].graduation_year;
                        var e_back = edu_list[i].edu_background;
                        var e_school = edu_list[i].school;
                        document.getElementById(edui).innerHTML = "<p><span style='font-size:16px'>" + e_back + "</span><span style='font-size:16px'> " + e_year + "年毕业</span></p><p><span style='font-size:16px'>" + e_school + "</span><span style='font-size:16px'> " + e_major + "</span></p>";
                    }
                }
            }
        });
        /*-----------------------------获取实习经历---------------------------*/
        $.ajax({
            type: "POST",
            data: data_file,
            url: "../data/stu_main/prac.json",
            dataType: "json",
            success: function (data) {
                var err = data.err;
                if (err == '-20') {
                    document.getElementById("prac-all").innerHTML = "无实习经历";
                    $("#prac-toggle").css("display", "none");
                }
                if (err == '-1') {
                    alert("请求方法错误");
                }
                if (err == '-10') {
                    alert("操作失败");
                }
                if (err == '0') {
                    var intern_list = data.intern_list;
                    if (intern_list.length == 1) {
                        $("#prac-toggle").css("display", "none");
                    }
                    for (var i = 0; i < intern_list.length; i++) {
                        var pracia = "prac" + (i + 1) + "a";
                        var pracib = "prac" + (i + 1) + "b";
                        var pracic = "prac" + (i + 1) + "c";
                        var praci1 = "prac" + (i + 1) + "1";
                        var i_company = intern_list[i].company;
                        var i_position = intern_list[i].position;
                        var i_time = intern_list[i].begin_time + "-" + intern_list[i].end_time;
                        var i_description = intern_list[i].description;

                        document.getElementById(pracia).innerHTML = i_company;
                        document.getElementById(pracib).innerHTML = i_position;
                        document.getElementById(pracic).innerHTML = i_time;
                        document.getElementById(praci1).innerHTML = i_description;

                    }
                }
            }
        });
        /*-----------------------------获取项目经历---------------------------*/

        $.ajax({
            type: "POST",
            data: data_file,
            url: "../data/stu_main/proj.json",
            dataType: "json",
            success: function (data) {
                var err = data.err;
                if (err == '-21') {
                    document.getElementById("proj-all").innerHTML = "无项目经历";
                    $("#proj-toggle").css("display", "none");
                }
                if (err == '-1') {
                    alert("请求方法错误");
                }
                if (err == '-10') {
                    alert("操作失败");
                }
                if (err == '0') {
                    var proj_list = data.proj_list;
                    if (proj_list.length == 1) {
                        $("#proj-toggle").css("display", "none");
                    }
                    for (var i = 0; i < proj_list.length; i++) {
                        var p_name = proj_list[i].name;
                        var p_duty = proj_list[i].duty;
                        var p_year = proj_list[i].year;
                        var p_description = proj_list[i].description;
                        var projia = "proj" + (i + 1) + "a";
                        var projib = "proj" + (i + 1) + "b";
                        var projic = "proj" + (i + 1) + "c";
                        var proji1 = "proj" + (i + 1) + "1";
                        document.getElementById(projia).innerHTML = p_name;
                        document.getElementById(projib).innerHTML = p_duty;
                        document.getElementById(projic).innerHTML = p_year;
                        document.getElementById(proji1).innerHTML = p_description;
                    }
                }
            }
        });

        /*-----------------------------作品集合展示---------------------------*/
        $.ajax({
            type: "POST",
            data: data_file,
            url: "../data/stu_main/works.json",
            dataType: "json",
            success: function (data) {
                var err = data.err;
                if (err == '-23') {
                    document.getElementById("works-all").innerHTML = "无作品集";
                }
                if (err == '-1') {
                    alert("请求方法错误");
                }
                if (err == '-10') {
                    alert("操作失败");
                }
                if (err == '0') {
                    document.getElementById("works-id").innerHTML = stu_id;
                    var path = data.path;
                    var site = data.site;
                    document.getElementById("works-path").href = path;
                    document.getElementById("works-site").href = site;
                    document.getElementById("works-site").innerHTML = site;
                }
            }
        });
        /*-----------------------------技能展示---------------------------*/
        $.ajax({
            type: "POST",
            data: data_file,
            url: "../data/stu_main/skill.json",
            dataType: "json",
            success: function (data) {
                var err = data.err;
                if (err == '-24') {
                    document.getElementById("skill-all").innerHTML = "无技能评价";
                }
                if (err == '-1') {
                    alert("请求方法错误");
                }
                if (err == '-10') {
                    alert("操作失败");
                }
                if (err == '0') {
                    var skill_list = data.skill_list;
                    for (var i = 0; i < skill_list.length; i++) {
                        var s_name = skill_list[i].name;
                        var s_value = parseInt(skill_list[i].value);
                        if (s_value >= 0 && s_value < 25) {
                            var s_show = "入门";
                        }
                        if (s_value >= 25 && s_value < 50) {
                            var s_show = "掌握";
                        }
                        if (s_value >= 50 && s_value < 75) {
                            var s_show = "熟悉";
                        }
                        if (s_value >= 75 && s_value <= 100) {
                            var s_show = "精通";
                        }
                        var skillia = "skill" + (i + 1) + "a";
                        var skillib = "skill" + (i + 1) + "b";
                        var skillic = "skill" + (i + 1) + "c";
                        document.getElementById(skillia).innerHTML = s_name;
                        document.getElementById(skillib).style = "width:" + s_value + "%";
                        document.getElementById(skillic).innerHTML = s_show;
                    }
                    for (var i = skill_list.length + 1; i <= 5; i++) {
                        var skillalli = "#skill-all" + i;
                        $(skillalli).css("display", "none");
                    }
                }
            }
        });

    }

});