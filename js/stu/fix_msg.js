$(document).ready(function () {

    $("#delete_file").click(function () {
        $(".doc_path").css("opacity", "0");
        //清空之前的缓存的文件的路径
        var file = $("#update_file");
        file.after(file.clone().val(""));
        file.remove();
    });

    for (var i = 1; i <= 12; i++) {
        document.getElementById("select_month").innerHTML += '<option value="' + i + '">' + i + '月</option>';
    }

    for (var i = 1970; i <= 2016; i++) {
        document.getElementById("select_year").innerHTML += '<option value="' + i + '">' + i + '年</option>';
    }


    $("#cancelButton").click(function () {
        $('#student_message_box').css('display', 'none');
        $('#basic-info').css('display', 'block');
    });

    $("#saveButton").click(function () {

    });

});

function F_Open_img() {
    document.getElementById("update_photo").click();
}

function F_Open_file() {
    document.getElementById("update_file").click();
}

function show_local_img(file) {//预览图片
    $(".photo_logo").css("opacity", "0");
    var img = document.getElementById("local_photo");
    var reader = new FileReader();
    reader.onload = function (evt) {
        img.src = evt.target.result;
    };
    reader.readAsDataURL(file.files[0]);
}

function show_local_file() {
    $(".doc_path").css("opacity", "1");
    var path = document.getElementById('update_file');
    //console.log(path.value.split("\\")[2]);
    $("#path_line").val(path.value.split("\\")[2]);
}


