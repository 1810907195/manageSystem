//定义一些监听事件
$(function(){
	//select监听事件
	selectListener_action();
});
function selectListener_action(){
	//通过Id监听Select的子元素
	$('#splitSelect').each(function(){
		//给每个子元素设置一个监听，当发生改变的时候触发
		$(this).on('change',function(){
			jsCommonLs = parseInt($(this).val());
			loadUserInfo_action();
		});
	});

};