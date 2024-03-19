import { CronJob } from 'cron';
import { schjob } from '../models/schedulejobschema.js';
import { redisclient } from './redisController.js';
import { Post } from '../models/postsschema.js';
const scheduledjob = new CronJob('* * * * *', async function() {
    console.log('Job Executed');
       
        const response=await schjob.find()
        if(response && response.length>0){
            redisclient.set("cronjob",JSON.stringify(response));
            const deleteoperation=await schjob.deleteMany({})
        }
        const scheduled_result=await redisclient.get("cronjob");
        const scheduled_tasks=JSON.parse(scheduled_result);
        
        for(let i=0;scheduled_tasks && i<scheduled_tasks.length;i++){
            console.log(new Date(scheduled_tasks[i].ScheduleDateTime).getMilliseconds());
            console.log(new Date().getTime());
            console.log(new Date(scheduled_tasks[i].ScheduleDateTime).getMilliseconds()<=new Date().getTime());
            if(new Date(scheduled_tasks[i].ScheduleDateTime).getMilliseconds()<=new Date().getTime()){
            const post_data=new Post(scheduled_tasks[i]);
            const insert_result= await post_data.save();
             if(insert_result){
                scheduled_tasks.splice(i,1);
                redisclient.set("cronjob",JSON.stringify(scheduled_tasks));
             }
            }
        }
        console.log(scheduled_tasks);
  });

  export{scheduledjob};