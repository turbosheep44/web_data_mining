<template>
    <div>
        <b-button @click="findJob()"> Search For Jobs </b-button>
        <hr>
        <h1> Potential Jobs </h1>
        <b-button v-for="job in this.$store.potentialJobs"
        :key="job.title"
        @click="selectJob(job)"> {{job.title}} - {{job.wage}}</b-button>

        <hr>
        <b-button @click="resign()"> Resign </b-button>
    </div>
    
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class Tabs extends Vue {

    created() {
        this.$store.events.$on('month_passed', this.calculateExpensesAndRevenues)
        this.$store.events.$on('jobs_found', this.jobsFound)
    }

    findJob(){
        if(this.$store.employed){
            this.$notify({
                group: 'notification',
                title: 'Already Employed!',
                text: 'You are already employed as a ' + this.$store.currentJob['title']
            })
        }else if(this.$store.jobSearchTargetTick != -1){
            this.$notify({
                group: 'notification',
                title: 'Job search already started',
                text: 'Please wait for the current job search to finish before searching again'
            })
        }else{
            this.$notify({
                group: 'notification',
                title: 'Job search started',
                text: 'You will receive shortlist in 1-3 months.'
            })

            this.startJobSearch()
        }
    }

    selectJob(job){  
        if(this.$store.employed){
            this.$notify({
                group: 'notification',
                title: 'You are already employed as \''+job.title+'\'!',
                text: 'Please resign before choosing another employment!'
            })
        }else{
            this.$notify({
                group: 'notification',
                title: 'Employed as \''+job.title+'\'!',
                text: 'Enjoy.'
            })

            this.$store.employed = true
            this.$store.currentJob = job
            this.$store.jobSearchTargetTick = -1  
            this.$store.potentialJobs = []
            this.$forceUpdate()
        }
        
    }
    
    resign(){
        if(!this.$store.employed){
            this.$notify({
                group: 'notification',
                title: 'You are not employed',
                text: 'You cannot resign if you are unemployed'
            })
        }else{
            this.$notify({
                group: 'notification',
                title: 'Resigned from \''+ this.$store.currentJob['title'] + '\'',
                text: 'Happy Unemployment!'
            })
            this.$store.employed = false
            this.$store.currentJob = {}
        }
    }

    jobsFound() {
        this.$notify({
            group: 'notification',
            title: 'Jobs Found!',
            text: 'Open the work tab to see job offers.'
        })
        this.$store.potentialJobs = []

        const job1 = {
            'title':'Job 1',
            'desc': 'the first job',
            'wage':2000
        }
        
        const job2 = {
            'title':'Job 2',
            'desc': 'the second job',
            'wage':3000
        }
        this.$store.potentialJobs.push(job1,job2)
        this.$forceUpdate();  
        
    }

    startJobSearch(){
        const minTickDelay = 2, maxTickDelay = this.$store.jobSearchDuration
        // const delay = Math.floor(Math.random() * (maxTickDelay - minTickDelay + 1)) + minTickDelay;
        const delay = 1;

        this.$store.jobSearchTargetTick = this.$store.tickCount + delay
        this.$store.events.$emit("job_found")
    }

    calculateExpensesAndRevenues(){
        console.log('calculating')

        this.$notify({
            group: 'expense',
            clean: true
        })

        this.$notify({
            group: 'revenue',
            clean: true
        })

        if(this.$store.employed){
            this.$notify({
                group: 'revenue',
                title: 'Salary!',
                text: 'Salary Invoice. $' + this.$store.currentJob['wage'] +' deposited into back account.'
            });
            this.$store.money += this.$store.currentJob['wage']
        }

        this.$store.money -= this.$store.rent

        this.$notify({
            group: 'expense',
            title: 'Rent',
            text: '$'+ this.$store.rent +' for Rent removed from account.'
        })

        this.$notify({
            group: 'foo',
            clean: true
        })
    }
    
}


</script>

<style>
</style>