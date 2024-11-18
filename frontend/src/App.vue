<template>
  <div id="app" lass="container-fluid">
    <!-- <AppHeader /> -->
    <div >
      <router-view />
    </div>
    <!-- <AppFooter /> -->
  </div>
    
</template>

<script>

// import AppHeader from "@/components/AppHeader.vue";
// import AppFooter from "@/components/AppFooter.vue";

export default {
  components: {
    // AppHeader,
    // AppFooter,
  },
};
</script>

<style>
  .container {
    margin: auto;
  }
</style>