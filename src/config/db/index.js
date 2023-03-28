const mongoose= require('mongoose');

async function connect (){
    try{
        await mongoose.connect('mongodb://localhost:27017/webDuLich');
        console.log('Connect success');
    }catch(error){
         console.log('Connect error success');
    }
}

module.exports={connect};