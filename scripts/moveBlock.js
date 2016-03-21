var clicked_X, clicked_Y;
var difX, difY; // difference between moment of mousedown and element
var cursorX, cursorY;
var postData;
elem = null;
swapElem = null;

var changeTooltip = function(element){
	var title = element.text() + ' - position: ' + element.data('pos'); 
	element.attr('data-original-title', title);
}
var showBlocks = function(){
	$.ajax({
		url: 'server/loadData.php',
		cache: false,
		beforeSend: function() { $('#block').html('Please wait...'); },
		success: function(html) { $('#block').html(html); init();}
	});
}

var positionOfElement = function(){
	var elements = $('.block50');
	postData = [elements.length];
	for (var i=0; i < elements.length; i++){
		postData[i] = $(elements[i]).data('pos') + $(elements[i]).text();
		//console.log(postData[i]);
	}
	return postData;
};

onmousemove = function(e){
	cursorY = e.pageX;
	cursorX = e.pageY;
	var mousePressed = $("#block").data('val');
	if (mousePressed == "true"){
		elem.offset({top: cursorX - difX, left: cursorY - difY});
		//console.log(elem.offset().left);
	}
}
onmouseup = function(){	
	$("#block").data('val', 'false');
	elem.css('z-index', 0);
	if (elem != null){	
		var tmp = elem.data('pos');
		elem.offset({top: swapElem.offset().top, left: 	swapElem.offset().left});
		swapElem.offset({top: clicked_X, left: clicked_Y});
		//console.log(elem.data('pos'));
		elem.data('pos', swapElem.data('pos'));
		//console.log(elem.data('pos'));
		swapElem.data('pos', tmp);
		changeTooltip(elem);
		changeTooltip(swapElem);
		elem = null;
		swapElem = null;
	}
	positionOfElement();
	//for (var i = 0; i < postData.length; i++){
	//	console.log('before: ' +postData[i]);
	//}
	postData.sort();
	//for (var i = 0; i < postData.length; i++){
	//	console.log('after: ' +postData[i]);
	//}
	$.ajax({
        type: 'POST',
        //dataType: 'html',
        url: 'server/server.php',
        data: {i: postData}
    }).done(function () {
        console.log('ajax-done');           
    }).fail(function () {
        console.log('ajax-fail');
    })
}
var onBlockClick = function(){
	elem = $(this);
	clicked_Y = elem.offset().left;
	clicked_X = elem.offset().top;
	difX = cursorX - clicked_X;
	difY = cursorY - clicked_Y;
	//console.log(clicked_X + " "+ clicked_Y);
	$("#block").data('val', 'true');
	//console.log(elem.data('move'))
	elem.css('z-index', -1);
	//console.log($("#block").data('val'));
	
};
var move = function(){
	swapElem = $(this);
	//console.log(this);
}
var init = function(){
	$(".block50").on("mousedown", onBlockClick);
	$(".block50").on("mouseover", move);
	$(".block50").on("mouseout", function(){swapElem = elem});
	$('[data-toggle="tooltip"]').tooltip(); 
};
$(function(){
	showBlocks();
	init();	
});
$(window).resize(function(){
	location.reload();
});
