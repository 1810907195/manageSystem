var model = {}
var SUCCESS = 0;
$(function(){
	loadData();
});

/**
 * 分页查询开奖结果信息
 */
function loadData(){
	jsCommonLs = parseInt($('#splitSelect').val());
	var url = 'result/get/findBySplit.action';
	var parm = {'currentPage':jsCommonCp,'lineSize':jsCommonLs};
	$.post(url,parm,function(obj){
		$("#result_list tr:gt(0)").remove();
		//console.log(obj);
		if(obj.state==SUCCESS){
			var data = obj.data.allResult;
			for(var x = 0;x<data.length;x++){
				var flag = data[x].flag;
				var macode1 = data[x].macode1;
				var macode2 = data[x].macode2; 
				var macode3 = data[x].macode3; 
				var macode4 = data[x].macode4; 
				var macode5 = data[x].macode5; 
				var macode6 = data[x].macode6; 
				var macode7 = data[x].macode7; 
				var number = data[x].number;
				addRow(flag,number,macode1,macode2,macode3,macode4,macode5,macode6,macode7);
			}
			createSplitBar(obj.data.allRecorders);
			initSelectOnListener();
		}
	});
	
}
function addRow(flag,number,macode1,macode2,macode3,macode4,macode5,macode6,macode7){
	if(!macode1) {
		macode1 = 0;
	}else{
		macode1 = macode1.tid;
	}
	if(!macode2){
		macode2 = 0;
	}else{
		macode2 = macode2.tid;
	}
	if(!macode3){
		macode3 = 0;
	}else{
		macode3 = macode3.tid;
	}
	if(!macode4){
		macode4 = 0;
	}else{
		macode4 = macode4.tid;
	}
	if(!macode5){
		macode5 = 0;
	}else{
		macode5 = macode5.tid;
	}
	if(!macode6){
		macode6 = 0;
	}else{
		macode6 = macode6.tid;
	}
	if(!macode7){
		macode7 = 0;
	}else{
		macode7 = macode7.tid;
	}
	if(flag==0){
		flag = "否";
	}else{
		flag = "是";
	}
	var $table = $('#result_list');
	var tr = '<tr>'+
				 '<td>'+number+'</td>'+
		         '<td>'+macode1+'</td>'+
		         '<td>'+macode2+'</td>'+
		         '<td>'+macode3+'</td>'+
		         '<td>'+macode4+'</td>'+
		         '<td>'+macode5+'</td>'+
		         '<td>'+macode6+'</td>'+
		         '<td>'+macode7+'</td>'+
		         '<td>'+flag+'</td>'+
		         '<td><button type="button" class="btn btn-sm btn-primary" data-toggle="modal" data-target="#resultInfo" id="'+number+'">修改</button></td>'+
	         '</tr>';
	$table.append($(tr));
	var li = '';
	if(flag=='否'){
		li = '<option value="'+0+'" selected>不重新计算</option>'+
		'<option value="'+1+'">重新计算</option>';
	}else{
		li = '<option value="'+1+'" selected>重新计算</option>'+
		'<option value="'+0+'">不重新计算</option>';
	}
	$('#'+number).on('click',function(){
		$('#flag').empty();
		$('#number').val(number);
		$('#flag').append($(li));
		$('#macode1').val(macode1);
		$('#macode2').val(macode2);
		$('#macode3').val(macode3);
		$('#macode4').val(macode4);
		$('#macode5').val(macode5);
		$('#macode6').val(macode6);
		$('#macode7').val(macode7);
	});
}
function initSelectOnListener(){
	$('#splitSelect').each(function(){
		$(this).on('change',function(){
			jsCommonLs = parseInt($(this).val());
			loadData();
		});
	});
}