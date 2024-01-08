const { image } = require("../model/img.model");
const path = require('path');

const formPage = (req,res)=>{
    res.render("index")
}

const uploadImg = async(req,res)=>{
    try {
        console.log(req.file)
        
        console.log(path.dirname(__dirname))
        const obj = {
            img : `http://localhost:8800/image/${req.file.filename}`
        }
        
        let data = await image.create(obj);
        res.json({
            success:1,
            url :`http://localhost:8800/image/${req.file.filename}`,
            data:data
        })
        
    } catch (error) {
        return res.send({"Error" : error.message});
    }
}

module.exports = {formPage, uploadImg}