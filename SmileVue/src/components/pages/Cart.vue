<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar title="购物车"/>
    </div>
    <div class="cart-title">
        <van-button size="small" type="danger" @click="clearCart" plain>清空购物车</van-button>
    </div>
    <!-- 显示购物车中的商品 -->
    <div class="cart-list">
      <div class="pang-row" v-for="(item,index) in cartInfo" :key="index">
        <div class="pang-img">
          <img :src="item.image" width="100%" />
        </div>
        <div class="pang-text">
          <div class="pang-goods-name">
            {{item.name}}
            &nbsp;&nbsp;  ￥{{item.price | moneyFilter}}
          </div>
          <div class="pang-tow">
            <div class="pang-goods-price">
              <div class="allPrice">
                ￥{{item.price*item.count | moneyFilter}}
              </div>
            </div>
            <div class="pang-control">
              <van-stepper v-model="item.count" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 显示总金额 -->
    <div class="totalMoeny">
      商品总价: ￥{{totalMoeny | moneyFilter}}
    </div>
  </div>
</template>

<script>
  import {toMoney} from '@/filter/moneyFilter.js'
  export default {
      data() {
          return {
              cartInfo: [],     //购物车内的商品
              isEmpty : false , //购物车是否为空，不为空则显示true，为空显示false
          }
      },
      filters:{
        moneyFilter(money){
           return toMoney(money)
        }
      },
      created(){
          this.getCartInfo()
      },
      computed:{
        totalMoeny(){
            let allMoney = 0
            this.cartInfo.forEach((item,index)=>{
              allMoney += item.price*item.count
            })
            // 商品价格的保存
            localStorage.cartInfo = JSON.stringify(this.cartInfo)
            return allMoney
        }
      },
      methods: {
        //得到购物车的商品
        getCartInfo() {
            //判断localStorage里是否有购物车数据
            if(localStorage.cartInfo){
                //如果有数据，我们去除并赋值给cartInfo
                this.cartInfo = JSON.parse(localStorage.cartInfo)
            }
            //打印到控制台查看效果
            console.log(' this.cartInfo:'+JSON.stringify( this.cartInfo))
            this.isEmpty = this.cartInfo.length>0 ? true : false
        },
        // 清空购物车的商品
        clearCart(){
          localStorage.removeItem('cartInfo')
          this.cartInfo = []
        }
      },
  }
</script>

<style>
  .cart-title{
    height: 2rem;
    line-height: 2rem;
    background-color: #FFFFFF;
    border-bottom: 1px solid #E4E7ED;
    padding: 5px;
    text-align: right;
  }
  .cart-list{
    background-color: #FFFFFF;
  }
  .pang-row{
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    padding: 0.5rem;
    font-size: 0.85rem;
    border-bottom: 1px solid #E4E7ED;
  }
  .pang-img{
    flex: 6;
  }
  .pang-text{
    flex: 18;
    padding-left: 10px;
  }
  .pang-tow{
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      padding-top: 20px;
  }
  .pang-control{
    flex: 10;
    padding-top: 10px;
  }
  .pang-goods-price{
    flex: 14;
    text-align: left;
    line-height: 50px;
  }
  .allPrice{
    color: red;
  }
  .totalMoeny{
    text-align: right;
    background-color: #FFFFFF;
    border-bottom: 1px solid #E4E7ED;
    padding: 5px;
  }
</style>
