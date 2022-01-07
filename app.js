const express = require('express')
const app = express()
const port = 3000

app.use('/users', require('./routes/users'));
app.get('/', (req, res) => {
    return res.json({
        code: 0,
        data: 'hello worldddd!'
    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
