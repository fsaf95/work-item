// serviceAPI.config.js接口配置文件
const BASEURL = "http://mock.studyinghome.com/mock/5ec625924006b044ae246419/SmileVue/" //基本路径
const LOCALURL = "http://localhost:3000/" //加入我们的注册接口地址

const URL = {
  getShoppingMallInfo: BASEURL + 'index', //商城首页所有信息
  getGoodsInfo: BASEURL + 'getGoodsInfo', //
  // 解释：这里主要加入了LOCALURL常量的声明，用于存储本地请求路径，和在URL里增加了registerUser接口的地址配置。
  registerUser: LOCALURL + 'user/register', //用户注册接口，
  login: LOCALURL + 'user/login', //用户登录接口
  getDetailGoodsInfo: LOCALURL + 'goods/getDetailGoodsInfo', //获取商品详情
  getCategoryList:LOCALURL+'goods/getCategoryList',         //得到大类信息
  getCategorySubList:LOCALURL+'goods/getCategorySubList',   //得到小类信息
  getGoodsListByCategorySubID:LOCALURL+'goods/getGoodsListByCategorySubID',   //得到小类商品信息

}
module.exports = URL
