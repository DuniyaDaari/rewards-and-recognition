<template>
  <div>
    <div v-for="team in teamsDetails" :key="team.teamid">
    <div class="card teamCardMargin">
      <div class="card-header teamCardHeaderColor">
        {{team.name}}
        <span v-if="team.status"><button type="button" class="btn btn-primary float-right" disabled>ACTIVE</button></span>
        <span v-if="!team.status"><button type="button" class="btn btn-secondary float-right" disabled>INACTIVE</button></span>
      </div>
      <div class="card-body">
        <h6 class="card-title">{{team.lineManager.firstName}} {{team.lineManager.middleName}} {{team.lineManager.lastName}} </h6>
        <p class="card-text">
            Created by: {{team.lineManager.createdBy}} on {{team.lineManager.createdDate}} <br>
            {{team.lineManager.email}}
        </p>
        <router-link v-if="team.status" :to="{ name:'teamDetails', params: { pid, teamId:team.id } }" class="card-link">Details</router-link>
    </div>
    </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import { LazyInject } from '../../di'
import { TEAMS_DETAILS_SERVICE } from '../../services/api/teams-api/teamsDetails'
import { RrCommonState } from '../../store'

@Component()
export default class MyTeamsView extends Vue {
  @LazyInject(TEAMS_DETAILS_SERVICE) teamsDetailsService;
  @RrCommonState userDetails;

  rewardDetails = [];
  teamsDetails = [];

  async created () {
    this.teamsDetails = await this.teamsDetailsService.fetchTeamsDetails(this.pid)
  }

  get pid () {
    return this.userDetails.pid
  }
}
</script>
