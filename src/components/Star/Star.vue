<template>
  <div class="star" :class=" 'star-'+size ">
    <span class="star-item" v-for=" (star,index) in generator_star" :class="star" :key="index"></span>
  </div>  
</template>

<script>

export default {
  props: {
    rate: Number,
    size: Number
  },
  computed: {
    generator_star () {
      let {rate} = this
      let sarr = []
      let integer = Math.floor(rate)
      let decimal = (rate - integer).toFixed(1)
      for(let i = 0; i< integer; i++) {
         sarr.push('on')
      }
      if(decimal > 0.5){
        sarr.push('half')
      }
      while(sarr.length <5){
        sarr.push('off')
      }
      return sarr
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common-css/mixin.styl'
  .star 
    float left
    font-size 0
    .star-item
        display inline-block
        background-repeat no-repeat
    &.star-48
        .star-item
            width 20px
            height 20px
            margin-right 22px
            background-size 20px 20px
            &:last-child
                margin-right: 0
            &.on
                bg-image('../../../static/images/stars/star48_on')
            &.half
                bg-image('../../../static/images/stars/star48_half')
            &.off
                bg-image('../../../static/images/stars/star48_off')
    &.star-36
        .star-item
            width 15px
            height 15px
            margin-right 6px
            background-size 15px 15px
            &:last-child
                margin-right 0
            &.on
                bg-image('../../../static/images/stars/star36_on')
            &.half
                bg-image('../../../static/images/stars/star36_half')
            &.off
                bg-image('../../../static/images/stars/star36_off')
    &.star-24
        .star-item
            width 10px
            height 10px
            margin-right 3px
            background-size 10px 10px
            &:last-child
                margin-right 0
            &.on
                bg-image('../../../static/images/stars/star24_on')
            &.half
                bg-image('../../../static/images/stars/star24_half')
            &.off
                bg-image('../../../static/images/stars/star24_off')
</style>