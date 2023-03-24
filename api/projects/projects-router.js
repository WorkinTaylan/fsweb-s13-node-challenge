// "project" routerını buraya yazın!
const express = require("express");

const ProjectModel=require("./projects-model");
const {validateId, validateNewProject}=require("./projects-middleware");

const router=express.Router();

router.get('/', async(req,res)=>{
    try{
        let allProjects=await ProjectModel.get()
        res.json(allProjects)
    }catch(error){
        res.status(500).json({message:"Hata oluştu"})
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
        await ProjectModel.update(id,req.project)
        const updatedProject=await ProjectModel.get(id)
        res.status(201).json(updatedProject)
        next();
    }catch(error){
        next(error);
    }
})

router.delete('/:id', validateId, async(req,res,next)=>{
    const {id}=req.params
    try{
        await ProjectModel.remove(id)
        next();
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
