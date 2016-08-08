/**
 * Created by jewel on 16/7/20.
 */

$(function(){
    //获取职位类型
    $.ajax({
        type:'post',
        url:cur_site + "team/job_type/",
        dataType:'json',
        success:function(data){
            console.log(data.msg);
        },
        headers:{
            "Access-Control-Allow-Origin":"*"
        }
    });
    //获取url中的参数t_id

    //得到参数数组

    function getUrlVars(){

        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for(var i = 0; i < hashes.length; i++)
        {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    }

    //得到指定参数的value
    function getUrlVar(name){
        return getUrlVars()[name];
    }

    // 团队点击职位名字后，在url上获取传职位id
    var tId = getUrlVar('t_id');


    $("#addBtn").click(function(){
        $(this).attr('href','addPosition.html?t_id='+tId);
    });
    var clickedJobId = "";
    var tagsObj = $(".activeTag a");
    var selectedTags = new Array(10);
    for (var i = 0; i < tagsObj.length; i++) {
        selectedTags[i] = $(tagsObj[i]).html();
    }
    // 储存当前标签返回的所有message
    var showArray = new Array();
    //返回数据中json的总长度
    var totalLength = 0;
    // 初始化第一页
    init(selectedTags);

    var pages = 1;

    // 限定标签选择，选了“全部”以后不能选择其他
    //选择标签
    $('.chip').click(function(){
        var targetObj = $(".activeTag a");
        var curTag = $(this).children('a');
        if ($(curTag).html()=="全部") {
            var tags = $(this).nextAll();
            for (var i = 0; i < (tags.length - 1); i++) {
                $(tags[i]).attr("class","chip normalTag");
                selectedTags[i+1] = "";
            }
            $(this).attr("class","chip activeTag");
            selectedTags[0] = "全部";
        }
        else{
            for(var i = 0;i < selectedTags.length;i++){
                selectedTags[i] = "";
            }

            $('#entireTag').attr("class","chip normalTag");
            if($(this).attr('class')=="chip normalTag"){
                $(this).attr("class","chip activeTag");
            }
            else {
                $(this).attr("class","chip normalTag");
            }
            targetObj = $(".activeTag a");
            for (var i = 0; i < targetObj.length; i++) {
                selectedTags[i] = $(targetObj[i]).html();
            }
        }

        removeLastPage();
        console.log(selectedTags);
        init(selectedTags);
    });

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

        for (var i = target.length - 1; i >= 0; i--) {
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
                $("#entireTag").after('<div class="chip normalTag" ><a>'+ value +'</a></div>');
            }
        }
        $("#entireTag").attr("class","chip activeTag");
        //选择标签
        $('.chip').click(function(){
            targetObj = $(".activeTag a");
            var curTag = $(this).children('a');
            if ($(curTag).html()=="全部") {
                var tags = $(this).nextAll();
                for (var i = 0; i < (tags.length - 1); i++) {
                    $(tags[i]).attr("class","chip normalTag");
                    selectedTags[i+1] = "";
                }
                $(this).attr("class","chip activeTag");
                selectedTags[0] = "全部";
            }
            else{

                for(var i = 0;i < selectedTags.length;i++){
                    selectedTags[i] = "";
                }
                $('#entireTag').attr("class","chip normalTag");
                if($(this).attr('class')=="chip normalTag"){
                    $(this).attr("class","chip activeTag");
                }
                else {
                    $(this).attr("class","chip normalTag");
                }
                targetObj = $(".activeTag a");
                for (var i = 0; i < targetObj.length; i++) {
                    selectedTags[i] = $(targetObj[i]).html();
                }
            }
            removeLastPage();
            console.log(selectedTags);
            init(selectedTags);
        });
    }
    // 初始化职位显示第一页
    function init(tags){
        for(var i = 0;i<tags.length;i++){
            if(tags[i]=="全部"){
                for(var j = 0;j < 8;j++)
                {
                    tags[j] = j;
                }
                break;
            }
            switch (tags[i]){
                case"行政":tags[i] = 1;break;
                case"技术":tags[i] = 3;break;
                case"设计":tags[i] = 4;break;
                case"产品":tags[i] = 2;break;
                case"运营":tags[i] = 5;break;
                case"运维支持":tags[i] = 6;break;
                case"市场":tags[i] = 7;break;
                case"文案策划":tags[i] = 8;break;
                case"营销":tags[i] = 9;break;
            }
        }
        var tag = {
            'jobTags':tags,
            'teamId':tId
        };
        var a = $.ajax({
            type:'post',
            data:tag,
            url:cur_site + 'team/search_job/',
            dataType:'json',
            success:function(data){
                if (data.err == 0) {
                    pages = Math.ceil(data.message.length/10);
                    totalLength = data.message.length;
                    for (var i = 0; i < data.message.length; i++) {
                        var jobCard = {
                            jobId:0,
                            jobName:"",
                            jobAddr:"",
                            minMon:0,
                            maxMon:0,
                            jobExp:"",
                            stateNum:"",
                            stateText:"",
                            state:""
                        };
                        jobCard.jobId = data.message[i].jobId;
                        jobCard.jobName = data.message[i].name;
                        var jobAddrNum = data.message[i].city;
                        jobCard.minMon = data.message[i].minSaraly;
                        jobCard.maxMon = data.message[i].maxSaraly;
                        jobCard.jobExp = data.message[i].exp;
                        jobCard.stateNum = data.message[i].job_state;

                        switch (jobAddrNum){
                            case 1:jobCard.jobAddr = "广州市";break;
                            default:jobCard.jobAddr = "其他";break;
                        }
                        switch(jobCard.stateNum){
                            case 1:jobCard.stateText = "已发布";jobCard.state = "submitted";break;
                            case 0:jobCard.stateText = "暂存";jobCard.state = "temperory";break;
                            default:break;
                        }
                        showArray[i] = jobCard;
                        console.log(showArray);
                    }
                    changeContent(1);
                    initPages(pages);

                }
                else{
                    alert(data.msg);
                }
            },
            error:function(data){
                console.log(data.msg + " 错误码为"+data.err);
            },
            headers: {
                "Access-Control-Allow-Origin":"*"
            }
        });
    }
// 改变某一页的内容
    function changeContent(curPage){
        var terminal = curPage * 10;
        if (terminal > totalLength) {
            terminal = totalLength;
        }
        for (var i = (curPage-1)*10; i < terminal; i++) {
            $("#positionCards").append('<div class="positionCard comwidth" id="'+showArray[i].jobId+'"><div class="row"><label class="positionName"><a>'+showArray[i].jobName+'</a><span class = "jAddr">（'+showArray[i].jobAddr+'）</span></label><div class="chip '+showArray[i].state+'">'+showArray[i].stateText+'</div></div><div class="row"><label class="salary">'+showArray[i].minMon+'-'+showArray[i].maxMon+'/月</label><label class="required">'+showArray[i].jobExp+'</label></div></div>');
            $('.positionName a').attr('href',"../jobDetail.html?data="+showArray[i].jobId);
        }

        // 显示编辑职位的页面

        // 删除按钮的响应事件

    }

// 初始化页码
    function initPages(p){
        var len = $('.pagination').children('li').length;
        var pageNum = "page";
        $('.pagination').children('li').each(function(i){
            if(i > 1 && i < (len - 1)){
                $(this).remove();
            }
        });
        if (p < 10) {
            for (var i = p; i > 1 ; i--) {

                $('#firstPage').after('<li class="waves-effect"><a class="page">'+i+'</a></li>');
            }
        }
        else{
            for (var i = 10; i > 1; i--) {
                $('#firstPage').after('<li class="waves-effect"><a class="'+pageNum+'">'+i+'</a></li>');
            }
        }
        $('.page').click(function(){
            $('.activePage').attr("class","waves-effect");
            $(this).parents('.waves-effect').attr("class","activePage");
            var currentPage = $(this).html();
            removeLastPage();
            changeContent(currentPage);
            if (currentPage == 1) {
                $('#prePage').parents('li').attr("class","disabled");
            }
            else if (currentPage == pages) {
                $('#nextPage').parents('li').attr("class","disabled");
                $('#prePage').parents('li').attr("class","waves-effect");
            }
            else{
                $('#prePage').parents('li').attr("class","waves-effect");
                $('#nextPage').parents('li').attr("class","waves-effect");
            }
        });
    }


    // 删除节点刷新页面

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
            changeContent(tarPageNum);
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
            changeContent(tarPageNum);
        }
        else{
            alert("已经是最后一页");
        }

    });

    // 删除上一页内容
    function removeLastPage(){
        $("#positionCards").html(" ");
    }







});