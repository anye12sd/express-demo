var path = require("path")
var express = require("express")
var router = express.Router();
var formidable = require("formidable")
var fs = require("fs")

//拦截请求
router.post('/upload',function (req,res,next){
    var form = new formidable.IncomingForm();
    //设置编辑
    form.encoding = 'utf-8';
    //保留后缀
    form.keepExtensions = true;
    form.uploadDir = path.join(__dirname,'../files');

    form.parse(req,function (err,fileds,files){
        if(err) next(err);
        var filename = files.file.originalFilename;
        var newFilename = files.file.newFilename
        var nameArray = filename.split('.');
        var type = nameArray[nameArray.length - 1];
        var name = newFilename + '.' + type;
       // for (var i = 0; i < nameArray.length - 1; i++) {
       //     name = name + nameArray[i];
       // }
       // var date = new Date();
       // var time = '_' + date.getFullYear() + "_" + date.getMonth() + "_" + date.getDay() + "_" + date.getHours() + "_" + date.getMinutes();
       //  var avatarName = name + time + '.' + type;
        var newPath = form.uploadDir + "/" + name;
        try{
            fs.renameSync(files.file.filepath, newPath);  //重命名
            res.send({code:200,data:name,msg:'图片添加成功'});
        }
        catch(err){
            res.send({code:10000,data:'图片添加失败',msg:'图片添加失败'});
        }
    })
})

module.exports = router;

