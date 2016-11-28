$("#reg-btn").click(function(){
	var ajaxData = {
		status : "register",
		userID : $("#userName").val(),
		password : $("#password").val()
	}


	if(!ajaxData.userID){
		alert("请输入账户名");
	}else if(!ajaxData.password){
		alert("请输入密码!");
	}else{
		$.ajax({
			url : "http://datainfo.duapp.com/shopdata/userinfo.php",
			type : "post",
			data : ajaxData,
			success : function(data){
				console.log(data);
				console.log(typeof data);

				switch(data){
					case "0":
						show("用户名重名,请修改用户名!");
						break;
					case "1":
						show("恭喜,注册成功");
						break;
					case "2":
						show("sorry!服务器出错,请联系管理员!");
						break;
				}
			}
		});
	}

});

$("#userName").change(function(){
	$.ajax({
			url : "http://datainfo.duapp.com/shopdata/userinfo.php",
			type : "post",
			data : {status : "login",userID:$("#userName").val(),password:""},
			success : function(data){
				if(data == 0){
					$("#userName").css("border","1px solid #11d32d");
				}else{
					$("#userName").css("border","1px solid #a90506");
					$(".user-name").text("该用户名已存在,请重新输入!");
				}
			}
		});
});

$("#password2").change(function(){
	var pw2 = $(this).val();
	var pw = $("#password").val();
	if(!pw){
		$("#password").css("border","1px solid #a90506");
		$(".password").text("请输入密码");
	}else if(pw2 != pw){
		$("#password2").css("border","1px solid #a90506");
		$(".password2").text("两次密码不符,请重新输入");
	}else{
		$("#password").css("border","1px solid #11d32d");
		$("#password2").css("border","1px solid #11d32d");
		$(".password").empty();
		$(".password2").empty();
	}
});

