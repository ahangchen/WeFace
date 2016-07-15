$(function() {
	var account = document.getElementById("email").value;
	$('#conf').click(function() {
		var data = {
			"account": account
		};
		$.ajax({
			type: 'POST',
			data: data,
			url: '../../data/find.json',
			dataType: 'json',
			success: function(data) {
				var err = data.err;
				if (err == 0) {
					$('#mail-check').css('display', 'none');
					$('#mail-conf').css('display', 'block');
				}

			}
		})
	})
})