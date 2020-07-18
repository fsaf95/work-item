// 定义一个用户表
const mongoose = require('mongoose')    //引入mongoose
const Schema = mongoose.Schema          //声明Schema
let ObjectId = Schema.Types.ObjectId    //声明Object类型
const bcrypt = require('bcrypt')        //引入bcrypt
const SALT_WORK_FACTOR = 10

// 创建我们的用户Schema
const userSchema = new Schema({
  UserId:ObjectId,
  userName:{unique:true,type:String},
  password:String,
  createAt:{type:Date,default:Date.now()},
  lastLoginAt:{type:Date,default:Date.now()},
},{
  collection:'user'
})
//每次存储数据时都要执行
userSchema.pre('save', function(next){
    bcrypt.genSalt( SALT_WORK_FACTOR,(err,salt)=>{
        if(err) return next(err)
        bcrypt.hash(this.password,salt, (err,hash)=>{
            if(err) return next(err)
            this.password = hash
            next()
        })

    })
})

userSchema.methods={
  // 密码比对的方法
  // 声明了一个实例方法，方法叫做comparePassword，然后传递两个参数，一个是客户端密码，一个是数据库取出来的密码。用bcrypt提供的compare方法就可以比对，最后包装成Promise返回就可以了。
  comparePassword:(_password,password)=>{
    return new Promise((resolve,reject)=>{
      bcrypt.compare(_password,password,(err,isMatch)=>{
        if(!err) resolve(isMatch)
        else reject(err)
      })
    })
  }
}


// 发布模型
mongoose.model('User',userSchema)
