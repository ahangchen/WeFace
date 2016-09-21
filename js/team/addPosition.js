/**
 * Created by jewel on 16/7/21.
 */
$(function(){

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

    // 学生点击职位名字后，主页在url上传职位id
    var tId = getUrlVar('t_id');
    var wefaceBace_site = "http://110.64.69.101:8080/";
    $('#cancelForm').attr('href',wefaceBace_site + 'team/position/showPosition.html?t_id='+tId);
    var teamUrl = cur_site + 'team/info/?tid='+tId;
    var teamId = {
      tid:tId
    };
    var teamName  = "";
    $.ajax({
        type:'post',
        url:teamUrl,
        data:teamId,
        dataType:'json',
        success:function(data){
            teamName = data.res.name;
            $('#firmName').attr('value',teamName);
        },
        error: function (data) {
            alert("找不到该团队");
        },
        headers:{
            "Access-Control-Allow-Origin":"*"
        }
    });

    $("#addJob").click(function(){
        var job_type;
        switch($('.type').children('input').val()){
            case "行政":job_type = 1;break;
            case "技术":job_type = 3;break;
            case "设计":job_type = 4;break;
            case "产品":job_type = 2;break;
            case "运营":job_type = 5;break;
            case "运维支持":job_type = 6;break;
            case "市场":job_type = 7;break;
            case "文案策划":job_type = 8;break;
            case "营销":job_type = 9;break;
            default:;

        }
        var prov,city,town;
        prov = $('#province').val();
        city = $('#city').val();
        town = $('#region').val();
        var workType = $('#atrr').val();

        var jobDetail = {
            name:$("#jobName").val(),
            j_type:job_type,
            min_salary: $("#minSaraly").val(),
            max_salary: $("#maxSaraly").val(),
            prince: prov,
            city: city,
            town: town,
            exp_cmd: $("#experience").val(),
            w_type: workType,
            job_cmd:$("#requirementForPosition").val(),
            work_cmd: $("#requirementForGetPosition").val(),
            pub_state: 0,
            address:$('#detailAddress').val(),
            team_id:tId
        };
        var selectVar = $('input[name="stateGroup"]:checked').val();
        jobDetail.pub_state = selectVar;
        if(jobDetail.name!="" && jobDetail.j_type!="" && jobDetail.prince!="" && jobDetail.city!="" && jobDetail.town!="" && jobDetail.address!="") {

            var a = $.ajax({
                type: 'post',
                url: cur_site + 'team/add_job/',
                data: jobDetail,
                dataType: 'json',
                success: function (data) {

                    alert("新增成功!");
                    window.location = wefaceBace_site + 'team/position/showPosition.html?t_id='+tId;
                },
                error: function (data) {
                    alert("新增失败");
                },
                headers: {
                    "Access-Control-Allow-Origin": "*"
                }
            });

        }
        else {
            alert("请将必填的信息补充完整");
        }

    });

});