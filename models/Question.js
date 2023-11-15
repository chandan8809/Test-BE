const mongoose = require('mongoose')

const QuestionSchema = new mongoose.Schema(
  {
    section_list:[
      {
        section_name: {
          type: String,
          required: [true, 'Please provide company name'],
          maxlength: 50,
        },
        question_list:[
          {
            question:{
                type: String,
                required: [true, 'Please provide question'],
                maxlength: 100,
            },
            options:{},
          }
        ],
        answer:{},
      }
    ],

    published: {
      type: Boolean,
      default: false
    },
    
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Question', QuestionSchema)