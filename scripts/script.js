const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 1024;
canvas.height = 564;

ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);
////////////////////////////////////////////////



ctx.fillStyle = "white";
ctx.fillRect(canvas.width / 2,canvas.height / 2,200,50);
