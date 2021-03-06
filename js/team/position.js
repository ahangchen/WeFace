/**
 * Created by jewel on 16/7/20.
 */

$(function(){
    var wefaceBace_site = "http://wemeet.tech:8080/";

    //获取职位类型
    $.ajax({
        type:'post',
        url:cur_site + "team/job_type/",
        dataType:'json',
        success:function(data) {
            if(data.err == 0) {
                console.log(data.msg);
            }
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
    var tId = getUrlVar('tid');

    //导航栏跳转
    $('#resumeBtn').attr('href',wefaceBace_site + 'team/resumeManage/resume.html?t_id='+tId);
    $('#positionBtn').attr('href',wefaceBace_site + 'team/position/showPosition.html?t_id='+tId);
    $("#projectBtn").attr("href",wefaceBace_site+'team/manageProject/manageProject.html?tid='+tId);

    $("#addBtn").click(function(){
        $(this).attr('href','addPosition.html?tid='+tId);
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
            if(selectedTags[0]==''){
                var entire = $('#entireTag');
                var tags = $(entire).nextAll();
                for (var i = 0; i < (tags.length - 1); i++) {
                    $(tags[i]).attr("class","chip normalTag");
                    selectedTags[i+1] = "";
                }
                $(entire).attr("class","chip activeTag");
                selectedTags[0] = "全部";
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
        $("#selectBar").css("display","flex");
    });
    $('#cancelEdit').click(function(){
        $("#editBar").css("display","none");
        $("#selectBar").css("display","flex");
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
        $(".tags .chip").each(function(i){ if(i > 0){$(this).remove();}});
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
            $("#positionCards").append(`<div class="positionCard comwidth" id="${showArray[i].jobId}">
                                            <div class="nameBar">
                                                <label class="positionName">
                                                    <a>${showArray[i].jobName}/</a>
                                                    <span class = "jAddr">${showArray[i].jobAddr}</span>
                                                </label>
                                                <div class="salary">${showArray[i].minMon}~${showArray[i].maxMon}/月</div>
                                                
                                            </div>
                                            <div class="descBar">
                                                <div class="chip ${showArray[i].state}">${showArray[i].stateText}</div>
                                                <div class="required">${showArray[i].jobExp}</div>
                                            </div>
                                            <div class="btngroups ">
                                                <div class="waves-effect waves-light editInfoBtn z-depth-1" >管理</div>
                                                <div class="waves-effect waves-light  delJobBtn z-depth-1" >删除</div>
                                            </div>
                                        </div>`);
            console.log(`你的学生id是${getUrlVar('stu_id')}`)
            if (getUrlVar('stu_id')) {
              $('.positionName a').attr('href', "../../stu/jobDetail.html?data=" + showArray[i].jobId);
            } else {
              $('.positionName a').attr('href', "../jobDetail.html?data=" + showArray[i].jobId);
            }
        }

        // 显示编辑职位的页面
        $('.editInfoBtn').click(function(){
            var editJobId = $(this).parents('.positionCard').attr('id');
            clickedJobId = editJobId;
            showEditPage(editJobId);
        });
        // 删除按钮的响应事件
        $('.delJobBtn').click(function(){
            var ch = confirm("确定删除该职位信息？");
            console.log($(this).parents('.positionCard').attr('id'));
            console.log(ch);
            if (ch) {
                var delJob = $(this).parents('.positionCard').attr('id');
                var delJobId = {
                    jobId:delJob
                };
                var a = $.ajax({
                    type: 'post',
                    data:delJobId,
                    url:cur_site + 'team/delete_job/',
                    dataType:'json',
                    success:function(data){
                        if (data.err==0) {
                            alert("删除成功");
                            delJobFromDom(delJob);
                            $("#firstPage").attr("class","activePage");
                        }
                        else{
                            alert("删除失败请刷新再试");
                        }
                    },
                    headers: {
                        "Access-Control-Allow-Origin":"*"
                    }
                });
            }
            else{
                alert("你点击了取消");
            }
        });
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
    function delJobFromDom(jId){
        console.log(jId);
        $("#"+jId).remove();
        removeLastPage();
        init(selectedTags);
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

    function showEditPage(eId){

        var jobInfo = {
            "job_id":eId,
            "job_name": "",
            "min_salary": "",
            "max_salary":"",
            "prince": "",
            "city": "",
            "town": "",
            "address": "",
            "edu_cmd": "",
            "exp_cmd": "",
            "job_type": "",
            "work_type": "",
            "summary": "",
            "pub_date": "",
            "pub_state": "",
            "job_cmd": "",
            "work_cmd": "",
            "team_id":""
        };
        var eJobId = {
            id:eId
        };
        var aj = $.ajax({
            type:"post",
            data: eJobId,
            url:cur_site + 'team/job_info/',
            // url:"../../js/team/position.json",
            dataType:'json',
            success:function(data){

                if (data.err == '0') {

                    jobInfo.team_id = data.team_id;
                    jobInfo.edu_cmd = data.edu_cmd;
                    jobInfo.job_name = data.job_name;
                    jobInfo.min_salary = data.min_salary;
                    jobInfo.max_salary = data.max_salary;
                    jobInfo.prince= data.prince;
                    jobInfo.city = data.city;
                    jobInfo.town = data.town;
                    jobInfo.address = data.address;
                    jobInfo.edu_cmd = data.edu_cmd;
                    jobInfo.exp_cmd = data.exp_cmd;
                    jobInfo.job_type = data .job_type;
                    jobInfo.work_type = data.work_type;
                    jobInfo.summary = data.summary;
                    jobInfo.pub_date = data.pub_date;
                    jobInfo.pub_state = data.pub_state;
                    jobInfo.job_cmd = data.job_cmd;
                    jobInfo.work_cmd = data.work_cmd;

                    initManageHTML(jobInfo);
                }
                else {
                    alert(data.msg);
                }
            },
            error: function (data) {
                alert("无法获取职位信息");
            },
            headers: {
                "Access-Control-Allow-Origin":"*"
            }
        });

    }
    $('#cancelForm').attr('href',wefaceBace_site + 'team/position/showPosition.html?t_id='+tId);

    function initManageHTML(jobInfo){
        $("#jobName").attr("value",jobInfo.job_name);

        $("#minSaraly").attr("class","validate valid");
        $("#minSaraly").next('label').attr("class","active");
        $("#minSaraly").attr("value",jobInfo.min_salary);

        $("#maxSaraly").attr("class","validate valid");
        $("#maxSaraly").next('label').attr("class","active");
        $("#maxSaraly").attr("value",jobInfo.max_salary);

        $("#detailAddress").attr("class","validate valid");
        $("#detailAddress").next('label').attr("class","active");
        $("#detailAddress").attr("value",jobInfo.address);

        $("#experience").attr("class","validate valid");
        $("#experience").next('label').attr("class","active");
        $("#experience").attr("value",jobInfo.exp_cmd);

        $("#requirement").attr("class","validate valid");
        $("#requirement").next('label').attr("class","active");
        $("#requirement").attr("value",jobInfo.summary);

        $("#requirementForPosition").next('label').attr("class","active");
        $("#requirementForPosition").html(jobInfo.job_cmd);

        $("#requirementForGetPosition").next('label').attr("class","active");
        $("#requirementForGetPosition").html(jobInfo.work_cmd);

        var jobType = $(".typeClass").children('ul').children();
        var type ="";
        $('#type').val(jobInfo.job_type);
        switch(jobInfo.job_type){
            case 2:$(jobType[1]).attr("class","active selected");type = "产品";break;
            case 3:$(jobType[2]).attr("class","active selected");type = "技术";break;
            case 4:$(jobType[3]).attr("class","active selected");type = "设计";break;
            case 1:$(jobType[4]).attr("class","active selected");type = "行政";break;
            case 9:$(jobType[5]).attr("class","active selected");type = "营销";break;
            case 5:$(jobType[7]).attr("class","active selected");type = "运营";break;
            case 6:$(jobType[8]).attr("class","active selected");type = "运维支持";break;
            case 8:$(jobType[9]).attr("class","active selected");type = "文案策划";break;
            case 7:$(jobType[6]).attr("class","active selected");type = "市场";break;
            default:$(jobType[0]).attr("class","active selected");
        }
        $('.typeClass').children('input').attr("value",type);

        if (jobInfo.pub_state == 1) {
            $('#submit').attr("checked","checked");
        }
        else{
            $('#reserve').attr("checked","checked");
        }

        $('#province').val(jobInfo.prince);
        var province = $(".provinceClass").children('ul').children();
        var provText = "";
        if (jobInfo.prince == 1) {
            $(province[1]).attr("class","active selected");
            provText = "广东省";
        }
        else{
            $(province[2]).attr("class","active selected");
            provText = "其他";
        }
        $('.provinceClass').children('input').attr("value",provText);

        $('#city').val(jobInfo.city);
        var city = $(".cityClass").children('ul').children();
        var cityText = "";
        if (jobInfo.city == 1) {
            $(city[1]).attr("class","active selected");
            cityText = "广州市";
        }
        else{
            $(city[2]).attr("class","active selected");
            cityText = "其他";
        }
        $('.cityClass').children('input').attr("value",cityText);

        $('#region').val(jobInfo.town);
        var region = $(".regionClass").children('ul').children();
        var regionText = "";
        switch(jobInfo.town){
            case 1:$(region[1]).attr("class","active selected");regionText = "番禺区";break;
            case 2:$(region[2]).attr("class","active selected");regionText = "海珠区";break;
            case 3:$(region[3]).attr("class","active selected");regionText = "天河区";break;
            case 4:$(region[4]).attr("class","active selected");regionText = "荔湾区";break;
            case 5:$(region[5]).attr("class","active selected");regionText = "越秀区";break;
            case 6:$(region[6]).attr("class","active selected");regionText = "白云区";break;
            case 7:$(region[7]).attr("class","active selected");regionText = "黄埔区";break;
            case 8:$(region[8]).attr("class","active selected");regionText = "增城区";break;
            case 9:$(region[9]).attr("class","active selected");regionText = "从化区";break;
            case 10:$(region[10]).attr("class","active selected");regionText = "花都区";break;
            case 11:$(region[11]).attr("class","active selected");regionText = "南沙区";break;
            default:$(region[12]).attr("class","active selected");
        }
        $('.regionClass').children('input').attr("value",regionText);

        $('#attr').val(jobInfo.work_type);
        var attribute = $('.attrClass').children('ul').children();
        var attrText = "";
        switch(jobInfo.work_type){
            case 2:$(attribute[1]).attr("class","active selected");attrText = "实习";break;
            case 0:$(attribute[2]).attr("class","active selected");attrText = "全职";break;
            case 1:$(attribute[3]).attr("class","active selected");attrText = "兼职";break;
            default:$(attribute[0]).attr("class","active selected");
        }
        $('.attrClass').children('input').attr("value",attrText);

        $('#manageDiv').css("display","block");
        $("#positionDiv").css("display","none");
    }

    $('#saveForm').click(function(){
        var jobDetail = {
            id:clickedJobId,
            name:$("#jobName").val(),
            j_type:$('#type').val(),
            min_salary: $("#minSaraly").val(),
            max_salary: $("#maxSaraly").val(),
            prince: $('#province').val(),
            city: $('#city').val(),
            town: $('#region').val(),
            exp_cmd: $("#experience").val(),
            w_type: $('#atrr').val(),
            job_cmd:$("#requirementForPosition").val(),
            work_cmd: $("#requirementForGetPosition").val(),
            pub_state: 0,
            team_id:tId
        };
        if ($('#submit').attr("checked")) {
            jobDetail.job_state = 1;
        }
        var a = $.ajax({
            type:'post',
            url:cur_site + 'team/update_job/',
            data:jobDetail,
            dataType:'json',
            success:function(data){
                alert("保存成功");
            },
            headers: {
                "Access-Control-Allow-Origin":"*"
            }
        });
        $('#manageDiv').css("display","none");
        $("#positionDiv").css("display","display");
    });

});