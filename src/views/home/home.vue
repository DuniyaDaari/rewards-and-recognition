<template>
  <div class="rr-home">
    <div class="rr-flex-one">
      <rr-card
        :image-path="myRewardsImagePath"
        card-heading="View my rewards"
        card-text="Click here to view the rewards you have received from your organization"
        :button-route="{ name:'rewards', params: { pid } }"
        >
      </rr-card>
    </div>

    <div class="rr-flex-one">
      <rr-card
        :image-path="myTeamsImagePath"
        card-heading="View my teams"
        card-text="Click here to view the teams under you and view their rewards"
        :button-route="{ name:'teams', params: { pid } }"
        >
      </rr-card>
    </div>

    <div class="rr-flex-one">
      <rr-card
        :image-path="adminImagePath"
        card-heading="Configure"
        card-text="Click here to configure the awards your organization"
        :button-route="{ name:'admin', params: { pid } }"
        >
      </rr-card>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import { LazyInject } from '../../di'
import { COMMON_SERVICE } from '../../services/helpers/common'
import RrCard from '../../components/rr-card'
import { RrCommonState } from '../../store'

@Component({
  components: {
    RrCard
  }
})
export default class HomeView extends Vue {
  @LazyInject(COMMON_SERVICE) commonService
  @RrCommonState appImages

  id = ''
  myRewardsImagePath = ''
  pid = ''

  created () {
    this.id = this.commonService.getId()
    this.pid = this.$router.currentRoute.params.pid
    this.myRewardsImagePath = this.appImages.rewards
    this.myTeamsImagePath = this.appImages.teams
    this.adminImagePath = this.appImages.admin
  }
}
</script>
