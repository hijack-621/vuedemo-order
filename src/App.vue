<template>
  <div id="app">
     <router-view/>
     <footnav v-show="$route.meta.showfooter"></footnav>
  </div>
</template>

<script>
import footnav from './components/Footer/Footer.vue'
import {mapActions} from 'vuex'
export default {
  mounted () {
    // this.$store.dispatch('trigger_getPosition')
    // console.log(this.$store)
    this.trigger_getPosition()
    this.trigger_getShopList()
    this.query_userInfo()
    // 还有一种方式 使用 vuex 自带的 mapActions 映射出 vuex actions中的 方法，影射的方法可以直接使用，
    // 当然也有 mapState 映射vuex store中的状态！！！
  },
  methods: {
    ...mapActions(['trigger_getPosition', 'trigger_getShopList', 'query_userInfo'])
  },
  name: 'App',
  components: {
    footnav
  }
}
</script>

<style scoped lang='stylus'>
#app
  height 100vh
  width 100vw
  background #f5f5f5
  position relative
</style>
