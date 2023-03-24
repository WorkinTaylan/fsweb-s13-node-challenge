// eylemlerle ilgili ara katman yazılımları yazın
const actionModel=require("./actions-model");

async function validateId(req,res,next){
    const {id}=req.params;
    try{
        let isActionExist=await actionModel.get(id);
        if(!isActionExist){
            res.status(404).json({message:"Action bulunamadı"})
        }else{
            req.action=isActionExist;
        }
        next(); 
    }catch(error){
        res.status(500).json({message:"Hatalı istek gönderdiniz"})
    }
}

function validateNewAction(req,res,next){
    const {project_id, description, notes}=req.body;
    if(!project_id || !description && description.length>128 || !notes){
        res.status(400).json({message:"Plese check all input areas!"})
        next();
    }else{
        req.action={project_id: project_id, description:description, notes:notes}
        next();
    }
}

module.exports={
    validateId,
    validateNewAction
}