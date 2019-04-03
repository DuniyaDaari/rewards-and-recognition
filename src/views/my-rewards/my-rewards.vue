<template>
  <div>
    <h1 class="display-4">My Rewards</h1>
    <div v-if="rewardDetails.length > 0">
      <div class="row my-3 d-flex justify-content-end">
        <div class="col-sm-2">
          <span class="align-middle">Total Reward Points :</span>
          <span class="font-weight-bold align-middle">{{totalRewardPoints}}</span>
        </div>
        <div class="col-sm-2">
          <router-link
            tag="button"
            class="btn btn-success float-right mr-3"
            :to="{ name:'redeem', params: { pid } }"
          >Redeem Points</router-link>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-3" v-for="reward in rewardDetails" :key="reward.id">
          <div class="mr-2 mb-5">
            <div class="card">
              <img class="card-img-top" :src="rewardImages[reward.rewardId]" alt="Card image cap">
              <div class="card-body">
                <h5 class="card-title">{{reward.name}}</h5>
                <p class="card-text">{{reward.comments}}</p>
              </div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">Nominated By : {{reward.nominatedBy}}</li>
                <li class="list-group-item">Reward Points : {{reward.rewardPoints}}</li>
                <li class="list-group-item">Nomination Date : {{reward.nominationDate}}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="no-record-found" v-if="rewardDetails.length <= 0">
      <img :src="nrfImg"/>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import { LazyInject } from '../../di'
import { REWARDS_DETAILS_SERVICE } from '../../services/api/reward-details/rewardsDetails'
import { RrCommonState, RrCommonMutation } from '../../store'

@Component()
export default class MyRewardsView extends Vue {
  @LazyInject(REWARDS_DETAILS_SERVICE) rewardsDetailsService;
  @RrCommonState appImages;
  @RrCommonState userDetails;
  @RrCommonMutation setTotalRewardPoints;

  rewardDetails = [];
  totalRewardPoints = 0;
  rewardImages = [];
  nrfImg = '';

  async created () {
    this.rewardDetails = await this.rewardsDetailsService.fetchRewardsDetails(this.pid)
    this.rewardDetails = this.rewardDetails.employeeRewardDetails
    this.rewardDetails = await this.rewardsDetailsService.fetchRewardsDetails(this.pid)
    this.rewardImages = {}
    this.rewardImages[2] = this.appImages.patonback
    this.rewardImages[1] = this.appImages.ycmd
    this.nrfImg = this.appImages.nrf
    this.calculateTotalRewardPoints()
    this.setTotalRewardPoints(this.totalRewardPoints)
  }

  get pid () {
    return this.userDetails.pid
  }

  calculateTotalRewardPoints () {
    let redeemedPointsInLS = localStorage.getItem(`${this.userDetails.pid}RDP`)
    let redeemedPoints = redeemedPointsInLS && redeemedPointsInLS !== null ? parseInt(redeemedPointsInLS) : 0

    this.totalRewardPoints = 0
    this.rewardDetails.forEach((item) => {
      this.totalRewardPoints += parseInt(item.rewardPoints)
    })
    this.totalRewardPoints -= redeemedPoints
  }
}
</script>
