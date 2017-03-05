/**
 * Created by jewel on 2016/12/25.
 */
$(function(){
   // 标签的选择
    var chipId = function(chipText){
        switch (chipText){
            case '互联网': return 3;
            case 'O2O': return 2;
            case '金融': return 6;
            case '医疗': return 5;
            case '文化娱乐': return 10;
            case '学生服务': return 1;
            case '社交': return 17;
            case '旅游': return 16;
            case '教育': return 15;
            case '游戏': return 13;
            case '硬件': return 18;
            case '不限': return -1;
        }
    };
    var chips = $('.domainClasses .chip');
    for(var i = 0; i < chips.length; i++){
        if(i === 0){
            $(chips[i]).click(function(){
                for(var j = 1; j < chips.length; j++){
                    $(chips[j]).removeClass('selectedChip');
                }
                $(this).addClass('selectedChip');
                refreshChips(chipId($(this).html()))
            })
        }
        else{
            $(chips[i]).click(function(){
                $(chips[0]).removeClass('selectedChip');
                if($(this).hasClass("selectedChip")){
                    $(this).removeClass("selectedChip");
                }else{
                    $(this).addClass("selectedChip");
                }
                refreshChips(chipId($(this).html()))
            });
        }

    }
    function refreshChips(id){

        $.ajax({
            type:'post',
            url: cur_site + 'team/team/newest',
            data: {b_type: id},
            dataType: "json",
            success: function(data){
                var teamList = $('.teamCards');
                console.log(data);
                for(var i = 0; i < data.res.length; i++){
                    var types = data.res[i].labels;
                    var typeHTML = '';
                    for(var j = 0; j < types.length;j++){
                        typeHTML = typeHTML + '<div class="chip domainType">' + types[j] + '</div>'
                    }
                    $(teamList).append('<div class="teamCard z-depth-2">' +
                        '<div class="teamDetail">'+
                        '<div class="teamImg"></div>'+
                        '<div class="teamInfo">'+
                        '<div class="teamName">' + data.res[i].name + '</div>'+
                        '<div class="teamType">' + data.res[i].teamType + '</div>'+
                        '<div class="teamMember">' + data.res[i].stu_cnt + '个团队成员</div>'+
                        '<div class="teamProject">' + data.res[i].proj_cnt + '个团队项目</div>'+
                        '<div class="teamNeed">' + data.res[i].job_cnt + '个需求职位</div>'+
                        '</div>' +
                        '</div>'+
                        '<div class="slogan">' + data.res[i].slogan + '</div>'+
                        '<div class="domainTypes">' + typeHTML + '</div>'+
                        '</div>')
                }
            },
            error: function(){
                console.log('获取团队列表失败');
            }
        });
    }

});