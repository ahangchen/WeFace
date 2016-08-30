$(function(){
    var type;


    init();
    team();
    project();
    job();






    function init(){
        var job_type=[];
        $("#select_position").css('border-bottom','2px solid').css('border-bottom-color','orange');
        $("#select_team").css('border-bottom-color','orange');
        $("#select_project").css('border-bottom-color','orange');
        $.ajax({
            type: "post",
            url: cur_site + "team/job_type/",
            dataType: "json",
            xhrFields: {withCredentials: true},
            success: function (data) {
                job_type=data.msg;
                console.log(job_type);
                for(var i=0;i<data.msg.length;i++){
                    $(".search_tags").append('<div class="chip allTags" id="job_tags"><span id="'+data.msg[i].id+'">'+data.msg[i].name+'</span></div>')
                }
                listening();

            },
            headers:{
                "Access-Control-Allow-Origin":"*"
            }
        });
    }

    function team(){
        var team_type=[];
        $("#select_team").on('click',function(){
            $("#select_team").css('border-bottom','2px solid').css('border-bottom-color','orange');
            $("#select_position").css('border-bottom','0px solid');
            $("#select_project").css('border-bottom','0px solid');
            $.ajax({
                type: "post",
                url: cur_site + "team/business/",
                dataType: "json",
                xhrFields: {withCredentials: true},
                success: function (data) {
                    $(".search_tags").empty();
                    team_type=data.msg;
                    //console.log(team_type);
                    for(var i=0;i<data.msg.length;i++){
                        $(".search_tags").append('<div class="chip allTags" id="team_tags"><span id="'+data.msg[i].id+'">'+data.msg[i].name+'</span></div>')
                    }
                    listening();

                },
                headers:{
                    "Access-Control-Allow-Origin":"*"
                }
            });

        });


    }

    function project(){
        var project_type=[];
        $("#select_project").on('click',function(){
            $("#select_project").css('border-bottom','2px solid').css('border-bottom-color','orange');
            $("#select_position").css('border-bottom','0px solid');
            $("#select_team").css('border-bottom','0px solid');
            $.ajax({
                type: "post",
                url: cur_site + "team/job_type/",
                dataType: "json",
                xhrFields: {withCredentials: true},
                success: function (data) {
                    $(".search_tags").empty();
                    project_type=data.msg;
                    //console.log(team_type);
                    for(var i=0;i<data.msg.length;i++){
                        $(".search_tags").append('<div class="chip allTags" id="project_tags"><span id="'+data.msg[i].id+'">'+data.msg[i].name+'</span></div>')
                    }
                    listening();

                },
                headers:{
                    "Access-Control-Allow-Origin":"*"
                }
            });

        });


    }

    function job(){
        var job_type=[];
        $("#select_position").on('click',function(){
            $("#select_position").css('border-bottom','2px solid').css('border-bottom-color','orange');
            $("#select_project").css('border-bottom','0px solid');
            $("#select_team").css('border-bottom','0px solid');
            $.ajax({
                type: "post",
                url: cur_site + "team/job_type/",
                dataType: "json",
                xhrFields: {withCredentials: true},
                success: function (data) {
                    $(".search_tags").empty();
                    job_type=data.msg;
                    console.log(job_type);
                    for(var i=0;i<data.msg.length;i++){
                        $(".search_tags").append('<div class="chip allTags" id="job_tags"><span id="'+data.msg[i].id+'">'+data.msg[i].name+'</span></div>')
                    }
                    listening();

                },
                headers:{
                    "Access-Control-Allow-Origin":"*"
                }
            });
        });
    }

    function listening(){
        $(".search_tags .chip").on('click',function(){
            $(".search_tags .chip").css('background-color','orange').children().css('color','#fff');
            $(this).css('background-color','#fff').children().css('color','orange');
            type=$(this).children().attr('id');
        });
        $("#startSearch").unbind('click').on('click',function(){
            var searchkey=$("#search").val();
            var model=$(".search_tags").children().attr('id').split('_')[0];
            console.log(model);
            if(type==null){
                Materialize.toast('请选择类型',2000);
            }
            else if(searchkey==""){
                Materialize.toast('请输入关键字',2000);
            }
            else{
                var result={'model':model,'type':type,'keys':searchkey};
                $.ajax({
                    type: "post",
                    url: cur_site + "team/search/",
                    dataType: "json",
                    data:result,
                    xhrFields: {withCredentials: true},
                    success: function (data) {
                        console.log(data);

                    }
                });
            }

        });
    }

});
