/**
 * Created by jewel on 2016/12/25.
 */
$(function(){
    //广告栏的交互
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

    //广告栏的数据处理以及跳转
    $.getJSON('../data/banners.json',function(data){
        var lis = $(".imgList li img");
        var link = $(".imgList li a");
        for (var i = 0; i < lis.length; i++) {
            var bannerUrl = data.banner[i].bannerImg;
            var imgHref = data.banner[i].bannerUrl;
            console.log(bannerUrl);
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
    //设置不同的下面四个标签的交互
    var tabs = $('.tab');
    var bindTabClick = function(tab,tabIndex){
        $(tab).click(function(){
            changeTab(tabIndex);
            console.log(tabIndex);
        });
    }
    var changeTab = function(tabIndex){
        var selected = $('#selectedTab');
        console.log(tabIndex);
        var left_pos = 30 + tabIndex * 118;
        console.log(left_pos);
        $(selected).css("left",left_pos + "px");
    };
    for(var i = 0; i < tabs.length; i++){
        bindTabClick(tabs[i],i);
    }


});