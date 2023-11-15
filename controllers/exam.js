 
const { StatusCodes } = require('http-status-codes')
const { BadRequestError } = require('../errors')
const Question = require('../models/Question')
const Report = require('../models/Report')

const examList = async(req,res) => {
    const quiz = await Question.find({published: true},{ section_name: 1})

    console.log("quiz",quiz)
    if(!quiz){
        throw new BadRequestError("exam not found")
    }
    res.status(StatusCodes.OK).json({quiz})
} 

const startExam = async(req,res) => {
    const quizId= req.params.quiz_id
    const quiz = await Question.findById(quizId,{'section_list.answer': 0,createdAt:0,createdBy:0,updatedAt:0})


    console.log("quiz",quiz)
    if(!quiz){
        throw new BadRequestError("exam not found")
    }
    if(!quiz.published){
        throw new BadRequestError("can not attempt unpublished quiz")
    }

    res.status(StatusCodes.OK).json({quiz})
} 


const submitExam = async(req,res) => {
    const quizId= req.body.quiz_id
    const user_id=req.user.userId
    const quiz = await Question.findById(quizId)
    const attempts =req.body.attempted
    const correctAnswer =quiz.section_list

    function calculateSectionMarks(sectionList, attempted) {
        const sectionMarks = {};
        // Iterate through attempted sections
        attempted.forEach(attempt => {
          const sectionName = attempt.section;
          const section = sectionList.find(sec => sec.section_name === sectionName);
      
          if (section) {
            const answers = attempt.answer;
            const correctAnswers = section.answer;
            let section_marks = 0;
            let section_total_marks= Object.keys(correctAnswer).length
            // Compare attempted answers with correct answers
            Object.keys(answers).forEach(questionId => {
              if (answers[questionId] === correctAnswers[questionId]) {
                section_marks++; // Increment marks for correct answers
              }
            });
            
            // Store marks for each section
            sectionMarks[sectionName] = {section_marks,section_total_marks};
          }
        });
        return sectionMarks;
      }

      const sectionMarks = calculateSectionMarks(correctAnswer, attempts);

      let grandTotalMarks = 0;
      let scoreTotal=0
        Object.keys(sectionMarks).forEach(section => {
            scoreTotal+= sectionMarks[section].section_marks
            grandTotalMarks += sectionMarks[section].section_total_marks;
        });

   
    const report = await Report.create({
        quiz_id:quizId, 
        user_id, 
        total_marks:grandTotalMarks, 
        total_score:scoreTotal, 
        section_mark:sectionMarks
    })

    res.status(200).json({report})
} 

module.exports={startExam, submitExam, examList}