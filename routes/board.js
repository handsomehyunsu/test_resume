// for use of Router in express module, import express 
const express = require("express");


const router = express.Router();

const checkAuth = require("../middleware/check-auth");
const boardController = require('../controllers/board');


// getting all boards document from db
router.get("", boardController.getBoards);

// board Creatation 
router.post("", checkAuth,boardController.createBoard ); 


//For deletion
//:id -- req.params.id
router.delete("/:id", checkAuth, boardController.deleteBoard);

// For edit
//유저가 현제 페이지에서 새로고침과 같은 경우, 아무런 정보도 없기에 에러가 발생합니다. 
//이때에 이 라우터가 작동하여 id값을 물고 가기때문에 에러를 방지합니다. 
router.get("/:id", boardController.getBoard);

//for edit 이 경우에는 이미 db에 _id정보가 있기때문에 , 이 id를 이용하여 정보를 수정한뛰 
//수정에 성공했다면 결과값을 전달합니다. 
router.put("/:id", checkAuth, boardController.updateBoard)

module.exports = router;