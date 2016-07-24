/**
 * Created by jewel on 16/7/24.
 */
// 投递页面的js
$(function(){
    var teamId,jobId;
    var changeDate,state,min,max,firmName,addr,jName;
    var unreadCh = 0;
    var unredCon = 0;
    var unreadAdm = 0;
    var unreadQui = 0;
    var unreadSu = 0;
    var unreadNum = 0;
    var li = $('.tabs li a .newNum');
    //在学生主页的url中获取学生id
    var stuId = getUrlVar('stuId');
    var sId = {
        stu_id:stuId
    };
    init();
    $('#flushBtn').click(function(){
        $('#entire').html("");
        $('#unchecked').html("");
        $('#uncontact').html("");
        $('#unquiz').html("");
        $('#admitted').html("");
        $('#unsuit').html("");
        init();
    });
    function init(){
        $.ajax({
            type:'post',
            //url:"../data/stu/deliverAll.json",
            //测试用的json文件
            data:sId,
            url:"http://110.64.69.66:8081/student/apply/info/",
            dataType:"json",
            success:function(data){
                var chCnt = 0;
                var conCnt = 0;
                var quiCnt = 0;
                var admCnt = 0;
                var suitCnt = 0;
                var stateType = "";
                var stateText = "";
                for (var i = 0; i < data.apply_list.length; i++) {
                    changeDate = data.apply_list[i].change_time;
                    state = data.apply_list[i].state;
                    min = data.apply_list[i].min_salary;
                    max = data.apply_list[i].max_salary;
                    firmName = data.apply_list[i].team_name;
                    addr = data.apply_list[i].city;
                    jName = data.apply_list[i].job_name;
                    teamId = data.apply_list[i].team_id;
                    jobId = data.apply_list[i].job_id;
                    if(data.apply_list[i].is_read == 0){
                        unreadNum++;
                    }
                    switch(state){
                        case "0":stateType ="unchChip";stateText ="待查看";break;
                        case "1":stateType ="unconChip";stateText ="待沟通";break;
                        case "2":stateType ="unquChip";stateText ="待面试";break;
                        case "3":stateType ="admChip";stateText ="录用";break;
                        case "4":stateType ="unsuitChip";stateText ="不合适";break;
                    }
                    $('#entire').append('<div class="jobCard z-depth-3">'+
                        '<div class="nameBar">'+
                        '<a>'+
                        '<span class="jobName">'+jName+'</span>'+
                        '<span class="addr">（'+addr+'）</span>'+
                        '</a>'+
                        '<div class="chip '+stateType+'">'+stateText+'</div>'+
                        '</div>'+
                        '<div class="descBar">'+
                        '<span class="firmName">'+firmName+'</span>'+
                        '<span class="money"><span class="min">'+min+'</span>'+
                        '-'+
                        '<span class="max">'+max+'</span>'+
                        '/月<span>'+
                        '<span class="chageTime">'+changeDate+'</span>'+
                        '</div></div>');
                    var link = $('#entire .nameBar a');
                    $(link[i]).attr('href','jobDetail.html?jId='+jobId);
                    $(li[0]).html(unreadNum);
                    var statelink;
                    switch(stateText){
                        case "待查看":
                            $('#unchecked').append('<div class="jobCard z-depth-3">'+
                                '<div class="nameBar">'+
                                '<a>'+
                                '<span class="jobName">'+jName+'</span>'+
                                '<span class="addr">（'+addr+'）</span>'+
                                '</a>'+
                                '<div class="chip '+stateType+'">'+stateText+'</div>'+
                                '</div>'+
                                '<div class="descBar">'+
                                '<span class="firmName">'+firmName+'</span>'+
                                '<span class="money"><span class="min">'+min+'</span>'+
                                '-'+
                                '<span class="max">'+max+'</span>'+
                                '/月<span>'+
                                '<span class="chageTime">'+changeDate+'</span>'+
                                '</div></div>');
                            statelink = $('#unchecked .nameBar a');
                            $(statelink[chCnt]).attr('href','jobDetail.html?jId='+jobId);
                            chCnt++;
                            if (data.apply_list[i].is_read == 0) {
                                unreadCh++;
                            }
                            $(li[1]).html(unreadCh);
                            break;
                        case "待沟通":
                            $('#uncontact').append('<div class="jobCard z-depth-3">'+
                                '<div class="nameBar">'+
                                '<a>'+
                                '<span class="jobName">'+jName+'</span>'+
                                '<span class="addr">（'+addr+'）</span>'+
                                '</a>'+
                                '<div class="chip '+stateType+'">'+stateText+'</div>'+
                                '</div>'+
                                '<div class="descBar">'+
                                '<span class="firmName">'+firmName+'</span>'+
                                '<span class="money"><span class="min">'+min+'</span>'+
                                '-'+
                                '<span class="max">'+max+'</span>'+
                                '/月<span>'+
                                '<span class="chageTime">'+changeDate+'</span>'+
                                '</div></div>');
                            statelink = $('#uncontact .nameBar a');

                            $(statelink[conCnt]).attr('href','jobDetail.html?jId='+jobId);
                            conCnt++;
                            if (data.apply_list[i].is_read == 0) {
                                unredCon++;
                            }
                            $(li[2]).html(unredCon);
                            break;
                        case "待面试":
                            $('#unquiz').append('<div class="jobCard z-depth-3">'+
                                '<div class="nameBar">'+
                                '<a>'+
                                '<span class="jobName">'+jName+'</span>'+
                                '<span class="addr">（'+addr+'）</span>'+
                                '</a>'+
                                '<div class="chip '+stateType+'">'+stateText+'</div>'+
                                '</div>'+
                                '<div class="descBar">'+
                                '<span class="firmName">'+firmName+'</span>'+
                                '<span class="money"><span class="min">'+min+'</span>'+
                                '-'+
                                '<span class="max">'+max+'</span>'+
                                '/月<span>'+
                                '<span class="chageTime">'+changeDate+'</span>'+
                                '</div></div>');
                            statelink = $('#unquiz .nameBar a');
                            $(statelink[quiCnt]).attr('href','jobDetail.html?jId='+jobId);
                            quiCnt++;
                            if (data.apply_list[i].is_read == 0) {
                                unreadQui++;
                            }
                            $(li[3]).html(unreadQui);
                            break;
                        case "录用":
                            $('#admitted').append('<div class="jobCard z-depth-3">'+
                                '<div class="nameBar">'+
                                '<a>'+
                                '<span class="jobName">'+jName+'</span>'+
                                '<span class="addr">（'+addr+'）</span>'+
                                '</a>'+
                                '<div class="chip '+stateType+'">'+stateText+'</div>'+
                                '</div>'+
                                '<div class="descBar">'+
                                '<span class="firmName">'+firmName+'</span>'+
                                '<span class="money"><span class="min">'+min+'</span>'+
                                '-'+
                                '<span class="max">'+max+'</span>'+
                                '/月<span>'+
                                '<span class="chageTime">'+changeDate+'</span>'+
                                '</div></div>');
                            statelink = $('#admitted .nameBar a');
                            $(statelink[admCnt]).attr('href','jobDetail.html?jId='+jobId);
                            admCnt++;
                            if (data.apply_list[i].is_read == 0) {
                                unreadAdm++;
                            }
                            $(li[4]).html(unreadAdm);
                            break;
                        case "不合适":
                            $('#unsuit').append('<div class="jobCard z-depth-3">'+
                                '<div class="nameBar">'+
                                '<a>'+
                                '<span class="jobName">'+jName+'</span>'+
                                '<span class="addr">（'+addr+'）</span>'+
                                '</a>'+
                                '<div class="chip '+stateType+'">'+stateText+'</div>'+
                                '</div>'+
                                '<div class="descBar">'+
                                '<span class="firmName">'+firmName+'</span>'+
                                '<span class="money"><span class="min">'+min+'</span>'+
                                '-'+
                                '<span class="max">'+max+'</span>'+
                                '/月<span>'+
                                '<span class="chageTime">'+changeDate+'</span>'+
                                '</div></div>');
                            statelink = $('#unsuit .nameBar a');
                            $(statelink[suitCnt]).attr('href','jobDetail.html?jId='+jobId);
                            suitCnt++;
                            if (data.apply_list[i].is_read == 0) {
                                unreadSu++;
                            }
                            $(li[5]).html(unreadSu);
                            break;
                    }
                }
                if (unreadNum > 0) {
                    $(li[0]).css('visibility','visible');
                }
                if (unreadCh > 0) {
                    $(li[1]).css('visibility','visible');
                }
                if (unredCon > 0) {
                    $(li[2]).css('visibility','visible');
                }
                if (unreadQui > 0) {
                    $(li[3]).css('visibility','visible');
                }
                if (unreadAdm > 0) {
                    $(li[4]).css('visibility','visible');
                }
                if (unreadSu > 0) {
                    $(li[5]).css('visibility','visible');
                }
            },
            error:function(data){
                alert(data.msg);
            },
            headers:{
                "Access-Control-Allow-Origin":"*"
            }
        });
    }
    $('.tabs li a').click(function(){
        $(this).children('.newNum').css('display','none');
        unreadNum = unreadNum - parseInt($(this).children('.newNum').html());
        $(li[0]).html(unreadNum);
        if (unreadNum == 0) {
            $(li[0]).css('visibility','hidden');
        }
    });
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

});