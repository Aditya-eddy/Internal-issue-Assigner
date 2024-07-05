const express = require('express')
const cors = require('cors')
const app = express();
const dbConnect = require('./db/conn');

dbConnect();

app.use(express.json())
app.use(cors())

app.use('/api',require('./routes/userRoute'));
app.use('/api',require('./routes/taskDetails'));

app.get('/',(req,res)=>{
    res.send("Welcome here");
})
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}...`)
})