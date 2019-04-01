<template>
  <div>
    <rr-header v-if="isAuthenticated" />
    <router-view class="rr-router-view"/>
    <rr-footer />
  </div>
</template>
<script>
import Vue from 'vue'
import { Component, Watch } from 'vue-property-decorator'

import RrHeader from './components/rr-header'
import RrFooter from './components/rr-footer'
import { RrCommonAction, RrCommonMutation, RrCommonState } from './store'

@Component({
  components: {
    RrHeader,
    RrFooter
  }
})
export default class App extends Vue {
  @RrCommonAction getUserDetails
  @RrCommonState isUserDetailsLoading
  @RrCommonState userDetails
  @RrCommonState appImages
  @RrCommonMutation setAppImages

  images = {}
  isDataLoaded = false
  isAuthenticated = false

  @Watch('$route')
  async checkAuthentication () {
    this.isAuthenticated = await this.$auth.isAuthenticated()
  }

  async created () {
    this.setImages()

    // let isAuthenticated = await this.$auth.isAuthenticated()

    // if (isAuthenticated) {
    //   let user = await this.$auth.getUser()
    //   let email = user.email
    //   await this.getUserDetails(email)
    //   this.$router.push({ name: 'home', params: { pid: this.userDetails.pid } })
    // } else {
    //   this.$auth.loginRedirect('/')
    // }
  }

  setImages () {
    if (Object.keys(this.appImages).length === 0) { // change logic for checking empty object
      this.images.rewards = require('./assets/my-rewards.png')
      this.images.teams = require('./assets/my-teams.png')
      this.images.admin = require('./assets/admin.png')
      this.images.patonback = require('./assets/patonback.jpg')
      this.images.ycmd = require('./assets/ycmd.jpg')
      this.images.paytm = require('./assets/paytm.jpg')
      this.images.amazon = require('./assets/amazon.jpg')
      this.images.flipkart = require('./assets/flipkart.jpg')
      this.setAppImages(this.images)
    }
  }
}
</script>

<style>
@import './styles/main.scss';
.rr-router-view{
  padding: 20px 4%;
}
</style>
