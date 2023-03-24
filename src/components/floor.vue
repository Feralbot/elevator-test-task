<template>
  <div class="floors">
    <div class="floor" v-for="floor in scaleStore.floors" :key="floor">
      <button
        class="floor-btn"
        :class="{
          'floor-btn__waiting': liftingSystemLogic.floorsQueue.includes(floor),
        }"
        @click="liftingSystemLogic.addToQueue(floor)"
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
