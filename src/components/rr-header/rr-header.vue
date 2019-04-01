<template>
  <div id="headerBg" class="container-fluid no-padding">
    <div class="row">
      <div class="col-sm col-8">
        <ul class="nav nav-pills">
          <li class="nav-item">
            <router-link
              class="nav-link active navColor"
              :to="{ name: 'home', params: {pid}}"
            >Rewards & Recognition</router-link>
          </li>
          <li class="nav-item" v-if="rewardsTabVisible">
            <router-link
              class="nav-link navColor"
              :to="{ name: 'rewards', params: {pid}}"
            >My Rewards</router-link>
          </li>
          <li class="nav-item" v-if="teamsTabVisible">
            <router-link class="nav-link navColor" :to="{ name: 'teams', params: {pid}}">My Teams</router-link>
          </li>
          <li class="nav-item" v-if="adminTabVisible">
            <router-link class="nav-link navColor" :to="{ name: 'admin', params: {pid}}">Admin</router-link>
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

  pid = '';
  rewardsTabVisible = false;
  teamsTabVisible = false;
  adminTabVisible = false;

  created () {
    this.pid = this.userDetails.pid
    this.rewardsTabVisible = this.pagesVisible.includes('rewards')
    this.teamsTabVisible = this.pagesVisible.includes('teams')
    this.adminTabVisible = this.pagesVisible.includes('admin')
  }

  async logout () {
    await this.$auth.logout()
    await this.$auth.getUser()
    this.$router.push('/')
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
</style>
