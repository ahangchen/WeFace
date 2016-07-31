$(function () {
    $("#fix_msg_button").click(function () {
        $("#information").empty().css("height","500px");
        $("#team_introuduction").empty();
        $("#main_right_one").append('<div id="add_member"><a class="btn-floating btn-large waves-effect waves orange">'+
            '<i class="material-icons" style="color:#fff">add</i></a></div>');
        $("#main_right_one").append('<div class="add_member_btn">'+
            '<a id="member_saveButton" class="waves-effect waves-light btn">保存</a>'+
            '<a id="member_cancelButton" class="waves-effect waves-light btn">取消</a> </div>');
        $("#member_information").empty();
        $("#member_information").append('<div class="input-field connect "><i class="material-icons prefix">phone</i>'
            +'<input id="connect_tel" type="tel" class="validate"><label for="connect_tel">输入公司的联系电话</label> </div>');
        $("#member_information").append('<div class="input-field connect "><i class="material-icons prefix">email</i>'
            +'<input id="connect_mail" type="email" class="validate"><label for="connect_tel">输入公司的联系邮箱</label> </div>');
        $("#member_information").append('<div class="edit_connect_btn"> <a id="connect_saveButton" class="waves-effect waves-light btn">保存</a>'
            +'<a id="connect_cancelButton" class="waves-effect waves-light btn">取消</a> </div>');
         $.ajax({
            type:"get",
            url: "basic_msg_for_team.html",
            dataType:"html",
            success:function(data){
                $("#information").html(data);
            }
        });
        $.ajax({
            type:"get",
            url: "team_intro.html",
            dataType:"html",
            success:function(data){
                $("#team_introuduction").html(data);
            }
        })
    });

    $("#history_button").click(function () {
        $.ajax({
            type:"get",
            url: "develop_history.html",
            dataType:"html",
            success:function(data){
                $("#history_text").html(data);
            }
        })

    });


    var tag=[];//记录已选择的标签
    var tag_num=0;
    $("#type_tag").click(function () {
        tag_num=$("#type_tag").length-1;
        });

    var option_collapse=[];

    $(".add_type").click(function(){
        var option_num=$(".tag_select").val();
        console.log(option_num);
        if(tag_num<5&&option_num!=null) {
            var type_name=$(".tag_select option:selected").text();
            if(tag_num!=0){
                for(var i=0;i<option_collapse.length;i++){
                    if(option_num==option_collapse[i])
                        return;
                }
            }
            option_collapse.length=0;
            tag.push(type_name);
            $("#type_tag").append('<div class="tag_collapse chip" id='+option_num+'>'+type_name+'<i class="close material-icons">close</i> </div>');
            $("div .tag_collapse").each(function () {
                option_collapse.push(this.id);
            });
            console.log(option_collapse);
            tag_num++;
        }
    });


});

function F_Open_img(){
    document.getElementById("update_photo").click();

}
function show_local_img(file){//预览图片
    $("#photo_logo").css("opacity","0");
    var img = document.getElementById("local_photo");
    var reader = new FileReader();
    reader.onload = function(evt) {
        img.src = evt.target.result;
    };
    reader.readAsDataURL(file.files[0]);
}