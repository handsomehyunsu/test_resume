// bcrpyt for hashing the password 
const bcrpyt = require("bcrypt");

const jwt = require('jsonwebtoken');

//user model import 
const User = require("../models/user");


exports.signup =  (req, res, next)=>{
    //req 로 받은 비밀번호를 먼저 해쉬값을 먹여준다. 
    bcrpyt.hash(req.body.password, 10)
    //비동기 콜백으로 해쉬값이 넘어오기때문에 promise 방식으로 연결해서 처리한다.
          .then(hashed =>{
            const user = new User({
                email : req.body.email,
                username : req.body.username,
                password : hashed
            });
            user.save()
                .then(savedResult =>{
                    res.status(201).json({
                        message : 'user infomation saved in db successfully!',
                        result : savedResult
                    });
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    });
                });
          });
};

exports.login = (req, res, next)=>{
    let fetchedUser; 
    User.findOne({email : req.body.email})
        .then(user =>{
            console.log(user);
            if(!user){
                return res.status(401).json({
                    message: "there is no user information!"
                });
            }
            fetchedUser = user;
            //db에서 유저정보를 찾은경우. db에 저장된 유저정보와 유저가 입력한 해쉬값을 비교.
            return bcrpyt.compare(req.body.password, user.password);

        }).then(result =>{
            if(!result){
                return res.status(401).json({
                    message: "password is wrong"
                });
            }
            const token = jwt.sign({email : fetchedUser.email, userId: fetchedUser._id}, 'secret', {expiresIn : "1h"});
            res.status(200).json({
                token: token,
                expiresIn : 3600,
                userId : fetchedUser._id
            })
        }).catch(err => {
            console.log(err);
            return res.status(401).json({
                message: "Authentification failed!"
            });
        })
};