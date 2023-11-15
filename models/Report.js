const mongoose= require("mongoose")

const ReportSchema = new mongoose.Schema({
  quiz_id:{
    type: mongoose.Types.ObjectId,
    ref: 'Question',
    required: [true, 'Please provide user'],
  },
  user_id:{
    type: mongoose.Types.ObjectId,
    ref: 'Question',
    required: [true, 'Please provide user'],
  },
  total_marks:{
    type:Number,
    required: [true, 'Please provide user'],
  },
  total_score:{
    type:Number,
    required: [true, 'Please provide user'],
  },
  section_mark:{}
})

module.exports = mongoose.model("Report", ReportSchema) 