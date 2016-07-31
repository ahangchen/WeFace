/**
 * Created by cwh on 16-7-30.
 */
//图片轮播；
var my=document.getElementById("show_pic");
var speed=20;
var timer=null;
function move(itar){
    clearInterval(timer);
    if(my.offsetLeft==itar){
        if(itar==-1860){
            my.style.left=itar+1860+'px';
        }
        else{
            my.style.left=itar-1860+'px';
        }
    }
    if(itar==-1860){
        icur=-620;
    }
    else{
        icur=620;
    }
    var aim=my.offsetLeft+icur;
    timer=setInterval(function(){
        if(my.offsetLeft==aim){
            clearInterval(timer);
        }
        else{
            if(itar==-1860){
                my.style.left=my.offsetLeft-speed+'px';
            }
            else{
                my.style.left=my.offsetLeft+speed+'px';
            }
        }
    },30);
}

//运动；
function startMove(obj,aim2,shuxing){
    var timer2=null;
    clearInterval(obj.timer2);
    obj.timer2=setInterval(function(){
        var icur2=0;
        if(shuxing=='opacity'){
            icur2=Math.round(parseFloat(getStyle(obj,shuxing))*100);
        }
        else{
            icur2=parseInt(getStyle(obj,shuxing));
        }
        var speed2=(aim2-icur2)/10;
        speed2=speed2>0?Math.ceil(speed2):Math.floor(speed2);
        //var speed=10;
        if(icur2==aim2){
            clearInterval(obj.timer);
        }
        else{
            if(shuxing=='opacity'){
                obj.style.opacity=(icur2+speed2)/100;
            }
            else{
                obj.style[shuxing]=icur2+speed2+"px";
            }

        }
    },30);
}

function getStyle(obj1,attr){
    if(obj1.currentStyle){
        return obj1.currentStyle[attr];
    }
    else{
        return getComputedStyle(obj1,false)[attr];
    }
}