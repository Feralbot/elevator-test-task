<template>
  <main>
    <div class="elevator">
      <div
        class="elevator-cabine"
        :style="{ bottom: `${elevatorHeight}vh` }"
      ></div>
    </div>
    <div class="buttons">
      <div class="flours">
        <div class="flour" v-for="flour in flours" :key="flour">
          <button
            @click="currentFlour = flour"
            :class="{ oneFlourUp: currentFlour }"
          >
            {{ flour }}
          </button>
          {{ currentFlour }}
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, watch } from "vue";
const flours = ref([1, 2, 3, 4, 5]);
const currentFlour = ref("");
const elevatorHeight = ref(0);
watch(currentFlour, () => {
  elevatorHeight.value = currentFlour.value * 20-20;
});
</script>
<style src="./styles/reset.css"></style>
<style src="./styles/main.css"></style>
<style src="./styles/animations.css"></style>
