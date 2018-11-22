$(function(){
    var echarts_left = echarts.init(document.querySelector('.echarts-left'));

    // 指定图表的配置项和数据
    var option1 = {
        title: {
            //标题文本
            text: '2018年注册人数'
        },
        //提示框组件
        tooltip: {},
        // 图列
        legend: {
            data:['销量']
        },
        //x轴
        xAxis: {
            data: ["1月","2月","3月","4月","5月","6月"]
        },
        // y轴
        yAxis: {},
        series: [{
            name: '销量',
            type: 'bar',//bar 表示柱状图 line 折线图
            data: [5, 20, 36, 10, 10, 20]
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    echarts_left.setOption(option1);



    var echarts_right = echarts.init(document.querySelector('.echarts-right'));

    // 指定图表的配置项和数据
    var option2 = {
        
            title : {
                text: '热门品牌销售',
                subtext: '2018年11月',
                x:'center',
                textStyle:{
                    fontSize:25,
                    color:'#e92322'
                }
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',//垂直 horizontal 水平
                left: 'left',
                data: ['阿迪','耐克','阿迪王','视频广告','搜索引擎']
            },
            series : [
                {
                    name: '访问来源',
                    type: 'pie',//饼图
                    radius : '55%',//控制圆的大小  整个容器的直径大小
                    center: ['50%', '60%'],
                    data:[
                        {value:335, name:'阿迪'},
                        {value:310, name:'耐克'},
                        {value:234, name:'阿迪王'},
                        {value:135, name:'视频广告'},
                        {value:1548, name:'搜索引擎'}
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        
    

    // 使用刚指定的配置项和数据显示图表。
    echarts_right.setOption(option2);
})