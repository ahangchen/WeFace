$(document).ready(function(){
    var tid=getId().split('&')[0];
    var product_id=location.search.split("product_id=")[1];

    var i,j;
    var new_product_label=[];
    var has_image=0;
    var edit_product_msg={};

    $("#nav_function_btn").click(function(){
        var nav_function_div=$(".nav_function_div");
        if(nav_function_div.css("opacity")=="0"){
            nav_function_div.css("opacity","1");
        }
        else{
            nav_function_div.css("opacity","0");
        }
    });

    if(product_id==undefined){
        create_new_product();
    }
    else{
        $.ajax({
            url: cur_site + 'team/product/info/',
            type: 'POST',
            dataType: 'json',
            data: {"productId": product_id},
            success:function(data) {
                if(data.err=="0"){
                    edit_product_msg.name=data.msg.name;
                    edit_product_msg.content=data.msg.content;
                    edit_product_msg.reward=data.msg.reward;
                    edit_product_msg.team_id=tid;
                    edit_product_msg.id=product_id;
                    edit_product_msg.img_path=data.msg.img_path;
                    edit_exist_product();
                }
            }
        });
    }

    //添加自定义产品标签
    $("#add_team_label_btn").click(function(){
        var product_label_input=$("#product_label_input");
        var new_label_name=product_label_input.val();
        var new_label_num=new_product_label.length;
        if(new_label_name=="")
            Materialize.toast("新增标签不能为空!",2000);
        else if(new_label_num==4){
            Materialize.toast("新增标签不能超过4个!",2000);
        }
        else{
            product_label_input.val("");
            var label_exist=0;
            for(j=0;j<new_product_label.length;j++){
                if(new_product_label[j]==new_label_name)
                    label_exist=1;
            }
            if(label_exist==0){
                $(".choose_label_area").append('<div class="chip product_label_selected">'+new_label_name+'<i class="close material-icons delete_label" id="'+new_label_name+'">close</i></div>');
                new_product_label.push(new_label_name);
                var product_label=$(".product_label");
                for(i=0;i<product_label.length;i++){
                    if(product_label[i].innerText==new_label_name){
                        product_label[i].className='active_product_label chip';
                    }
                }
                delete_product_label(new_label_name);
            }
        }
    });

    //添加模版存在的产品标签
    $(".product_label").click(function(){
        var new_label_num=$(".product_label_selected").length;
        var new_label_name=$(this).html();
        if(new_label_num==4){
            Materialize.toast("新增标标签不能超过4个!",2000);
        }
        else{
            var label_exist=0;
            for(j=0;j<new_product_label.length;j++){
                if(new_product_label[j]==new_label_name)
                    label_exist=1;
            }
            if(label_exist==0) {
                $(".choose_label_area").append('<div class="chip product_label_selected">' + new_label_name + '<i class="close material-icons delete_label" id="'+new_label_name+'">close</i></div>');
                new_product_label.push(new_label_name);
                $(this).attr('class','active_product_label chip');
                delete_product_label(new_label_name);
            }
        }
    });

    //点击保存产品
    $("#save_product").click(function(){
        var product_name=$("#product_name").val();
        var product_slogan=$("#product_slogan").val();
        var product_content=$("#product_content").val();
        var product_link=$("#product_link").val();
        if(has_image==0){
            Materialize.toast("产品照片不能为空!",2000);
        }
        else if(product_name==""){
            Materialize.toast("产品名称不能为空!",2000);
        }
        else if(product_content==""){
            Materialize.toast("产品介绍不能为空!",2000);
        }
        else{
            var reward={"slogan":product_slogan,"url":product_link,"tag":new_product_label};
            edit_product_msg.name=product_name;
            edit_product_msg.content=product_content;
            edit_product_msg.reward=JSON.stringify(reward);
            edit_product_msg.team_id=tid;
            $.ajax({
                url: cur_site + "team/product/update/",
                type: "POST",
                dataType: 'json',
                data: edit_product_msg,
                success:function(){
                    window.location.href="product_list.html?tid="+tid;
                }
            })
        }
    });

    function delete_product_label(new_label_name){
        //监听点击删除标签事件
        $("#"+new_label_name).on("click",function(){
            var delete_label_name=$(this).attr('id');
            for(i=0;i<new_product_label.length;i++){
                if(new_product_label[i]==delete_label_name)
                    new_product_label.splice(i,1);
            }
            var product_label=$(".active_product_label");
            for(i=0;i<product_label.length;i++){
                if(product_label[i].innerText==delete_label_name){
                    product_label[i].className='product_label chip';
                }
            }
        });
    }

    function create_new_product(){
        var new_reward={"slogan":"","url":"","tag":[]};
        var new_product_msg={"team_id":tid,"name":"新的","img_path":"","content":"","reward":JSON.stringify(new_reward)};

        //添加产品图片
        $("#add_photo_btn").on('click',function(){
            $("#upload_product_image").click();
        });

        $("#upload_product_image").on("change",function() {
            has_image=1;
            var formData = new FormData();
            formData.append('prod_img', $(this)[0].files[0]);
            $.ajax({
                url: cur_site + "team/product/insert/",
                type: "POST",
                dataType: 'json',
                data: new_product_msg,
                success:function(data){
                    if(data.err=="0"){
                        formData.append('id', data.msg);
                        edit_product_msg.id=data.msg;
                        $.ajax({
                            url: cur_site + "team/product/save_img/",
                            type: "POST",
                            cache: false,
                            dataType: 'json',
                            data: formData,
                            processData: false,
                            contentType: false
                        }).done(function(res){
                            if(res.err=="0"){
                                edit_product_msg.img_path=res.msg;
                            }
                        });
                    }
                }
            });
            var reader = new FileReader();
            reader.onload = function (evt) {
                $("#add_photo_btn").empty().css('border','none').css("background-image","url("+evt.target.result+")").css("background-size","100% 100%");
            };
            reader.readAsDataURL(this.files[0]);
        });

        //点击取消
        $("#cancel_product").click(function(){
            $.ajax({
                url: cur_site + "team/product/delete/",
                type: "POST",
                dataType: 'json',
                data: {productId: edit_product_msg.id},
                success: function (data) {
                    window.location.href="product_list.html?tid="+tid;
                }
            });
        });
    }

    function edit_exist_product(){
        has_image=1;
        $("#product_name").val(edit_product_msg.name);
        var product_reward=JSON.parse(edit_product_msg.reward);
        $("#product_slogan").val(product_reward.slogan);
        var content_height=edit_product_msg.content.length/40+'em';
        $("#product_content").css('height',content_height).val(edit_product_msg.content);
        $("#product_link").val(product_reward.url);
        $("#add_photo_btn").on('click',function(){$("#upload_product_image").click();}).empty()
            .css('border','none').css("background-image","url("+cur_media+edit_product_msg.img_path+")").css("background-size","100% 100%");
        new_product_label=product_reward.tag;

        for(i=0;i<new_product_label.length;i++){
            var product_label=$(".product_label");
            $(".choose_label_area").append('<div class="chip product_label_selected">' + new_product_label[i] + '<i class="close material-icons delete_label" id="'+new_product_label[i]+'">close</i></div>');
            delete_product_label(new_product_label[i]);
            for(j=0;j<product_label.length;j++){
                if(product_label[j].innerText==new_product_label[i]){
                    product_label[j].className='active_product_label chip';
                }
            }
        }

        //上传照片
        $("#upload_product_image").on("change",function() {
            var formData = new FormData();
            formData.append('id',product_id);
            formData.append('prod_img', $(this)[0].files[0]);
            $.ajax({
                url: cur_site + "team/product/save_img/",
                type: "POST",
                cache: false,
                dataType: 'json',
                data: formData,
                processData: false,
                contentType: false
            }).done(function(res){
                if(res.err=="0"){
                    edit_product_msg.img_path=res.msg;
                }
            });
            var reader = new FileReader();
            reader.onload = function (evt) {
                $("#add_photo_btn").css("background-image","url("+evt.target.result+")").css("background-size","100% 100%");
            };
            reader.readAsDataURL(this.files[0]);
        });

        //点击取消
        $("#cancel_product").click(function(){
            window.location.href="product_list.html?tid="+tid;
        });

    }
});
