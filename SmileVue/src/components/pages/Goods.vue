<template>
  <div>
    <!-- 使用NavBar组件来制作头部导航 -->
    <div class="navbar-div">
      <van-nav-bar
        title="商品详情"
        left-text="返回"
        left-arrow
        @click-left = "onClickLeft"
      />
      <!--
          解释:
          title:是显示的标题，这里就起名字叫商品详情了
          left-text：是左侧显示的内容，这里显示“返回”两个字
          left-arrow：是否显示左侧箭头，默认值是true，也就是显示。
          @click-left:绑定左侧按钮时触发的事件方法，方法名字叫做onClickLeft
       -->
    </div>
    <div class="topimage-div">
      <!-- img标签把头图显示出来 -->
      <img :src="goodsIdfo.IMAGE1" width="100%" />
    </div>
    <div class="goods-name">{{ goodsIdfo.NAME}}</div>
    <div class="goods-price">价格: ￥{{ goodsIdfo.PRESENT_PRICE | moneyFilter}}元</div>
    <div class="goods-content">
      <van-tabs swipeable sticky>
        <van-tab title="商品详情">
          <div class="detail" v-html="goodsIdfo.DETAIL">

          </div>
        </van-tab>
        <van-tab title="评价">
          正在制作中
        </van-tab>
      </van-tabs>
    </div>

    <div class="goods-bottom">
      <div>
        <van-button size="large " type="primary" @click="addGoodsToCart" >加入购物车</van-button>
      </div>
      <div>
        <van-button size="large" type="danger">直接购买</van-button>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import url from '@/serviceAPI.config.js'
  import { Toast } from 'vant'
  import {toMoney} from '@/filter/moneyFilter.js'
  export default {
    data() {
      return {
          goodsId: '',
          goodsIdfo:{},       //在data进行注册商品详细数据
      }
    },
    filters:{
      moneyFilter(money){
        return toMoney(money)
     }
    },
    // 在生命周期初始化的时候调用这个getInfo方法
    created(){
      this.goodsId= this.$route.query.goodsId ? this.$route.query.goodsId:this.$route.params.goodsId
      console.log(this.goodsId)
      this.getInfo()
    },

    // 方法,
    methods: {
      getInfo() {
          axios({
              url:url.getDetailGoodsInfo,
              method:'post',
              data:{
                  goodsId:this.goodsId
              }
          })
          .then(response=>{
            // 赋值前判断一下code的值和message不为空
              if(response.data.code == 200 && response.data.message ){
                this.goodsIdfo = response.data.message
              }else{
                Toast('服务器错误,数据取得失败')
              }
              console.log( this.goodsIdfo )
          })
          .catch(error=>{
              console.log(error)
          })
      },
      onClickLeft(){
        this.$router.go(-1)
      },
      // 向购物车中添加商品
      addGoodsToCart(){
        //取出购物车内的商品数据
        // 因为取出的是字符串所以使用三元运算符JSON.parse()转换成对象数组
        let cartInfo = localStorage.cartInfo ? JSON.parse(localStorage.cartInfo) :[]
        //判断购物车内是否已经有这个商品
        //如果没有返回undeifnd，如果有返回第一个查找到的数据,find是查找的方法
        let isHaveGoods = cartInfo.find(cart=>cart.goodsId == this.goodsId)
        console.log(isHaveGoods)
        if(!isHaveGoods){
            //没有商品直接添加到数组中
            //重新组成添加到购物车的信息
            let newGoodsInfo = {
              goodsId:this.goodsIdfo.ID,
              name:this.goodsIdfo.NAME,
              price:this.goodsIdfo.PRESENT_PRICE,
              image:this.goodsIdfo.IMAGE1,
              count:1
            }
            cartInfo.push(newGoodsInfo) //添加到购物车 cartInfo
            localStorage.cartInfo = JSON.stringify(cartInfo) //操作本地数据
            Toast.success('添加成功')

        }else{
            Toast.success('已有此商品')
        }
        this.$router.push({name:'Cart'})  //进行跳转
      },

    },

  }
</script>

<style>
  .detail{
    font-size:0px;
  }
  .goods-name{
    background-color: #fff;
  }
  .goods-price{
    background-color: #fff;
  }
  .goods-content{
    margin-bottom: 3.5rem;
  }
  .goods-bottom{
      position: fixed;
      bottom:0px;
      left:0px;
      background-color: #FFF;
      width:100%;
      display: flex;
      flex-direction: row;
      flex-flow: nowrap;
  }
  .goods-bottom > div{
      flex:1;
      padding:5px;
  }
</style>
