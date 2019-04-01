<template>
  <div class="">
    <h1 class="display-4 welcomeHeading">Welcome to your dashboard!</h1>
    <div class="row mt-5">

        <rr-card
          :image-path="myRewardsImagePath"
          card-heading="View my rewards"
          card-text="Click here to view the rewards you have received from your organization"
          :button-route="{ name:'rewards', params: { pid } }"
          >
        </rr-card>
        <rr-card
          v-if="myTeamsImagePath"
          :image-path="myTeamsImagePath"
          card-heading="View my teams"
          card-text="Click here to view the teams under you and view their rewards"
          :button-route="{ name:'teams', params: { pid } }"
          >
        </rr-card>
        <rr-card
          v-if="adminImagePath"
          :image-path="adminImagePath"
          card-heading="Configure"
          card-text="Click here to configure the awards of your organization and add teams/employees"
          :button-route="{ name:'admin', params: { pid } }"
          >
        </rr-card>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import RrCard from '../../components/rr-card'
import { RrCommonState } from '../../store'

@Component({
  components: {
    RrCard
  }
})
export default class HomeView extends Vue {
  @RrCommonState appImages
  @RrCommonState pagesVisible
  @RrCommonState userDetails

  myRewardsImagePath = ''
  myTeamsImagePath = ''
  adminImagePath = ''
  pid = ''

  created () {
    this.pid = this.userDetails.pid
    this.myRewardsImagePath = this.pagesVisible.includes('rewards') ? this.appImages.rewards : undefined
    this.myTeamsImagePath = this.pagesVisible.includes('teams') ? this.appImages.teams : undefined
    this.adminImagePath = this.pagesVisible.includes('admin') ? this.appImages.admin : undefined
  }
}
</script>
