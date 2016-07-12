$(function() {
    $('#check').click(function() {
        var a = $.ajax({
            type: "get",
            url: "check.json",
            dataType: 'json',
            success: function(data) {
                var cc=data.lon.toString().split(".")[1];
                $("#check").html(cc);
            }
        });
    });
});