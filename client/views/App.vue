<template>
    <el-row :gutter="10" type="flex" justify="space-around">
        <el-col :span="8">
            <div class="grid-content bg-purple-dark">
                <chart chart-name="chinaMap" c-height="400" c-title="省外来源分布图" is-map="true" map-name="china"></chart>
                <chart chart-name="allPro" c-height="200" c-title="归属省外游客数量" c_position='center'></chart>
            </div>

        </el-col>
        <el-col :span="8">
            <div class="grid-content bg-purple-dark">
                <el-button v-on:click="getOutProvMap()">点击</el-button>
            </div>
        </el-col>
        <el-col :span="8">
            <div class="grid-content bg-purple-dark">
                <chart chart-name="map" c-height="400" c-title="外市来源分布图" is-map="true" map-name="beijing"></chart>
                <chart chart-name="allCity" c-height="200" c-title="本省外市" c_position='center'></chart>
            </div>
        </el-col>
    </el-row>
</template>

<script>

    import chart from './components/chart.vue';

    import moment from 'moment';
    import apiProxy  from './apiProxy';


    export default{
        name: 'app',
        components: {

            chart
        },
        methods: {
            getOutProvMap(){

                var day = moment().add(-6, 'month').add(8, 'days').format('YYYY-MM-DD');

                console.log(day);
                apiProxy.getOutProvMap(day).then((data) => {
                    console.log(data);
                }).catch((err) => {
                    console.log(err);
                });

            },
        }
    }

</script>
<style>
    .el-row {
        margin-bottom: 20px;

    }

    .el-row:last-child {
        margin-bottom: 0;
    }

    .el-col {
        border-radius: 4px;

    }

    .bg-purple-dark {
        background: #EFF2F7;
    }

    .grid-content {
        border-radius: 4px;
        height: calc(100vh - 25px)
    }


</style>