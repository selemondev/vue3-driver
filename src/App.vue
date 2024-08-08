<script>
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
export default {
  mounted() {
    console.log('Driver', this.vueDriver.getState())
    this.vueDriver.drive();
  }
}
</script>
<template>
  <div v-driver-step="{ element: '.header', popover: { title: 'Selemon', description: 'Im a popover' } }">
    Hi, I'm some content!
  </div>

  <div v-driver-step="{ element: '.bottom', popover: { title: 'Brian', description: 'Im a popover' } }">
    Hi, I'm bottom content!
  </div>
</template>
