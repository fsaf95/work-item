// database文件夹用来存放和数据库操作有关的文件
// init.js文件用来作数据库的连接和一些初始化的事情
const mongoose = require('mongoose')
const db = "mongodb://localhost/simle-db"
const glob = require('glob')
const {resolve} = require('path')

// 使用了glob.sync同步引入所有的schema文件，然后用forEach的方法require（引入）进来
exports.initSchemas = () =>{
  glob.sync(resolve(__dirname,'./schema/','**/*.js')).forEach(require)
}

exports.connect = ()=>{
    //连接数据库
    mongoose.connect(db)
    // 首先声明一个最大连接数maxConnectTimes
    let maxConnectTimes = 0

    return  new Promise((resolve,reject)=>{
      //把所有连接放到这里

      //增加数据库连接的事件监听
      mongoose.connection.on('disconnected',()=>{
          console.log('***********数据库断开***********')
          if(maxConnectTimes<3){
              maxConnectTimes++
              mongoose.connect(db)
          }else{
              reject()
              throw new Error('数据库出现问题，程序无法搞定，请人为修理......')
          }

      })

      //数据库出现错误的时候
      mongoose.connection.on('error',err=>{
          console.log('***********数据库错误***********')
          if(maxConnectTimes<3){
              maxConnectTimes++
              mongoose.connect(db)
          }else{
              reject(err)
              throw new Error('数据库出现问题，程序无法搞定，请人为修理......')
          }

      })
      //链接打开的时候
      mongoose.connection.once('open',()=>{
          console.log('MongoDB connected successfully')
          resolve()
      })

    })


}
