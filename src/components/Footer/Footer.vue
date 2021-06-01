<template>
    
        <div class="footer_guide border-1px">
        <a href="javascript:;" class="guide_item" :class="{on:'/home'===$route.path}" @click="Goto('/home')">
        <span class="item_icon">
            <i class="iconfont icon-waimai"></i>
        </span>
        <span>外卖</span>
        </a>
        <a href="javascript:;" class="guide_item" :class="{on:'/search'===$route.path}" @click="Goto('/search')">
        <span class="item_icon">
            <i class="iconfont icon-search"></i>
        </span>
        <span>搜索</span>
        </a>
        <a href="javascript:;" class="guide_item" :class="{on:'/order'===$route.path}" @click="Goto('/order')">
        <span class="item_icon">
            <i class="iconfont icon-dingdan"></i>
        </span>
        <span>订单</span>
        </a>
        <a href="javascript:;" class="guide_item" :class="{on:'/profile'===$route.path}" @click="Goto('/profile')">
        <span class="item_icon">
            <i class="iconfont icon-geren"></i>
        </span>
        <span>我的</span>
        </a>
    </div>
  
</template>

<script>
export default {
   methods:{
       Goto(path){
           this.$router.replace(path).catch(err=>{ //这里点击跳转到同意路由会提示错误，这里处理成不显示错误
              
           });
       }
   } 
}
</script>

<style lang="stylus" scoped>
@import '~common-css/mixin.styl'
.footer_guide
    top-border-1px(#e4e4e4) 
    position fixed
    left:0
    bottom:0
    display flex
    height 50px
    justify-content center
    background-color #fff
    z-index 100
    width:100%
    justify-content space-evenly
    .guide_item
        display flex
        flex-direction column
        align-items center
        text-align center
        flex 1
        justify-content center 
        &.on
            color blue
        span
          font-size 12px
          margin-top 2px
          margin-bottom 2px
        .iconfont
          font-size 22px           
</style>