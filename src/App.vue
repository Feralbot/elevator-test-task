<template>
  <main>
    <div class="elevator">
      <div class="elevator-cabine" :class="{ shake: elevateInProgress }">
        <div class="elevator-cabine-table">
          <div class="elevator-cabine-table-text"></div>
          {{ elevationPath }} {{ currentFlour }} {{ elevatorStore.flours }}
        </div>
      </div>
    </div>
    <div class="buttons">
      <div class="flours">
        <div class="flour" v-for="flour in flours" :key="flour">
          <button
            class="flour-btn"
            :class="{
              'flour-waiting': currentFlour == flour && elevateInProgress,
            }"
            @click="currentFlour = flour"
          >
            {{ flour }}
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { useElevatorStore } from "./stores/elevatorStore";

const elevatorStore = useElevatorStore();

const flours = ref([1, 2, 3, 4, 5]);
const currentFlour = ref(1);
const flourQueue = ref([]);
const elevationPath = ref("");
const elevateInProgress = ref(false);

onMounted(() => {
  const flourData = localStorage.getItem("currentFlour");
  if (flourData) {
    currentFlour.value = JSON.parse(flourData);
  }
});

function moveElevator(newFlour, oldFlour) {
  elevateInProgress.value = true;
  if (newFlour > oldFlour) {
    elevationPath.value = "↑ ";
    ///
  } else {
    elevationPath.value = "↓ ";
    ///
  }
  elevationPath.value = "";
  elevateInProgress.value = false;
}

watch(currentFlour, (newFlour, oldFlour) => {
  localStorage.setItem("currentFlour", JSON.stringify(newFlour));
  elevateInProgress.value = true;
  if (newFlour != oldFlour) {
    flourQueue.value.push({
      newFlour: newFlour,
      oldFlour: oldFlour,
      status: "inQueue",
    });
  }
  flourQueue.value.forEach(async (elevateOrder) => {
    if (elevateOrder.status != "done") {
      moveElevator(newFlour, oldFlour);
      elevateOrder.status = "done";
    }
  });
});
</script>
<style src="./styles/reset.css"></style>
<style src="./styles/main.css"></style>
<style src="./styles/animations.css"></style>
