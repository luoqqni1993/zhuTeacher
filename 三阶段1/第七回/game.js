var dom = document.getElementById("myCan");
var can = dom.getContext("2d");

var cd = {
	x : 50,
	y : 50,//吃豆人的坐标值
	r : 30,//吃豆人的大小
	mLeve : 50,//吃豆人张闭嘴的速度
	leve : 50,//吃豆人嘴巴张闭程度
	state : false,//吃豆人是应该张嘴还是闭嘴
	direction : "right",//吃豆人的方向
	speed : 2,//吃豆人速度
	color : "#F0AD4E"//吃豆人的颜色
};

var dList = [];//豆子数组

createDou(30);//创建豆子

//定义创建豆子函数:参数为豆子个数
function createDou(num){
	for(var i = 0;i < num ; i++){
		var abc = {
			x : 30*i+60,
			y : 50,//豆子坐标
			r : 3,//豆子大小
			color : "#000"//豆子颜色
		}
		
		dList.push(abc);
	}
}


run();//运行主函数

//动画主函数
function run(){
	
	setTimeout(function(){
		//清空画布
		can.clearRect(0,0,dom.width,dom.height);
		runDou();
		runC();
		
		
		if(cd.x > dom.width-cd.r){//当吃豆人跑到最右端的时候
			cd.direction = "left";
		}else if(cd.x < 0+cd.r){//当吃豆人跑到最左端的时候
			cd.direction = "right";
		}
		
		switch(cd.direction){
			case "left"://方向为左
				cd.x = cd.x - cd.speed;
				break;
			case "right"://方向为右
				cd.x = cd.x + cd.speed;
				break;
		}
		
		//判断哪些豆子被吃掉
		for(var i in dList){
			//吃豆人和当前豆子的距离
			var absX = Math.abs(cd.x - dList[i].x); 
			var absY = Math.abs(cd.y - dList[i].y); 
//			当豆子在吃豆人的半径之内的时候,让豆子消失掉
/*
			if(absX == cd.r - 10 && absY < cd.r - 10){
				dList.splice(i,1);
			}
			*/
			
			
			switch (cd.direction){
				case "left"://吃豆人方向为左的时候
					if(cd.x < dList[i].x && absX < cd.r){
						dList.splice(i,1);
					}
					break;
				case "right"://吃豆人方向为右的时候
					if(cd.x > dList[i].x && absX < cd.r){
						dList.splice(i,1);
					}
					break;
				default:
					break;
			}
		}
		
		run();
		
	},1);
}

function runC(){//画吃豆人
	
	can.fillStyle = cd.color;
	
	var mst = null;//上嘴唇的角度
	var mst2 = null;//下嘴唇的角度
	
	switch(cd.direction){
		case "left"://通过方向来判断嘴唇的位置
			mst = cd.leve*(0.25/cd.mLeve)+1;
			mst2 = 2 - cd.leve*(0.25/cd.mLeve) + 1;
			break;
		case "right"://通过方向来判断嘴唇的位置
			mst = cd.leve*(0.25/cd.mLeve);
			mst2 = 2 - cd.leve*(0.25/cd.mLeve);
			break;
	}
	//画吃豆人
	can.moveTo(cd.x,cd.y);
	can.arc(cd.x,cd.y,cd.r,mst*Math.PI,mst2*Math.PI);
	can.lineTo(cd.x,cd.y);
	can.closePath();
	can.fill();
	can.beginPath();
	
	//张嘴闭嘴的过程
	if(cd.state){
		cd.leve ++;
	}else{
		cd.leve --;
	}
	
	//判断什么时候该张嘴,什么时候该闭嘴
	if(cd.leve > cd.mLeve){
		cd.state = false;
	}else if(cd.leve < 0){
		cd.state = true;
	}
}


function runDou(){//画豆函数
	for(var i in dList){
		var dX = dList[i].x;
		var dY = dList[i].y;
		var dR = dList[i].r;
		
		can.fillStyle = dList[i].color;
		can.arc(dX,dY,dR,0,2*Math.PI);
		can.fill();
		can.beginPath();
	}
	
}
//监听键盘事件,通过键盘来控制吃豆人的方向
document.onkeydown = function(e){
	if(e.which == 39){
		cd.direction = "right";
	}else if(e.which == 37){
		cd.direction = "left";
	}
}
