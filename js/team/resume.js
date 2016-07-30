// 简历管理的js
$(function(){
    var newNum = 0;
    var newCurrentPage = 1;
    var unConCurPage = 1;
    var unQuiCurPage = 1;
    var comCurPage = 1;
    var applyId = "";
    var name = "";
    var position = "";
    var date = "";
    var num = 0;
    var appObjArray = new Array();
    var unConArray = new Array();
    var unQuizArray = new Array();
    var completeArray = new Array();
    var stateObj = $('.stateBar ul li');
    var tId = getUrlVar('t_id');
    $('.newNum').css('visibility','hidden');
    $('.tab').click(function(){
        $(this).children('a').children('.newNum').css('visibility','hidden');
    });
    $('.solveBtn').click(function(){
        var id = $(this).parents('.resumeCard').attr('id');
        $(this).attr('href','resumeSolve.html?id='+id);
    });
    // 隔一段时间刷新新接收版块，调用初始化页面函数
    initNew();
    init(unConArray,1);
    init(unConArray,2);
    init(unConArray,3);
    setInterval(initNew,30000);
    setInterval(function(){init(unConArray,1);},30000);
    setInterval(function(){init(unConArray,2);},30000);
    setInterval(function(){init(unConArray,3);},30000);
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

    // 初始化新接收页面函数
    function initNew(){
         var postData = {
           team_id:tId,
           state:0
         };
        $.ajax({
            type:'post',
             data:postData,
            url:'http://110.64.69.66:8081/team/apply/list/',
            dataType:'json',
            success:function(data){
                num = data.unread_num;
                console.log(data.apply_list.length);
                $('.newPageNum .pagination').html("");
                if (num > 0) {
                    $('.newLink .newNum').html(num);
                    $('.newLink .newNum').css('visibility','visible');
                }
                for (var i = 0; i < num; i++) {
                    var applyObj = {
                        id:"",
                        job_id:"",
                        stu_id:"",
                        job_name:"",
                        stu_name:"",
                        position:"",
                        date:"",
                        state:0,
                        is_read:1
                    };
                    applyObj.id = data.apply_list[i].apply_id;
                    applyObj.job_id = data.apply_list[i].job_id;
                    applyObj.stu_name = data.apply_list[i].stu_name;
                    applyObj.job_name = data.apply_list[i].job_name;
                    applyObj.date = data.apply_list[i].apply_time;
                    applyObj.state = data.apply_list[i].state;
                    applyObj.is_read = data.apply_list[i].is_read;
                    appObjArray[i] = applyObj;
                }
                changeContent(newCurrentPage,"newCardDiv",appObjArray,0);
                initPages(newCurrentPage,num,"newPageNum","newCardDiv",appObjArray,0);
            },
            error:function(data){
                alert(data.msg);
            },
            headers:{
                "Access-Control-Allow-Origin":"*"
            }
        });
    }

    // 根据页面类型不同初始化不同页面
    function init(array,state){
        var divId = "";
        var pageClass = "";
        var isCheckBtn = 0;
        var currentPage = 1;
        switch(state){
            case 1:divId = "unConCards";pageClass = "unConPageNum";currentPage = unConCurPage; break;
            case 2:divId = "unQuiCards";pageClass = "unQuiPageNum";currentPage = unQuiCurPage; break;
            case 3:divId = "compleCards";pageClass = "completeNum";isCheckBtn = 1;currentPage = comCurPage;break;
        }
        $('.'+ pageClass).children('.pagination').html("");
         var post_data = {
           team_id:tId,
           state:state
         };
        $.ajax({
            type:'post',
             data:post_data,
            url:'http://110.64.69.66:8081/team/apply/list/',
            dataType:'json',
            success:function(data){
                var unreadNum = data.unread_num;
                // 显示未读信息条数
                switch(state){
                    case 1:
                        $('.unConLink .newNum').html(unreadNum);
                        $('.unConLink .newNum').css('visibility','visible');
                        break;
                    case 2:
                        $('.unQuizLink .newNum').html(unreadNum);
                        $('.unQuizLink .newNum').css('visibility','visible');
                        break;
                    case 3:
                        break;
                }
                // 获取总条数
                var total = data.apply_list.length;

                for (var i = 0; i < total; i++) {
                    var applyObj = {
                        id:"",
                        job_id:"",
                        stu_id:"",
                        job_name:"",
                        stu_name:"",
                        position:"",
                        date:"",
                        state:0,
                        is_read:1
                    };
                    applyObj.id = data.apply_list[i].apply_id;
                    applyObj.job_id = data.apply_list[i].job_id;
                    applyObj.stu_name = data.apply_list[i].stu_name;
                    applyObj.job_name = data.apply_list[i].job_name;
                    applyObj.date = data.apply_list[i].apply_time;
                    applyObj.state = data.apply_list[i].state;
                    applyObj.is_read = data.apply_list[i].is_read;
                    array[i] = applyObj;
                }
                changeContent(currentPage,divId,array,isCheckBtn);
                initPages(currentPage,total,pageClass,divId,array,isCheckBtn);
            },
            error:function(data){
                alert(data.msg);
            },
            headers:{
                "Access-Control-Allow-Origin":"*"
            }
        });
    }
    // // 初始化待沟通页面函数
    // function initUnCon(){

    // }
    // // // 初始化待面试页面函数
    // // function initUnQuiz(){

    // // }

    // 动态加载页码的函数
    function initPages(currentPage,n,type,divId,array,isCheck){
        var pageNum = Math.ceil(n/10);
        console.log(type);
        $('.'+type).children('.pagination').append('<li class="waves-effect"><a><i class="material-icons">chevron_left</i></a></li>');
        for (var i = 0; i < pageNum; i++) {
            $('.'+type).children('.pagination').append('<li class="waves-effect"><a>'+(i+1)+'</a></li>');
        }
        $('.'+type).children('.pagination').append('<li class="waves-effect"><a><i class="material-icons">chevron_right</i></a></li>');
        var li = $('.' +type).children('.pagination').children('li');
        $(li[1]).attr('class','active');
        if (currentPage == 1) {
            $(li[0]).attr('class','disable');
        }
        if (currentPage == pageNum) {
            $(li[pageNum+1]).attr('class','disable');
        }
        $(li).each(function(i){
            if (i == 0) {
                $(li[i]).click(function(){
                    if (currentPage == 1) {
                        alert("这已经是第一页");
                    }
                    else{
                        pNum = currentPage - 1;
                        changeContent(pNum,divId,array,isCheck);
                        currentPage = currentPage - 1;
                        $('.active').attr('class','waves-effect');
                        $(li[currentPage]).attr('class','active');
                        if (currentPage == 1) {
                            $(li[0]).attr('class','disable');
                        }
                        else if (currentPage == pageNum) {
                            $(li[pageNum+1]).attr('class','disable');
                        }
                        else{
                            $(li[pageNum+1]).attr('class','waves-effect');
                            $(li[0]).attr('class','waves-effect');
                        }
                    }
                });
            }
            if (i > 0 && i <= pageNum) {
                $(li[i]).click(function(){
                    var pNum = $(this).children('a').html();
                    changeContent(pNum,divId,array,isCheck);
                    currentPage = pNum;
                    $('.active').attr('class','waves-effect');
                    $(this).attr('class','active');
                    if (currentPage == 1) {
                        $(li[0]).attr('class','disable');
                    }
                    else if (currentPage == pageNum) {
                        $(li[pageNum+1]).attr('class','disable');
                    }
                    else{
                        $(li[pageNum+1]).attr('class','waves-effect');
                        $(li[0]).attr('class','waves-effect');
                    }
                });
            }
            if (i > pageNum) {
                $(li[i]).click(function(){
                    if (currentPage == pageNum) {
                        alert("这已经是最后一页");
                    }
                    else{
                        pNum = currentPage + 1;
                        changeContent(pNum,divId,array,isCheck);
                        currentPage = currentPage + 1;
                        $('.active').attr('class','waves-effect');
                        $(li[currentPage]).attr('class','active');
                        if (currentPage == 1) {
                            $(li[0]).attr('class','disable');
                        }
                        else if (currentPage == pageNum) {
                            $(li[pageNum+1]).attr('class','disable');
                        }
                        else{
                            $(li[pageNum+1]).attr('class','waves-effect');
                            $(li[0]).attr('class','waves-effect');
                        }
                    }
                });
            }
        });
    }

    // 按页码更新页面内容,checkBtn为布尔变量，表示是否查看按钮
    function changeContent(pN,divId,array,checkBtn){
        var len = pN*10;
        if (len>num) {
            len = num;
        }
        $('#'+divId).html("");
        var count = 0;
        if (checkBtn == 0) {
            for (var i = (pN-1)*10; i < len; i++) {
                $('#'+divId).append('<div class="resumeCard  z-depth-3" id="'+array[i].id+'">'+
                    '<div class="col s9">'+
                    '<div class="name">'+array[i].stu_name+'</div>'+
                    '<div class="deliverBar">'+
                    '<span class="position">'+array[i].job_name+'</span>'+

                    '</div>'+
                    '</div>'+
                    '<div class="col s3">'+
                    '<a class="waves-effect waves-light btn solveBtn">处理</a>'+
                    '<div class="date">'+array[i].date+'</div>'+
                    '</div>'+
                    '</div>');
                var link = $('#'+divId).children('.resumeCard').children('.s3').children('a');
                $(link[count]).attr('href','resumeSolve.html?a_id='+array[i].id+'&t_id='+tId);
                count++;
            }
        }
        else{
            for (var i = (pN-1)*10; i < len; i++) {
                if (array[i].state == 3) {
                    $('#'+divId).append('<div class="resumeCard  z-depth-3" id="'+array[i].id+'">'+
                        '<div class="col s9">'+
                        '<span class="name">'+array[i].stu_name+'</span>'+
                        '<div class="chip admitChip">'+'录用'+'</div>'+
                        '<div class="deliverBar">'+
                        '<span class="position">'+array[i].job_name+'</span>'+

                        '</div>'+
                        '</div>'+
                        '<div class="col s3">'+
                        '<a class="waves-effect waves-light btn checkBtn">查看</a>'+
                        '<div class="date">'+array[i].date+'</div>'+
                        '</div>'+
                        '</div>');
                }
                if (array[i].state == 4) {
                    $('#'+divId).append('<div class="resumeCard  z-depth-3" id="'+array[i].id+'">'+
                        '<div class="col s9">'+
                        '<span class="name">'+array[i].stu_name+'</span>'+
                        '<div class="chip unsuitChip">'+'不合适'+'</div>'+
                        '<div class="deliverBar">'+
                        '<span class="position">'+array[i].job_name+'</span>'+

                        '</div>'+
                        '</div>'+
                        '<div class="col s3">'+
                        '<a class="waves-effect waves-light btn checkBtn">查看</a>'+
                        '<div class="date">'+array[i].date+'</div>'+
                        '</div>'+
                        '</div>');
                }
                var link = $('#'+divId).children('.resumeCard').children('.s3').children('a');
                $(link[count]).attr('href','resumeCheck.html?a_id='+array[i].id+'&t_id='+tId);
                count++;
            }
        }
    }
});














