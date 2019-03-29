<template>

  <div v-if="!isUserDetailsLoading">
    <rr-header />
    <router-view class="rr-router-view"/>
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
  @RrCommonMutation setAppImages

  images = {}

  created () {
    this.images.rewards = require('./assets/my-rewards.png')
    this.images.teams = require('./assets/my-teams.png')
    this.images.admin = require('./assets/admin.png')
    this.setAppImages(this.images)
    this.getUserDetails()
  }
}
</script>

<style>
@import './styles/main.scss';
.rr-router-view{
  padding: 100px 4%;
}
</style>
