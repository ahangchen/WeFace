/**
 * Created by jewel on 16/7/20.
 */

$(function(){
    var clickedJobId = "";
    var tagsObj = $(".activeTag a");
    var selectedTags = new Array(10);
    for (var i = 0; i < tagsObj.length; i++) {
        selectedTags[i] = $(tagsObj[i]).html();
    }
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
            $('#entireTag').attr("class","chip normalTag");
            $(this).attr("class","chip activeTag");
            targetObj = $(".activeTag a");
            for (var i = 0; i < targetObj.length; i++) {
                selectedTags[i] = $(targetObj[i]).html();
            }
        }
        removeLastPage();
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
                $('#entireTag').attr("class","chip normalTag");
                $(this).attr("class","chip activeTag");
                targetObj = $(".activeTag a");
                for (var i = 0; i < targetObj.length; i++) {
                    selectedTags[i] = $(targetObj[i]).html();
                }
            }
            removeLastPage();
            init(selectedTags);
        });
    }
    // 初始化职位显示第一页
    function init(tags){
        var tag = {
            'jobTags':tags
        };
        var a = $.ajax({
            type:'post',
            data:tag,
            url:'http://110.64.69.66:8081/team/search_job/',
            dataType:'json',
            success:function(data){
                if (data.err == 0) {
                    pages = Math.ceil(data.jobs.length/10);

                    if (pages == 1) {
                        for (var i = 0; i < data.jobs.length; i++) {
                            var jobId = data.jobs[i].ob_id;
                            var jobName = data.jobs[i].job_name;
                            var jobAddr = data.jobs[i].city;
                            var minMon = data.jobs[i].min_salary;
                            var maxMon = data.jobs[i].max_salary;
                            var jobExp = data.jobs[i].exp;
                            var stateNum = data.jobs[i].job_state;
                            var stateText = "";
                            var state = "";
                            switch(stateNum){
                                case "1":stateText = "已发布";state = "submitted";break;
                                case "0":stateText = "暂存";state = "temperory";break;
                                default:break;
                            }
                            $("#positionCards").append('<div class="positionCard comwidth" id="'+jobId+'"><div class="row"><label class="positionName"><a>'+jobName+'</a><span class = "jAddr">（'+jobAddr+'）</span></label><div class="chip '+state+'">'+stateText+'</div></div><div class="row"><label class="salary">'+minMon+'-'+maxMon+'/月</label><label class="required">'+jobExp+'</label></div><div class="btngroups fr"><a class="btn-floating btn-large waves-effect waves-light white delJobBtn"  ><i class="medium material-icons" >remove</i></a><a class="btn-floating btn-large white editInfoBtn" ><i class="medium material-icons" >mode_edit</i></a></div></div>');
                        }

                    }
                    else{
                        for (var i = 0; i < 10; i++) {
                            var jobId = data.jobs[i].ob_id;
                            var jobName = data.jobs[i].job_name;
                            var jobAddr = data.jobs[i].city;
                            var minMon = data.jobs[i].min_salary;
                            var maxMon = data.jobs[i].max_salary;
                            var jobExp = data.jobs[i].exp;
                            var stateNum = data.jobs[i].job_state;
                            var stateText = "";
                            var state = "";
                            switch(stateNum){
                                case "1":stateText = "已发布";state = "submitted";break;
                                case "0":stateText = "暂存";state = "temperory";break;
                                default:break;
                            }
                            $("#positionCards").append('<div class="positionCard comwidth" id="'+jobId+'"><div class="row"><label class="positionName"><a>'+jobName+'</a><span class = "jAddr">（'+jobAddr+'）</span></label><div class="chip '+state+'">'+stateText+'</div></div><div class="row"><label class="salary">'+minMon+'-'+maxMon+'/月</label><label class="required">'+jobExp+'</label></div><div class="btngroups fr"><a class="btn-floating btn-large waves-effect waves-light white delJobBtn" ><i class="medium material-icons" >remove</i></a><a class="btn-floating btn-large white editInfoBtn" ><i class="medium material-icons" >mode_edit</i></a></div></div>');
                        }
                    }

                    initPages(pages);
                    // 显示编辑职位的页面
                    $('.editInfoBtn').click(function(){
                        var editJobId = $(this).parents('.positionCard').attr('id');
                        clickedJobId = editJobId;

                        showEditPage(editJobId);
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
                else{
                    alert(data.msg);
                }
            },
            headers: {
                "Access-Control-Allow-Origin":"*"
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
            showActivePage(currentPage);
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
        $('#'+jId).remove();
        removeLastPage();
        init(tags);
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
            data: selectedTags,
            url:'http://110.64.69.66:8081/team/search_job/',
            dataType:'json',
            success:function(data){
                var terminal = curPage * 10;
                if (terminal > data.jobs.length) {
                    terminal = data.jobs.length;
                }
                for (var i = (curPage-1)*10; i < terminal; i++) {
                    var jobId = data.jobs[i].ob_id;
                    var jobName = data.jobs[i].job_name;
                    var jobAddr = data.jobs[i].city;
                    var minMon = data.jobs[i].min_salary;
                    var maxMon = data.jobs[i].max_salary;
                    var jobExp = data.jobs[i].exp;
                    var stateNum = data.jobs[i].job_state;
                    var stateText = "";
                    var state = "";
                    switch(stateNum){
                        case "1":stateText = "已发布";state = "submitted";break;
                        case "0":stateText = "暂存";state = "temperory";break;
                        default:break;
                    }
                    $("#positionCards").append('<div class="positionCard comwidth" id="'+id+'"><div class="row"><label class="positionName"><a>'+jobName+'</a><span class = "jAddr">（'+jobAddr+'）</span></label><div class="chip '+state+'">'+stateText+'</div></div><div class="row"><label class="salary">'+minMon+'-'+maxMon+'/月</label><label class="required">'+jobExp+'</label></div><div class="btngroups fr"><a class="btn-floating btn-large waves-effect waves-light white delJobBtn"  ><i class="medium material-icons" >remove</i></a><a class="btn-floating btn-large white editInfoBtn" ><i class="medium material-icons" >mode_edit</i></a></div></div>');
                }

                $('.editInfoBtn').click(function(){
                    var editJobId = $(this).parents('.positionCard').attr('id');
                    clickedJobId = editJobId;
                    showEditPage(editJobId);
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
            },
            headers: {
                "Access-Control-Allow-Origin":"*"
            }
        });
    }

    function showEditPage(eJobId){

        var jobInfo = {
            "job_name": "UI设计",
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
            "work_cmd": ""
        };
        var aj = $.ajax({
            type:"post",
            data: eJobId,
            url:'http://110.64.69.66:8081/team/job_info/',
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
                alert("无法获取团队信息");
            },
            headers: {
                "Access-Control-Allow-Origin":"*"
            }
        });

    }
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

        var jobType = $(".type").children('ul').children();


        switch(jobInfo.job_type){
            case "4":$(jobType[1]).attr("class","active selected");break;
            case "2":$(jobType[2]).attr("class","active selected");break;
            case "3":$(jobType[3]).attr("class","active selected");break;
            case "1":$(jobType[4]).attr("class","active selected");break;
            case "9":$(jobType[5]).attr("class","active selected");break;
            case "6":$(jobType[7]).attr("class","active selected");break;
            case "8":$(jobType[8]).attr("class","active selected");break;
            case "7":$(jobType[9]).attr("class","active selected");break;
            case "5":$(jobType[6]).attr("class","active selected");break;
            default:$(jobType[0]).attr("class","active selected");
        }
        $('.type').children('input').attr("value",jobInfo.job_type);

        if (jobInfo.pub_state == 1) {
            $('#submit').attr("checked","checked");
        }
        else{
            $('#reserve').attr("checked","checked");
        }

        var province = $(".province").children('ul').children();
        if (jobInfo.prince == "广东省") {
            $(province[1]).attr("class","active selected");
        }
        else{
            $(province[2]).attr("class","active selected");
        }
        $('.province').children('input').attr("value",jobInfo.prince);

        var city = $(".city").children('ul').children();
        if (jobInfo.city == "广州市") {
            $(city[1]).attr("class","active selected");
        }
        else{
            $(city[2]).attr("class","active selected");
        }
        $('.city').children('input').attr("value",jobInfo.city);

        var region = $(".region").children('ul').children();
        switch(jobInfo.town){
            case "番禺区":$(region[1]).attr("class","active selected");break;
            case "海珠区":$(region[2]).attr("class","active selected");break;
            case "天河区":$(region[3]).attr("class","active selected");break;
            case "荔湾区":$(region[4]).attr("class","active selected");break;
            case "越秀区":$(region[5]).attr("class","active selected");break;
            case "白云区":$(region[6]).attr("class","active selected");break;
            case "黄埔区":$(region[7]).attr("class","active selected");break;
            case "增城区":$(region[8]).attr("class","active selected");break;
            case "从化区":$(region[9]).attr("class","active selected");break;
            case "花都区":$(region[10]).attr("class","active selected");break;
            case "南沙区":$(region[11]).attr("class","active selected");break;
            default:$(region[12]).attr("class","active selected");
        }
        $('.region').children('input').attr("value",jobInfo.town);

        var attribute = $('.atrr').children('ul').children();
        switch(jobInfo.work_type){
            case "实习":$(attribute[1]).attr("class","active selected");break;
            case "全职":$(attribute[2]).attr("class","active selected");break;
            case "兼职":$(attribute[3]).attr("class","active selected");break;
            default:$(attribute[0]).attr("class","active selected");
        }
        $('.atrr').children('input').attr("value",jobInfo.work_type);

        $('#manageDiv').css("display","block");
        $("#positionDiv").css("display","none");

    }

    $('#saveForm').click(function(){
        var jobDetail = {
            job_id:clickedJobId,
            name:$("#jobName").val(),
            j_type:$('.type').children('input').val(),
            min_salary: $("#minSaraly").val(),
            max_salary: $("#maxSaraly").val(),
            prince: $('.province').children('input').val(),
            city: $('.city').children('input').val(),
            town: $('.region').children('input').val(),
            exp_cmd: $("#experience").val(),
            w_type: $('.atrr').children('input').val(),
            job_cmd:$("#requirementForPosition").val(),
            work_cmd: $("#requirementForGetPosition").val(),
            pub_state: 0
        };
        if ($('#submit').attr("checked")) {
            jobDetail.job_state = 1;
        }
        var a = $.ajax({
            type:'post',
            url:'http://110.64.69.66:8081/team/job_update/',
            data:jobDetail,
            dataType:'json',
            success:function(data){
                alert(data.msg);
            },
            error:function(){
                alert("保存失败");
            },
            headers: {
                "Access-Control-Allow-Origin":"*"
            }
        });
    });

});