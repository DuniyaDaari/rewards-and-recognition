<template>
  <div class="row">
    <div class="col-sm-4" v-for="reward in rewardDetails" :key="reward.id">
      <div class="mr-2 mb-2">
        <div class="card">
          <img class="card-img-top" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p
              class="card-text"
            >Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">Cras justo odio</li>
            <li class="list-group-item">Dapibus ac facilisis in</li>
            <li class="list-group-item">Vestibulum at eros</li>
          </ul>
          <div class="card-body">
            <a href="#" class="card-link">Card link</a>
            <a href="#" class="card-link">Another link</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { Component } from "vue-property-decorator";

import { LazyInject } from "../../di";
import { USER_DETAILS_SERVICE } from "../../services/api/userDetails";
import { REWARDS_DETAILS_SERVICE } from "../../services/api/rewardsDetails";

@Component()
export default class MyRewardsView extends Vue {
  @LazyInject(USER_DETAILS_SERVICE) userDetailsService;
  @LazyInject(REWARDS_DETAILS_SERVICE) rewardsDetailsService;

  rewardDetails = [];

  async created() {
    this.userDetailsService.isUserAuthorized("rewards");
    this.rewardDetails = await this.rewardsDetailsService.fetchRewardsDetails();
  }
}
</script>
