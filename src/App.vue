<template>
  <div>
    <rr-header v-if="Object.keys(userDetails).length != 0" />
    <router-view v-if="isLoginRoute || Object.keys(userDetails).length != 0" class="rr-router-view"/>
    <rr-footer v-if="Object.keys(userDetails).length != 0" />
  </div>
</template>
<script>
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

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
  @RrCommonMutation setUserEmail

  images = {}
  isDataLoaded = false
  isAuthenticated = false

  async created () {
    this.setImages()

    let isAuthenticated = await this.$auth.isAuthenticated()

    if (isAuthenticated) {
      let user = await this.$auth.getUser()
      let email = user.email
      this.setUserEmail(email)
      await this.getUserDetails()
      if (this.$router.currentRoute.name === 'login') {
        this.$router.push({ name: 'home', params: { pid: this.userDetails.pid } })
      }
    } else {
      this.$auth.loginRedirect('/')
    }
  }

  get isLoginRoute () {
    return !this.$route.name || this.$route.name === 'login'
  }

  setImages () {
    if (Object.keys(this.appImages).length === 0) { // change logic for checking empty object
      this.images.rewards = require('./assets/my-rewards.png')
      this.images.teams = require('./assets/my-teams.png')
      this.images.reportees = require('./assets/reportees.png')
      this.images.admin = require('./assets/admin.png')
      this.images.patonback = require('./assets/patonback.jpg')
      this.images.ycmd = require('./assets/ycmd.jpg')
      this.images.paytm = require('./assets/paytm.jpg')
      this.images.amazon = require('./assets/amazon.jpg')
      this.images.flipkart = require('./assets/flipkart.jpg')
      this.images.fitbit = require('./assets/fitbit.png')
      this.images.rnr = require('./assets/rnr.jpg')
      this.setAppImages(this.images)
    }
  }
}
</script>

<style>
@import './styles/main.scss';
.rr-router-view{
  padding: 20px 4%;
  margin-bottom: 5%;
}
</style>
