
var carBox,carList,loginName=null;

var userAction;

pageInit();


function pageInit(){


	sessionStorage.setItem("loginData","zhuabc");

	//获取购物车列表容器
	carBox = $(".car-box");
	//获取购物车列表模板
	carList = carBox.find("li").clone(false);

	//获取登录信息
	loginName = sessionStorage.getItem("loginData");


	//判断是否登录
	if(!loginName){
		show("您尚未登录,请登录后再试!");
	}else{
		getCarGoods(loginName)
	}

	$(".car-box").on("click",".number-btn",function(){
		//获取当前按钮点击的类型
		var eType = $(this).attr("data-type");
		//获取当前被点击的商品的数量
		var number = $(this).closest("li").find("input").val()*1;
		

		switch(eType){
			case "add"://数量+1
				number ++;
				break;
			case "minus"://数量-1
				number --;
				break;
		}

		//操作当前的商品数量
		$(this).closest("li").find("input").val(number);

		//取消上一次点击将要执行的延迟动作
		clearTimeout(userAction);

		//更新头部的商品总数量以及总价格
		updateCountInfo();

		//延迟执行向服务器发送请求动作,如果是用户快速点击,则发送动作被取消,节约性能
		userAction = setTimeout(function(){

			console.log("发送请求");

			
			//向服务器发送请求,将本地数据更新到服务器当中去
			updatePage();
		},1000);

	});

}


//获取页面当中的li对象,处理成相应的数据,然后调用发送数据请求方法
function updatePage(){
	//获取当前页面当中的所有购物车商品对象
	var list = carBox.find("li");

	list.each(function(){
		//获取商品id
		var goodsID =  $(this).attr("data-goodsID");
		//获取商品数量
		var number = $(this).find("input").val()*1;

		var newObj = {
			userID : loginName,
			goodsID : goodsID,
			number : number
		}

		addShopCar(newObj);

	});
}

//获取购物车页面
function getCarGoods(userName){
	$.ajax({
		url : "http://datainfo.duapp.com/shopdata/getCar.php",
		type : "post",
		data : "userID="+userName,
		dataType : "JSONP",
		success : function(data){
			if(data == 0){
				//购物车为空
			}else{
				addPageData(data);
			}
		}
	});
}

//渲染页面
function addPageData(data){


	carBox.empty();


	for(var i in data){

		var dom = carList.clone(false);

		var imgSrc = data[i].goodsListImg;
		var goodsName = data[i].goodsName;
		var price = data[i].price*1;
		var number = data[i].number*1;

		
		

		dom.find("img").attr("src",imgSrc);
		dom.find(".goods-name").text(goodsName);
		dom.find(".price").find("i").text(price);
		dom.find("input").val(number);
		dom.attr("data-goodsID",data[i].goodsID);

		carBox.append(dom);

	}

	
	
	updateCountInfo();

};

//计算商品总数量以及购物车总价格
function updateCountInfo(){
	var list = carBox.find("li");

	var goodsCount = 0;
	var goodsPriceCount = 0;

	list.each(function(){
		var number = $(this).find("input").val()*1;
		var price = $(this).find(".price").find("i").text()*1;

		goodsCount += number;
		goodsPriceCount += number*price;

	});
	
	goodsPriceCount = goodsPriceCount.toFixed(2);
	$(".car-data-box").find(".number").text(goodsCount);
	$(".car-data-box").find(".count").text(goodsPriceCount);
}


