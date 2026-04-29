import mongoose from 'mongoose'

const taskSchema = mongoose.Schema({
    title:{
        type: String,
        required:true
    },
    status:{
        type: Boolean,
        default:false
    },
    dueDate:{
        type: Date
    },
    projectId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Project",
        required: true,
        index: true,
    },
},{timestamps: true})

export default mongoose.model("Task", taskSchema);