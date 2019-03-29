<template>
  <div id="headerBg">
      <span id="headerLogo">
          <i class="fas fa-medal"></i>
      </span>
      <span v-if="login" id="profilePic">
          <i class="fas fa-user-circle"></i>
      </span>
      <span v-else id="profilePic">
          Login
      </span>
  </div>
</template>

<script>
export default {
  name: 'RRHeaderComponent',
  data: function () {
    return {
      login: false
    }
  }
}
</script>

<style>
    #headerBg {
        background: red;
        padding: 20px;
        background: #52b983;
        border-bottom: 1px solid #989EA4;
        border-top: 1px solid #717D85;
        color: #FFF;
        margin: 0;
        position: -webkit-sticky;
        position: sticky;
        top: -1px;
        opacity: 0.8;
    }
    #profilePic {
        font-size: 30px;
        margin-right: 20px;
        float: right;
    }
    #headerLogo {
        font-size: 30px;
    }
</style>
