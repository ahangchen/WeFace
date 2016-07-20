/**
 * Created by jewel on 16/7/20.
 */
$(function(){
    //显示职位查询
    var tagsObj = $(".chip a");
    var tags = [];
    for (var i = 0; i < tagsObj.length; i++) {
        tags[i] = $(tagsObj[i]).html();
    }
    var pages = 1;
    // 初始化第一页
    init();


    $('select').material_select();

    // 控制按钮响应时间
    $('#editBtn').click(function(){
        initNav();
        $("#selectBar").css("display","none");
        $("#editBar").css("display","block");
    });
    $('#saveEdit').click(function(){
        removeItem();
        getSelectedItem();
        $("#editBar").css("display","none");
        $("#selectBar").css("display","block");
    });
    $('#cancelEdit').click(function(){
        $("#editBar").css("display","none");
        $("#selectBar").css("display","block");
    });
    // 动态编辑标签显示
    function initNav(){
        var initBtn = $(".chip a");
        for (var i = 0; i < initBtn.length; i++) {
            var currentValue = $(initBtn[i]).html();
            var currentId  = '';
            switch(currentValue){
                case "行政":currentId = '#admin';break;
                case '技术':currentId = '#tech';break;
                case '设计':currentId = '#design';break;
                case '产品':currentId = '#product';break;
                case '运营':currentId = '#business';break;
                case '运维支持':currentId = '#support';break;
                case '市场':currentId = '#market';break;
                case '文案策划':currentId = '#paper';break;
                case '营销':currentId = '#sale';break;
                default:currentId = " ";
            }
            $(currentId).attr("checked","checked");
        }
    }
    function removeItem(){
        $(".chip").each(function(i){ if(i > 0){$(this).remove();}});
    }
    function getSelectedItem(){
        var target = $('#editBar input');

        for (var i = 0; i < target.length; i++) {
            if (target[i].checked) {
                var targetId = target[i].id;
                var value = '';
                switch(targetId){
                    case 'admin':value = '行政';break;
                    case 'tech':value = '技术';break;
                    case 'design':value = '设计';break;
                    case 'product':value = '产品';break;
                    case 'business':value = '运营';break;
                    case 'support':value = '运维支持';break;
                    case 'market':value = '市场';break;
                    case 'paper':value = '文案策划';break;
                    case 'sale':value = '营销';break;
                    default:value = " ";break;
                }
                $(".tags").append('<div class="chip"><a>'+ value +'</a></div>');

            }
        }
    }
    // 显示新增职位的页面
    var currentDiv  = " ";
    var editDiv = " ";
    var newAddDiv = " ";
    $('#addBtn').click(function(){
        currentDiv = $('#positionDiv').html();
        var a = $.ajax({
            type:"get",
            url:"addPosition.html",
            dataType:"html",
            success:function(data){
                $("#positionDiv").html(data);
            }
        });
    });


    // 初始化职位显示第一页
    function init(){
        var a = $.ajax({
            type:'post',
            data:'tags',
            url:'../../data/position/showposition.json',
            dataType:'json',
            success:function(data){
                pages = Math.ceil(data.jobs.length/10);

                if (pages == 1) {
                    for (var i = 0; i < data.jobs.length; i++) {
                        var jobId = data.jobs[i].jobId;
                        var jobName = data.jobs[i].name;
                        var jobAddr = data.jobs[i].address;
                        var minMon = data.jobs[i].minSalary;
                        var maxMon = data.jobs[i].maxSalary;
                        var jobExp = data.jobs[i].exp;
                        var state = data.jobs[i].job_state;
                        var stateText = "";
                        switch(state){
                            case "submitted":stateText = "已发布";break;
                            case "temperory":stateText = "暂存";break;
                            default:break;
                        }
                        $("#positionCards").append('<div class="positionCard comwidth" id="'+jobId+'"><div class="row"><label class="positionName">'+jobName+'（'+jobAddr+'）</label><div class="chip '+state+'">'+stateText+'</div></div><div class="row"><label class="salary">'+minMon+'-'+maxMon+'</label><label class="required">'+jobExp+'</label></div><div class="btngroups fr"><a class="btn-floating btn-large waves-effect waves-light white delJobBtn"  ><i class="medium material-icons" >remove</i></a><a class="btn-floating btn-large white editInfoBtn" ><i class="medium material-icons" >mode_edit</i></a></div></div>');
                    }

                }
                else{
                    for (var i = 0; i < 10; i++) {
                        var jobId = data.jobs[i].jobId;
                        var jobName = data.jobs[i].name;
                        var jobAddr = data.jobs[i].address;
                        var minMon = data.jobs[i].minSalary;
                        var maxMon = data.jobs[i].maxSalary;
                        var jobExp = data.jobs[i].exp;
                        var state = data.jobs[i].job_state;
                        var stateText = "";
                        switch(state){
                            case "submitted":stateText = "已发布";break;
                            case "temperory":stateText = "暂存";break;
                            default:break;
                        }
                        $("#positionCards").append('<div class="positionCard comwidth" id="'+jobId+'"><div class="row"><label class="positionName">'+jobName+'（'+jobAddr+'）</label><div class="chip '+state+'">'+stateText+'</div></div><div class="row"><label class="salary">'+minMon+'-'+maxMon+'</label><label class="required">'+jobExp+'</label></div><div class="btngroups fr"><a class="btn-floating btn-large waves-effect waves-light white delJobBtn"  ><i class="medium material-icons" >remove</i></a><a class="btn-floating btn-large white editInfoBtn" ><i class="medium material-icons" >mode_edit</i></a></div></div>');
                    }
                }
                initPages(pages);
                // 显示编辑职位的页面
                $('.editInfoBtn').click(function(){
                    var a = $.ajax({
                        type:"get",
                        url:"positionEdit.html",
                        dataType:"html",
                        success:function(data){
                            $("#positionDiv").html(data);
                        }
                    });
                });
                // 删除按钮的响应事件
                $('.delJobBtn').click(function(){
                    var ch = confirm("确定删除该职位信息？");
                    if (ch) {
                        var delJobId = $(this).parents('.positionCard').attr('id');
                        var a = $.ajax({
                            type: 'post',
                            data:'delJobId',
                            url:'../../data/position/delJob.json',
                            dataType:'json',
                            success:function(data){
                                if (data.err==0) {
                                    alert(data.msg);
                                    delJobFromDom(delJobId);
                                }
                                else{
                                    alert("删除失败请刷新再试");
                                }
                            }
                        });
                    }
                    else{
                        alert("你点击了取消");
                    }
                });
            }
        });
    }


// 初始化页码
    function initPages(p){
        $('.pagination').children('li').each(function(i){
            var len = $('.pagination').children('li').length;
            if(i > 1 && i < (len-1)){
                $(this).remove();
            }
        });
        if (p < 10) {
            for (var i = p; i > 1 ; i--) {
                var pageNum = "page";
                $('.activePage').after('<li class="waves-effect"><a class="page">'+i+'</a></li>');
            }
        }
        else{
            for (var i = 10; i > 1; i--) {
                $('.activePage').after('<li class="waves-effect"><a class="'+pageNum+'">'+i+'</a></li>');
            }
        }
        $('.page').click(function(){
            $('.activePage').attr("class","waves-effect");
            $(this).parents('.waves-effect').attr("class","activePage");
            var currentPage = $(this).html();
            removeLastPage();
            showActivePage(currentPage);
            if (currentPage == 1) {
                $('#prePage').parents('li').attr("class","disabled");
            }
            else if (currentPage == pages) {
                $('#nextPage').parents('li').attr("class","disabled");
            }
            else{
                $('#prePage').parents('li').attr("class","waves-effect");
                $('#nextPage').parents('li').attr("class","waves-effect");
            }
        });
    }


    // 删除节点刷新页面
    function delJobFromDom(jId){
        $('#'+jId).remove();
        removeLastPage();
        init();
    }
    // 上下页切换
    $('#prePage').click(function(){
        var currPage = $(".activePage a").html();
        var targetPage = $(".activePage").prev();
        var tarPageNum = parseInt(currPage) - 1;
        if (tarPageNum == 1) {
            $('#prePage').parents('li').attr("class","disabled");
        }
        if (tarPageNum > 0) {
            $('.activePage').attr("class","waves-effect");
            $(targetPage).attr("class","activePage");
            removeLastPage();
            showActivePage(tarPageNum);
        }
        else{
            alert("已经是第一页了");
        }

    });

    $('#nextPage').click(function(){

        var targetPage = $(".activePage").next();
        var currPage = $(".activePage a").html();
        var tarPageNum = parseInt(currPage) + 1;
        if (tarPageNum == parseInt(pages)) {
            $('#nextPage').parents('li').attr("class","disabled");
        }
        if (tarPageNum <= parseInt(pages)) {
            $('.activePage').attr("class","waves-effect");
            $(targetPage).attr("class","activePage");
            removeLastPage();
            showActivePage(tarPageNum);
        }
        else{
            alert("已经是最后一页");
        }

    });

    // 删除上一页内容
    function removeLastPage(){
        $("#positionCards").html(" ");
    }
    // 按页码后显示该页内容
    function showActivePage(curPage){
        var a = $.ajax({
            type:'post',
            data:'tags',
            url:'../../data/position/showposition.json',
            dataType:'json',
            success:function(data){
                for (var i = (curPage-1)*10; i < curPage*10; i++) {
                    var id = data.jobs[i].jobId;
                    var jobName = data.jobs[i].name;
                    var jobAddr = data.jobs[i].address;
                    var minMon = data.jobs[i].minSalary;
                    var maxMon = data.jobs[i].maxSalary;
                    var jobExp = data.jobs[i].exp;
                    var state = data.jobs[i].job_state;
                    var stateText = "";
                    switch(state){
                        case "submitted":stateText = "已发布";break;
                        case "temperory":stateText = "暂存";break;
                        default:break;
                    }
                    $("#positionCards").append('<div class="positionCard comwidth" id="'+id+'"><div class="row"><label class="positionName">'+jobName+'（'+jobAddr+'）</label><div class="chip '+state+'">'+stateText+'</div></div><div class="row"><label class="salary">'+minMon+'-'+maxMon+'</label><label class="required">'+jobExp+'</label></div><div class="btngroups fr"><a class="btn-floating btn-large waves-effect waves-light white delJobBtn"  ><i class="medium material-icons" >remove</i></a><a class="btn-floating btn-large white editInfoBtn" ><i class="medium material-icons" >mode_edit</i></a></div></div>');
                }
            }
        });
    }

});