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
          // 团队logo路径加载
           var logo = data.res.logo_path;
           $("#team_logo").attr('src', logo);
           // 团队标签加载
           var tag = $(".tag");
           for (var i = 0; i < tag.length; i++) {
             $(tag[i]).html(data.res.label[i]);
           };
           // 团队名称加载
           $("#p1").html(data.res.name);
           // 团队简介加载
           $("#p2").html(data.res.about);
           // 团队标语加载
           $("#p3").html(data.res.slogan);
           // 团队介绍加载
           $("#team_introuduction").html(data.res.introuduction);
           // 团队发展历程加载
           $("#history_text").html(data.res.history);
           // 团队成员头像加载
           var Head_portrait = $(".Head_portrait");
           for (var i = 0; i < Head_portrait.length; i++) {
             $(Head_portrait[i]).attr('src', data.res.stus[i].logo_path);
           } 
           // 团队图片加载
           var piture = $(".piture");
           for (var i = 0; i < piture.length; i++) {
             $(piture[i]).attr('src', data.res.imgs[i]);
           };
         });
       });
       