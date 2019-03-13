//折线图管理js
var model={};
//成功状态常量
var SUCCESS=0;

var myChart = echarts.init(document.getElementById('main'));

var xAxisData = [];
var data1 = [];
var data2 = [];
var data3 = [];

$(function(){
	var url="pages/registration/findRegistrationCountPerMonth.action";
	var param={};
	$.post(url,param,function(result){
		if(result.state==SUCCESS){
			//赋值
			var data=result.data;
			console.log("data:"+data);
			var xAxisData = data.X;
			var data1 = data.total_sfz;
			var data2 = data.total_yb;
			var data3 = data.total_xnh;
			//====================
			option = {
				    title: {
				        text: '本月挂号柱状图'
				    },
				    legend: {
				        data: ['身份证', '医保','农合'],
				        align: 'left'
				    },
				    toolbox: {
				        // y: 'bottom',
				        feature: {
				            magicType: {
				                type: ['stack', 'tiled']
				            },
				            dataView: {},
				            saveAsImage: {
				                pixelRatio: 2
				            }
				        }
				    },
				    tooltip: {},
				    xAxis: {
				        data: xAxisData,
				        silent: false,
				        splitLine: {
				            show: false
				        }
				    },
				    yAxis: {
				    },
				    series: [{
				        name: '身份证',
				        type: 'bar',
				        data: data1,
				        animationDelay: function (idx) {
				            return idx * 10;
				        }
				    }, {
				        name: '医保',
				        type: 'bar',
				        data: data2,
				        animationDelay: function (idx) {
				            return idx * 10 + 50;
				        }
				    },{
				        name: '农合',
				        type: 'bar',
				        data: data3,
				        animationDelay: function (idx) {
				            return idx * 10+100;
				        }
				    }],
				    animationEasing: 'elasticOut',
				    animationDelayUpdate: function (idx) {
				        return idx * 5;
				    }
				};
				        // 使用刚指定的配置项和数据显示图表。
				        myChart.setOption(option);
			//====================
		}else{
			$.alert(result.message);
		}
	});
});

//for (var i = 0; i < 100; i++) {
//    xAxisData.push('类目' + i);
//    data1.push((Math.sin(i / 5) * (i / 5 -10) + i / 6) * 5);
//    data2.push((Math.cos(i / 5) * (i / 5 -10) + i / 6) * 5);
//    data3.push((Math.cos(i / 5) * (i / 5 -10) + i / 6) * 5);
//}
//===================================

//===================================

