<template>
  <div>
    <div>
      <h1 class="inline-display">Configure rewards for employees</h1>
      <button type="button" class="btn btn-primary float-right">Add reward</button>
    </div><br/>
    <table class="table table-striped table-bordered table-hover">
      <thead>
        <tr class="table-primary">
          <th scope="col">ID</th>
          <th scope="col">Reward</th>
          <th scope="col">Description</th>
          <th scope="col">Actual Value</th>
          <th scope="col">Modified Value</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="reward in rewardsData" :key="reward.id">
          <th scope="row">{{reward.id}} </th>
          <td>{{reward.rewardName}}</td>
          <td>{{reward.description}}</td>
          <td>{{reward.rewardPoints}}</td>
          <td><input type="text" class="form-control tableInputField" :value="reward.rewardPoints"></td>
          <td><button type="button" class="btn btn-primary">Save</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import { LazyInject } from '../../di'
import { REWARD_DATA_SERVICE } from '../../services/api/configure-reward-api/rewardData'

@Component()
export default class TeamDataView extends Vue {
  @LazyInject(REWARD_DATA_SERVICE) rewardDataService;

  rewardsData = [];
  async created () {
    this.rewardsData = await this.rewardDataService.fetchRewards()
  }
}
</script>
