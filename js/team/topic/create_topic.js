$(document).ready(function(){
    var tid=getId().split('&')[0];
    var topic_id=location.search.split("topic_id=")[1];

    $("#nav_function_btn").click(function(){
        var nav_function_div=$(".nav_function_div");
        if(nav_function_div.css("opacity")=="0"){
            nav_function_div.css("opacity","1");
        }
        else{
            nav_function_div.css("opacity","0");
        }
    });

    if(topic_id==undefined){
        $("#save_topic").click(function(){
            var topic_name=$("#topic_name").val();
            var topic_content=$("#topic_content").val();
            if(topic_name==""){
                Materialize.toast("标题不能为空",2000);
            }
            else if(topic_content==""){
                Materialize.toast("正文内容不能为空",2000);
            }
            else{
                $.ajax({
                    url: cur_site + "team/topic/new/",
                    dataType: 'json',
                    type: "POST",
                    data: {'tid':tid,'title':topic_name,'content':topic_content},
                    success:function(data){
                        window.location.href="topic_detail.html?tid="+tid+"&topic_id="+data.res;
                    }
                })
            }
        });
    }
    else{
        $.ajax({
            url: cur_site + "team/topic/info/",
            dataType: 'json',
            type: "GET",
            data: {'topic':topic_id},
            success:function(data){
               $("#topic_name").val(data.res.title);
               $("#topic_content").val(data.res.content);
            }
        });
        $("#save_topic").click(function(){
            var topic_name=$("#topic_name").val();
            var topic_content=$("#topic_content").val();
            if(topic_name==""){
                Materialize.toast("标题不能为空",2000);
            }
            else if(topic_content==""){
                Materialize.toast("正文内容不能为空",2000);
            }
            else{
                $.ajax({
                    url: cur_site + "team/topic/update/",
                    dataType: 'json',
                    type: "POST",
                    data: {'topic':topic_id,'title':topic_name,'content':topic_content},
                    success:function(){
                        window.location.href="topic_detail.html?tid="+tid+"&topic_id="+topic_id;
                    }
                })
            }
        });

    }

    $("#cancel_topic").click(function(){
        window.location.href="topic_list.html?tid="+tid;
    });
});
