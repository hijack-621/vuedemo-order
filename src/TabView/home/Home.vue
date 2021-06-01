<template>
    <div class="msite">
        <!--首页头部-->
 
        <myheader :position="Position.name" :title="Position.name" ref="myh" >
           <router-link class="header_search" slot="left" to="/search" tag="span">
              <i class="iconfont icon-sousuo"></i>
          </router-link>
          <router-link tag="span" class="header_login" slot="right" :to=" userInfo.data ? '/userinfo' : '/login' ">
            <!-- slot 属性指定 这里的标签结构传递给哪一个slot 插槽！！！ -->
            <span class="header_login_text" v-if="!userInfo.data">
              登录|注册
            </span>
            <span class="header_login_text" v-else>
              <i class="iconfont icon-person"></i>
            </span>
          </router-link>
          
        </myheader>

        <!--首页导航-->
        <nav class="msite_nav">
          <div class="swiper-container">
            <div class="swiper-wrapper" v-if="CateList.length">
              <div class="swiper-slide" v-for="(item,index) in CateList2" :key="index">
                <a href="javascript:" class="link_to_food" v-for="(a_item,a_key) in item" :key="a_key">
                  <div class="food_container">
                    <img :src="baseImageUrl+a_item.image_url">
                  </div>
                  <span>{{ a_item.title }}</span>
                </a>
              </div>
            </div>
            <div v-else>
              <img src="../../../static/images/Msite_back.svg" alt="back">  
            </div> 
            <!-- Add Pagination -->
            <div class="swiper-pagination"></div>
          </div>
        </nav>
        <!--首页附近商家-->
        <div class="msite_shop_list">
          <div class="shop_header">
            <i class="iconfont icon-xuanxiang"></i>
            <span class="shop_header_title">附近商家</span>
          </div>
          <shoplist/>
        </div>
      </div>
</template>

<script>
  import myheader from '../../components/Header/header.vue'
  import shoplist from '../../components/content/shopList.vue'
  import Swiper from 'swiper'
  import 'swiper/css/swiper.min.css'
 // Swiper.use([Pagination,Navigation])//swiper6 只能导入核心，分页等功能需要结构语法导出！！！并挂载到 swiper对象上使用！！！
  import {mapState} from 'vuex'
export default {
    mounted(){
      this.$store.dispatch('trigger_getCateList')
    },
    methods:{
      showtitle(){
        console.log(this.$refs.myh)
      }
    },
    components:{
      myheader,
      shoplist,
    },
    computed: {
      ...mapState(['Position','CateList','userInfo']), // 这里得到的数据是一维数组，而swiper滑动，分几页就需要几个 swiper-slide div类，所以这里需要处理成二维数组，一个控制分页，一个控制分类
      CateList2 () {
        const {CateList} = this
        let index = 0
        let base = 8
        let arr2 = []
        while(index < CateList.length){
          arr2.push(CateList.slice(index, index+=base))
        }
        // console.log(arr2)
        return arr2
      }

    },
    watch: {
      CateList (newval) {
        this.$nextTick( () => {
          new Swiper('.swiper-container',{
          loop: true, // 循环模式选项
          pagination: {
            el: '.swiper-pagination',
          },
      })    
        })
      }
    },
    data(){
      return {
        baseImageUrl: 'https://fuss10.elemecdn.com'
      }
    }
   
}
</script>

<style lang="stylus" scoped>
@import '~common-css/mixin.styl'
        .msite  
            width 100%
           .header
            background-color #02a774
            position fixed
            z-index 100
            left 0
            top 0
            width 100%
            height 45px
            .header_search
              position absolute
              left 15px
              top 50%
              transform translateY(-50%)
              width 10%
              height 50%
              .icon-sousuo
                font-size 25px
                color #fff
            .header_title
              position absolute
              top 50%
              left 50%
              transform translate(-50%, -50%)
              width 50%
              color #fff
              text-align center
              .header_title_text
                font-size 20px
                color #fff
                display block
            .header_login
              font-size 14px
              color #fff
              position absolute
              right 15px
              top 50%
              transform translateY(-50%)
              .header_login_text
                color #fff
          .msite_nav
              bottom-border-1px(#e4e4e4)
              margin-top 45px
              height 200px
              background #fff
              .swiper-container
                width 100%
                height 100%
                .swiper-wrapper
                  width 100%
                  height 100%
                  .swiper-slide
                    display flex
                    justify-content center
                    align-items flex-start
                    flex-wrap wrap
                    .link_to_food
                      width 25%
                      .food_container
                        display block
                        width 100%
                        text-align center
                        padding-bottom 10px
                        font-size 0
                        img
                          display inline-block
                          width 50px
                          height 50px
                      span
                        display block
                        width 100%
                        text-align center
                        font-size 13px
                        color #666
                    .swiper-pagination
                    >span.swiper-pagination-bullet-active
                      background #02a774
          .msite_shop_list
            top-border-1px(#e4e4e4)
            margin-top 10px
            background #fff
            .shop_header
              padding 10px 10px 0
              .shop_icon
                margin-left 5px
                color #999
              .shop_header_title
                color #999
                font-size 14px
                line-height 20px
</style>