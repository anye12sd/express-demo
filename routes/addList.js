var express = require('express');
var router = express.Router();
// 导入mysql模块、

var mysql = require('mysql')
var dbConfig = require('../database/DBConfig')
var userSql = require('../database/usersql')

//使用DBConfig.js的配置信息创建一个mysql的连接池
var pool = mysql.createPool(dbConfig.mysql);

//响应一个JSON数据
var responseJSON = function(res, ret){
    if(typeof ret === 'undefined'){
        res.json({ code: '-200', msg: '操作失败'} )
    } else{
        res.json(ret)
    }
};

//添加用户
router.get('/addList', function(req, res, next){
    // 从连接池获取连接
    pool.getConnection(function(err,connection){
        //获取前台页面传过来的参数
        var param = req.query || req.params;
        //建立连接 增加一个用户信息
        connection.query(userSql.insert, [param.imgUrl, param.title], function(err, result){
            var responseResult
            if(result){
                responseResult = {
                    code: 200,
                    msg: '增加成功'
                }
            }
            // 以json格式，把操作结果返回给前台页面
            responseJSON(res, responseResult);
            //释放连接
            connection.release();
        })
    })
})
module.exports = router
