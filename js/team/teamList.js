/**
 * Created by jewel on 2016/12/25.
 */
$(function(){
   // 标签的选择
    var chips = $('.domainClasses .chip')
    for(var i = 0; i < chips.length; i++){
        if(i === 0){
            $(chips[i]).click(function(){
                for(var j = 1; j < chips.length; j++){
                    $(chips[j]).removeClass('selectedChip');
                }
                $(this).addClass('selectedChip');
            })
        }
        else{
            $(chips[i]).click(function(){
                $(chips[0]).removeClass('selectedChip')
                if($(this).hasClass("selectedChip")){
                    $(this).removeClass("selectedChip");
                }else{
                    $(this).addClass("selectedChip");
                }
            });
        }
    }
    $.ajax({
       type:'get',
       url:'../data/teamList.json',
       dataType: "json",
       success: function(data){
           var teamList = $('.teamCards');
           console.log(data);
           for(var i = 0; i < data.list.length; i++){
               var types = data.list[i].domainType;
               var typeHTML = '';
               for(var j = 0; j < types.length;j++){
                   typeHTML = typeHTML + '<div class="chip domainType">' + types[j] + '</div>'
               }
                $(teamList).append('<div class="teamCard z-depth-2">' +
                                        '<div class="teamDetail">'+
                                            '<div class="teamImg"></div>'+
                                            '<div class="teamInfo">'+
                                            '<div class="teamName">' + data.list[i].name + '</div>'+
                                            '<div class="teamType">' + data.list[i].teamType + '</div>'+
                                           '<div class="teamMember">' + data.list[i].memnum + '个团队成员</div>'+
                                           '<div class="teamProject">' + data.list[i].pronum + '个团队项目</div>'+
                                           '<div class="teamNeed">' + data.list[i].needNum + '个需求职位</div>'+
                                            '</div>' +
                                           '</div>'+
                                        '<div class="slogan">' + data.list[i].slogan + '</div>'+
                                        '<div class="domainTypes">' + typeHTML + '</div>'+
                                    '</div>')
           }
       },
       error: function(){
            console.log('获取团队列表失败');
       }
   })
});