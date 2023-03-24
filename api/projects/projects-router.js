// "project" routerını buraya yazın!
const express = require("express");
const router=express.Router();
const ProjectModel=require("./projects-model");
const {validateId, validateNewProject}=require("./projects-middleware");


router.get('/', async(req,res)=>{
    try{
        let allProjects=await ProjectModel.get()
        res.status(200).json(allProjects)
    }catch(error){
        next(error)
    }
})

router.get('/:id', validateId,async(req,res)=>{
    res.json(req.project)
})

router.post('/', validateNewProject, async(req,res,next)=>{
    try{
        let project=req.project
        const postedProject=await ProjectModel.insert(project)
        res.status(201).json(postedProject);
        next();
    }catch(error){
        next(error);
    }
})

router.put('/:id', validateId,validateNewProject, async(req,res,next)=>{
    const {id}=req.params
    try{
        const updatedProject=await ProjectModel.update(id, req.project)
        res.json(updatedProject);
    }catch(error){
        next(error);
    }
})

router.delete('/:id', validateId, async(req,res,next)=>{
    const {id}=req.params
    try{
        await ProjectModel.remove(id)
        res.json({message:"Silme başarılı"})
    }catch(error){
        next(error);
    }
})

router.get('/:id/actions', validateId, async(req,res,next)=>{
    const {id}=req.params
    try{
        const bringmeAction=await ProjectModel.getProjectActions(id)
        res.json(bringmeAction)
    }catch(error){
        next(error)
    }
})





module.exports=router;
