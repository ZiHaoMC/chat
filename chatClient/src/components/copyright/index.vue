<template>
  <div class="copyright-cmp">
    <p class="copyright-item">Copyright©2019-{{endTime}}</p>
    <p class="copyright-item">作者：chenchao,ZiHaoMC</p>
    <p class="copyright-item">联系我：asktome@zcraft.us.kg</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      endTime: new Date().getFullYear()
    }
  },
}
</script>

<style lang="scss">
.copyright-cmp {
  position: fixed;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  .copyright-item {
    margin: 0 0 5px;
    color: #ffffff;
    font-size: 14px;
  }
}
</style>
