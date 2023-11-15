const Question = require('../models/Question')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')


const createQuiz = async (req,res) => {
    req.body.createdBy = req.user.userId
    const question= await Question.create(req.body)
    res.status(StatusCodes.CREATED).json({question})
}


const getQuiz = async(req,res)=>{
    const quizId= req.params.quiz_id
    if(quizId){
      const quiz = await Question.findById(quizId)
      res.status(StatusCodes.OK).json({quiz})
    }
    if(!quizId){
      const quiz = await Question.find({},{ section_name: 1})
      res.status(StatusCodes.OK).json({quiz})
    }
}

const deleteQuiz =async(req,res)=>{
  const quizId= req.params.quiz_id
  const userId= req.user.userId
  const quiz = await Question.findById(quizId)
  if(!quiz){
    throw new BadRequestError("no quiz found")
  }
  if(quiz.published){
    throw new BadRequestError("you can't delete published quiz")
  }

  // console.log("status",quiz.createdBy.toString()===userId)
  // console.log("type",typeof(quiz.createdBy),typeof(userId))
  
  if(quiz.createdBy.toString()!==userId){
    throw new BadRequestError("you dont have permission")
  }
  if(quiz.createdBy.toString()===userId){
    const quiz = await Question.findByIdAndDelete(quizId)
    res.status(StatusCodes.OK).json({message:"quiz deleted successfully"})
  }
}

const updateQuiz = async (req,res) => {
  const quizId= req.params.quiz_id
  const quiz= await Question.findByIdAndUpdate(quizId,req.body,{new:"true"})
  res.status(StatusCodes.CREATED).json({quiz})
}

const publishQuiz = async (req,res) => {
  const quizId= req.body.quiz_id
  console.log("quiz",quizId)
  req.body.published=true
  const quiz= await Question.findByIdAndUpdate(quizId,req.body,{new:"true"})
  res.status(StatusCodes.CREATED).json({quiz})
}



module.exports = {
  createQuiz,
  getQuiz,
  deleteQuiz,
  updateQuiz,
  publishQuiz
 
}