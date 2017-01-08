var canvas = document.getElementById("stu-canvas");
var ctx = canvas.getContext('2d');

ctx.beginPath();
ctx.fillStyle="#aaa";
ctx.arc(130, 130, 70, 0 ,Math.PI*2,false);
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.fillStyle="#ff4444";
ctx.arc(130, 130, 60, 0 ,Math.PI*2,false);
ctx.fill();
ctx.closePath();