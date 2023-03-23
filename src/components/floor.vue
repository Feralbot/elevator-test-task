<template>
  <div class="floors">
    <div class="floor" v-for="floor in elevatorStore.floors" :key="floor">
      <button
        class="floor-btn"
        :class="{
          'floor-btn__waiting': elevatorStore.floorsQueue.includes(floor),
        }"
        @click="elevatorStore.addToQueue(floor)"
      >
        {{ floor }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { useElevatorStore } from "../stores/elevatorStore";
const elevatorStore = useElevatorStore();
</script>
