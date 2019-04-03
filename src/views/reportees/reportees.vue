<template>
  <div v-if="reportees.length > 0">
    <h1>My Reportees</h1>
    <br/>
    <recursive-accordion-component :data="reportees"></recursive-accordion-component>
  </div>
</template>
<script>
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import { LazyInject } from '../../di'
import { REPORTEES_SERVICE } from '../../services/api/reportees/reportees'
import { RrCommonState } from '../../store'

import RecursiveAccordionComponent from '../../components/recursive-accordion'

@Component({
  components: {
    RecursiveAccordionComponent
  }
})
export default class ReporteesView extends Vue {
    @LazyInject(REPORTEES_SERVICE) reporteesService

    @RrCommonState userDetails

    reportees = []

    async created () {
      this.reportees = await this.reporteesService.fetchReportees(this.pid)
      console.log(this.reportees)
    }

    get pid () {
      return this.userDetails.pid
    }
}
</script>
