// 编写Category的Schema,可以把Schema想象成数据库collections的一个复制映射,它是和数据可里的collection对应的
const mongoose = require('mongoose')        //引入Mongoose
const Schema = mongoose.Schema              //声明Schema

const categorySchema = new Schema({
  ID:{unique:true,type:String},
  MALL_CATEGORY_NAME:{type:String},
  IMAGE:{type:String},
  TYPE:{type:Number},
  SORT:{type:Number},
  COMMENTS:{type:String}
})

mongoose.model('Category', categorySchema)
