const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();

require('dotenv').config();


// Models Location and Configs Location
const { dbConnection } = require('./configs/db');


// Routes Location
const { userRouter } = require('./routes/userRoute');
const { postRouter } = require('./routes/postRoute');
const { authentication } = require('./middlewares/authenticationMiddleware');


// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors());


// Default endpoint
app.get('/', (req, res)=>{
    res.status(200).send(`<h1 style="text-align:center;color:blue;">Welcome to Social Media App Backend</h1>`)
});


app.use("/api",userRouter);
app.use('/api',postRouter);



// Server listening here
app.listen(process.env.PORT , async () => {
    try {
        await dbConnection;
        console.log('Connected to database');
        console.log(`Server is running at ${process.env.PORT}`);
    } catch (error) {
        console.log(error.message);
    }
})