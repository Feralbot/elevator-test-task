<template>
  <div class="flour">
    <button
      class="flour-btn"
      :class="{
        'flour-btn__waiting': floursQueue.includes(flour),
      }"
      @click="elevatorStore.addToQueue(flour)"
    >
      {{ flour }}
    </button>
  </div>
</template>

<script setup>
import { useElevatorStore } from "../stores/elevatorStore";
const props = defineProps({
  floursQueue: { Array, required: true, default: [] },
  flour: { Number, require: true },
});
const elevatorStore = useElevatorStore();
</script>
