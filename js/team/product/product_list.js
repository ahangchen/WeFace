$(document).ready(function(){
    $('.modal-trigger').leanModal();

    $("#nav_function_btn").click(function(){
        var nav_function_div=$(".nav_function_div");
        if(nav_function_div.css("display")=="none"){
            nav_function_div.show();
        }
        else{
            nav_function_div.css("display","none");
        }
    });
    var tid=getId();

    $.ajax({
        url: cur_site + 'team/product/search/',
        type: 'POST',
        dataType: 'json',
        data: {"teamId": tid},
        success:function(data) {
            if(data.err=="0"){
                var product=data.msg;
                show_item(1,product);
                add_page(product,1);
            }
        }
    });

    $("#add_new_product").click(function(){
        window.location.href="create_product.html?tid="+tid;
    });

    function show_item(page,product){
        var totalItem=product.length;
        var start=(page-1)*10;
        var end=page*10;
        if(totalItem<page*10){
            end=totalItem;
        }
        for(var i=start;i<end;i++){
            $(".show_product_area").append('<div class="each_product"><div class="product_div"><p class="product_name">'+product[i].name+'</p>' +
                '<div class="product_function_btn"><a class="waves-effect waves-light btn" id="manage_product'+product[i].id+'">管理</a>' +
                '<a class="waves-effect waves-light btn" id="delete_product'+product[i].id+'">删除</a></div></div></div>');
        }
        $("a[id^='manage_product']").css('background-color','rgb(66,168,82)').css('margin-top','10px');
        $("a[id^='delete_product']").css('background-color','rgb(231,56,40)').css('margin-top','10px');
        manageProduct();
        deleteProduct(page,product);
    }

    function add_page(product,activePage){
        var pageNum=parseInt(product.length/10+1);
        var change_page_div=$(".change_page_div ul");

        change_page_div.append('<li class="waves-effect" id="last_page"><a><i class="material-icons">chevron_left</i></a></li>');
        for(var i=1;i<=pageNum;i++){
            change_page_div.append('<li class="page waves-effect" id=page'+i+'><a>'+i+'</a></li>');
        }
        change_page_div.append('<li class="waves-effect" id="next_page"><a><i class="material-icons">chevron_right</i></a></li>');

        var next_page=$("#next_page");
        var last_page=$("#last_page");

        if(activePage==1){
            last_page.addClass('disabled');
        }

        if(activePage==pageNum){
            next_page.addClass('disabled');
        }

        $("#page"+activePage).addClass('active');

        $(".page").on("click",function(){
            var change_to_page=parseInt($(this).attr('id').split('page')[1]);
            $(".show_product_area").empty();
            show_item(change_to_page,product);
            $("#page"+activePage).removeClass('active');
            $(this).addClass('active');
            if(change_to_page==1){
                last_page.addClass('disabled');
                if(activePage==pageNum){
                    next_page.removeClass('disabled');
                }
            }

            if(change_to_page==pageNum){
                next_page.addClass('disabled');
                if(activePage==1){
                    last_page.removeClass('disabled');
                }
            }
            activePage=change_to_page;
        });

        next_page.on("click",function(){
            if(next_page.attr('class')!='waves-effect disabled'){
                var change_to_page=activePage+1;
                $(".show_product_area").empty();
                show_item(change_to_page,product);
                $("#page"+activePage).removeClass('active');
                $("#page"+change_to_page).addClass('active');
                if(change_to_page==pageNum){
                    next_page.addClass('disabled');
                }
                if(activePage==1){
                    last_page.removeClass('disabled');
                }
                activePage=change_to_page;
            }
        });

        last_page.on('click',function(){
            if(last_page.attr('class')!='waves-effect disabled'){
                var change_to_page=activePage-1;
                $(".show_product_area").empty();
                show_item(change_to_page,product);
                $("#page"+activePage).removeClass('active');
                $("#page"+change_to_page).addClass('active');
                if(change_to_page==1){
                    last_page.addClass('disabled');
                }
                if(activePage==pageNum){
                    next_page.removeClass('disabled');
                }
                activePage=change_to_page;
            }
        });

    }

    function manageProduct(){
        $("a[id^='manage_product']").on("click",function(){
            var productId=parseInt($(this).attr('id').split('manage_product')[1]);
            window.location.href='create_product.html?tid='+tid+"&product_id="+productId;
        });
    }

    function deleteProduct(page,product){
        $("a[id^='delete_product']").on('click',function(){
            var productId=parseInt($(this).attr('id').split('delete_product')[1]);
            $("#delete_modal").openModal();
            $("#confirm_delete_product").click(function(){
                $.ajax({
                    url: cur_site + "team/product/delete/",
                    type: "POST",
                    dataType: 'json',
                    data: {productId: productId},
                    success: function (data) {
                        console.log(data);
                        show_item(page,product);
                    }
                });
            });

        });

    }

});
