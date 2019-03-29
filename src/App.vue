<template>

  <div v-if="!isUserDetailsLoading">
    <rr-header v-if="isDataLoaded" />
    <router-view v-if="isDataLoaded" class="rr-router-view"/>
  </div>
</template>
<script>
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import RrHeader from './components/rr-header'
import { RrCommonAction, RrCommonMutation, RrCommonState } from './store'

@Component({
  components: {
    RrHeader
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

  async created () {
    this.setImages()
    if (!this.userDetails) {
      await this.getUserDetails()
    }

    this.routeToHome()
    this.isDataLoaded = true
  }

  routeToHome () {
    if (!this.$router.currentRoute.params || !this.$router.currentRoute.params.pid) {
      this.$router.push({ name: 'home', params: { pid: this.userDetails.pid } })
    }
  }

  setImages () {
    if (JSON.stringify(this.appImages).trim() === '{}') { // change logic for checking empty object
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
