const {Router} = require('express');
const router = Router();
const { formPage, uploadImg } = require('../controller/img.controller');
const path = require('path')
const multer = require('multer')

const storage = multer.diskStorage({
    destination : "public/images",
    filename : (req,file,cb)=>{
        cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype == "image/jpg") {
        cb(null, true);
    } else {
        cb("JPG,JPEG and PNG only supported", false);
    }
};

const upload = multer({
    storage : storage,
    fileFilter : fileFilter,
    // (req,file,cb)=>{
    //     if(file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/png"){
    //         cb(null, true)
    //     }
    //     else{
    //         cb(null, false);
    //         return cb(new Error('Only .jpg/.jpeg/.png file formate is allowed'))
    //     }
    // },
    // limits : {fileSize : 1024 * 1014 * 5} // 52,42,880 byte == 5.24288 mb
})

const errHandler=(err,req,res,next)=>{
    if(err instanceof multer.MulterError){
        res.json({
            success :0,
            message : err.message
        })
    }
}

router.get("/profile", formPage);
router.post("/profile", upload.single("img") ,uploadImg)

module.exports = {router, errHandler}