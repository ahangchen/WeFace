
//-----------------------------------------------首页的js代码-----------------------------------------------------

$(function(){
//------------------------------------------------按钮显示-----------------------------------
    $('.preBtn').hover(function(){
        $('.preBtn i').css("visibility","visible");
    },function() {
        $('.preBtn i').css("visibility","hidden");
        $('.preBtn').css("background-color","transparent");

    }).trigger("mouseleave");

    $('.nextBtn').hover(function(){
        $('.nextBtn i').css("visibility","visible");
    },function() {
        $('.nextBtn i').css("visibility","hidden");
        $('.nextBtn').css("background-color","transparent");

    }).trigger("mouseleave");

// －－－－－－－－－－－－－－－banner初始化－－－－－－－－－－－－－－－－－－

    $.getJSON('../data/banners.json',function(data){
        var lis = $(".imgList li img");
        var link = $(".imgList li a");
        for (var i = 0; i < lis.length; i++) {
            var bannerUrl = data.banner[i].bannerImg;
            var imgHref = data.banner[i].bannerUrl;
            // $(lis[i]).attr("src",cur_media + bannerUrl);
            $(lis[i]).attr("src",bannerUrl);
            $(link[i]).attr("href",imgHref);
        }
    });
    var curIndexBanner = 0;
    var imgLen_banner = $(".imgList li").length;
    $(".preBtn").click(function(){
        curIndexBanner = (curIndexBanner > 0) ? (--curIndexBanner) : (imgLen_banner - 1);
        changeTo(curIndexBanner);
    });
    $(".nextBtn").click(function(){

        if (curIndexBanner == imgLen_banner - 1) {
            curIndexBanner = 0;
        }
        else{
            curIndexBanner++;
        }
        changeTo(curIndexBanner);

    });
    function changeTo(num){
        var goLeft = num * 100;
        $(".imgList").animate({left: "-" + goLeft + "%"},500);
    }
    $(".imgList").hover(function() {
        clearInterval(picTimer);
    },function() {
        picTimer = setInterval(function() {
            changeTo(curIndexBanner);
            curIndexBanner++;
            if(curIndexBanner == imgLen_banner) {curIndexBanner = 0;}
        },5000); //此5000代表自动播放的间隔，单位：毫秒
    }).trigger("mouseleave");

// －－－－－－－－－－－－－－－导航的切换－－－－－－－－－－－－－－－－－－－－－－－－－－
    $("#indexBtn").click(function(){
        $("#teamBtn").css("text-decoration","none");
        $(this).css("text-decoration","underline");
        var a = $.ajax({
            type:"get",
            url: "pages/indexForMainPage.html",
            dataType:"html",
            success:function(data){
                $("#indexDiv").html(data);
            }
        })
    });
    $("#teamBtn").click(function(){
        $("#indexBtn").css("text-decoration","none");
        $("#teamBtn").css("text-decoration","underline");

    });
//标签的选择
    var tabs = $('.searchItems div');
    for(var i = 0; i < tabs.length; i++){
        console.log(tabs[i])
        $(tabs[i]).click(function(){
           if($(this).hasClass('selectedChip')){
               $(this).removeClass('selectedChip');
           }else{
               $(this).addClass('selectedChip');
           }
        });
    }
});


   