<template>
   <div class="search">
      <myheader title="搜索">
        
      </myheader>
      <form class="search_form" action="#">
            <input type="search" name="search" placeholder="请输入商家或美食名称" class="search_input">
            <input type="submit" name="submit" class="search_submit">
      </form>
   </div>
</template>

<script>
import myheader from '../../components/Header/header.vue'
export default {
    components:{
       myheader,
    }
}
</script>

<style lang="stylus" scoped>
@import '~common-css/mixin.styl'
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
               .iconfont
                  font-size 22px
                  color #fff
               .header_title
                  position absolute
                  top 50%
                  left 50%
                  transform translate(-50%, -50%)
                  width 30%
                  color #fff
                  font-size 22px
                  text-align center
            .search  
               width 100%
               .search_form
                  clearFix()
                  margin-top 45px
                  background-color #fff
                  padding 12px 8px
                  input
                     height 35px
                     padding 0 4px
                     border-radius 2px
                     font-weight bold
                     outline none
                     &.search_input
                        float left
                        width 79%
                        border 4px solid #f2f2f2
                        font-size 14px
                        color #333
                        background-color #f2f2f2
                     &.search_submit
                        float right
                        width 18%
                        border 4px solid #02a774
                        font-size 16px
                        color #fff
                        background-color #02a774   
                        
</style>