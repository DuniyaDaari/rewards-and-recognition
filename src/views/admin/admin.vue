<template>
  <div>
    <h1 class="display-4">Admin</h1>
    <br/>
    <div class="row">
      <div class="col-sm-4">
        <div class="card cardHeight">
          <div class="card-body">
            <h5 class="card-title">Configure Rewards</h5>
            <p
              class="card-text"
            >Add/edit the rewards.</p>

            <router-link :to="{ name:'configureRewards' }"><i class="fas fa-cog hugeFont"></i></router-link>
          </div>
        </div>
      </div>

      <div class="col-sm-4">
        <div class="card cardHeight">
          <div class="card-body">
            <h5 class="card-title">Add Team</h5>
            <p
              class="card-text align-middle"
            >Add another team to the group. You may now add team, having capability of configuring it.
            </p>
            <a href="#" ><i class="fas fa-users hugeFont"></i></a>

          </div>
        </div>
      </div>
      <div class="col-sm-4">
        <div class="card cardHeight">
          <div class="card-body">
            <h5 class="card-title">Add Employee</h5>
            <p
              class="card-text"
            >New employee on-board? Don't worry, we have that covered.</p>
            <a href="#" ><i class="fas fa-user-plus hugeFont"></i></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

@Component()
export default class AdminView extends Vue {}
</script>
