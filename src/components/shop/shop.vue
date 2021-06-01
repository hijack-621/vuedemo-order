<template>
  <div class="main">
    <shopheader></shopheader>
    <div class="nav">
      <ul>
        <router-link tag="li" to="/shop/shopfood" :class="{this: $route.path=='/shop/shopfood'}">点餐</router-link>
        <router-link tag="li" to="/shop/shopcomment" :class="{this: $route.path=='/shop/shopcomment'}">评价</router-link>
        <router-link tag="li" to="/shop/shopinfo" :class="{this: $route.path=='/shop/shopinfo'}">商家信息</router-link>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import shopheader from '../../components/Header/shopHeader.vue'
export default {
  mounted () {
    this.$store.dispatch('mockinfo')
  },
  components: {
    shopheader
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common-css/mixin.styl'
  .main
    width 100vw
    height 100vh
    ul
      list-style none
    .nav
      display flex 
      justify-content space-evenly
      align-items center
      flex-direction row
      bottom-border-1px(#eee)
      height 40px
      ul
        width 100% 
        display flex 
        justify-content space-evenly
        align-items center
        li
          flex 1
          text-align center
          padding 10px
          position relative
          &.this::before
            content: ''
            position absolute
            width 50%
            height 4px
            background-color #8ff062
            bottom 0 
            left 50%
            transform translateX(-50%)
</style>