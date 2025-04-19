import express from 'express'
import {addFood,listFood,removeFood} from '../controllers/foodController.js'
import multer from "multer";


const foodRouter=express.Router();

//image storage engine

const storage=multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload=multer({storage:storage})

foodRouter.post("/add",upload.single("image"),addFood)
//addFood middleware is called to store in mongoDB.
//upload.single("image") midleware is called to handle upload files in folder using multer.

foodRouter.get('/list',listFood)
foodRouter.post('/remove',removeFood)

export {foodRouter};