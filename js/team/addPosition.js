/**
 * Created by jewel on 16/7/21.
 */
$(function(){
    $("#addJob").click(function(){

        var jobDetail = {
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