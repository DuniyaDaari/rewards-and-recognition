<template>
  <div>
    <h1 class="display-4">Welcome to your dashboard!</h1>
    <div class="row mt-5">

        <rr-card
          v-if="myRewardsImagePath"
          :image-path="myRewardsImagePath"
          card-heading="View my rewards"
          card-text="Click here to view the rewards you have received"
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
          v-if="myTeamsImagePath"
          :image-path="reporteesImagePath"
          card-heading="Reportees"
          card-text="Click here to view all of your reportees"
          :button-route="{ name:'reportees', params: { pid } }"
          >
        </rr-card>
         <rr-card
          v-if="adminImagePath"
          :image-path="adminImagePath"
          card-heading="Configure"
          card-text="Click here to configure the awards and add teams/employees"
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

  get pid () {
    return this.userDetails.pid
  }

  get myRewardsImagePath () {
    return this.pagesVisible.includes('rewards') ? this.appImages.rewards : undefined
  }

  get myTeamsImagePath () {
    return this.pagesVisible.includes('teams') ? this.appImages.teams : undefined
  }

  get reporteesImagePath () {
    return this.pagesVisible.includes('teams') ? this.appImages.reportees : undefined
  }

  get adminImagePath () {
    return this.pagesVisible.includes('admin') ? this.appImages.admin : undefined
  }
}
</script>
