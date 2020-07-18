<template>
  <div>
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide class="text">
        <div class="centent">
          在移动布局里，在大段文章的下拉上拉时，有些老旧手机会有卡顿效果。
          都需要我们自己加入上划下拉的组件，这里就可以直接使用vue-awesome-swiper来解决。
          我们作一个组件，里边有一大段文字，然后给文字加入顺畅的下拉上拉效果。
          重点看一下options的加入属性：

          direction：'vertical'设置竖排显示

          slidesPerView:'auto' 设置同屏显示的数量，默认为1，这里使用auto是随意的意思。

          freeMode:true 默认为false，普通模式：slide滑动时只滑动一格，并自动贴合wrapper，设置为true则变为free模式，slide会根据惯性滑动可能不止一格且不会贴合。

          mousewheel:true 开启鼠标滚轮控制Swiper切换。可设置鼠标选项，或true使用默认值。

          只要掌握好这些属性，其实做出文本滑动效果是非常简单的。
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
    import { Swiper, SwiperSlide, } from 'vue-awesome-swiper'
    import 'swiper/css/swiper.css'
    export default {
      data(){
        return{
          swiperOption:{
            direction:'vertival',    //设置竖排显示
            slidesPerView:'auto',    //设置同屏显示的数量，默认为1，这里使用auto是随意的意思。
            freeMode:true,           //默认为false，普通模式：slide滑动时只滑动一格，并自动贴合wrapper，设置为true则变为free模式，slide会根据惯性滑动可能不止一格且不会贴合。
            mousewheel:true          //开启鼠标滚轮控制Swiper切换。可设置鼠标选项，或true使用默认值。
          }
        }
      },
      components:{
        Swiper,
        SwiperSlide
      }
    }
</script>

<style>
  .swiper{
    height: 300px;
    overflow: hidden;
  }
  .text{
    font-size: 18px !important;
    text-align: left;
    padding: 30px;
    height: auto;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
</style>
