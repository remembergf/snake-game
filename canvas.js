window.onload = function ()
{
	//获取对canvas元素上下文的引用
	var drawing = document.getElementById("drawing");
	var context = drawing.getContext("2d");
	//在画布上获取对背景的引用
	var bgReady = false;  //布尔值用于确保何时可以正确的引用图片
	var bgImage = new Image();
	bgImage.onload = function () //图片的加载是异步加载
	{
		bgReady = true;
	};
	bgImage.src = "image/bg.png";
	//在画布上获取对英雄的引用
	var heroReady = false;
	var heroImage = new Image();
	heroImage.onload = function ()
	{
		heroReady = true;
	};
	heroImage.src = "image/hero.png";
	//在画布上获取对怪兽的引用
	var monsterReady = false;
	var monsterImage = new Image();
	monsterImage.onload = function ()
	{
		monsterReady = true;
	};
	monsterImage.src = "image/monster.png";

	//初始化游戏对象(英雄和怪兽的画布坐标)
	var hero = {
		speed : 256,
		x : 0,
		y : 0
	};
	var monster = {
		x : 0,
		y : 0
	};
	var score = 0;

	//当游戏失败或者得分后重置网页
	var reset = function ()
	{
		
		hero.x = drawing.width/2;
		hero.y = drawing.height/2;
		over = false;
	    monster.x = 32 + Math.floor((Math.random() * (drawing.width - 64)));
		monster.y = 32 + Math.floor((Math.random() * (drawing.height - 64)));
	};

	//采用键盘事件的监听,保持稍后存储用户输入
	var keyDown = {};
	addEventListener("keydown", function(e){
		keyDown[e.keyCode] = true;
	},false);

	addEventListener("keyup", function(e){
		delete keyDown[e.keyCode];
	},false);

	//Dom操作实现英雄和怪兽碰撞加分
	var update = function (modifier)
	{
		if(38 in keyDown)
		{
			hero.y -= hero.speed * modifier;
		}
		if (40 in keyDown) 
		{ 
			hero.y += hero.speed * modifier;
		}
		if (37 in keyDown) 
		{ 
			hero.x -= hero.speed * modifier;
		}
		if (39 in keyDown) 
		{ 
			hero.x += hero.speed * modifier;
		}

		if(
			hero.x <= (monster.x + 32) && 
			hero.y <= (monster.y + 32)  && 
			monster.x <= (hero.x + 32)  && 
			monster.y <= (hero.y + 32)  
		  )
		{
			score = score + 1;
			reset();
		}
	};

	//设置当英雄碰撞到画布上的边界时,游戏结束或者重置游戏
	var over = false;
	var gameOver = function ()
	{
		if(
			hero.x <= 0 ||
			hero.x >= drawing.width ||
			hero.y <= 0 ||
			hero.y >=drawing.height
		  )
		{
			over = true;
			score = 0;
			alert("很遗憾，你不小心结束了比赛！");
			reset();
		}
	};

	//绘制图像(英雄、怪兽、背景、分数)
	var render = function ()
	{
		if(bgReady)
		{
			 context.drawImage(bgImage,0,0);
		}
		if(heroReady)
		{
			context.drawImage(heroImage,hero.x,hero.y);
		}
		if(monsterReady)
		{
			context.drawImage(monsterImage,monster.x,monster.y);
		}
		context.fillStyle = "#fff";
		context.font = "24px Helvetica";
		context.textAlign = "left";
		context.textBaseline = "top";
		context.fillText("你的得分: " + score, 32,32);
	};

	//主函数的实现
	var main = function () {  
	    var now = Date.now();  
	    var delta = now - then;  
	    update(delta / 1000);     
	    gameOver();  
	    render();  
	    then = now;  
	    if(over == false){  
	       requestAnimationFrame(main);        
	    }  
	};  
	  
	var w = window;
    requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

	var then = Date.now();  
	main();
};