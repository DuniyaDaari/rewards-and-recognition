<template>
  <div id="headerBg" class="container-fluid no-padding">
    <div class="row">
      <div class="col-sm col-8">
        <ul class="nav nav-pills customClass ">
          <li class="nav-item">
            <a class="nav-link active navColor" href="#">Rewards & Recognition</a>
          </li>
          <li class="nav-item">
            <a class="nav-link navColor" href="#">My Rewards</a>
          </li>
          <li class="nav-item">
            <a class="nav-link navColor" href="#">My Teams</a>
          </li>
          <li class="nav-item">
            <a class="nav-link navColor" href="#">Admin</a>
          </li>
        </ul>
      </div>
      <div class="col-sm col-4">
        <span class="float-right ">
          <i id="profilePic" class="fas fa-user-circle"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

@Component()
export default class RrHeader extends Vue {

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
</style>
