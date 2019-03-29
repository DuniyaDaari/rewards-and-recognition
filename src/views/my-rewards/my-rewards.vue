<template>
  <div class="row">
    <div class="col-sm-4" v-for="reward in rewardDetails" :key="reward.id">
      <div class="mr-2 mb-2">
        <div class="card">
          <img class="card-img-top" :src="reward.id== 1 ? ycmd : patonback" alt="Card image cap">
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
</template>
<script>
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import { LazyInject } from '../../di'
import { USER_DETAILS_SERVICE } from '../../services/api/userDetails'
import { REWARDS_DETAILS_SERVICE } from '../../services/api/rewardsDetails'
import { RrCommonState } from '../../store'

@Component()
export default class MyRewardsView extends Vue {
  @LazyInject(USER_DETAILS_SERVICE) userDetailsService;
  @LazyInject(REWARDS_DETAILS_SERVICE) rewardsDetailsService;
  @RrCommonState appImages;
  rewardDetails = [];
  patonback = '';
  ycmd = '';

  async created () {
    this.userDetailsService.isUserAuthorized('rewards')
    this.rewardDetails = await this.rewardsDetailsService.fetchRewardsDetails()
<<<<<<< HEAD
    this.patonback = this.appImages.patonback
    this.ycmd = this.appImages.ycmd
=======
>>>>>>> team card component
  }
}
</script>
