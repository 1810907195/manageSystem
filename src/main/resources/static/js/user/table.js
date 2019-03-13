//此处是用户加载分页按钮栏的js
var pageModel={};
$(function(){
	var total=49;
	var lineSize=10;
	var Pagenum=49%10;
	$(".pre_page").on('click',btn_pre_page);
	$(".after_page").on('click',btn_after_page);
	pageModel.load_pagenum(Pagenum);
});
function btn_pre_page(){
	console.log("上一页");
};
function btn_after_page(){
	console.log("下一页");
}
pageModel.load_pagenum=function(Pagenum){
	var pre_btn='<li class="paginate_button previous disabled" aria-controls="DataTables_Table_0" tabindex="0" id="DataTables_Table_0_previous">'+
		'<a>上一页</a></li>';
	var after_btn='<li class="paginate_button next" aria-controls="DataTables_Table_0" tabindex="0" id="DataTables_Table_0_next">'+
		'<a>下一页</a></li>';
	var template='<li class="paginate_button" aria-controls="DataTables_Table_0" tabindex="0"><a>'+'[page_num]'+'</a></li>';
	var page_btn=$();
	var ul=$('.page_show_btn').empty();
	if(list){
		this.pagelists=list;
	}
	for(var i=0;i<Pagenum;i++){
		console.log(i);
		if(i=0){
			
		}
		pre_btn+=template.replace('[page_num]',i);
	}
	var li=pre_btn+after_btn;
	li = $(li).data('index',i);
	ul.append(li);
}