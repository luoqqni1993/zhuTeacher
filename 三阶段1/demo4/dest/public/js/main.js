function show(o){var e=$("<div class='prompt-panel'>"+o+"</div>"),s=3e3;arguments[1]&&(s=arguments[1]),$("body").append(e),setTimeout(function(){e.addClass("show")},1),setTimeout(function(){e.removeClass("show"),setTimeout(function(){e.remove()},750)},s)}