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

// 添加用户
router.get('/getList', function(req, res, next){
    // 从连接池获取连接
    pool.getConnection(function(err,connection){
        //获取列表
        var param = req.query || req.params;
        var start = (param.page - 1) * 10 || 0
        var pageSize = 10
        var length = 0;
        connection.query(userSql.queryAll, function(err, result){
            //获取前台页面传过来的参数
            if(result){
                length = result.length
            }
        })
        connection.query(userSql.query, [start, pageSize], function(err, result){
            //获取前台页面传过来的参数
            var responseResult
            if(result){
                responseResult = {
                    code: 200,
                    data: {currentPage: param.page,result, lastPage: Math.ceil(length/pageSize), pageSize: pageSize, total: length}
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
