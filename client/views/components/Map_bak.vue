<template>
    <div class="content">

    </div>
</template>

<script src="libs/china.js"></script>
<script src="libs/beijing.js"></script>
<script>

    import echarts  from 'echarts'

    export default{
        name: 'map-chart',
        props: ['chartName'],
        data(){
            return {
                chart: null,
                opinion: ['高富帅', '矮富帅', '高富挫', '矮富挫', '女生'],
                opinionData: [{
                    value: 26,
                    name: '高富帅'
                }, {
                    value: 31,
                    name: '矮富帅'
                }, {
                    value: 18,
                    name: '高富挫'
                }, {
                    value: 28,
                    name: '矮富挫'
                }, {
                    value: 21,
                    name: '女生'
                }]
            }
        },
        methods: {
            drawGraph(id){
                var div = document.createElement('div');
                div.setAttribute('id', this.chartName);
                div.setAttribute('style', 'height:400px');

                var content = document.getElementsByClassName('content')[0];
                content.appendChild(div);
                this.chart = echarts.init(document.getElementById(this.chartName));
                this.chart.showLoading();
                var vm = this;
                this.chart.setOption({
                    title: {
                        text: '女生喜欢的男生种类',
                        subtext: '纯属扯犊子',
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        x: 'center',
                        y: 'bottom',
                        data: this.opinion // 别忘了this
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            mark: {
                                show: true
                            },
                            dataView: {
                                show: true,
                                readOnly: false
                            },
                            magicType: {
                                show: true,
                                type: ['pie']
                            },
                            restore: {
                                show: true
                            },
                            saveAsImage: {
                                show: true
                            }
                        }
                    },
                    calculable: true,
                    series: [{
                        name: '种类',
                        type: 'pie',
                        // 内圆半径，外圆半径
                        radius: [30, 100],
                        // 位置，左右，上下
                        center: ['50%', '50%'],
                        roseType: 'area',
                        data: this.opinionData, // 别忘了this


                    }]
                })
                this.chart.hideLoading()
            }
        },
        mounted(){
            this.$nextTick(() => {
                this.drawGraph(this.chartName)
            })
        }
    }
</script>

<style scoped>
    .content {
        /*自行添加样式即可*/
    }

    .chart {
        /*需要制定具体高度，以px为单位*/
        height: 400px;
    }
</style>