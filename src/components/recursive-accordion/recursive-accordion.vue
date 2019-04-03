<template>
  <div v-if="renderComponent">
    <div class="accordion" id="accordionExample">
      <div class="card" v-for="reportee in reportees" :key="reportee.pid">
        <div class="card-header" :id="`headingOne${reportee.pid}`">
          <h2 class="mb-0">
            <button
              class="btn btn-link"
              type="button"
              data-toggle="collapse"
              @click.prevent="getReportees(reportee)"
              :data-target="`#collapse${reportee.pid}`"
              aria-expanded="true"
              aria-controls="collapseOne"
              v-if="reportee.hasReportees"
            >{{reportee.pid}}----{{reportee.name}}</button>
            <div v-else>{{reportee.pid}}----{{reportee.name}}</div>
          </h2>
        </div>
        <recursive-accordion v-if="reportee.reporteesList" :data="reportee.reporteesList"/>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

import { LazyInject } from '../../di'
import { REPORTEES_SERVICE } from '../../services/api/reportees/reportees'

import RecursiveAccordionComponent from './index'

@Component({
  components: {
    RecursiveAccordionComponent
  }
})
export default class RecursiveAccordion extends Vue {
  @Prop({ type: Array }) data
  @LazyInject(REPORTEES_SERVICE) reporteesService
  renderComponent = false

  created () {
    console.log(this.data)
    this.renderComponent = true
  }

  async getReportees (reportee) {
    this.renderComponent = false
    reportee.reporteesList = await this.reporteesService.fetchReportees(reportee.pid)
    await Vue.nextTick()
    this.renderComponent = true
  }

  get reportees () {
    return this.data
  }
}
</script>
