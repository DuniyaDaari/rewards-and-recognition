<template>

  <div v-if="!isUserDetailsLoading">
    <!-- <rr-left-nav /> -->
    <router-view class="rr-router-view"/>
  </div>
</template>
<script>
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import RRHeaderComponent from './components/RRHeaderComponent.vue'
import { RrCommonAction, RrCommonMutation, RrCommonState } from './store'

@Component()
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
.rr-router-view {
  padding-left: 20%;
}
</style>
