$(document).ready(function () {
    var project_showId=getId();
    $.ajax({
        type: 'POST',
        data: {productId: project_showId},
        url: cur_site + "team/product/info/",
        xhrFields: {withCredentials: true},
        dataType: 'json',
        success: function (text) {
            $("#show_product_name").text(text.msg.name+'项目');
            $("#show_introduce").text(text.msg.content);
            if(text.msg.reward!="")
                $("#show_achieve").text(text.msg.reward);
            else
                $("#show_achieve").text('暂无');
            if(text.msg.img_path!="")
                $("#show_photo").show().attr('src',cur_media+text.msg.img_path);
        }
    });
});
