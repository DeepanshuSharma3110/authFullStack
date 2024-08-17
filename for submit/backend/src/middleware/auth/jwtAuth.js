import jwt from 'jsonwebtoken';

const jwtAuth = (req,res,next)=>{
    const authHeader = req.session.user?.token;
    if(!authHeader){
        return res.status(401).json({login:false});
    }
    const token = authHeader;
    try{
        const payload = jwt.verify(token,process.env.JWT_SECRET)

        console.log(payload);
        req.session.user(...req.session.user, ...payload);
        next();
    }catch(err){
        console.error('token verification failed');
        return res.status(401).json({login:false})       
    }
}
export default jwtAuth;