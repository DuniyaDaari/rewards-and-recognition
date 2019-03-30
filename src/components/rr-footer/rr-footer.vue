<template>
  <div class="footerBg">
    <footer class="page-footer font-small">
      <div class="footer-copyright text-center py-3">© 2019 Copyright</div>
    </footer>
  </div>
</template>

<script>
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

@Component()
export default class RrFooter extends Vue {}
</script>

<style>
.footerBg {
  background-color: #04476f;
  color: #fff;
  position: fixed;
  padding: 0 10px 0 10px;
  left: 0px;
  bottom: 0px;
  width: 100%;
}
</style>
