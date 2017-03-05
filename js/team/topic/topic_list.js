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
        url: cur_site + 'team/topic/list/',
        type: 'GET',
        dataType: 'json',
        data: {"tid": tid},
        success:function(data) {
            if(data.err=="0"){
                var topic=data.msg;
                show_item(1,topic);
                add_page(topic,1);
            }
        }
    });

    $("#add_new_topic").click(function(){
        window.location.href="create_topic.html?tid="+tid;
    });

    function show_item(page,topic){
        var totalItem=topic.length;
        var start=(page-1)*10;
        var end=page*10;
        if(totalItem<page*10){
            end=totalItem;
        }
        for(var i=start;i<end;i++){
            var time=topic[i].time.split('-');
            var publish_time=time[0]+'年'+time[1]+'月'+time[2]+'日'+time[3]+'时';
            $(".show_topic_area").append('<div class="each_topic"><div class="topic_div"><div class="topic_info">' +
                '<p class="topic_name" id="'+topic[i].topic_id+'">'+topic[i].title+'</p><p class="topic_time">'+publish_time+'</p></div>' +
                '<div class="topic_function_btn"><a class="waves-effect waves-light btn" id="manage_topic'+topic[i].topic_id+'">管理</a>' +
                '<a class="waves-effect waves-light btn" id="delete_topic'+topic[i].topic_id+'">删除</a></div></div></div>');
        }
        $("a[id^='manage_topic']").css('background-color','rgb(66,168,82)').css('margin-top','10px');
        $("a[id^='delete_topic']").css('background-color','rgb(231,56,40)').css('margin-top','10px');

        show_topic_detail();
        manageTopic();
        deleteTopic(page,topic);
    }

    function show_topic_detail(){
        $(".topic_name").on('click',function(){
            var topic_id = $(this).attr('id');
            window.location.href="topic_detail.html?tid="+tid+"&topic_id="+topic_id;
        });
    }

    function add_page(topic,activePage){
        var pageNum=parseInt((topic.length-1)/10+1);
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
            $(".show_topic_area").empty();
            show_item(change_to_page,topic);
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
                show_item(change_to_page,topic);
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
                show_item(change_to_page,topic);
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

    function manageTopic(){
        $("a[id^='manage_topic']").on("click",function(){
            var topicId=parseInt($(this).attr('id').split('manage_topic')[1]);
            window.location.href='create_topic.html?tid='+tid+"&topic_id="+topicId;
        });
    }

    function deleteTopic(page,topic){
        $("a[id^='delete_topic']").on('click',function(){
            var topicId=parseInt($(this).attr('id').split('delete_topic')[1]);
            $("#delete_modal").openModal();
            $("#confirm_delete_topic").click(function(){
                $.ajax({
                    url: cur_site + "team/topic/remove/",
                    type: "POST",
                    dataType: 'json',
                    data: {topic: topicId},
                    success: function () {
                        $(".show_topic_area").empty();
                        for(var k=0;k<topic.length;k++){
                            if(topic[k].topic_id==topicId){
                                topic.splice(k,1);
                                break;
                            }
                        }
                        $(".change_page_div ul").empty();
                        if(parseInt((topic.length-1)/10+1)<page){
                            page=page-1;
                        }
                        add_page(topic,page);
                        show_item(page,topic);
                    }
                });
            });

        });

    }

});
