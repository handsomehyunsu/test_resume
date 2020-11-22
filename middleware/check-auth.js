//유저가 로그인 했는지 안했는지를 판단하는 미들웨어를 설치함. 

//우리가 설정한 웹토큰을 통해 req가 들어올때마다 토큰을 검사하고, 토큰이 있다면 그 다음 스텝으로 넘어가게 한다. 

//미들웨어의 장점. 

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) =>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        //board post id check; 
        req.userData = {email : decodedToken.email, userId : decodedToken.userId};
        next();
        // "Bearer thisistestbearterere"
    } catch (error) {
        console.log(error);
        res.status(401).json({message : "You are not Authenticated!"});
    }
};
