$(function() {
	var choice = "学生";
	var flag = false;
	$('html').click(function() {
		$('#choice').css('display', 'none');
	}); //全局点击下拉框收回
	$('.actor-choice').click(function() {
		choice = $(this).attr('name');
		document.getElementById("actor-show").innerHTML = choice;
	}); //获取选择的选项
	$('#actor-show').click(function() {
		$('#choice').css('display', 'block');
		event.stopPropagation();
	}); //展示下拉框
	$('#actor-cancel').click(function() {
		$('.main').css('display', 'none');
	}); //取消函数
	$('#actor-next').click(function() {
		$('.choice-form').css('display', 'none');
		$('.regi-form').css('display', 'block');
		if (choice == "学生") {
			$('.regi-group').css('display', 'none');
		}
	}); //选择完角色进入注册页面
	$('#pwd-conf').keyup(function() {
		var pwd = document.getElementById('pwd').value;
		var pwdconf = document.getElementById('pwd-conf').value;
		if (pwd != pwdconf) {
			document.getElementById('pwd-info').innerHTML = "不一致";
		}
		if (pwd == pwdconf) {
			document.getElementById('pwd-info').innerHTML = "一致";
		}
		if (pwd == "" && pwdconf == "") {
			document.getElementById('pwd-info').innerHTML = "";
		}
	}); //密码判断；
	$('#regi-conf').click(function() {
		var account = document.getElementById('account').value;
		var pwd = document.getElementById('pwd').value;
		var code = 0;
		var data = {
			"account": account,
			"pwd": pwd,
			"code": code
		};
		$.ajax({
			type: 'POST',
			data: data,
			url: '../../data/register.json',
			dataType: 'json',
			success: function(data) {
				var err = data.err;
				if (err == 0) {
					flag = true;
				}
				if (err == -2) {
					document.getElementById('account-warn').innerHTML = "验证码错误";
				}
				if (err == -3) {
					document.getElementById('account-warn').innerHTML = "账号已经存在";
				}
				if (err == -1) {
					document.getElementById('account-warn').innerHTML = "请求方法错误";
				}
				if (flag == true) {
					$('.regi-form').css('display', 'none');
					$('.success-form').css('display', 'block'); //注册成功界面显示
					var a = 5;

					function timeleft() {
						a = a - 1;
						if (a == 0) {
							window.location.href = "../index.html"
						}
						document.getElementById('time').innerHTML = a;
					}
					setInterval(timeleft, 1000);
				}
			}
		});

	}); //ajax注册判断

	/*$('.success-back').click(function() {
		$('.success-form').css('display', 'none');
		$('.end-form').css('display', 'block');
	}); //注册成功返回主页*/
})