<template>
  <div>
    <div v-show="showSuccessMessage " class="success my-4">Successfully Redeemed {{redeemPoints}} Points </div>
    <form class="form-row redeem-form">
      <div class="col-md-3">
          <img class="paytm-img" :src="paytmImg" />
      </div>
      <div class="form-group col-md-3">
        <label for="points">Enter No. Of Points</label>
        <input type="number" v-model="redeemPoints" :keyup="isPointsAvailable()" :max="totalRewardPoints" class="form-control" id="points" placeholder="Enter No. Of Points"/>
        <span>Available Points : </span>{{totalRewardPoints}}
        <div v-if="isInValidPoints" class="error">Please enter valid value</div>
      </div>
      <div class="form-group col-md-3">
        <label for="mobileNo">Mobile No.</label>
        <input type="number" v-model="mobileNo" class="form-control" id="mobileNo" placeholder="Mobile no.">
        <div v-if="isInValidMobileNo" class="error">Please Enter Valid Mobile No.</div>
      </div>
      <div class="col-md-3">
        <button type="button" class="btn btn-primary btn-lg mt-4" data-toggle="modal"
          data-target="#redeemModal" data-placement="top"
          :disabled="mobileNo.trim().length != 10"
          @click="redeemRewardPoints">Redeem</button>
      </div>
    </form>
    <div class="row mt-5 justify-content-around">
      <div class="col-sm-4">
        <div class="card">
          <img :src="amazonImg" class="card-img-top" alt="...">
          <div class="card-body">
            <p class="card-text">Amazon Gift Cards: Buy Gift cards, gift vouchers and e-gift cards online from popular brands in India</p>
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
    <div
      v-show="showModal"
      class="modal fade"
      id="redeemModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="redeem modal"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            Please confirm
          </div>
          <div class="modal-body">
              <label for="comment">Your are going to redeem {{redeemPoints}} and Your Mobile No is {{mobileNo}}</label>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" data-dismiss="modal" @click="confirmRedeem()">Confirm</button>
          </div>
        </div>
  </div>
  </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import cloneDeep from 'lodash'

import { RrCommonState, RrCommonMutation } from '../../store'

@Component()
export default class RedeemPoints extends Vue {
  @RrCommonState appImages;
  @RrCommonState userDetails;
  @RrCommonState totalRewardPoints;

  @RrCommonMutation setTotalRewardPoints

  paytmImg = ''
  amazonImg = ''
  flipkartImg = ''
  redeemPoints =''
  mobileNo = ''
  isInValidPoints = false;
  isInValidMobileNo = false;
  showSuccessMessage = false;
  showModal = false

  async created () {
    this.paytmImg = this.appImages.paytm
    this.amazonImg = this.appImages.amazon
    this.flipkartImg = this.appImages.flipkart

    if (this.totalRewardPoints === 0) {
      this.setTotalRewardPoints(localStorage.getItem(`${this.userDetails.pid}TRP`))
    }
  }

  isPointsAvailable () {
    this.isInValidPoints = parseInt(this.redeemPoints) > parseInt(this.totalRewardPoints)
  }

  redeemRewardPoints () {
    if (this.mobileNo.length !== 10) {
      this.isInValidMobileNo = true
    } else {
      this.showModal = true
    }
  }

  confirmRedeem () {
    this.showSuccessMessage = true
    this.setTotalRewardPoints(parseInt(localStorage.getItem(`${this.userDetails.pid}TRP`)) - parseInt(this.redeemPoints))
    localStorage.setItem(`${this.userDetails.pid}TRP`, JSON.stringify(cloneDeep(this.totalRewardPoints)))
    this.redeemPoints = ''
    this.mobileNo = ''
  }

  get pid () {
    return this.userDetails.pid
  }
}
</script>
