<template>
  <div class="floors">
    <div
      class="floor"
      id="floor"
      v-for="floor in scaleStore.floors"
      :key="floor"
    >
      <button
        class="floor-btn"
        @click="liftingSystemLogic.addToQueue(floor)"
        :class="{
          'floor-btn__waiting': liftingSystemLogic.floorsQueue.includes(floor),
        }"
      >
        {{ floor }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { useElevatorStore } from "../stores/elevatorStore";
import { useScaleStore } from "../stores/scaleStore";
import { useLiftingSystemLogicStore } from "../stores/liftingSystemLogicStore";
const elevatorStore = useElevatorStore();
const scaleStore = useScaleStore();
const liftingSystemLogic = useLiftingSystemLogicStore();
</script>
