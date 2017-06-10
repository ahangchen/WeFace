$(document).ready(function(){

    var job_type;

    $.ajax({
        type: 'POST',
        url: cur_site + "team/job_type/",
        dataType: 'json',
        success: function (data) {
            job_type = data.msg;
            init();
            search();
        }
    });

    function init(){
        //初始化搜索框
        $("#search_input").focus(function(){
            $(".search_input_content").addClass("active");
        }).blur(function(){
            $(".search_input_content").removeClass("active");
        });

        //初始化选择类型的按钮
        $(".type_choice").click(function(){
            var activeTab = $(this);
            if(activeTab.hasClass("active")){
                $(this).removeClass("active");
            }
            else{
                $(this).addClass("active");
            }
            if(activeTab.html() != "全部"){
                $(".sub_type.active .type_choice").eq(0).removeClass("active");
            }
            else{
                $(this).siblings().removeClass("active");
            }
            $("#search_btn").click();
        });

        $(".type_tab").click(function(){
            $(this).addClass("active").siblings().removeClass("active");
            var active_type = parseInt($(this).data('val'));
            $(".sub_type").eq(active_type).addClass("active").siblings().removeClass("active");
        }).eq(0).click();

    }

    function search(){
        $("#search_btn").click(function(){
            $(".search_result_container").empty();
            $(".change_page_div ul").empty();
            var search_key = $("#search_input").val();
            if(search_key == ""){
                Materialize.toast("搜索内容不能为空！",2000);
                return;
            }
            var all_search_type =  $(".type_tab");
            var search_type = "";
            var sub_type = {};
            for(var i =0;i<all_search_type.length;i++){
                if(all_search_type.eq(i).hasClass("active")){
                    search_type = all_search_type.eq(i).attr('id');
                }
            }
            var all_sub_type = $(".sub_type.active").children('.active');
            for(var j=0;j<all_sub_type.length;j++){
                sub_type[all_sub_type[j].innerHTML]=1;
            }

            $.ajax({
                type: 'POST',
                data: {"model":search_type,"keys":search_key},
                url: cur_site + "team/search/",
                dataType: 'json',
                success: function (data) {
                    console.log(data);
                    result = data.message;
                    if(search_type == "job"){
                        searchJob(data.message,sub_type);
                    }
                    else if(search_type == "team"){
                        searchTeam(data.message,sub_type);
                    }
                    else{
                        searchProduct(data.message,sub_type);
                    }
                }
            });

        });
    }

    function searchJob(jobs,sub_type){
        for(var i=0;i<jobs.length;i++){
            var standard = 0;
            var job_label = job_type[Number(jobs[i].job_type)-1].name;
            if('全部' in sub_type){
                standard = 1;
            }
            else if(job_label in sub_type){
                standard = 1;
            }
            if(standard == 1){
                var city;
                if(jobs[i].job_city==1){
                    city = '广州';
                }
                else{
                    city = '其他';
                }
                $(".search_result_container").append('<div class="search_result_div"><div class="job_search_result" id="job'+jobs[i].pk+'"><div class="job_name_div">' +
                    '<p class="job_name">'+jobs[i].job_name+'/<span class="job_city">'+city+'</span></p><p class="job_salary">'+jobs[i].min_salary+'~'+jobs[i].max_salary+'元/月'+'</p></div>' +
                    '<div class="job_type_div"><div class="chip job_type">'+job_label+'</div>' +
                    '<div class="job_request">'+jobs[i].job_summary+'</div></div>' +
                    '<div class="job_team_type_div"></div>' +
                    '<div class="job_team_logo_div"><img src="'+cur_media+jobs[i].team_logo_path+'"/><p>'+jobs[i].team_name+'</p></div></div></div>');
                for(var j=0;j<jobs[i].team_label.length;j++){
                    $("#job"+jobs[i].pk+" .job_team_type_div").append('<div class="chip job_team_label">'+jobs[i].team_label[j]+'</div>')
                }
            }
        }
        add_page(jobs,1,searchJob,sub_type);
    }

    function searchTeam(teams,sub_type){
        for(var i=0;i<teams.length;i++){
            var standard = 0;
            var team_label = teams[i].team_label;
            if('全部' in sub_type){
                standard = 1;
            }
            else{
                for(var k=0;k<team_label.length;k++){
                    if(team_label[k] in sub_type){
                        standard = 1;
                    }
                }
            }
            if(standard==1){
                var link = "http://wemeet.tech:8080/team/team_index.html?tid="+teams[i].pk;
                $(".search_result_container").append('<div class="search_result_div"><div class="team_search_result" id="team'+teams[i].pk+'"><div class="team_logo_div">' +
                    '<img src=""/><p>'+teams[i].team_name+'</p></div><div class="team_slogan_div"><p>'+teams[i].team_about+'</p>' +
                    '</div><div class="team_link_div"><a class="waves-effect waves-light btn" data-val="'+link+'">团队主页</a></div></div></div>');
                for(var j=0;j<teams[i].team_label.length;j++){
                    $("#team"+teams[i].pk+" .team_slogan_div").append('<div class="chip team_label">'+teams[i].team_label[j]+'</div>')
                }
                if(teams[i].team_logo!=""){
                    $("#team"+teams[i].pk+" img").attr('src',cur_media+teams[i].team_logo);
                }
            }
        }
        $(".team_search_result a").on('click',function(){
            window.location.href = $(this).data('val');
        });
        add_page(teams,1,searchTeam,sub_type);
    }

    function searchProduct(products,sub_type){
        for(var i=0;i<products.length;i++){
            var standard = 0;
            var team_label = products[i].team_label;
            if('全部' in sub_type){
                standard = 1;
            }
            else{
                for(var k=0;k<team_label.length;k++){
                    if(team_label[k] in sub_type){
                        standard = 1;
                    }
                }
            }
            if(standard == 1){
                var product_reward = JSON.parse(products[i].product_reward);
                $(".search_result_container").append('<div class="search_result_div"><div class="product_search_result" id="product'+products[i].pk+'">' +
                    '<div class="product_name_div"><p class="product_name">'+products[i].product_name+'</p><div class="product_label_div"></div>' +
                    '<div class="product_slogan">'+product_reward.slogan+'</div></div><div class="product_team_type_div"></div>' +
                    '<div class="product_team_logo_div"><img src="'+cur_media+products[i].team_logo_path+'"/><p>'+products[i].team_name+'</p></div></div></div>');
                for(var j=0;j<product_reward.tag.length;j++){
                    $("#product"+products[i].pk+" .product_label_div").append('<div class="chip product_label">'+product_reward.tag[j]+'</div>');
                }
                for(var p=0;p<products[i].team_label.length;p++){
                    $("#product"+products[i].pk+" .product_team_type_div").append('<div class="chip product_team_label">'+products[i].team_label[p]+'</div>')
                }
            }
        }
        add_page(products,1,searchProduct,sub_type);
    }

    function add_page(product,activePage,function_name){
        if(product.length == 0){
            return;
        }
        var pageNum=parseInt((product.length-1)/10+1);
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
            $(".search_result_container").empty();
            function_name(change_to_page,product);
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
                $(".search_result_container").empty();
                function_name(change_to_page,product);
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
                $(".search_result_container").empty();
                function_name(change_to_page,product);
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
});