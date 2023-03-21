<template>
  <div class="floor">
    <button
      class="floor-btn"
      :class="{
        'floor-btn__waiting': floorsQueue.includes(floor),
      }"
      @click="elevatorStore.addToQueue(floor)"
    >
      {{ floor }}
    </button>
  </div>
</template>

<script setup>
import { useElevatorStore } from "../stores/elevatorStore";
const props = defineProps({
  floorsQueue: { Array, required: true, default: [] },
  floor: { Number, require: true },
});
const elevatorStore = useElevatorStore();
</script>
