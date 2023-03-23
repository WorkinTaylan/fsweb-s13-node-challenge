// "project" routerını buraya yazın!
const express = require("express");

const ProjectModel=require("./projects-model");
const {validateId}=require("./projects-middleware");

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
    res.json(req.user)
})

module.exports=router;
