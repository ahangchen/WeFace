function edit() {
    if ($("#edu1").html() == "" && $("#edu2").html() == "" && $("#edu3").html() == "" && $("#edu4").html() == "" && $("#edu5").html() == "") {
        $("#add1").css("display", "block");
    }
    else {
        $("#ea1").css("display", "inline-block");
    }

    if ($("#prac1a").html() == "" && $("#prac2a").html() == "" && $("#prac3a").html() == "" && $("#prac4a").html() == "" && $("#prac5a").html() == "") {
        $("#add2").css("display", "block");
    }
    else {
        $("#ea2").css("display", "inline-block");
    }

    if ($("#proj1a").html() == "" && $("#proj2a").html() == "" && $("#proj3a").html() == "" && $("#proj4a").html() == "" && $("#proj5a").html() == "") {
        $("#add3").css("display", "block");
    }
    else {
        $("#ea3").css("display", "inline-block");
    }

    if ($("#works-id").html() == "") {
        $("#add4").css("display", "block");
    }
    else {
        $("#ea4").css("display", "inline-block");
    }

    if ($("#skill1a").html() == "") {
        $("#add5").css("display", "block");
    }
    else {
        $("#ea5").css("display", "inline-block");
    }
    pracnone1();
    pracnone2();
}


function pracnone1() {
    var flag = false;
    for (var i = 1; i <= 5; i++) {
        var pracia = "#prac" + i + "a";
        var praci = "#prac" + i;
        if ($(pracia).html() != "" && flag == false) {
            $(praci).css("display", "block");
            flag = true;
        }
        else {
            $(praci).css("display", "none");
        }
    }
}
function pracnone2() {
    var flag = false;
    for (var i = 1; i <= 5; i++) {
        var projia = "#proj" + i + "a";
        var proji = "#proj" + i;
        if ($(projia).html() != "" && flag == false) {
            $(proji).css("display", "block");
            flag = true;
        }
        else {
            $(proji).css("display", "none");
        }
    }
}


$(function () {
var student_id=location.search.split("=")[1];
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
    $("#prac-toggle").bind("click", prac_toggle);
    function prac_toggle() {
        var temp = new Array();
        var count = 0;
        for (var j = 1; j <= 5; j++) {
            var tempi = "#prac" + j + "a";
            if ($(tempi).html() != "") {
                temp[count++] = j;
            }
        }
        var x = "#prac" + temp[1];
        if ($(x).is(":hidden")) {
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
            var praci = "#prac" + temp[0];
            $(".prac-show").css("display", "none");
            $(praci).css("display", "block");
            $(this).css("transform", "rotate(0deg)");
        }

    }


    $("#proj-toggle").bind("click", proj_toggle);

    function proj_toggle() {
        var temp = new Array();
        var count = 0;
        for (var j = 1; j <= 5; j++) {
            var tempi = "#proj" + j + "a";
            if ($(tempi).html() != "") {
                temp[count++] = j;
            }
        }
        var x = "#proj" + temp[1];
        if ($(x).is(":hidden")) {
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
            var proji = "#proj" + temp[0];
            $(".proj-show").css("display", "none");
            $(proji).css("display", "block");
            $(this).css("transform", "rotate(0deg)");
        }
    }

    //下面是导航栏
    function nav() {
        var startPos = $("#nav-list").offset().top;
        $.event.add(window, "scroll", function () {
            var x = document.documentElement.clientWidth;
            var left;
            if (x <= 970) {
                left = "770px";
            }
            if (x > 970) {
                left = (x - 970) / 2 + 770 + "px";
            }
            var p = $(window).scrollTop();
            $("#nav-list").css('position', ((p) > startPos) ? 'fixed' : '');
            $("#nav-list").css('top', ((p) > startPos) ? '0px' : '');
            $("#nav-list").css('left', ((p) > startPos) ? left : '');
        });
    };

    window.onload = function () {
        var ajax_num = 5;
        nav();
        //var id;获取url中id;
        var data_info = {"id": 2};
        var data_file = {"stu_id": 2};

        /*-----------------------------获取学生个人信息---------------------------*/
        $.ajax({
            type: "POST",
            data: data_info,
            url: "http://110.64.69.66:8081/student/info/get/",
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
                    var myDate = new Date();
                    var end_year = myDate.getFullYear();
                    var end_month = myDate.getMonth() + 1;
                    var start_year = data.year;
                    var start_month = data.month;
                    var age = (end_year - start_year) + ((end_month - start_month >= 0) ? 0 : (-1));
                    var major = data.major;
                    var location = data.location;
                    var tel = data.tel;
                    var mail = data.mail;
                    document.getElementById("avatar_path").src = avatar_path;
                    document.getElementById("detail-name").innerHTML = name;
                    document.getElementById("detail-school").innerHTML = school;
                    if (sex == "0") {
                    }
                    if (sex == "1") {
                        $("#boy").css("display", "inline");
                    }
                    if (sex == "2") {
                        $("#girl").css("display", "inline");
                    }
                    document.getElementById("detail-age").innerHTML = age;
                    document.getElementById("detail-major").innerHTML = major;
                    document.getElementById("detail-location").innerHTML = location;
                    document.getElementById("detail-tel").innerHTML = tel;
                    document.getElementById("detail-mail").innerHTML = mail;
                }
                ajax_num--;
                if (ajax_num == 0) {
                    edit();
                }
            },
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        });

        /*-----------------------------获取学生教育经历---------------------------*/
        $.ajax({
            type: "POST",
            data: data_file,
            url: "http://110.64.69.66:8081/student/info/edu/get/",
            dataType: "json",
            success: function (data) {
                var err = data.err;
                if (err == '-118') {
                }
                if (err == '-1') {
                    alert("请求方法错误");
                }
                if (err == '-10') {
                    alert("操作失败");
                }
                if (err == '0') {
                    var grade = data.grade;
                    var edu_background = data.edu_background;
                    switch (edu_background) {
                        case "2":
                            edu_background = "本科";
                            break;
                        case "3":
                            edu_background = "硕士";
                            break;
                        case "4":
                            edu_background = "博士";
                            break;
                        case "1":
                            edu_background = "大专";
                            break;
                        case "0":
                            edu_background = "其他";
                    }
                    document.getElementById("detail-grade").innerHTML = "" + grade+"届";
                    document.getElementById("detail-background").innerHTML = "" + edu_background;
                    var edu_list = data.edu_list;
                    for (var i = 0; i < edu_list.length; i++) {
                        var edu_id = edu_list[i].edu_id;
                        var edui = "edu" + (i + 1);
                        var edu_alli = "#edu-all" + (i + 1);
                        $(edu_alli).css("display", "block");
                        var e_major = edu_list[i].major;
                        var e_year = edu_list[i].graduation_year;
                        var e_back = edu_list[i].edu_background;
                        switch (e_back) {
                            case "2":
                                e_back = "本科";
                                break;
                            case "3":
                                e_back = "硕士";
                                break;
                            case "4":
                                e_back = "博士";
                                break;
                            case "1":
                                e_back = "大专";
                                break;
                            case "0":
                                e_back = "其他";
                        }
                        var e_school = edu_list[i].school;
                        var i_edu = "#edu" + (i + 1);
                        $(i_edu).attr("name", edu_id);
                        document.getElementById(edui).innerHTML = "<p><span style='font-size:16px'>" + e_back + "</span><span style='margin-left:4px;font-size:16px'>" + e_year + "</span>年毕业</p><p><span style='font-size:16px'>" + e_school + "</span><span style='margin-left:4px;font-size:16px'>" + e_major + "</span></p>";
                    }
                }
                ajax_num--;
                if (ajax_num == 0) {
                    edit();
                }
            },
            headers: {
                "Access-Control-Allow-Origin": "*"
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
                if (err == '-119') {
                    document.getElementById("prac-all").innerHTML = "";
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
                    if (intern_list.length == 1 || intern_list.length == 0) {
                        $("#prac-toggle").css("display", "none");
                    }
                    for (var i = 0; i < intern_list.length; i++) {
                        var id = intern_list[i].intern_id;
                        var pracia = "prac" + (id) + "a";
                        var pracib = "prac" + (id) + "b";
                        var pracic = "prac" + (id) + "c";
                        var praci1 = "prac" + (id) + "1";
                        var i_company = intern_list[i].company;
                        var i_position = intern_list[i].position;
                        var begin_time = intern_list[i].begin_time.split("/");
                        var end_time = intern_list[i].end_time.split("/");
                        var i_time = begin_time[0] + "年" + begin_time[1] + "月~" + end_time[0] + "年" + end_time[1] + "月";
                        var i_description = intern_list[i].description;
                        document.getElementById(pracia).innerHTML = i_company;
                        document.getElementById(pracib).innerHTML = i_position;
                        document.getElementById(pracic).innerHTML = i_time;
                        document.getElementById(praci1).innerHTML = i_description;

                    }
                }
                ajax_num--;
                if (ajax_num == 0) {
                    edit();
                }
            },
            headers: {
                "Access-Control-Allow-Origin": "*"
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
                if (err == '-120') {
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
                    if (proj_list.length == 1 || proj_list.length == 0) {
                        $("#proj-toggle").css("display", "none");
                    }
                    for (var i = 0; i < proj_list.length; i++) {
                        var proj_id = proj_list[i].proj_id;
                        var p_name = proj_list[i].name;
                        var p_duty = proj_list[i].duty;
                        var p_year = proj_list[i].year;
                        var p_description = proj_list[i].description;
                        var projia = "proj" + (proj_id) + "a";
                        var projib = "proj" + (proj_id) + "b";
                        var projic = "proj" + (proj_id) + "c";
                        var proji1 = "proj" + (proj_id) + "1";
                        document.getElementById(projia).innerHTML = p_name;
                        document.getElementById(projib).innerHTML = p_duty;
                        document.getElementById(projic).innerHTML = p_year;
                        document.getElementById(proji1).innerHTML = p_description;
                    }
                }
                ajax_num--;
                if (ajax_num == 0) {
                    edit();
                }
            },
            headers: {
                "Access-Control-Allow-Origin": "*"
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
                if (err == '-121') {
                    document.getElementById("works-all").innerHTML = "";
                }
                if (err == '-1') {
                    alert("请求方法错误");
                }
                if (err == '-10') {
                    alert("操作失败");
                }
                if (err == '0') {
                    var path = data.path;
                    var site = data.site;
                    if (path == undefined) {
                        document.getElementById("works-id").innerHTML = "尚未上传作品集";
                    } else {
                        document.getElementById("works-path").href = path;
                        document.getElementById("works-id").innerHTML = location.search.split("=")[1] + "作品集.pdf";
                    }
                    if (site == undefined) {
                        document.getElementById("works-site").innerHTML = "尚未上传作品集在线地址";
                    } else {
                        document.getElementById("works-site").href = site;
                        document.getElementById("works-site").innerHTML = "作品集在线地址：" + site;
                    }


                }
                ajax_num--;
                if (ajax_num == 0) {
                    edit();
                }
            },
            headers: {
                "Access-Control-Allow-Origin": "*"
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
                        var skill0i = "#skill0" + (i + 1);
                        $(skill0i).css("display", "block");
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
                ajax_num--;
                if (ajax_num == 0) {
                    edit();
                }
            },
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        });
    }

    /*-----------------------------点击编辑---------------------------*/
    $(".right-edit").click(function () {
        var id = $(this).attr("id");
        var i = id.substring(10, 11);
        var choice = $(this).html();
        var right_addi = "#right-add" + i;
        if (choice == "编辑") {
            $(this).html("取消");
            var right_iconi1 = ".right-icon" + i;
            $(right_iconi1).css("display", "block");
            $(right_addi).attr("disabled", "disabled");
            $(right_addi).css("color", "gray");
            if (i == 2) {
                $("#prac-toggle").unbind("click", prac_toggle);
                var temp = new Array();
                var count = 0;
                for (var j = 1; j <= 5; j++) {
                    var tempi = "#prac" + j + "a";
                    if ($(tempi).html() != "") {
                        temp[count++] = j;
                    }
                }
                var x = "#prac" + temp[1];
                if ($(x).is(":hidden")) {
                    $(".prac-show").css("display", "block");
                    for (var i = 1; i <= 5; i++) {
                        var pracia = "prac" + i + "a";
                        var pracia_value = document.getElementById(pracia);
                        var praci = "#prac" + i;
                        if (pracia_value.innerHTML == "") {
                            $(praci).css("display", "none");
                        }
                    }
                    $("#prac-toggle").css("transform", "rotate(180deg)");
                }
            }
            if (i == 3) {
                $("#proj-toggle").unbind("click", proj_toggle);
                var temp = new Array();
                var count = 0;
                for (var j = 1; j <= 5; j++) {
                    var tempi = "#proj" + j + "a";
                    if ($(tempi).html() != "") {
                        temp[count++] = j;
                    }
                }
                var x = "#proj" + temp[1];
                if ($(x).is(":hidden")) {
                    $(".proj-show").css("display", "block");
                    for (var i = 1; i <= 5; i++) {
                        var projia = "proj" + i + "a";
                        var projia_value = document.getElementById(projia);
                        var proji = "#proj" + i;
                        if (projia_value.innerHTML == "") {
                            $(proji).css("display", "none");
                        }
                    }
                    $("#proj-toggle").css("transform", "rotate(180deg)");
                }
            }
            if (i == 5) {
                $(".skill-show").css("display", "none");
                $(".edit-skill").css("display", "block");
                for (var i = 1; i <= 5; i++) {
                    var skill_inputi = "#skill-input" + i;
                    var rangei = "#range" + i;
                    var skillia = "#skill" + i + "a";
                    var skillib = "#skill" + i + "b";
                    var spanvalue = rangei + ">span>span";
                    $(spanvalue).html(20);
                    var widthi = $(skillib).css("width").split("%")[0];
                    $(skill_inputi).val($(skillia).html());
                    $(spanvalue).html(widthi);
                }
            }
        }
        if (choice == "取消") {
            if (i == 2) {
                $("#prac-toggle").bind("click", prac_toggle);
                var right_iconi2 = ".right-icon" + i;
                $(right_addi).attr("disabled", false);
                $(right_iconi2).css("display", "none");
                $(right_addi).css("color", "#ff8f00");
                $(".prac-field").css("display", "none");
                $(".prac-show>p:nth-child(2)").css("display", "inline-block");
                $(".prac-show>p:nth-child(4)").css("display", "block");
            }
            if (i == 3) {
                $("#proj-toggle").bind("click", proj_toggle);
                var right_iconi2 = ".right-icon" + i;
                $(right_addi).attr("disabled", false);
                $(right_iconi2).css("display", "none");
                $(right_addi).css("color", "#ff8f00");
                $(right_addi).css("color", "#ff8f00");
                $(".proj-field").css("display", "none");
                $(".proj-show>p:nth-child(2)").css("display", "inline-block");
                $(".proj-show>p:nth-child(4)").css("display", "block");
            }
            if (i == 5) {
                $(".skill-show").css("display", "block");
                $(".edit-skill").css("display", "none");
            }
            $(this).html("编辑");
            var right_iconi2 = ".right-icon" + i;
            $(right_addi).attr("disabled", false);
            $(right_iconi2).css("display", "none");
            $(right_addi).css("color", "#ff8f00");
            $(".edu-field").css("display", "none");
            $(".edu>p").css("display", "inline-block");

        }
    });
    /*-----------------------------教育经历击增加--------------------------*/
    $("#right-add1").click(function () {
        var account = 0;
        for (var i = 1; i <= 5; i++) {
            var edui = "#edu" + i;
            if ($(edui).html() !== "") {
                account++;
            }
        }
        if (account == 5) {
            alert("已经达到上限，不能再增加");
        }
        else {
            var choice = $(this).html();
            var id = $(this).attr("id");
            var i = id.substring(9, 10);
            var add_newi = ".add-new" + i;
            var right_editi = "#right-edit" + i;
            if (choice == "添加") {
                $(this).html("取消");
                $(add_newi).css("display", "block");
                $(right_editi).attr("disabled", "disabled");
                $(right_editi).css("color", "gray");
            }
            else {
                $(this).html("添加");
                $(add_newi).css("display", "none");
                $(right_editi).attr("disabled", false);
                $(right_editi).css("color", "#ff8f00");
            }
        }
    });

    $("#edu-save0").click(function () {
        var school = $(".add-new1 .edu-school").val();
        var major = $(".add-new1 .edu-major").val();
        var graduation_year = $(".add-new1 .choice2>input").val();
        var choice1=$(".add-new1 .choice1>input").val();
        var edu_background = 0;
        switch (choice1) {
            case "本科":
                edu_background = "2";
                break;
            case "硕士":
                edu_background = "3";
                break;
            case "博士":
                edu_background = "4";
                break;
            case "大专":
                edu_background = "1";
                break;
            case "其他":
                edu_background = "0";
        }
        if(school==""||major==""||graduation_year=="请选择"||choice1=="请选择")
        {
            alert("请完善资料再保存");
        }
        else{
            $.ajax({
                type: "POST",
                data: {
                    stu_id: location.search.split("=")[1],
                    major: major,
                    graduation_year:graduation_year ,
                    edu_background: edu_background,
                    school: school
                },
                url: "http://110.64.69.66:8081/student/info/edu/add/",
                dataType: "json",
                success: function (data) {
                    $(".add-new1 .edu-school").val("");
                    $(".add-new1 .edu-major").val("");
                    $(".add-new1 .choice2>input").val("请选择");
                    $(".add-new1 .choice1>input").val("请选择");
                    var err = data.err;
                    if (err == "0") {
                        $(".add-new1").css("display","none");
                        $("#right-add1").html("添加").css("color", "#ff8f00").attr("disabled", false);
                        $("#right-edit1").html("编辑").css("color", "#ff8f00").attr("disabled", false);
                        $(".right-icon1").css("display","none");
                        $.ajax({
                            type: "POST",
                            data: {
                                stu_id:student_id
                            },
                            url: "http://110.64.69.66:8081/student/info/edu/get/",
                            dataType: "json",
                            success: function (data) {
                                var err = data.err;
                                if (err == '-118') {
                                    document.getElementById("edu-show").innerHTML = "";
                                }
                                if (err == '-1') {
                                    alert("请求方法错误");
                                }
                                if (err == '-10') {
                                    alert("操作失败");
                                }
                                if (err == '0') {
                                    var grade = data.grade;
                                    var edu_background = data.edu_background;
                                    document.getElementById("detail-grade").innerHTML = "" + grade;
                                    document.getElementById("detail-background").innerHTML = "" + edu_background;
                                    var edu_list = data.edu_list;
                                    for (var i = 0; i < edu_list.length; i++) {
                                        var edu_id = edu_list[i].edu_id;
                                        var edui = "edu" + (i + 1);
                                        var edu_alli = "#edu-all" + (i + 1);
                                        $(edu_alli).css("display", "block");
                                        var e_major = edu_list[i].major;
                                        var e_year = edu_list[i].graduation_year;
                                        var e_back = edu_list[i].edu_background;
                                        var e_school = edu_list[i].school;
                                        var i_edu = "#edu" + (i + 1);
                                        $(i_edu).attr("name", edu_id);
                                        document.getElementById(edui).innerHTML = "<p><span style='font-size:16px'>" + e_back + "</span><span style='margin-left:4px;font-size:16px'>" + e_year + "</span>年毕业</p><p><span style='font-size:16px'>" + e_school + "</span><span style='margin-left:4px;font-size:16px'>" + e_major + "</span></p>";
                                    }
                                }
                                    edit();
                            },
                            headers: {
                                "Access-Control-Allow-Origin": "*"
                            }
                        });
                    }
                    if (err == "-1") {
                        alert("请求方法错误");
                    }
                    if (err == "-10") {
                        alert("操作失败");
                    }
                    if (err == "-123") {
                        alert("教育经历已达上限");
                    }
                },
                headers: {
                    "Access-Control-Allow-Origin": "*"
                }
            });        }
    });

    $("#add1>a>i").click(function () {
        $("#add1").css("display", "none");
        $(".add-new1").css("display", "block");
    });


    $('#edu-nosave0').click(function () {
        $(".add-new1").css("display", "none");
        $("#right-add1").html("添加");
        $("#right-edit1").attr("disabled", false);
        $("#right-edit1").css("color", "#ff8f00");
    });
    /*-----------------------------实习经历击增加--------------------------*/
    $("#right-add2").click(function () {
        var account = 0;
        for (var i = 1; i <= 5; i++) {
            var pracia = "#prac" + i + "a";
            if ($(pracia).html() !== "") {
                account++;
            }
        }
        if (account == 5) {
            alert("已经达到上限，不能再增加");
        }
        else {
            var choice = $(this).html();
            var id = $(this).attr("id");
            var i = id.substring(9, 10);
            var add_newi = ".add-new" + i;
            var right_editi = "#right-edit" + i;
            if (choice == "添加") {
                $(this).html("取消");
                $(add_newi).css("display", "block");
                $(right_editi).attr("disabled", "disabled");
                $(right_editi).css("color", "gray");
            }
            else {
                $(this).html("添加");
                $(add_newi).css("display", "none");
                $(right_editi).attr("disabled", false);
                $(right_editi).css("color", "#ff8f00");
            }
        }
    });

    $("#add2>a>i").click(function () {
        $("#add2").css("display", "none");
        $(".add-new2").css("display", "block");
    });


    $('#prac-nosave0').click(function () {
        $(".add-new2").css("display", "none");
        $("#right-add2").html("添加");
        $("#right-edit2").attr("disabled", false);
        $("#right-edit2").css("color", "#ff8f00");
    });
    /*-----------------------------项目经历击增加--------------------------*/
    $("#right-add3").click(function () {
        var account = 0;
        for (var i = 1; i <= 5; i++) {
            var projia = "#proj" + i + "a";
            if ($(projia).html() !== "") {
                account++;
            }
        }
        if (account == 5) {
            alert("已经达到上限，不能再增加");
        }
        else {
            var choice = $(this).html();
            var id = $(this).attr("id");
            var i = id.substring(9, 10);
            var add_newi = ".add-new" + i;
            var right_editi = "#right-edit" + i;
            if (choice == "添加") {
                $(this).html("取消");
                $(add_newi).css("display", "block");
                $(right_editi).attr("disabled", "disabled");
                $(right_editi).css("color", "gray");
            }
            else {
                $(this).html("添加");
                $(add_newi).css("display", "none");
                $(right_editi).attr("disabled", false);
                $(right_editi).css("color", "#ff8f00");
            }
        }
    });

    $("#add3>a>i").click(function () {
        $("#add3").css("display", "none");
        $(".add-new3").css("display", "block");
    });


    $('#proj-nosave0').click(function () {
        $(".add-new3").css("display", "none");
        $("#right-add3").html("添加");
        $("#right-edit3").attr("disabled", false);
        $("#right-edit3").css("color", "#ff8f00");
    });

    /*-----------------------------教育经历删除---------------------------*/
    $(".edu-cancel").click(function () {
        if (confirm('确定要该条教育经历么?')) {
            var id = $(this).attr("id");
            var i = id.substring(10, 11);
            var edui = "#edu" + i;
            var edualli = "#edu-all" + i;
            var edu_id = $(edui).attr("name");
            $.ajax({
                type: "POST",
                data: {
                    stu_id: location.search.split("=")[1],
                    edu_id: edu_id
                },
                url: "http://110.64.69.66:8081/student/info/edu/del/",
                dataType: "json",
                success: function (data) {
                    var err = data.err;
                    if (err == "0") {
                        $(edualli).css("display", "none");
                        $(edui).html("");
                        var account = 0;
                        for (var i = 0; i < 5; i++) {
                            var eduix = "edu" + (i + 1);
                            var temp = document.getElementById(eduix).innerHTML;
                            if (temp == "") {
                                account++;
                            }
                        }
                        if (account == 5) {
                            $("#ea1").css("display", "none");
                            $("#add1").css("display", "block");
                        }
                    }
                    if (err == "-1") {
                        alert("请求方法错误");
                    }
                    if (err == "-10") {
                        alert("操作失败");
                    }
                },
                headers: {
                    "Access-Control-Allow-Origin": "*"
                }
            });


        }
    });

    $('select').material_select();
    /*-----------------------------教育经历编辑---------------------------*/
    $(".edu-edit").click(function () {
        var id = $(this).attr("id");
        var i = id.substring(8, 9);
        var edui = "#edu" + i;
        var right_iconi = "#edu" + i + "+.right-icon1";
        var edu_fieldi = "#edu-field" + i;
        var edui1 = edui + ">p:nth-child(1)>span:nth-child(1)";
        var edui2 = edui + ">p:nth-child(1)>span:nth-child(2)";
        var edui3 = edui + ">p:nth-child(2)>span:nth-child(1)";
        var edui4 = edui + ">p:nth-child(2)>span:nth-child(2)";
        var edu_fieldi1 = edu_fieldi + ">div:nth-child(1)>input";
        var edu_fieldi2 = edu_fieldi + ">div:nth-child(2)>input";
        var choice1 = ".choice1>input";
        var choice1a = ".choice1>ul>li:nth-child(2)";
        var choice1b = ".choice1>ul>li:nth-child(3)";
        var choice1c = ".choice1>ul>li:nth-child(4)";
        var choice1d = ".choice1>ul>li:nth-child(5)";
        var choice1e = ".choice1>ul>li:nth-child(6)";
        $(edu_fieldi1).val($(edui3).html());
        $(edu_fieldi2).val($(edui4).html());
        $(choice1).val($(edui1).html());
        switch ($(edui1).html()) {
            case "本科":
                $(choice1a).attr("class", "active selected");
                break;
            case "硕士":
                $(choice1b).attr("class", "active selected");
                break;
            case "博士":
                $(choice1c).attr("class", "active selected");
                break;
            case "大专":
                $(choice1d).attr("class", "active selected");
                break;
            case "其他":
                $(choice1e).attr("class", "active selected");
                break;
        }

        var choice2 = ".choice2>input";
        var choice2a = ".choice2>ul>li:nth-child(2)";
        var choice2b = ".choice2>ul>li:nth-child(3)";
        var choice2c = ".choice2>ul>li:nth-child(4)";
        var choice2d = ".choice2>ul>li:nth-child(5)";
        $(choice2).val($(edui2).html());
        switch ($(edui2).html()) {
            case "2016":
                $(choice2a).attr("class", "active selected");
                break;
            case "2017":
                $(choice2b).attr("class", "active selected");
                break;
            case "2018":
                $(choice2c).attr("class", "active selected");
                break;
            case "2019":
                $(choice2d).attr("class", "active selected");
                break;
        }
        $(edui).css("display", "none");
        $(right_iconi).css("display", "none");
        $(edu_fieldi).css("display", "block");
    });
    $(".save").click(function () {
        var id = $(this).attr("id");//获取edui类似的数据
        var edu_savei = id.substring(0, 8);
        var i = id.substring(8, 9);
        var edui = "#edu" + i;
        var edu_fieldi = "#edu-field" + i;
        var right_iconi = "#edu" + i + "+.right-icon1";
        if (edu_savei == "edu-save") {
            var edui1 = edui + ">p:nth-child(1)>span:nth-child(1)";
            var edui2 = edui + ">p:nth-child(1)>span:nth-child(2)";
            var edui3 = edui + ">p:nth-child(2)>span:nth-child(1)";
            var edui4 = edui + ">p:nth-child(2)>span:nth-child(2)";
            var edu_fieldi1 = edu_fieldi + ">div:nth-child(1)>input";
            var edu_fieldi2 = edu_fieldi + ">div:nth-child(2)>input";
            var choice1 = edu_fieldi + " .choice1>input";
            var choice2 = edu_fieldi + " .choice2>input";
            var edu_id = $(edui).attr("name");
            var edu_background = 0;
            switch (choice1) {
                case "本科":
                    edu_background = "2";
                    break;
                case "硕士":
                    edu_background = "3";
                    break;
                case "博士":
                    edu_background = "4";
                    break;
                case "大专":
                    edu_background = "1";
                    break;
                case "其他":
                    edu_background = "0";
            }
            $.ajax({
                type: "POST",
                data: {
                    stu_id: location.search.split("=")[1],
                    edu_id: edu_id,
                    major: $(edu_fieldi2).val(),
                    graduation_year: $(choice2).val(),
                    edu_background: edu_background,
                    school: $(edu_fieldi1).val()
                },
                url: "http://110.64.69.66:8081/student/info/skill/update/",
                dataType: "json",
                success: function (data) {
                    var err = data.err;
                    if (err == "0") {
                        $(edui1).html($(choice1).val());
                        $(edui2).html($(choice2).val());
                        $(edui3).html($(edu_fieldi1).val());
                        $(edui4).html($(edu_fieldi2).val());
                        $(edui).css("display", "inline-block");
                        $(right_iconi).css("display", "block");
                        $(edu_fieldi).css("display", "none");
                    }
                    if (err == "-1") {
                        alert("请求方法错误");
                    }
                    if (err == "-10") {
                        alert("操作失败");
                    }
                },
                headers: {
                    "Access-Control-Allow-Origin": "*"
                }
            });

        }
    });


    /*-----------------------------实习经历编辑---------------------------*/
    $(".prac-edit").click(function () {
        var id = $(this).attr("id");
        var i = id.substring(9, 10);
        var prac = "#prac" + i;
        var right_iconi = "#prac" + i + " .right-icon2";
        var pracia = "#prac" + i + "a";
        var pracib = "#prac" + i + "b";
        var pracic = "#prac" + i + "c";
        var i_time = $(pracic).html().split("~");
        var begin_year = (i_time[0].split("年"))[0];
        var begin_month = ((i_time[0].split("年"))[1].split("月"))[0];
        var end_year = (i_time[1].split("年"))[0];
        var end_month = ((i_time[1].split("年"))[1].split("月"))[0];
        $(".prac-choice1 input").val(begin_year);
        $(".prac-choice2 input").val(begin_month);
        $(".prac-choice3 input").val(end_year);
        $(".prac-choice4 input").val(end_month);//四个选择框
        var praci1 = "#prac" + i + "1";
        var prac_filedi = "#prac-field" + i;
        var p = prac + " p";
        var prac_texti = "#prac-text" + i;
        var input1 = prac_filedi + " .prac-company";
        var input2 = prac_filedi + " .prac-posi";

        $(prac_texti).val($(praci1).html());
        $(input1).val($(pracia).html());
        $(input2).val($(pracib).html());
        $(prac_filedi).css("display", "block");
        $(p).css("display", "none");
        $(praci1).css("display", "none");
        $(right_iconi).css("display", "none");
    });


    /*-----------------------------项目经历编辑---------------------------*/
    $(".proj-edit").click(function () {
        var id = $(this).attr("id");
        var i = id.substring(9, 10);
        var proj = "#proj" + i;
        var right_iconi = "#proj" + i + " .right-icon3";
        var projia = "#proj" + i + "a";
        var projib = "#proj" + i + "b";
        var projic = "#proj" + i + "c";
        var i_time = $(projic).html().split("年")[0];
        var proji1 = "#proj" + i + "1";
        var proj_filedi = "#proj-field" + i;
        var p = proj + " p";
        var proj_texti = "#proj-text" + i;
        var input1 = proj_filedi + " .proj-company";
        var input2 = proj_filedi + " .proj-posi";
        $(".proj-choice1 input").val(i_time);
        $(proj_texti).val($(proji1).html());
        $(input1).val($(projia).html());
        $(input2).val($(projib).html());
        $(proj_filedi).css("display", "block");
        $(p).css("display", "none");
        $(proji1).css("display", "none");
        $(right_iconi).css("display", "none");
    });
    /*-----------------------------作品集编辑---------------------------*/

    /*-----------------------------技能编辑---------------------------*/


    /*-----------------------------教育经历保存取消按钮---------------------------*/
    $('.nosave').click(function () {
        var id = $(this).attr("id");
        var flag1 = id.substring(0, 10);
        var i1 = id.substring(10, 11);
        var edui = "#edu" + i1;
        var right_iconi = "#edu" + i1 + "+.right-icon1";
        var edu_fieldi = "#edu-field" + i1;
        if (flag1 == "edu-nosave") {
            $(edu_fieldi).css("display", "none");
            $(edui).css("display", "inline-block");
            $(right_iconi).css("display", "block");
        }
        var account = 0;
        for (var i = 1; i <= 5; i++) {
            var edui = "#edu" + i;
            if ($(edui).html() !== "") {
                account++;
            }
        }
        if (account == 0) {
            $("#add1").css("display", "block");
        }
    });//取消
    /*-----------------------------实习经历保存取消按钮---------------------------*/
    $('.nosave').click(function () {
        var id = $(this).attr("id");
        var flag1 = id.substring(0, 11);
        var i1 = id.substring(11, 12);
        var praci = "#prac" + i1;
        var right_iconi = praci + " .right-icon2";
        var prac_fieldi = "#prac-field" + i1;
        var p1 = praci + " p:nth-child(2)";
        var p2 = praci + " p:nth-child(4)";
        if (flag1 == "prac-nosave") {
            $(prac_fieldi).css("display", "none");
            $(p1).css("display", "inline-block");
            $(p2).css("display", "block");
            $(right_iconi).css("display", "block");
        }
        var account = 0;
        for (var i = 1; i <= 5; i++) {
            var pracia = "#prac" + i + "a";
            if ($(pracia).html() !== "") {
                account++;
            }
        }
        if (account == 0) {
            $("#add2").css("display", "block");
        }
    });//取消
    /*-----------------------------实习经历保存取消按钮---------------------------*/
    $('.nosave').click(function () {
        var id = $(this).attr("id");
        var flag1 = id.substring(0, 11);
        var i1 = id.substring(11, 12);
        var proji = "#proj" + i1;
        var right_iconi = proji + " .right-icon3";
        var proj_fieldi = "#proj-field" + i1;
        var p1 = proji + " p:nth-child(2)";
        var p2 = proji + " p:nth-child(4)";
        if (flag1 == "proj-nosave") {
            $(proj_fieldi).css("display", "none");
            $(p1).css("display", "inline-block");
            $(p2).css("display", "block");
            $(right_iconi).css("display", "block");
        }
        var account = 0;
        for (var i = 1; i <= 5; i++) {
            var projia = "#proj" + i + "a";
            if ($(projia).html() !== "") {
                account++;
            }
        }
        if (account == 0) {
            $("#add3").css("display", "block");
        }
    });//取消


    /* copyhhh实习和项目*/
    /*-----------------------------实习经历删除按钮---------------------------*/
    $(".prac-cancel").click(function () {
        if (confirm('确定要该条实习经历么?')) {
            var id = $(this).attr("id");
            var i = id.substring(11, 12);
            var pracia = "#prac" + i + "a";
            var pracib = "#prac" + i + "b";
            var pracic = "#prac" + i + "c";
            var praci1 = "#prac" + i + "1";
            var praci = "#prac" + i;
            $(pracia).html("");
            $(pracib).html("");
            $(pracic).html("");
            $(praci1).html("");
            $(praci).css("display", "none");
            var prac_editi = "#prac-edit" + i;
            var prac_canceli = "#prac-cancel" + i;
            $(prac_editi).css("display", "none");
            $(prac_canceli).css("display", "none");
            var account = 0;
            for (var i = 0; i < 5; i++) {
                var tempia = "#prac" + (i + 1) + "a"
                var temp = $(tempia).html();
                if (temp == "") {
                    account++;
                }
            }
            if (account == 5) {
                $("#ea2").css("display", "none");
                $("#add2").css("display", "block");
                $("#prac-toggle").css("display", "none");
            }
            if (account == 4) {
                $("#prac-toggle").css("display", "none");
            }
        }
        return false;
    });
    /*-----------------------------项目经历删除按钮---------------------------*/
    $(".proj-cancel").click(function () {
        if (confirm('确定要该条实习经历么?')) {
            var id = $(this).attr("id");
            var i = id.substring(11, 12);
            var projia = "#proj" + i + "a";
            var projib = "#proj" + i + "b";
            var projic = "#proj" + i + "c";
            var proji1 = "#proj" + i + "1";
            var proji = "#proj" + i;
            $(projia).html("");
            $(projib).html("");
            $(projic).html("");
            $(proji1).html("");
            $(proji).css("display", "none");
            var proj_editi = "#proj-edit" + i;
            var proj_canceli = "#proj-cancel" + i;
            $(proj_editi).css("display", "none");
            $(proj_canceli).css("display", "none");
            var account = 0;
            for (var i = 0; i < 5; i++) {
                var tempia = "#proj" + (i + 1) + "a"
                var temp = $(tempia).html();
                if (temp == "") {
                    account++;
                }
            }
            if (account == 5) {
                $("#ea3").css("display", "none");
                $("#add3").css("display", "block");
                $("#proj-toggle").css("display", "none");
            }
            if (account == 4) {
                $("#proj-toggle").css("display", "none");
            }
        }
        return false;
    });


});











