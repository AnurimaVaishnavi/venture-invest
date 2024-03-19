import mongoose from 'mongoose';

const eventsSchema = new mongoose.Schema(
    {
        author : {
            id: mongoose.Schema.Types.ObjectId,
            name: String,
            avatar :  String,
        },
        eventImage:{
            type:String
        },
        eventName:{
            type:String
        },
        eventDescription: {
            type: String,
            required: true
        },
        eventType:{
            type:Number
        },
        startDate:{
         type:Date
        },
        startTime:{
         type:Date
        },
        endDate:{
         type:Date
        },
        endTime:{
         type:Date
        },
        Timezone:{
           type: String
        },
        speakers:{
         type:[
            {
                id:Number,
                name:String
            }
        ]
    },
       
    } , { timestamps: true }
);

const Eventschema = mongoose.model("Events", eventsSchema);
export {Eventschema}




