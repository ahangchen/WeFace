
//-----------------------------------------------首页的js代码-----------------------------------------------------
page_site = "http://wemeet.tech:8080/";
function getUrlVars() {

    let vars = [], hash;
    let hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (let i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

// 得到指定参数的value
function getUrlVar(name) {
    return getUrlVars()[name];
}

$(function(){
    getStorage();
//    载入页面后，开始给超链接赋值
//    ???疑问：是否需要判断是以什么身份来到的首页？
        if(token){
        if(role === "student") {
            $('.findTeamBtn').attr('href', `${page_site}team/teamPlayGround.html?token=${token}&stu_id=${login_id}`)
            $('.showYourselfBtn').attr('href', `${page_site}stu/index.html?token=${token}&stu_id=${login_id}`)
            $('.findPersonBtn').attr('href', `${page_site}stu/stuPlayground.html?token=${token}&stu_id=${login_id}`)
        }
        if(role === "team"){
            $('.findTeamBtn').attr('href', `${page_site}team/teamPlayGround.html?token=${token}&tid=${login_id}`)
            $('.showYourselfBtn').attr('href', `${page_site}team/index.html?token=${token}&tid=${login_id}`)
            $('.findPersonBtn').attr('href', `${page_site}stu/stuPlayground.html?token=${token}&tid=${login_id}`)
        }
    }

//--------------------------------------登录状态--------------------------------------------
var loginBar = $("<a class='mainBtn' href='role/login.html'>登录</a><span class='line' target='_self'>|</span><a class='mainBtn' href='role/register.html' target='_self'>注册</a>");
if (token) {
    var welcome = $("<a id='welcome' class='mainBtn' target='_blank'></a><span class='line'>|</span><a id='exit' class='mainBtn' href=''>退出</a>");
    $("#loginBar").html(welcome);
    $("#exit").click(function(){
        $("#loginBar").html(loginBar);
        storage.removeItem("token");
        storage.removeItem("login_id");
    })
    if (stu_id) {         
        $("#welcome").text("你好，xxx 学生");
        $("#welcome").attr("href", "../stu/index.html?stu_id="+stu_id);
    }
    if (tid) {
        $("#welcome").text("你好，xxx 团队");
        $("#welcome").attr("href", "../team/team_index.html?tid="+tid);
    }
}
else {
    $("#loginBar").html(loginBar);
}

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
