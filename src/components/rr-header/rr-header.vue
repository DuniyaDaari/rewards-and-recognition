<template>
  <div id="headerBg" class="container-fluid no-padding">
    <div class="row">
      <div class="col-sm col-8">
        <ul class="nav nav-pills">
          <li class="nav-item mr-5">
            <router-link
              :to="{ name: 'home', params: {pid}}"
            ><img :src="rnrImg" class="logo"/></router-link>
          </li>
          <li class="nav-item" v-if="rewardsTabVisible">
            <router-link
              class="nav-link navColor"
              :class="{'active' : pageCategory === 'rewards'}"
              :to="{ name: 'rewards', params: {pid}}"
            >My Rewards</router-link>
          </li>
          <li class="nav-item" v-if="teamsTabVisible">
            <router-link
              class="nav-link navColor"
              :class="{'active' : pageCategory === 'teams'}"
              :to="{ name: 'teams', params: {pid}}">My Teams</router-link>
          </li>
          <li class="nav-item" v-if="teamsTabVisible">
            <router-link
              class="nav-link navColor"
              :class="{'active' : pageCategory === 'reportees'}"
              :to="{ name: 'reportees', params: {pid}}">My Reportees</router-link>
          </li>
          <li class="nav-item" v-if="adminTabVisible">
            <router-link
              class="nav-link navColor"
              :class="{'active' : pageCategory === 'admin'}"
              :to="{ name: 'admin', params: {pid}}">Admin</router-link>
          </li>
        </ul>
      </div>
      <div class="col-sm col-4">
        <span class="float-right">
          <ul class="navbar-nav float-right">
            <li class="nav-item dropdown">
              <a
                href="#"
                class="nav-link dropdown-toggle"
                id="navDropDownLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >{{userEmail}}</a>
              <div class="dropdown-menu profileDropDown" aria-labelledby="navDropDownLink">
                <a class="dropdown-item" href="#">Preferences</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" @click="logout">Logout</a>
              </div>
            </li>
          </ul>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import { RrCommonState } from '../../store'

@Component()
export default class RrHeader extends Vue {
  @RrCommonState userDetails;
  @RrCommonState userEmail;
  @RrCommonState pagesVisible;
  @RrCommonState appImages;

  rnrImg = '';

  get rewardsTabVisible () {
    return this.pagesVisible.includes('rewards')
  }

  get teamsTabVisible () {
    return this.pagesVisible.includes('teams')
  }

  get adminTabVisible () {
    return this.pagesVisible.includes('admin')
  }

  async logout () {
    await this.$auth.logout()
    await this.$auth.getUser()
    this.$auth.loginRedirect('/')
  }

  get pid () {
    return this.userDetails.pid
  }

  created () {
    this.rnrImg = this.appImages.rnr
  }

  get pageCategory () {
    return this.$route.meta.pageCategory
  }
}
</script>

<style>
#headerBg {
  padding: 20px;
  background: #04476f;
  border: 1px solid #63a2d8;
  color: #fff;
  position: -webkit-sticky;
  position: sticky;
  top: -1px;
  /* opacity: 0.8; */
  height: 80px;
  z-index: 2;
}
#profilePic {
  font-size: 30px;
  margin-right: 20px;
  float: right;
}
#headerLogo {
  font-size: 30px;
}
.custommClass ul li a {
  color: #fff;
}
.navColor {
  color: #fff;
}
.profileDropDown {
  left: -85px;
}
.logo{
  height:50px;
}
</style>
