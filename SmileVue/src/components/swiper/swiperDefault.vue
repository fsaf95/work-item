<template>
  <div >
      <swiper :options="swiperOption">
        <swiper-slide class="swiper-slide" v-for="(item, index) in slide" :key="index">
           Slide {{item}}
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
  </div>
</template>

<script>
    import { Swiper, SwiperSlide, } from 'vue-awesome-swiper'
    import 'swiper/css/swiper.css'
    export default {
        data() {
            return {
                slide: [1,2,3,4,5,6],
                swiperOption:{
                  autoplay:true,
                  loop:true,  //无限循环滚动
                  pagination:{
                    el:'.swiper-pagination',
                    // swiper分页器加了选择功能
                    clickable:true
                  }
                }
            }
        },
        components:{Swiper,SwiperSlide}
    }
</script>

<style scoped>
  .swiper-slide{
      height: 4rem;
      text-align: center;
      padding-top: 3rem;
      border-bottom: 1px solid #ccc;
  }
</style>
