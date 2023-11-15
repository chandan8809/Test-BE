const express = require("express")
const router = express.Router()

const { startExam, submitExam, examList } = require("../controllers/exam")


router.get("/:quiz_id", startExam)
router.post("/submit", submitExam)
router.get("/", examList)



module.exports=router