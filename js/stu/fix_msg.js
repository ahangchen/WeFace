$(function () {
$(".complete_msg").click(function () {//完善个人档案,信息显示在本页面
     $.ajax({
        type:"get",
        url: "complete_msg.html",
        dataType:"html",
        success:function(data){
            $("#student_message_box").html(data);
        }
    })
});

    
});

function F_Open_dialog(){
    document.getElementById("update_photo").click();
}

function show_local_img(file){//预览图片
    var img = document.getElementById("local_photo");
    var reader = new FileReader();
    reader.onload = function(evt) {
        img.src = evt.target.result;
    };
    reader.readAsDataURL(file.files[0]);
}

