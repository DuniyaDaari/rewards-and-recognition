<template>
  <div id="headerBg">
      <span id="headerLogo">
          Header!
      </span>
      <span v-if="login" id="profilePic">
          <i class="fas fa-user-circle"></i>
      </span>
  </div>
</template>

<<script>
export default {
  name: 'RRHeaderComponent',
  data: function(){
        return {
            login: true
        }

  }
}
</script>


<<style>
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
    }
    #profilePic {
        font-size: 30px;
        margin-right: 20px;
        float: right;
    }
    #headerLogo {
        font-size: 25px;
    }
</style>
