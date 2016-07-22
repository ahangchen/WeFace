/**
 * Created by jewel on 16/7/21.
 */
$(function(){
    $("#addJob").click(function(){
        var job_type;
        switch($('.type').children('input').val()){
            case "行政":job_type = 1;break;
            case "技术":job_type = 2;break;
            case "设计":job_type = 3;break;
            case "产品":job_type = 4;break;
            case "运营":job_type = 5;break;
            case "运维支持":job_type = 6;break;
            case "市场":job_type = 7;break;
            case "文案策划":job_type = 8;break;
            case "营销":job_type = 9;break;
            default:;

        }

        var jobDetail = {
            name:$("#jobName").val(),
            j_type:job_type,
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
            url:'http://110.64.69.66:8081/team/add_job/',
            data:jobDetail,
            dataType:'application/json',
            success:function(data){
                alert(data.message);
                if (data.err == 0) {
                    alert("你创建了id为"+data.msg+"的职位");
                }
            },
            error:function(data){
                alert("新建失败");
            },
            headers: {
                "Access-Control-Allow-Origin":"*"
            }
        });
    })
});