// eylemlerle ilgili ara katman yazılımları yazın
const actionModel=require("./actions-model");
const projectModel=require("../projects/projects-model")

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

async function validateNewAction(req,res,next){
    try {
    let {project_id, description, notes}=req.body;
    let isExistProject=await projectModel.get(project_id)
    if( !isExistProject || !notes || !description || description.length>128){
        res.status(400).json({message:"Plese check all input areas!"})
        next();
    }else{
        req.action={project_id: project_id, description:description, notes:notes, completed:req.body.completed} //aslında completed gerekli değil fakat testten geçmesi için giriyoruz. Test/istenen uyşmazlığı var.
        next();
    }
    }catch(error){
        next(error);
    }

}

module.exports={
    validateId,
    validateNewAction
}