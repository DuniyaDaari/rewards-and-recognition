<template>
  <div>
    <form class="form-row redeem-form">
      <div class="col-md-3">
          <img class="paytm-img" :src="paytmImg" />
      </div>
      <div class="form-group col-md-3">
        <label for="points">Enter No. Of Points</label>
        <input type="number" :max="totalRewardPoints" class="form-control" id="points" placeholder="Enter No. Of Points"/>
        <span>Available Points : </span>{{totalRewardPoints}}
      </div>
      <div class="form-group col-md-3">
        <label for="mobileNo">Mobile No.</label>
        <input type="number" class="form-control" id="mobileNo" placeholder="Mobile no.">
      </div>
      <div class="col-md-3">
        <button type="button" class="btn btn-primary btn-lg mt-4">Redeem</button>
      </div>
    </form>
    <div class="row mt-5 justify-content-around">
      <div class="col-sm-4">
        <div class="card">
          <img :src="amazonImg" class="card-img-top" alt="...">
          <div class="card-body">
            <p class="card-text">Amazon Gift Cards: Buy Gift cards, gift vouchers and e-gift cards online from popular brands in India. Shop Zodiac egift cards.</p>
          </div>
          <div class="card-body">
            <a href="#" class="card-link">Redeem</a>
          </div>
        </div>
      </div>
      <div class="col-sm-4">
        <div class="card">
          <img :src="flipkartImg" class="card-img-top" alt="...">
          <div class="card-body">
            <p class="card-text">The Gift Cards can be redeemed online against Sellers listed on www.flipkart.com or Flipkart Mobile App or Flipkart m-site ("Platform") .</p>
          </div>
          <div class="card-body">
            <a href="#" class="card-link">Redeem</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import { LazyInject } from '../../di'
import { USER_DETAILS_SERVICE } from '../../services/api/userDetails'
import { RrCommonState } from '../../store'

@Component()
export default class RedeemPoints extends Vue {
  @LazyInject(USER_DETAILS_SERVICE) userDetailsService;
  @RrCommonState appImages;
  @RrCommonState userDetails;
  @RrCommonState totalRewardPoints;

  paytmImg = ''
  amazonImg = ''
  flipkartImg = ''
  async created () {
    this.pid = this.userDetails.pid;
    this.userDetailsService.isUserAuthorized('rewards')
    this.paytmImg = this.appImages.paytm;
    this.amazonImg = this.appImages.amazon;
    this.flipkartImg = this.appImages.flipkart;
  }
}
</script>
