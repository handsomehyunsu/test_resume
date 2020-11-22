const Board = require("../models/board");

exports.createBoard = (req, res, next)=>{
    const board = new Board({
        mainTitle : req.body.mainTitle,
        extraTitle : req.body.extraTitle,
        date : req.body.date,
        contents : req.body.contents,
        boardCategory : req.body.boardCategory,
        createdBy : req.userData.userId
    });
    //디비에 성공적으로 저장했다면 그후 id값만 보냄.
    board.save()
    .then(createdBoard =>{
        console.log(createdBoard);
        res.status(201).json({
            message : 'post attached successfully!',
            boardId : createdBoard._id
        });
    }).catch(error =>{
        console.log(error);
        res.status(500).json({
            message : "Failed to save new board"
        });
    });
};

exports.updateBoard = (req, res, next)=>{
    console.log("edit모드에 진입했습니다.");
    const board = new Board({
        _id : req.body.id,
        mainTitle : req.body.mainTitle,
        extraTitle : req.body.extraTitle,
        date : req.body.date,
        contents : req.body.contents,
        boardCategory : req.body.boardCategory,
        createdBy : req.userData.userId
    });
    Board.updateOne( {_id : req.params.id, createdBy: req.userData.userId}, board)
    .then(result =>{
        if(result.nModified > 0){
            res.status(200).json({message : "Updated Successfully!"});
        } else { 
            res.status(401).json({ message : "Not authorized"})
        }
        
    }).catch(error =>{
        console.log(error);
        res.status(500).json({
            message : "Failed to edit this board."
        });
    });
};

exports.getBoards = (req, res, next)=>{
    Board.find()
    .then(result=>{
        console.log(result);

        res.status(200).json({
            message: 'Post fetched successfully!',
            body : result
        });
    //db에서 파일을 찾지 못했을때     
    }).catch(error =>{
        res.status(500).json({
            message : "Failed to loading boards from the database."

        });
    });
};

exports.getBoard = (req, res, next)=>{
    //findById method from mongoose 
    console.log("edit get mode entered");
    Board.findById(req.params.id)
    .then(board =>{
        
        if(board) {
            console.log(board);
            res.status(200).json(board);

        } else { 
            res.status(404).json({message : "board not found!"})
        }
        
    }).catch(error =>{
        console.log(error);
        res.status(500).json({
            message : "Failed to load this board!"
        });
    });
};

exports.deleteBoard = (req, res, next)=>{
    Board.deleteOne({_id : req.params.id, createdBy: req.userData.userId}).
    then(result =>{
        console.log(result)

        if(result.n > 0){
            res.status(200).json({message : "board deleted successfully!"});
        } else { 
            res.status(401).json({ message : "Not authorized"})
        }
    }).catch(error =>{
        console.log(error);
        res.status(500).json({
            message : "Failed to delete this board."
        });
    });
};
