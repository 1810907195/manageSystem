//折线图管理js
var model={};
//成功状态常量
var SUCCESS=0;

$(function(){
	var dom = document.getElementById("container1");
	var myChart = echarts.init(dom);
	var app = {};
	option = null;
	option = {
	    title: {
	        text: '动态数据',
	        subtext: '微信、支付宝'
	    },
	    tooltip: {
	        trigger: 'axis',
	        axisPointer: {
	            type: 'cross',
	            label: {
	                backgroundColor: '#283b56'
	            }
	        }
	    },
	    legend: {
	        data:['微信', '支付宝']
	    },
	    toolbox: {
	        show: true,
	        feature: {
	            dataView: {readOnly: false},
	            restore: {},
	            saveAsImage: {}
	        }
	    },
	    dataZoom: {
	        show: false,
	        start: 0,
	        end: 100
	    },
	    xAxis: [
	        {
	            type: 'category',
	            name: '天数',
	            boundaryGap: true,
	            data:["1","2","3","4","5","6","7","8","9","10"]
	        },
	        {
	            type: 'category',
	            boundaryGap: true,
	            data: (function (){
	                var res = [];
	                var len = 10;
	                while (len--) {
	                    res.push(10 - len - 1);
	                }
	                return res;
	            })()
	        }
	    ],
	    yAxis: [
	        {
	            type: 'value',
	            scale: true,
	            name: '次数',
	            max: 30,
	            min: 0,
	            boundaryGap: [0.2, 0.2]
	        },
	        {
	            type: 'value',
	            scale: true,
	            max: 30,
	            min: 0,
	            boundaryGap: [0.2, 0.2]
	        }
	    ],
	    series: [
	        {
	            name:'微信',
	            type:'bar',
	            xAxisIndex: 1,
	            yAxisIndex: 1,
	            data:["0","0","0","0","0","0","0","0","0","0"]
	        },
	        {
	            name:'支付宝',
	            type:'line',
	            data:["0","0","0","0","0","0","0","0","0","0"]
	        }
	    ]
	};

	app.count = 11;
	setInterval(function (){

	    var data0 = option.series[0].data;
	    var data1 = option.series[1].data;
	    data0.shift();
	    data0.push(Math.round(Math.random() * 25));
	    data1.shift();
	    data1.push((Math.random() * 10 + 5).toFixed(1) - 0);

	    var data2=option.xAxis[0].data;
	    //ajax，先取到初始化1到10的数据，加载时跟新
	    var param={data:data2};
	    var url="pages/WechatAndAlipay/findWechatAndAlipayBydays.action";
	    
//	    $.ajax({
//	    	url:url,
//			type : 'POST',
//			data:param,
//			traditional:true,
//			success : function(result) {
//				if(result.state==SUCCESS){
//					$.alert("添加成功");
//				}else{
//					$.alert(result.message);
//				}
//			}
//
//	    });
//	    
	    //	    $.post(url,param,function(result){
//			if(result.state==SUCCESS){
//				//$.alert("添加成功");
//				loadUserInfo_action();
//			}else{
//				$.alert(result.message);
//			}
//		});
	    
		var date = new Date();
		var year = date.getFullYear();
		var month = date.getMonth()+1;
		var d = new Date(year, month, 0);
		
		data2.shift();
		if(app.count>d.getDate()){
			app.count=1;
		}
		console.log("天数数组："+data2);
	    
	    option.xAxis[0].data.push(app.count++);
	    option.xAxis[1].data.shift();
	    option.xAxis[1].data.push(app.count++);

	    myChart.setOption(option);
	}, 2100);
	;
	if (option && typeof option === "object") {
	    myChart.setOption(option, true);
	};
	function mGetDate(year, month){
		var d = new Date(year, month, 0);
		return d.getDate();
	}
	
	
});
