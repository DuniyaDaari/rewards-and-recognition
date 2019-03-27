<template>
  <div id="app">
    <!-- <rr-left-nav /> -->
    <router-view class="rr-router-view"/>
  </div>
</template>

<script>
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

// import HelloWorld from './components/HelloWorld.vue'
// import RrLeftNav from './components/rr-left-nav'
import { RrCommmonMutation } from './store'

@Component()
export default class App extends Vue {
  @RrCommmonMutation setAppImages

  images = {}

  created () {
    this.images.rewards = require('./assets/my-rewards.png')
    this.images.teams = require('./assets/my-teams.png')
    this.images.admin = require('./assets/admin.png')
    this.setAppImages(this.images)
  }
}
</script>

<style>
@import './styles/main.scss';
.rr-router-view {
  padding-left: 20%;
}
</style>
