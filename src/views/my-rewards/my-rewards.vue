<template>
    <div>
       {{rewardDetails}}
    </div>
</template>
<script>
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import { LazyInject } from '../../di'
import { USER_DETAILS_SERVICE } from '../../services/api/userDetails'
import { REWARDS_DETAILS_SERVICE } from '../../services/api/rewardsDetails'

@Component()
export default class MyRewardsView extends Vue {
    @LazyInject(USER_DETAILS_SERVICE) userDetailsService
    @LazyInject(REWARDS_DETAILS_SERVICE) rewardsDetailsService

    rewardDetails = []

    async created () {
      this.userDetailsService.isUserAuthorized('rewards')
      this.rewardDetails = await this.rewardsDetailsService.fetchRewardsDetails()
    }
}
</script>
