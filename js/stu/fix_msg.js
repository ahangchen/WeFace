$(document).ready(function () {

    var id=getId();//得到学生的id

    for (var i = 1; i <= 12; i++) {
        document.getElementById("select_month").innerHTML += '<option value="' + i + '">' + i + '</option>';
    }

    for (var i = 1970; i <= 2016; i++) {
        document.getElementById("select_year").innerHTML += '<option value="' + i + '">' + i + '</option>';
    }

    $("#delete_file").on("click",function(){//删除简历重
        $("#file_path").css("display","none");
    });

    //点击取消
    $("#cancelButton").on("click",function(){

    });


    //点击保存
    $("#saveButton").on("click",function(){

        var newName=$("#first_name").val();
        var newSex=$("#select_sex").val();
        if(newSex==null)//如果没填性别为0
           newSex=0;
        var newSchool=$("#school_name").val();
        var newMajor=$("#major_name").val();
        var newYear=$("#select_year option:selected").text();
        var newMonth=$("#select_month option:selected").text();
        var newLocation=$("#select_location option:selected").text();
        var newMail=$("#email").val();
        var newTel=$("#tel").val();
        if(newYear==null)
            newYear=-1;
        if(newMonth==null)
            newMonth=-1;
        //console.log(newYear);
        var result={
            "id": 1/*id*/,
            "path":avatar_path,
            "name":newName,
            "school":newSchool,
            "major": newMajor,
            "sex": newSex,
            "year": newYear,
            "month":newMonth,
            "location":newLocation,
            "mail":newMail,
            "tel":newTel
    };
        $.ajax({
            type: 'POST',
            data: result,
            url: cur_site + "student/info/update/",
            xhrFields: {withCredentials: true},
            dataType: 'json',
            success: function (data) {
                console.log(data);
            }
        });

    });


});

function F_Open_img() {
    document.getElementById("update_photo").click();
}

function F_Open_file() {
    document.getElementById("update_file").click();
}

var avatar_path;
function show_local_img(file) {//预览图片
    var id=getId();//得到学生的id
    $(".photo_logo").css("opacity", "0");
    var img = document.getElementById("local_photo");
    var reader = new FileReader();
    reader.onload = function (evt) {
        img.src = evt.target.result;
        //上传照片
        var formData = new FormData();
        formData.append('id', 1/*id*/);
        formData.append('avatar', $('#update_photo')[0].files[0]);
        $.ajax({
            type: 'POST',
            data: formData,
            cache:false,
            url: cur_site + "student/info/avatar/",
            processData: false,
            contentType: false,
            dataType: 'json'
        }).done(function(res){
            console.log(res);
            avatar_path=res.path;
        })
    };
    reader.readAsDataURL(file.files[0]);

}

function show_local_file() {
    var id=getId();//得到学生的id
    var path = document.getElementById('update_file');//得到简历的名字

    $("#file_path").show();
    $("#file_name").val(path.value.split("\\")[2]);
    //上传简历
    var formData = new FormData();
    formData.append('id', 1/*id*/);
    formData.append('resume', $('#update_file')[0].files[0]);
    $.ajax({
        type: 'POST',
        data: formData,
        cache:false,
        url: cur_site + "student/resume/upload/",
        processData: false,
        contentType: false,
        dataType: 'json'
    }).done(function(res){
        console.log(res);
    })

}


