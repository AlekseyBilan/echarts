<template>
    <div id="app" class="echarts">
        <IEcharts :option="bar" :loading="loading"></IEcharts>
        <IEcharts :option="barClose" :loading="loadingClose"></IEcharts>
    </div>
</template>

<script>
    import IEcharts from 'vue-echarts-v3/src/full.js';
    export default {
        name: 'App',
        components: {
            IEcharts
        },
        props: {
            profile: {
                type: String,
                default: '0'
            }
        },
        data: () => ({
            graphCloseLastTorque : [],
            graphCloseAverageTorque : [],
            graphCloseLabels : [],
            graphOpenLastTorque : [],
            graphOpenAverageTorque: [],
            graphOpenLabels : [],
            loading: true,
            bar: {
                title: {
                    text: 'OPEN'
                },
                tooltip: {},
                xAxis: {
                    data: []
                },
                yAxis: {
                },
                color: ['#1175B6', '#ADC6E9', '#FFA94A'],
                series: [{
                    name: 'Average open torque',
                    type: 'bar',
                    data: []
                },{
                    name: 'Last open torque',
                    type: 'bar',
                    data: []
                },{
                    name: 'Forecast open torque',
                    type: 'bar',
                    data: []
                }
                ]
            },
            loadingClose: true,
            barClose: {
                title: {
                    text: 'Close'
                },
                tooltip: {},
                xAxis: {
                    data: []
                },
                yAxis: {
                },
                color: ['#1175B6', '#ADC6E9', '#FFA94A'],
                series: [{
                    name: 'Average close torque',
                    type: 'bar',
                    data: []
                },{
                    name: 'Last close torque',
                    type: 'bar',
                    data: []
                },{
                    name: 'Forecast close torque',
                    type: 'bar',
                    data: []
                }
                ]
            }
        }),
         methods: {
        },
        created: function() {
           this.$http.get('http://wb-predictivemaintenance-api.prsp7vkew2.eu-central-1.elasticbeanstalk.com/api/TorqueValues')
               .then(function(response){
                    var obj = response.data, current;
                    for(var key in obj){
                        current = obj[key];
                        if(current.Profile == this.profile){
                            if(current.Direction === 'Close'){
                            this.graphCloseLastTorque.push(current.LastTorque);
                            this.graphCloseAverageTorque.push(current.AverageTorque);
                            this.graphCloseLabels.push(current.Position);
                        }else{
                            this.graphOpenLastTorque.push(current.LastTorque);
                            this.graphOpenAverageTorque.push(current.AverageTorque);
                            this.graphOpenLabels.push(current.Position);
                            }
                        }
                    }
                    //OPEN
                    this.bar.xAxis.data =this.graphOpenLabels;
                    this.bar.series[0].data = this.graphOpenAverageTorque;//OPEN Average
                    this.bar.series[1].data = this.graphOpenLastTorque;//OPEN Last
                    this.bar.series[2].data = this.graphOpenAverageTorque;//OPEN Forecast
                    this.loading = false;

                    //CLOSE
                    this.barClose.xAxis.data = this.graphCloseLabels;
                    this.barClose.series[0].data = this.graphCloseAverageTorque;//CLOSE Average
                    this.barClose.series[1].data = this.graphCloseLastTorque;//CLOSE Last
                    this.barClose.series[2].data = this.graphCloseAverageTorque;//CLOSE Forecast
                    this.loadingClose = false;
               });
            }
        };
</script>

<style scoped>
    .echarts {
        width: 80vw;
        height: 500px;
        float: right;
    }
</style>
