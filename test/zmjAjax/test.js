$(function() {
    $('#check').click(function() {
        var a = $.ajax({
            type: "post",
            url: "test.php",
            dataType: 'html',
            success: function(data) {
                $("#check").html(data);
            }
        });
    });
});