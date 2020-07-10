<template>
    <div class="pos">
      <el-row>
        <el-col :span='7' class="pos-order" id="order-list">
          <el-tabs>
            <!-- 点餐栏 -->
            <el-tab-pane label="点餐">
              <el-table :data="tableData" border style="width:100%" >
                <el-table-column prop="goodsName" label="商品名称"></el-table-column>
                <el-table-column prop="count" label="数量" width="60"></el-table-column>
                <el-table-column prop="price" label="金额" width="80"></el-table-column>
                <el-table-column fixed="right" label="操作" width="100">
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click="delSingleGoods(scope.row)">删除</el-button>
                    <el-button type="text" size="small" @click="addOrderList(scope.row)">增加</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div class="totaDiv">
                <!-- 获取数量totalCount 和总价格totalMoney -->
                <small>数量:</small>{{totalCount}} <small>金额:</small>{{totalMoney}}<small>元</small>
              </div>
              <div class="div-btn">
                <el-button type="warning">挂单</el-button>
                <el-button type="danger" @click="delAllGoods()">删除</el-button>
                <el-button type="success" @click="checkout()">结账</el-button>
              </div>
            </el-tab-pane>

            <!-- 挂单栏 -->
            <el-tab-pane label="挂单">
              挂单
            </el-tab-pane>

            <!-- 外卖栏 -->
            <el-tab-pane label="外卖">
              外卖
            </el-tab-pane>
          </el-tabs>
        </el-col>
        <el-col :span='17'>
          <!-- 常用商品 -->
          <div class="often-goods">
            <div class="title">常用商品</div>
            <div class="often-goods-list">
              <ul>
                <!-- @click="addOrderList(goods)" 绑定添加方法 -->
                <li v-for="(goods, often) in oftenGoods" :key="often" @click="addOrderList(goods)">
                  <span>{{goods.goodsName}}</span>
                  <span class="o-price">￥{{goods.price}}元</span>
                </li>
              </ul>
            </div>
          </div>
          <!--  -->
          <div class="goods-type">
            <el-tabs>
              <el-tab-pane label='汉堡'>
                <ul class='cookList'>
                  <li v-for="(goods, type) in type0Goods" :key="type" @click="addOrderList(goods)">
                    <span class="foodImg">
                      <img :src="goods.goodsImg" width="100%">
                    </span>
                    <span class="foodName">{{goods.goodsName}}</span>
                    <span class="foodPrice">￥{{goods.price}}元</span>
                  </li>
                </ul>
              </el-tab-pane>
              <el-tab-pane label='小食'>
                <ul class='cookList'>
                    <li v-for="(goods, type1) in type1Goods" :key="type1" @click="addOrderList(goods)">
                        <span class="foodImg">
                            <img :src="goods.goodsImg" width="100%">
                        </span>
                        <span class="foodName">{{goods.goodsName}}</span>
                        <span class="foodPrice">￥{{goods.price}}元</span>
                    </li>
                </ul>
              </el-tab-pane>
              <el-tab-pane label='饮料'>
                <ul class='cookList'>
                    <li v-for="(goods, type2) in type2Goods" :key="type2" @click="addOrderList(goods)">
                        <span class="foodImg">
                            <img :src="goods.goodsImg" width="100%">
                        </span>
                        <span class="foodName">{{goods.goodsName}}</span>
                        <span class="foodPrice">￥{{goods.price}}元</span>
                    </li>
                </ul>
              </el-tab-pane>
              <el-tab-pane label='套餐'>
                <ul class='cookList'>
                    <li v-for="(goods, type3) in type3Goods" :key="type3" @click="addOrderList(goods)">
                        <span class="foodImg">
                            <img :src="goods.goodsImg" width="100%">
                        </span>
                        <span class="foodName">{{goods.goodsName}}</span>
                        <span class="foodPrice">￥{{goods.price}}元</span>
                    </li>
                </ul>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-col>
      </el-row>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Pos',
  data () {
    return {
      tableData: [], // 订单列表的值
      oftenGoods: [],
      type0Goods: [],
      type1Goods: [],
      type2Goods: [],
      type3Goods: [],
      totalMoney: 0, // 订单总价格
      totalCount: 0 // 订单商品总数量
    }
  },
  mounted: function () {
    var orderHeight = document.body.clientHeight
    document.getElementById('order-list').style.height = orderHeight + 'px'
  },
  // 在methods 中声明方法
  methods: {
    // 添加订单列表的方法
    addOrderList (goods) {
      this.totalCount = 0 // 汇总数量清0
      this.totalMoney = 0 // 订单的总价格清0
      let isHave = false
      // 判断是否这个商品已经存在于订单列表中
      for (let i = 0; i < this.tableData.length; i++) {
        console.log(this.tableData[i].goodsId)
        // 判断 tableData[i].goodsId 是否等于 传进来的 goods.goodsId
        if (this.tableData[i].goodsId === goods.goodsId) {
          isHave = true // 商品存在订单列表中
        }
      }
      // 根据isHave的值来判断订单列表中是否已经存在这个商品
      if (isHave) {
        // 存在就进行商品数量添加
        let arr = this.tableData.filter(o => o.goodsId === goods.goodsId)
        arr[0].count++
        //  console.log(arr);
      } else {
        // 不存在就新创建一个 goods 加入数组中
        let newGoods = {goodsId: goods.goodsId, goodsName: goods.goodsName, price: goods.price, count: 1}
        this.tableData.push(newGoods)
      }
      this.getAllMoney()
    },
    // 删除商品方法
    delSingleGoods (goods) {
      // 过滤方法，
      this.tableData = this.tableData.filter(o => o.goodsId !== goods.goodsId)
      this.getAllMoney()
    },
    // 删除所有商品数据
    delAllGoods () {
      this.tableData = []
      this.totalCount = 0
      this.totalMoney = 0
    },
    // 汇总数量和金额
    getAllMoney () {
      this.totalCount = 0
      this.totalMoney = 0
      if (this.tableData) {
        // 进行数量和价格的汇总计算
        this.tableData.forEach((element) => {
          this.totalCount += element.count
          this.totalMoney = this.totalMoney + (element.price * element.count)
        })
      }
    },
    // 结账方法模拟
    checkout () {
      // 判断是否有值，如果等于0就是没值
      if (this.totalCount !== 0) {
        // 有值，将数据清空，显示结账成功
        this.tableData = []
        this.totalCount = 0
        this.totalMoney = 0
        this.$message({
          message: '结账成功，感谢你又为店里出了一份力!',
          type: 'success' // 弹出的样式
        })
      } else {
        this.$message.error('不能空结。老板了解你急切的心情！')
      }
    }
  },
  created () {
  // 读取常用商品列表
    axios.get('https://www.fastmock.site/mock/2a1b64bbf15c90d03379f16c42b4d823/oftenGoods/oftenGoods')
      .then(response => {
        console.log(response)
        this.oftenGoods = response.data.oftenGoods
      })
      .catch(error => {
        console.log(error)
        alert('网络错误，不能访问')
      })
    // 读取分类商品列表
    axios.get('https://www.fastmock.site/mock/2a1b64bbf15c90d03379f16c42b4d823/oftenGoods/type0Goods')
      .then(response => {
        // console.log(response);
        // this.oftenGoods=response.data;
        this.type0Goods = response.data.data[0]
        this.type1Goods = response.data.data[1]
        this.type2Goods = response.data.data[2]
        this.type3Goods = response.data.data[3]
      })
      .catch(error => {
        console.log(error)
        alert('网络错误，不能访问')
      })
  }
}
</script>

<style scoped>
  .pos{
    background-color: aliceblue;
  }
  .pos-order {
    background-color: aliceblue;
    border-right: 1px solid #c0ccc0;
  }
  .div-btn {
    margin-top: 10px;
    text-align: center;
  }
  .title{
    height: 20px;
    border-bottom: 1px solid #D3dce6;
    background-color: #d3e5fa;
    padding: 10px;
    text-align: left;
  }
  .often-goods-list ul li{
    list-style: none;
    float: left;
    border: 1px solid #D3dce6;
    padding: 10px;
    margin: 10px;
    background-color: #d3e5fa;
  }
  .o-price {
    color: #58B7FF;
  }
  .goods-type{
    clear: both;
  }
  .cookList li{
    list-style: none;
    width:23%;
    border:1px solid #E5E9F2;
    height: auot;
    overflow: hidden;
    background-color:#fff;
    padding: 2px;
    float:left;
    margin: 2px;
    cursor: pointer;
  }
  .cookList li span{
    display: block;
    float:left;
  }
  .foodImg{
    width: 40%;
  }
  /* .foodImg img{
    widows: 80px;
    height: 50px;
  } */
  .foodName{
    font-size: 16px;
    padding-left: 10px;
    color:brown;
  }
  .foodPrice{
    font-size: 16px;
    padding-left: 10px;
    padding-top:10px;
  }
  .goods-type{
    height: auto;
    overflow: hidden;
    border-top: 1px solid #d3dce6;
  }
  .totaDiv{
    background-color: #FFF;
    padding: 10px;
    border-bottom: 1px solid #d3dce6;
  }
</style>
