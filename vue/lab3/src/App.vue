<template>
  <div class="app-container">
    <headerComponenet class="header"></headerComponenet>
    <div class="content-area">
      <SideBar class="sidebar"></SideBar>
      <BodyComponenet class="main-content"></BodyComponenet>
    </div>
    <footerComponenet class="footer"></footerComponenet>
  </div>
</template>

<script>
import headerComponenet from "./components/HeaderComponenet.vue";
import BodyComponenet from "./components/BodyComponenet.vue";
import SideBar from "./components/SideBar.vue";
import footerComponenet from "./components/footerComponenet.vue";

export default {
  name: 'App',
  components: {
    headerComponenet,
    BodyComponenet,
    SideBar,
    footerComponenet
  }
}
</script>

<style>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header {
  width: 100%;
}

.content-area {
  display: flex;
  flex: 1;
}

.sidebar {
  width: 25%;
  min-width: 200px;
}

.main-content {
  flex: 1;
}

.footer {
  background-color: cyan;
  height: 30vh;
  width: 100%;
}
</style>