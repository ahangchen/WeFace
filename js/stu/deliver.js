/**
 * Created by jewel on 16/7/24.
 */
// 投递页面的js
// function appendCard(divId, card){
//     $('#'+divId).append('<div class="jobCard">'+
//         '<div class="nameBar">'+
//         '<a>'+
//         '<span class="jobName">'+card.jName+'/</span>'+
//         '<span class="addr">'+card.addr+'</span>'+
//         '</a>'+
//         '<div class="money"><span class="min">'+card.min+'</span>'+
//         '~'+
//         '<span class="max">'+card.max+'</span>'+
//         '/月</div>'+
//         '</div>'+
//         '<div class="descBar">'+
//         '<div class="chip '+card.stateType+'">'+card.stateText+'</div>'+
//         '<div class="firmName">'+card.firmName+'</div>'+
//         '</div>'+
//         '<div class="questionMark">?</div>'+
//         '<div class="tips">'+card.tips+'</div>'+
//         '<div class="chageTime">'+card.changeDate+'</div>'+
//         '</div>');
// }
$(function(){
    var cardContent = {
        max:'',
        min: '',
        changeDate: '',
        firmName: '',
        jName: '',
        addr: '',
        stateText: '',
        stateType: '',
        tips: ''
    };
    var teamId,jobId,state;
    // var changeDate,state,min,max,firmName,addr,jName;
    var unreadCh = 0;
    var unredCon = 0;
    var unreadAdm = 0;
    var unreadQui = 0;
    var unreadSu = 0;
    var unreadNum = 0;
    var li = $('.tabs li a .newNum');
    //在学生主页的url中获取学生id
    var stuId = getUrlVar('stu_id');
    console.log(stuId);
    var sId = {
        stu_id:stuId,
        state:5
    };
    init();
    $('#flushBtn').click(function(){
        // 把已统计的量全部归零
        unreadCh = 0;
        unredCon = 0;
        unreadAdm = 0;
        unreadQui = 0;
        unreadSu = 0;
        unreadNum = 0;
        $('.newNum').html("");
        $('.newNum').css('visibility','hidden');
        $('#entire').html("");
        $('#unchecked').html("");
        $('#uncontact').html("");
        $('#unquiz').html("");
        $('#admitted').html("");
        $('#unsuit').html("");
        init();
    });
    function appendCard(divId, card){
        $('#'+divId).append('<div class="jobCard">'+
            '<div class="nameBar">'+
            '<a>'+
            '<span class="jobName">'+card.jName+'/</span>'+
            '<span class="addr">'+card.addr+'</span>'+
            '</a>'+
            '<div class="money"><span class="min">'+card.min+'</span>'+
            '~'+
            '<span class="max">'+card.max+'</span>'+
            '/月</div>'+
            '</div>'+
            '<div class="descBar">'+
            '<div class="chip '+card.stateType+'">'+card.stateText+'</div>'+
            '<div class="firmName">'+card.firmName+'</div>'+
            '</div>'+
            '<div class="questionMark">?</div>'+
            '<div class="tips">'+tips+'</div>'+
            '<div class="chageTime">'+card.changeDate+'</div>'+
            '</div>');
    }
    function init(){
        $.ajax({
            type:'post',
            //url:"../data/stu/deliverAll.json",
            //测试用的json文件
            data:sId,
            url:cur_site + "student/apply/list/",
            dataType:"json",
            success:function(data){
                var chCnt = 0;
                var conCnt = 0;
                var quiCnt = 0;
                var admCnt = 0;
                var suitCnt = 0;
                // var stateType = "";
                // var stateText = "";
                for (var i = 0; i < data.apply_list.length; i++) {
                    cardContent.changeDate = data.apply_list[i].change_time;
                    state = data.apply_list[i].state;
                    cardContent.min = data.apply_list[i].min_salary;
                    cardContent.max = data.apply_list[i].max_salary;
                    cardContent.firmName = data.apply_list[i].team_name;
                    var addrNum = data.apply_list[i].city;
                    cardContent.jName = data.apply_list[i].job_name;
                    teamId = data.apply_list[i].team_id;
                    jobId = data.apply_list[i].job_id;
                    if(data.apply_list[i].is_read == 0){
                        unreadNum++;
                    }
                    switch (addrNum){
                        case 1:cardContent.addr = "广州市";break;
                        default:cardContent.addr = "其他";break;
                    }
                    switch(state){
                        case 0:cardContent.stateType ="unchChip";cardContent.stateText ="待查看";break;
                        case 1:cardContent.stateType ="unconChip";cardContent.stateText ="待沟通";break;
                        case 2:cardContent.stateType ="unquChip";cardContent.stateText ="待面试";break;
                        case 3:cardContent.stateType ="admChip";cardContent.stateText ="录用";break;
                        case 4:cardContent.stateType ="unsuitChip";cardContent.stateText ="不合适";break;
                    }
                    appendCard("entire",cardContent);
                    var link = $('#entire .nameBar a');
                    $(link[i]).attr('href','jobDetail.html?job_id='+jobId+'&stu_id='+stuId);
                    $(li[0]).html(unreadNum);
                    var statelink;
                    switch(stateText){
                        case "待查看":
                            appendCard("unchecked",cardContent);
                            statelink = $('#unchecked .nameBar a');
                            $(statelink[chCnt]).attr('href','jobDetail.html?job_id='+jobId+'&stu_id='+stuId);
                            chCnt++;
                            if (data.apply_list[i].is_read == 0) {
                                unreadCh++;
                            }
                            $(li[1]).html(unreadCh);
                            break;
                        case "待沟通":
                            appendCard("uncontact",cardContent);
                            statelink = $('#uncontact .nameBar a');

                            $(statelink[conCnt]).attr('href','jobDetail.html?job_id='+jobId+'&stu_id='+stuId);
                            conCnt++;
                            if (data.apply_list[i].is_read == 0) {
                                unredCon++;
                            }
                            $(li[2]).html(unredCon);
                            break;
                        case "待面试":
                            appendCard(unquiz)
                            statelink = $('#unquiz .nameBar a');
                            $(statelink[quiCnt]).attr('href','jobDetail.html?job_id='+jobId+'&stu_id='+stuId);
                            quiCnt++;
                            if (data.apply_list[i].is_read == 0) {
                                unreadQui++;
                            }
                            $(li[3]).html(unreadQui);
                            break;
                        case "录用":
                            appendCard("admitted",cardContent);
                            statelink = $('#admitted .nameBar a');
                            $(statelink[admCnt]).attr('href','jobDetail.html?job_id='+jobId+'&stu_id='+stuId);
                            admCnt++;
                            if (data.apply_list[i].is_read == 0) {
                                unreadAdm++;
                            }
                            $(li[4]).html(unreadAdm);
                            break;
                        case "不合适":
                            appendCard("unsuit",cardContent);
                            statelink = $('#unsuit .nameBar a');
                            $(statelink[suitCnt]).attr('href','jobDetail.html?job_id='+jobId+'&stu_id='+stuId);
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
        $(this).children('.newNum').css('visibility','hidden');
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