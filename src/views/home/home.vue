<template>
  <div class="rr-home">
    <div
      class="rr-flex-one"
      v-if="myRewardsImagePath">
      <rr-card
        :image-path="myRewardsImagePath"
        card-heading="View my rewards"
        card-text="Click here to view the rewards you have received from your organization"
        :button-route="{ name:'rewards', params: { pid } }"
        >
      </rr-card>
    </div>

    <div
      class="rr-flex-one"
      v-if="myTeamsImagePath">
      <rr-card
        :image-path="myTeamsImagePath"
        card-heading="View my teams"
        card-text="Click here to view the teams under you and view their rewards"
        :button-route="{ name:'teams', params: { pid } }"
        >
      </rr-card>
    </div>

    <div
      class="rr-flex-one"
      v-if="adminImagePath">
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
  @RrCommonState pagesVisible

  myRewardsImagePath = ''
  myTeamsImagePath = ''
  adminImagePath = ''
  pid = ''

  created () {
    this.pid = this.$router.currentRoute.params.pid
    this.myRewardsImagePath = this.pagesVisible.includes('rewards') ? this.appImages.rewards : undefined
    this.myTeamsImagePath = this.pagesVisible.includes('teams') ? this.appImages.teams : undefined
    this.adminImagePath = this.pagesVisible.includes('admin') ? this.appImages.admin : undefined
  }
}
</script>
