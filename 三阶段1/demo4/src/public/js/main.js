function show(text){
	var panel = $("<div class='prompt-panel'>"+text+"</div>");
	var times = 3000;

	if(!!arguments[1]){
		times = arguments[1];
	}

	$("body").append(panel);
	setTimeout(function(){
		panel.addClass("show");
	},1);

	setTimeout(function(){
		panel.removeClass("show");
		setTimeout(function(){
			panel.remove();
		},750);
	},times);
}