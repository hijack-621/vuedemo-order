<template>
  <div class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">JC外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{ on: loginByPhonecaptcha}" @click="loginByPhonecaptcha=true">短信登录</a>
          <a href="javascript:;" :class="{ on: !loginByPhonecaptcha}" @click="loginByPhonecaptcha=false" >密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form @submit.prevent="login">
          <!-- 阻止表单默认提交事件 -->
          <div :class="{on: loginByPhonecaptcha}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone" />
              <button :disabled="!check_phone" class="get_verification" :class="{ able: check_phone }" @click.prevent="getcaptcha">
                <!-- 加上修饰符 prevent 用于阻止表单默认提交行为 -->
                {{ timer ? `(已发送)${timer}s后可以重试`: '获取验证码'}}
              </button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="phone_captcha" />
            </section>
            <section class="login_hint">
              温馨提示：未注册JC外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on: !loginByPhonecaptcha}">
            <section>
              <section class="login_message">
                <input
                  type="tel"
                  maxlength="11"
                  placeholder="手机/邮箱/用户名"
                  v-model="username"
                />
              </section>
              <section class="login_verification">
                <input type="password" maxlength="8" placeholder="密码" v-model="pwd" v-if="!showpwd" />
                <input type="text" maxlength="8" placeholder="密码" v-model="pwd" v-else />
                <div class="switch_button" @click="toggle"  :class="[change ? 'on' : 'off']">
                  <div class="switch_circle" :class="{right:change}"></div>
                  <span class="switch_text">{{ change ? 'on' : 'off' }}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="pass_captcha" />
                <img
                  class="get_verification"
                  :src="firstcha"
                  alt="captcha"
                  @click="changeCaptcha"
                  ref="cha"
                />
              </section>
            </section>
          </div>
          <button class="login_submit">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click='$router.back()'>
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>
    <layertips :alertText="tiptext" v-show="showtip" @closeTip='closeTip'></layertips>
  </div>
</template>

<script>
import layertips from '../../components/layer/layerTips.vue'
import {LoginInByPhone, SendMes, LoginInByAP, getCaptcha} from '../../api/handler'
export default {
  data () {
    return {
      loginByPhonecaptcha: true, //默认手机验证码登录
      phone: '',
      phone_captcha: '',
      timer: 0,
      intervalId: false,//定时器
      showpwd: false,
      username: '',
      pwd: '',
      pass_captcha: '',
      change: false, // 切换显示还是隐藏密码
      tiptext: '',
      showtip: false,//提示框默认隐藏
      firstcha: '',

    }
  },
  mounted () {
    this.changeCaptcha()
  },
  components: {
    layertips
  },
  computed: {
    check_phone () {
      return /^1\d{10}$/.test(this.phone)
    }
  },
  methods: {
    async getcaptcha () {
      if(! this.intervalId) {
        this.timer = 30
        this.intervalId = true
        setInterval( () => {
          if( this.timer > 0) {
            this.timer--
          } else {  
            this.intervalId = false
          }
        } , 1000);
      }
      const res = await SendMes(this.phone) //发送短信验证码
      if( res.code ==1) {
        this.submsg(res.msg)
        this.time = 0
        this.intervalId = false
      }
    },
    toggle () {
      this.change = !this.change
      this.showpwd = !this.showpwd
    },
    login () {
      this.loginByPhonecaptcha ? this.handler_phone() : this.handler_pwd()
    },
    async handler_phone () {
      if( !/^\d{11}$/.test(this.phone) || !/^\d{6}$/.test(this.phone_captcha) ) {
       this.submsg('手机号或者验证码错误')
        return ''
      }
      const {phone , code} = this
      const res = await LoginInByPhone(phone, code)
      if( res.code ==1) {
        this.submsg(res.msg)
      }else{
        this.$router.replace('/profile')
        this.$store.dispatch('trigger_getUser', {phone})
      }
    },
    async handler_pwd () {
      if( this.username.trim()==''  ||  this.pwd.trim()=='' || /^\d{6}$/.test(this.pass_captcha) ) {
        this.submsg('用户名密码为空或验证码格式错误')
        this.changeCaptcha()
        return ''
      }
      const {username, pwd , pass_captcha}  = this
      const res = await LoginInByAP(username, pwd, pass_captcha)
      if( res.code == 0 ) {
        this.$router.replace('/profile')
        this.$store.dispatch('trigger_getUser', res)
      }else {
        this.submsg(res.msg)
      }

    },
    submsg (msg) {
      this.showtip = true
      this.tiptext = msg
    },
    closeTip () {
      this.showtip = false
      this.tiptext = ''
    },
    //点击验证码图片重新请求验证码 
    async changeCaptcha () {
      const cpa  = await getCaptcha()
      var svg = new Blob([cpa], {type: "image/svg+xml;charset=utf-8"});
      var DOMURL = self.URL || self.webkitURL || self;
      this.$refs.cha.src = DOMURL.createObjectURL(svg)
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~common-css/mixin.styl'
.loginContainer
      width 100%
      height 100%
      background #fff
      .loginInner
        padding-top 60px
        width 80%
        margin 0 auto
        .login_header
          .login_logo
            font-size 40px
            font-weight bold
            color #02a774
            text-align center
          .login_header_title
            padding-top 40px
            text-align center
            >a
              color #333
              font-size 14px
              padding-bottom 4px
              &:first-child
                margin-right 40px
              &.on
                color #02a774
                font-weight 700
                border-bottom 2px solid #02a774
        .login_content
          >form
            >div
              display none
              &.on
                display block
              input
                width 100%
                height 100%
                padding-left 10px
                box-sizing border-box
                border 1px solid #ddd
                border-radius 4px
                outline 0
                font 400 14px Arial
                &:focus
                  border 1px solid #02a774
              .login_message
                position relative
                margin-top 16px
                height 48px
                font-size 14px
                background #fff
                .get_verification
                  position absolute
                  top 50%
                  right 10px
                  transform translateY(-50%)
                  border 0
                  color #ccc
                  font-size 14px
                  background transparent
                  &.able
                    color black
              .login_verification
                position relative
                margin-top 16px
                height 48px
                font-size 14px
                background #fff
                .switch_button
                  font-size 12px
                  border 1px solid #ddd
                  border-radius 8px
                  transition background-color .3s,border-color .3s
                  padding 0 6px
                  width 30px
                  height 16px
                  line-height 16px
                  color #fff
                  position absolute
                  top 50%
                  right 10px
                  transform translateY(-50%)
                  &.off
                    background #fff
                    .switch_text
                      float right
                      color #ddd
                  &.on
                    background #02a774
                  >.switch_circle
                    position absolute
                    top -1px
                    left -1px
                    width 16px
                    height 16px
                    border 1px solid #ddd
                    border-radius 50%
                    background #fff
                    box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                    transition transform .3s
                    &.right
                      transform translateX(32px)
              .login_hint
                margin-top 12px
                color #999
                font-size 14px
                line-height 20px
                >a
                  color #02a774
            .login_submit
              display block
              width 100%
              height 42px
              margin-top 30px
              border-radius 4px
              background #4cd96f
              color #fff
              text-align center
              font-size 16px
              line-height 42px
              border 0
          .about_us
            display block
            font-size 12px
            margin-top 20px
            text-align center
            color #999
        .go_back
          position absolute
          top 5px
          left 5px
          width 30px
          height 30px
          >.iconfont
            font-size 20px
            color #999    

</style>