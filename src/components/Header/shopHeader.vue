<template>
  <div class="shopheader-main">
    <div class="bgimg" :style="{backgroundImage:`url(${store_info.bgImg})`}">
      <a @click.passive="$router.back()" class="back">
      </a>
    </div>
    <div class="brand">
      <div class="brand-img" :style="{backgroundImage:`url(${store_info.avatar})`}">

      </div>
    </div>
    <div class="title">
      <span class="title-brand">品牌</span>
      <span class="title-name">{{store_info.name}}</span>
      <i class="title-icon"></i>
    </div>
    <ul class="order-msg">
      <li>5</li>
      <li>月售500单</li>
      <li>JC专送</li>
      <li>约30min</li>
      <li>距离2.2km</li>
    </ul>
    <div class="bargin">
      <span></span>
      
      <span></span>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
export default {
  mounted () {
    
  },
  computed: {
    ...mapState(['store_info'])
    
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common-css/mixin.styl'
  .shopheader-main 
    width 100%
    height 30vh
    position relative
    .bgimg
      width 100%
      height 50px
      background  no-repeat center center / cover
      position relative
      .back
        position absolute
        display block
        width 20px
        height 20px
        top 50%
        left 10px
        transform translateY(-50%)
        &::before
          content '\2794'
          position absolute 
          color #fff
          font-size 24px
          width 100%
          height 100%
          transform rotateY(180deg)
    .brand
      width 80px
      height 80px
      top 10px
      left 50%
      transform translateX(-50%)
      position absolute
      background-color #fff
      z-index 99
      .brand-img
        width 70px
        height 70px
        position absolute
        left 50%
        top 50%
        transform translate(-50%, -50%)
        background  no-repeat center center / cover
        z-index 100
    .title
      height 35px
      display flex
      position absolute 
      top 95px
      left 50%
      transform translateX(-50%)
      justify-content space-around
      align-items center
      .title-brand
        width 40px
        height 20px
        background-color orange
        text-align center
        font-size 16px
        line-height 20px
      .title-name
        margin-left 5px
        font-weight 700
        text-align left
        overflow hidden
        text-overflow ellipsis
        text-wrap nowrap
        white-space nowrap
        font-size 22px
      .title-icon
        width 20px
        position relative
        height 16px
        &::after
          content ""
          border-style solid
          border-width: 6px 0 6px 7px
          border-color transparent transparent transparent rgba(0, 0, 0, .67)
          position absolute
          left 8px
          top 3px  
    .order-msg
      width 90%
      left 50%
      transform translateX(-50%)
      display flex 
      justify-content space-around
      position absolute
      top 135px
      li
        list-style disc 
        text-indent -5px
        &::marker
          color rgba(0,0,0, .3)  
        &:nth-of-type(1)
          list-style none
</style>