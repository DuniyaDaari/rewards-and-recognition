/* eslint-disable */
<template>
    <div>Hello {{id}}</div>
</template>
<script>

import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import { LazyInject } from '../../di'
import { COMMON_SERVICE } from '../../services/helpers/common'

@Component()
export default class HomeView extends Vue {
    @LazyInject(COMMON_SERVICE) commonService;

    id = '';

    created () {
      this.id = this.commonService.getId()
    }
}
</script>
