const Koa = require('koa')
const app = new Koa()
const mongoose = require('mongoose')
const {connect , initSchemas} = require('./database/init.js')
const bodyParser = require('koa-bodyparser')              //引入中间件koa-bodyparser
const cors = require('koa2-cors')                         //引入koa2-cors
const Router = require('koa-router')                      //引入koa-router

// 注册bodyParser中间件
app.use(bodyParser())
// 注册koa2-cors
app.use(cors())

// 引入我们的user.js和home.js模块
let user = require('./appApi/user.js')
let home = require('./appApi/home.js')
let goods = require('./appApi/goods.js')
// 装载所有的子路由
let router = new Router();
router.use('/user',user.routes())
router.use('/home',home.routes())
router.use('/goods',goods.routes())
// 加载路由中间件
app.use(router.routes())
app.use(router.allowedMethods())

// 立即执行函数
;(async () =>{
    await connect()
    initSchemas()
})()


app.use(async(ctx)=>{
    ctx.body = '<h1>hello Koa2</h1>'
})

app.listen(3000,()=>{
    console.log('[Server] starting at port 3000')
})
