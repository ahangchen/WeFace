// $.post('http://110.64.69.101:8081/team/product/search/', {'team_id': 1}, function(data) {
// 	if(data.err==0){
// 		var projectNameArr = $('.projectName');
// 		var projectImgArr = $(".projectImg");
// 		var projectIntroductionArr = $(".projectIntroduction");
// 		for (var i = 0; i < projectNameArr.length; i++) {
// 			$(projectNameArr[i]).html(data.msg[i].name + '<i class="material-icons small">play_arrow</i>')
// 		};
// 	}
// },'JSON');
  // 获取url中的参数
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

var tid = getUrlVar('tid');
console.log(tid);
$.ajax({
	url: cur_site + 'team/product/search/',
	type: 'POST',
	dataType: 'json',
	data: {"teamId": tid},
})
.done(function(data) {
	console.log(data);
	if(data.err==0){
                            for (var i = 0; i < data.msg.length; i++) {
                                var Team_project_div = $("#Team_project_div");
                                Team_project_div.append("<div class='Team_project_list clearfix'>"+
                                    "<div class='project-content'>"
                                    +"<div class='projectName'><a href=''>"+data.msg[i].name+"<i class='material-icons small orange-text'>play_arrow</i></a>"
                                    +"</div>"
                                    +"<div class='projectIntroduction'>"+data.msg[i].content+"</div>"
                                    +"</div>"
                                    +"<div class='projectImgDiv'><img src=' "+data.msg[i].img_path + " 'alt='项目图片' class='projectImg'></div>"
                                    +"</div>");

                            };
		// var projectNameArr = $('.projectName');
		// var projectImgArr = $(".projectImg");
		// var projectIntroductionArr = $(".projectIntroduction");
		// for (var i = 0; i < projectNameArr.length; i++) {
		// 	$(projectNameArr[i]).html(data.msg[i].name + '<i class="material-icons small">play_arrow</i>')
	// 	};
	}
})

