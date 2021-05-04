const express = require('express');
const mongoose = require('mongoose');
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT ,SESSION_SECRET ,REDIS_URL ,REDIS_PORT} = require('./config/config');
const app = express();
const postRouter = require("./routes/postRoute")
const authRouter = require("./routes/userRoutes")
const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`

// Redis setup
const redis = require('redis')
const session = require('express-session')
let RedisStore = require('connect-redis')(session)

/*********************** Session Store********************************/

let redisClient = redis.createClient({
    host:REDIS_URL,
    port:REDIS_PORT

})

/*********************** Connecting To MongoDB ************************************/

const connectWithRetry = ()=>{

mongoose.connect(mongoURL,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useFindAndModify:false,
    useCreateIndex: true,
})
    .then(()=> console.log('successfully Connected to DB'))
    .catch((err)=> {
        console.log(err);
        setTimeout(connectWithRetry,5000);
    });

}

connectWithRetry();




/*********************** Configration for Sessions ********************************/
app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie:{
        name:"Blog-app",
        secure:false,
        httpOnly: true,
        maxAge: 30000

      }
      
    })
  )


const port = process.env.PORT || 3000;
app.use(express.json());

app.get('/', (req, res) =>{
    res.send(`<h1>Hello Manish from express app11<\h1>`)
})

app.use("/api/v1/posts",postRouter)
app.use("/api/v1/user",authRouter)

app.listen(port ,()=>{
    console.log(`Server is running at port ${port} `)
})

