import app from "./index.js";
import database from "./src/middleware/auth/config.js";

const start = ()=>{
    app.listen(process.env.PORT,()=>{
        console.log('server is listening at port no 4000');
        database();        
    });    
}

start();

