const mongoose =require ('mongoose');


const dbConnect = async ()=> {
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('db connect');
    
    }catch(error){
        console.log(error.message);
        process.exit(1);

    }
}

module.exports = {dbConnect};