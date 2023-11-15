const express = require('express')

const router = express.Router()
const {
   createQuiz,
   getQuiz,
   deleteQuiz,
   updateQuiz,
   publishQuiz
} = require('../controllers/question')

router.route('/').post(createQuiz)

router.put("/:quiz_id", updateQuiz)

router.put("/publish/:quiz_id", publishQuiz)

router.get('/:quiz_id?', getQuiz)

router.delete('/:quiz_id', deleteQuiz)

module.exports = router