const jwt  = require("jwt-promise");
const secret = "Es8T7yTk2VG1szit"

const getToken  = async(userid,role)=>{
    const date = Math.floor(Date.now() / 1000);
    const token = await jwt.sign({
        "userid": userid,
        "role": role,
        "issued":date,
    },secret,{algorithm:"HS512",expiresIn: 10*60});
    return token;
}

const verifyToken = async(token)=>{
    const decoded = await jwt.verify(token,secret);
    return decoded
}

const checkTokenExists = async (req,res,next)=>{
    try{
        const decoded = await verifyToken(req.cookies.sessionCookie);
        next()
    }catch{
        // change the website ltr
        res.status(302).redirect("google.com")
    }
}

const checkAdmin = (req,res,next)=>{
    try{
        const decoded = await verifyToken(req.cookies.sessionCookie);
        if(decoded.role =="admin"){
            next()
        }
        else{
            throw Error("Unauthorized!")
        }
    }catch{
        // change the website ltr
        res.status(400).send("Unauthorized!")
    }
}

const checkUserId = (req,res,next)=>{
    try{
        const decoded = await verifyToken(req.cookies.sessionCookie);
        if(decoded.userid == req.params.id){
            next()
        }
        else if(decoded.userid == req.params.uid){
            next()
        }
        else{
            res.status(400).send("Unauthorized!")
        }

    }catch{
        // change the website ltr
        res.status(400).send("Unauthorized!")
    }
}
module.exports={
    "getToken": getToken,
    "checkTokenExists":checkTokenExists,
    "checkAdmin":checkAdmin,
    "checkUserId": checkUserId
}
