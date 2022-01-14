const express = require('express')
var path = require('path');
const app = express()
const port = 3000

app.use((req, res, next) => {
    //设置请求头
    res.set({
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Max-Age': 1728000,
        'Access-Control-Allow-Origin': req.headers.origin || '*',
        'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type',
        'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
        'Content-Type': 'application/json; charset=utf-8'
    })
    req.method === 'OPTIONS' ? res.status(204).end() : next()
})
app.use('/users', require('./routes/addList'));
app.use('/users', require('./routes/list'));
app.use('/users', require('./routes/delList'));
app.use('/users', require('./routes/editList'));
app.use('/users', require('./routes/getTime'));
app.use('/users', require('./routes/editTime'));
// 利用express.static中间件来托管静态资源。
app.use(express.static(path.join(__dirname, 'files')));
app.use('/imgUpload', require('./routes/imgUpload'));
app.get('/', (req, res) => {
    return res.json({
        code: 0,
        data: 'hello worldddd!'
    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
