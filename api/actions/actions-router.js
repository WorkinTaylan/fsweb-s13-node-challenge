// "eylem" routerını buraya yazın
const express = require("express");
const router=express.Router();

const actionModel= require("./actions-model");
const {validateId, validateNewAction}=require("./actions-middlware")

router.get('/', async(req,res)=>{
    try{
        let allActions=await actionModel.get()
        res.json(allActions)
    }catch(error){
        res.status(500).json({message:"Hata oluştu"})
    }
});

router.get('/:id', validateId,async(req,res)=>{
    res.json(req.action)
});

router.post('/', validateNewAction, async(req,res,next)=>{
    try{
        let action=req.action
        const postedAction=await actionModel.insert(action)
        res.status(201).json(postedAction);
        next();
    }catch(error){
        next(error);
    }
});

router.put('/:id', validateId,validateNewAction, async(req,res,next)=>{
    const {id}=req.params
    try{
        await actionModel.update(id,req.action)
        const updatedAction=await actionModel.get(id)
        res.json(updatedAction)
        next();
    }catch(error){
        next(error);
    }
})

router.delete('/:id', validateId, async(req,res,next)=>{
    const {id}=req.params
    try{
        await actionModel.remove(id)
        next();
    }catch(error){
        next(error);
    }
})

module.exports=router;