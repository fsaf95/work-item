<template>
  <div>
    <div class="search-bar">
      <van-row>
        <van-col span="3">
          <img :src="locationIcon" class="location-icon" />
        </van-col>
        <van-col span="16">
          <input type="text" class="search-input" />
        </van-col>
        <van-col span="5">
          <van-button size="mini">查找</van-button>
        </van-col>
      </van-row>
    </div>

    <!-- swipwer area -->
    <div class="swiper-area">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(banner,index) in bannerPicArray" :key="index">
          <!-- 加入v-lazy="banner.imageUrl"就可以图片的懒加了。 -->
          <img v-lazy="banner.image" width="100%" />
        </van-swipe-item>
      </van-swipe>
    </div>

    <!-- type bar -->
    <div class="type-bar">
      <div class="type-item" v-for="(cate,index) in category" :key="index">
        <img v-lazy="cate.image" width="90%" />
        <span>{{cate.mallCategoryName}}</span>
      </div>
    </div>

    <!-- AD banner area -->
    <div class="ad-banner">
      <img v-lazy="adBanner.PICTURE_ADDRESS" width="100%" />
    </div>

    <!-- Recommend goods area -->
    <div class="recommend-area">
      <div class="recommend-title">
        商品推荐
      </div>
      <div class="recommend-body">
        <!-- swiper -->
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item, index) in recommendGoods" :key="index">
            <div class="recommend-item">
              <img :src="item.image" width="60%" />
              <div>{{item.goodsName}}</div>
              <div>￥{{item.price | moneyFilter }} (￥{{item.mallPrice | moneyFilter }})</div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>

    <!-- floorComponent组件   父组件向子组件转递数据  绑定属性的形式传入需要的值 -->
    <floorComponent :floorData="floor1" :floorTitle="floorName.floor1"></floorComponent>
    <floorComponent :floorData="floor2" :floorTitle="floorName.floor2"></floorComponent>
    <floorComponent :floorData="floor3" :floorTitle="floorName.floor3"></floorComponent>

    <!--Hot Area-->
    <div class="hot-area">
      <div class="hot-title">热卖商品</div>
      <div class="hot-goods">
        <van-list>
          <van-row gutter="20">
            <van-col span="12" v-for="( item, index) in hotGoods" :key="index">
              <goods-info :goodsId="item.goodsId" :goodsImage="item.image" :goodsName="item.name" :goodsPrice="item.price"></goods-info>
            </van-col>
          </van-row>
        </van-list>
      </div>
    </div>
  </div>
</template>

<script>
  // 安装axios之后在要使用的页面组件中进行引入。
  import axios from 'axios'
  import { Swiper, SwiperSlide, } from 'vue-awesome-swiper'
  import 'swiper/css/swiper.css'
  import floorComponent from '../component/floorComponent'  //引入floorComponent组件
  import {toMoney} from '@/filter/moneyFilter.js'           //引入moneyFilter过滤器
  import goodsInfo from '../component/goodsInfoComponent'   //引入goodsInfoComponent组件
  import url from '@/serviceAPI.config.js'                  //引入接口配置文件

  export default {
    data() {
      return {
        swiperOption:{
          slidesPerView:3,
          autoplay:true,
          loop:true,
          pagination:{
            el:'.swiper-pagination'
          }
        },
        msg: 'ShoppingMall',
        locationIcon: require('../../assets/images/location.png'),
        category: [],             //商品类别标签栏
        adBanner: '',             //广告图片
        bannerPicArray: [],       //轮播图片
        recommendGoods:[],        //推荐商品
        floor1:[],                //注册一个floor1的数组变量floor1:[]，在axios里得到数据。
        floor2:[],                //楼层2的数据
        floor3:[],                //楼层3的数据
        floorName:{},             //楼层的名称
        hotGoods:[],              //热卖商品
      }
    },
    filters:{
      moneyFilter(money){
        return toMoney(money)
      }
    },
    components: {
      Swiper,
      SwiperSlide,
      floorComponent,             //注册floorComponent组件
      goodsInfo                   //注册goodsInfoComponent组件
    },
    // 在created的声明周期里取得数据
    created() {
      axios({
          url: url.getShoppingMallInfo,
          method: 'get',
        })
      .then(response => {
        console.log(response)
        if (response.status == 200) {
          this.category = response.data.data.category;
          this.adBanner = response.data.data.advertesPicture; //获得广告图片
          this.bannerPicArray = response.data.data.slides;    //获得轮播图片
          this.recommendGoods = response.data.data.recommend;  //获得商品
          this.floor1 = response.data.data.floor1;             //获得楼层1数据
          this.floor2 = response.data.data.floor2;             //获得楼层2数据
          this.floor3 = response.data.data.floor3;             //获得楼层3数据
          this.floorName = response.data.data.floorName;       //楼层名称
          this.hotGoods = response.data.data.hotGoods;         //热门商品
        }
      })
      .catch(error => {
        console.log(error)
      })
    }
  }
</script>

<style scoped>
  .search-bar {
    height: 2.2rem;

    background-color: #e5017d;
    line-height: 2.2rem;
    overflow: hidden;
  }

  .location-icon {
    width: 80%;
    padding-top: .2rem;
    padding-left: .3rem;
  }

  .search-input {
    width: 100%;
    height: 1.3rem;
    border-top: 0px;
    border-left: 0px;
    border-right: 0px;
    border-bottom: 1px solid #fff !important;
    background-color: #e5017d;
    color: #fff;
  }

  .swiper-area {
    width: 20rem;
    max-height: 15rem;
    clear: both;
    /*在左右两侧均不允许浮动元素。*/
    overflow: hidden;
    /*内容会被修剪，并且其余内容是不可见的。*/
  }

  .type-bar {
    background-color: #fff;
    margin: 0 .3rem .3rem .3rem;
    border-radius: .3rem;
    font-size: 14px;
    display: flex;
    /*弹性容器通过设置 display 属性的值为 flex 或 inline-flex将其定义为弹性容器。*/
    flex-direction: row;
    /*灵活的项目将水平显示。*/
    flex-wrap: nowrap;
    /*规定灵活的项目不拆行或不拆列。*/
  }
  .type-bar div {
    padding: .3rem;
    font-size: 12px;
    text-align: center;
  }
  .type-item{
    flex: 1;
  }
  .recommend-area{
    background-color: #fff;
    margin-top: .3rem;
  }
  .recommend-title{
    border-bottom:1px solid #eee;
    font-size:14px;
    padding:.2rem;
    color:#e5017d;
  }
  .recommend-body{
    border-bottom: 1px solid #eee;
   }
  .recommend-item{
    width:99%;
    border-right: 1px solid #eee;
    font-size: 12px;
    text-align: center;
  }
  .hot-area{
    text-align: center;
    font-size:14px;
    height: 1.8rem;
    line-height:1.8rem;
  }
  .hot-goods{
    height: 130rem;
    overflow: hidden;
    background-color: #FFFFFF;
  }
</style>
