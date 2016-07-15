$(function() {
	$('#login-conf').click(function() {
		var flag = false;
		var account = document.getElementById("account").value;
		var pwd = document.getElementById("pwd").value;
		var data = {
			"account": account,
			"pwd": pwd
		};
		$.ajax({
			type: 'POST',
			data: data,
			url: '../../data/login.json',
			dataType: 'json',
			success: function(data) {
				var err = data.err;
				if (err == 0) {
					flag = true;
				}
				if (err == -1) {
					document.getElementById('account-warn').innerHTML = "请求方法错误";
				}
				if (err == -3) {
					document.getElementById('account-warn').innerHTML = "账号不存在";
				}
				if (err == -4) {
					document.getElementById('pwd-warn').innerHTML = "密码错误";
				}
				if (err == -5) {
					document.getElementById('account-warn').innerHTML = "账号未激活";
				}
				if (flag == true) {
					window.location.href = "../studentLogin.html"
				}
			}
		});
	});
})