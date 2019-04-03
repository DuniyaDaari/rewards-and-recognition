<template>
  <div v-if="renderComponent">
    <ul class="accordion" id="accordionExample">
      <li class="card" v-for="reportee in reportees" :key="reportee.pid">
        <div class="card-header" :id="`headingOne${reportee.pid}`">
            <a
              href="#"
              @click.prevent="togglePanel(reportee.pid) && !reportee.reporteesList && getReportees(reportee)"
              aria-expanded="true"
              aria-controls="collapseOne"
              v-if="reportee.hasReportees"
            >
            <i class="fas" :class="isPanelOpen[reportee.pid] ? 'fa-minus' : 'fa-plus'">&nbsp;&nbsp;</i>
            {{reportee.firstName}}</a>
            <span v-else><i class="fas fa-angle-right"></i>&nbsp;&nbsp;{{reportee.firstName}}</span>
        </div>
        <recursive-accordion :id="`collapse${reportee.pid}`"
        :class="isPanelOpen[reportee.pid] ? 'collapse show' : 'collapse'"
        v-if="reportee.reporteesList" :data="reportee.reporteesList"/>
      </li>
    </ul>
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
  isPanelOpen = []

  created () {
    this.renderComponent = true
  }

  async reRenderComponent () {
    this.renderComponent = false
    await Vue.nextTick()
    this.renderComponent = true
  }

  async togglePanel (pid) {
    this.isPanelOpen[pid] = !this.isPanelOpen[pid]
    await this.reRenderComponent()
    return true
  }

  async getReportees (reportee) {
    reportee.reporteesList = await this.reporteesService.fetchReportees(reportee.pid)
    await this.reRenderComponent()
  }

  get reportees () {
    return this.data
  }
}
</script>
