const mongoose = require('mongoose')

const DB = "mongodb+srv://eddy253:eddy@cluster0.1qiiwx4.mongodb.net/?retryWrites=true&w=majority";
const dbConnect = async()=>{
    try{
        mongoose.connect(DB, {
        }).then(() =>{
            console.log('Database connected..')
        })
    }catch(err){
        console.log(`error:${err.message}`)
    }
}

module.exports = dbConnect;

