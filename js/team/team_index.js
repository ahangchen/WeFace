       // 实现四个标签页的切换
       $(function() {
           var tabhosts = $(".four a");
           $('.slider').slider({
               full_width: true
           });
           tabhosts.each(function() {
               $($(this).attr("href")).hide();

               if ($(this).hasClass("selected")) {
                   $($(this).attr("href")).show();
                   $(this).parent().css("border-bottom", "5px black solid");
               }

               $(this).click(function(event) {
                   event.preventDefault();

                   if (!$(this).hasClass("selected")) {
                       tabhosts.each(function() {
                           $(this).removeClass("selected");
                           $($(this).attr("href")).hide();
                           $(this).parent().css("border-bottom", "");
                       });

                       $(this).addClass("selected");
                       $($(this).attr("href")).show();
                       $(this).parent().css("border-bottom", "5px black solid");
                   }
               });
           });
           // 开启slider
           $('.slider').slider({
               full_width: true,
               height: 250,
           });
           // 改变箭头图标的颜色
           $("i:contains('play_arrow')").css("color", "rgb(255,147,74)");
           // JSON数据加载
            $.getJSON('../data/team_index.json', function(data) {
                 var logo = data.res.logo_path;
                $("#team_logo").attr('src', logo);
            });
       });