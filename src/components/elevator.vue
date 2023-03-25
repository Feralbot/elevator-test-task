<template>
  <div
    class="elevator"
    v-for="elevator in scaleStore.elevators"
    :key="elevator.id"
  >
    <div
      class="elevator-cabine"
      :id="elevator.id"
      :class="{ blink: elevator.status == 'arrived' }"
      :style="[
        elevatorStore.moveElevator(elevator),
        elevatorStore.smoothElevate(elevator),
        scaleStore.elevatorHeight,
        scaleStore.elevatorTop,
      ]"
    >
      <div class="elevator-cabine-table">
        <div class="elevator-cabine-table-text"></div>
        {{ elevator.direction }}
        {{ elevator.destination }}
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted } from "vue";
import { useElevatorStore } from "../stores/elevatorStore";
import { useScaleStore } from "../stores/scaleStore";
import { useLiftingSystemLogicStore } from "../stores/liftingSystemLogicStore";
const elevatorStore = useElevatorStore();
const scaleStore = useScaleStore();
const liftingSystemLogic = useLiftingSystemLogicStore();

onMounted(() => {
  scaleStore.getScalingDataFromLocalStorage();
  liftingSystemLogic.getQueueFromLocalStorage();
  elevatorStore.resetAfterReloadPage();
});
</script>
