<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper">
        <ul>
          <!--current-->
          <li class="menu-item" v-for="(good, index) in store" :key="index"
              :class="{current: index===currentIndex}" @click="clickMenuItem(index)">
            <span class="text bottom-border-1px">
              <img class="icon" :src="good.icon" v-if="good.icon">
              {{good.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper">
        <ul ref="foodsUl">
          <li class="food-list-hook" v-for="(good, index) in store" :key="index">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px" v-for="(food, index) in good.foods"
                  :key="index" @click="showFood(food)">
                <div class="icon">
                  <img width="57" height="57" :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <counter :food="food"></counter>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      
    </div>
    
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import BScroll from 'better-scroll'
import counter from '../../components/shop/counter/counter.vue'
export default {
  mounted () {
    this.$store.dispatch('mockstore', () => { // 因为 ul 是异步渲染的  需要在异步数据渲染完成后在去初始化scroll 对象 // 这里其实 可以传参数给 acitons 
      this.$nextTick( () => { 
        this._initscroll()
        this._initTops()
      })
    })  
  },
  components: {
    counter
  },
  data () {
    return {
      scrollY: 0,
      tops: []
    }
  },
  computed : {
    ...mapState(['store']),
    currentIndex () {
      const {scrollY, tops} = this
      const index = [...tops].findIndex((top, index) => {
        return scrollY >= top && scrollY < tops[index + 1]
      })
      return index
    }
  },
  methods: {
    _initscroll () {
      new BScroll('.menu-wrapper',{click: true}) 
      this.fBS = new BScroll('.foods-wrapper', {probeType: 2, click: true}) // 第一个参数为包裹ul容器class  传递第二个配置参数 
      /* 
      probeType: 2  表示允许获取y轴滑动距离
      
      */
      this.fBS.on('scroll', ({x, y}) => { // 需要借助 better-scroll 提供的on 函数来绑定滑动事件, 回调函数中 x,y 分别表示 滑动的x y轴距离
        this.scrollY = Math.abs(y)      
      })
      this.fBS.on('scrollEnd', ({x, y}) => { // 需要借助 better-scroll 提供的on 函数来绑定滑动事件, 回调函数中 x,y 分别表示 滑动的x y轴距离
        this.scrollY = Math.abs(y)      
      })
    },
    _initTops () {
      let tops = [];
      let top = 0;
      tops.push(top)
      let lis = this.$refs.foodsUl.querySelectorAll('.food-list-hook');
      [...lis].forEach((li) => {
        top += li.clientHeight
        tops.push(top)
      })
      this.tops = tops
    },
    clickMenuItem (index) {
      this.scrollY = this.tops[index];
      this.fBS.scrollTo(0,-this.tops[index], 200)
    }
  },
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common-css/mixin.styl"
  .goods
    display: flex
    position: absolute
    top: 205px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>