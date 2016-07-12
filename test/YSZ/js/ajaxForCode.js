$(function(){
	$("#codeNum").click(function(){
		var a = $.ajax({
            type: "post",
            url: "code.json",
            dataType: 'json',
            success: function(data) {
            	var code=data.lon.toString().split(".")[1];
                $("#codeNum").html(code);
            }
        });
	});
});