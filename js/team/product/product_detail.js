$(document).ready(function(){
    var productId=getId();
    $.ajax({
        url: cur_site + 'team/product/info/',
        type: 'POST',
        dataType: 'json',
        data: {"productId": productId},
        success:function(data) {
            if(data.err=="0"){
                var product=data.msg;
                var product_reward=JSON.parse(product.reward);
                $("#product_name").html(product.name);
                for(var i=0;i<product_reward.tag.length;i++){
                    $(".label_div").append('<div class="chip product_label">'+product_reward.tag[i]+'</div>');
                }
                $("#product_slogan").html(product_reward.slogan);
                $("#product_link").html(product_reward.url).attr('href',product_reward.url);
                $("#product_intro").html(product.content);
                $("#product_image").attr('src',cur_media+product.img_path)

            }
        }
    });

});
