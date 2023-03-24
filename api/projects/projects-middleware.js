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
            req.project=isProjectExist;
        }
        next(); 
    }catch(error){
        res.status(500).json({message:"Hatalı istek gönderdiniz"})
    }
}

function validateNewProject(req,res,next){
    const {name, description}=req.body;
    if(!name || !description){
        res.status(400).json({message:"Plese check name or description area!"})
        next();
    }else{
        req.project={name:name, description:description}
        next();
    }
}

module.exports={
    logger,
    validateId,
    validateNewProject,
}