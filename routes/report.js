const express = require("express")
const router = express.Router()

const { reportsList,getReport } = require("../controllers/exam")


router.get("/", reportsList)
router.get("/:report_id", getReport)




module.exports=router