<template>
  <div class="elevator">
    <div
      class="elevator-cabine"
      :id="elevatorStore.elevator.id"
      :class="{ blink: elevatorStore.elevator.status == 'arrived' }"
      ref="elevatorCabine"
      :style="[
        elevatorStore.moveElevator(elevatorStore.elevator),
        elevatorStore.smoothElevate(elevatorStore.elevator),
      ]"
    >
      <div class="elevator-cabine-table">
        <div class="elevator-cabine-table-text"></div>
        {{ elevatorStore.elevator.direction }}
        {{ elevatorStore.elevator.position }}
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref, watch } from "vue";
import { useElevatorStore } from "../stores/elevatorStore";

const elevatorStore = useElevatorStore();

onMounted(() => {
  elevatorStore.resetAfterReloadPage();
});
</script>
