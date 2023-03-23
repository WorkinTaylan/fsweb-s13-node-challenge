// projects ara yazılımları buraya
const ProjectModel=require("./projects-model");

function logger(req, res, next) {
    const method=req.method;
    const url=req.originalUrl;
    const timestamp= new Date().toLocaleString();
    console.log(`${timestamp}-- ${method}--${url}`);
    next();
}

async function validateId(req,res,next){
    const {id}=req.params;
    try{
        let isProjectExist=await ProjectModel.get(id);
        if(!isProjectExist){
            res.status(404).json({message:"Proje bulunamadı"})
        }else{
            req.user=isProjectExist;
        }
        next(); 
    }catch(error){
        res.status(500).json({message:"Hatalı istek gönderdiniz"})
    }
}

module.exports={
    logger,
    validateId
}