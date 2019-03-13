var model = {};
var jsCommonCp = 1;        // 当前所在页
var jsCommonLs = 10;        // 每页显示的数据个数
var jsCommonPageSize;      // 总页数
//页面加载的时候执行
$(function(){
	model.getPurchaseHistory();
	$('#doUpdate').on('click',model.doUpate);
});

//分页获取用户的下注记录
model.getPurchaseHistory = function(){
	var url = 'cbhk/order/split.action';
	var parm = {'currentPage':jsCommonCp,'lineSize':jsCommonLs};
	$.post(url,parm,function(obj){
		//console.log(obj);
		$('#phistoryList tr:gt(0)').remove();
		var data = obj.data.allPhisstory;
		for(var x=0;x<data.length;x++){
			var type = data[x].type;
			var username = data[x].username;
			var	periods = data[x].periods ;
			var	buydate= data[x].buydate;
			var	monetary= data[x].monetary;
			var	result= data[x].result;
			var	content= data[x].content;
			var flag = data[x].flag;
			if(!result){
				result = 0;
			}
			model.updatePurchaseHistory(type,periods,buydate,monetary,result,content,data[x].orderid,username,flag);
		}
		model.createSplitBar(obj.data.allRecorders);
	});
}

//将用户的下注记录写到表格中
model.updatePurchaseHistory = function(type,periods,buydate,monetary,result,content,orderid,username,flag){
	var $tr = $('#phistoryList');
	var td = '<tr>'+
        '<td>'+username+'</td>'+
        '<td>'+periods+'</td>'+
        '<td>'+buydate+'</td>'+
        '<td>'+monetary+'</td>'+
        '<td>'+result+'</td>'+
        '<td>'+content+'</td>'+
        '<td><button type="button" class="btn btn-sm btn-primary" data-toggle="modal" data-target="#userInfo" id="'+orderid+'">修改</button></td>'+
    '</tr>';
	$tr.append($(td));
	
	//给每一个操作按钮绑定一个点击事件，并且填充模态窗口的数据
	$('#'+orderid).on('click',function(){
		var $flag = $('#flag');
		$flag.empty();
		var li = '';
		$('#username').val(username);
		$('#orderid').val(orderid);
		$('#periods').val(periods);
		$('#buydate').val(buydate);
		$('#monetary').val(monetary);
		$('#result').val(result);
		$('#content').val(content);
		if(flag==0){
			li = '<option value="'+flag+'" selected>不重新计算</option>'+
			'<option value="'+1+'">重新计算</option>';
		}else{
			li = '<option value="'+flag+'" selected>重新计算</option>'+
			'<option value="'+0+'">不重新计算</option>';
		}
		$flag.append($(li));
	});
}

/**
 * 更改用户下注信息
 */
model.doUpate = function(){
	var url = 'cbhk/order/updatebuyrecord.action';
	 var label = $('#orderid').val();
	 var input = $('#content').val();
	 var flag = $('#flag').val();
	 var result = $('#result').val();
	 var username = $('#username').val();
	 var parm={'orderid':label,'content':input,'flag':flag,'username':username,'result':result};
	$.post(url,parm,function(obj){
		console.log(obj);
		if(obj.data==true){
			$("#userInfo").modal("hide");
			$.alert("修改成功");
			model.getPurchaseHistory();
			//window.location.reload(true);
		}else{
			$.alert("修改失败！");
		}
	});
}

/**
 * 分页相关
 * @param allRecorders
 */
model.createSplitBar = function (allRecorders) {    // 专门用于创建分页的操作
    model.clearBar();    // 清空全部的内容
    model.calcPageSize(allRecorders);    // 计算总页数
    if (jsCommonPageSize > 1) { // 有很多页
        model.previousPage() ;
        model.addBar(1) ;
    }
    var seed = 3 ;  // 设置一个分页种子数
    if (jsCommonCp > seed * 2) {    // 页码很大
        model.addDetailPage() ;   // 增加省略页
        var startPage = jsCommonCp - seed ;
        for (var x = startPage ; x <= jsCommonCp + seed ; x ++) {
            if (x < jsCommonPageSize) {
                model.addBar(x) ;
            }
        }
        if (jsCommonCp + seed * 2 < jsCommonPageSize) {
            addDetailPage() ;
        }
    } else {
        for (var x = 2 ; x <= jsCommonCp + seed ; x ++) {
            if (x < jsCommonPageSize) {
                model.addBar(x) ;
            }
        }
        if (jsCommonCp + seed <= jsCommonPageSize) {
            model.addDetailPage() ;
        }
    }

    model.addBar(jsCommonPageSize) ;
    if (jsCommonPageSize > 1) {
        model.nextPage() ;
    }
}
model.addDetailPage = function () {
    var liObj = $("<li><span>...</span></li>") ;
    $("#pagecontrol").append(liObj) ;
}
model.previousPage =function () {   // 上一页按钮
    var liObj = $("<li></li>");    // 定义li元素
    var aObj = $("<a style='cursor:pointer;'>上一页</a>");
    if (jsCommonCp == 1) {  // 已经是第一页了
        liObj.addClass("disabled") ;
    } else {
        aObj.on("click",function(){
            if (jsCommonCp > 1) {   // 可以有上一页
                jsCommonCp -- ;
                model.getPurchaseHistory();
            }
        })
    }
    liObj.append(aObj) ;
    $("#pagecontrol").append(liObj) ;
}
model.nextPage =function () {   // 下一页按钮
    var liObj = $("<li></li>");    // 定义li元素
    var aObj = $("<a style='cursor:pointer;'>下一页</a>");
    if (jsCommonCp == jsCommonPageSize) {  // 已经是总页数
        liObj.addClass("disabled") ;
    } else {
        aObj.on("click",function(){
            if (jsCommonCp < jsCommonPageSize) {   // 可以有下一页
                jsCommonCp ++ ;
                model.getPurchaseHistory();
            }
        })
    }
    liObj.append(aObj) ;
    $("#pagecontrol").append(liObj) ;
}
model.clearBar =function () {   // 清空已有的内容
    $("#pagecontrol li").remove();
}
model.addBar = function (index) { // 专门生成分页控制代码
    var liObj = $("<li></li>");    // 定义li元素
    var aObj = $("<a style='cursor:pointer;'>" + index + "</a>");
    if (jsCommonCp == index) {  // 为当前所在页
        liObj.addClass("active") ;
    } else {
        aObj.on("click",function(){
            jsCommonCp = index ;
            model.getPurchaseHistory();
        })
    }
    liObj.append(aObj) ;
    $("#pagecontrol").append(liObj) ;
}
model.calcPageSize = function (allRecorders) {   // 计算总页数
	//console.log(allRecorders);
    if (allRecorders == 0) {    // 没有数据
        jsCommonPageSize = 1;  // 就在第1页上显示
    } else {    // 避免小数点问题
        jsCommonPageSize = parseInt((allRecorders + jsCommonLs - 1) / jsCommonLs);
    }
}