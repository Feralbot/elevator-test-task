<template>
  <div class="commandPannel">
    <button class="commandPannel--button" @click="scaleStore.increaseFloor">
      Добавить этаж
    </button>
    <button class="commandPannel--button" @click="scaleStore.decreaseFloor">
      убрать этаж
    </button>
    <button class="commandPannel--button" @click="scaleStore.increaseElevators">
      Добавить лифт
    </button>
    <button class="commandPannel--button" @click="scaleStore.decreaseElevators">
      Убрать лифт
    </button>
    {{ liftingSystemLogic.floorsQueue }}

    <div><div v-for="elevator in scaleStore.elevators">{{ elevator.status }}</div></div>
  </div>
</template>
<script setup>
import { useScaleStore } from "../stores/scaleStore";
import { useLiftingSystemLogicStore } from "../stores/liftingSystemLogicStore";
const scaleStore=useScaleStore();
const liftingSystemLogic = useLiftingSystemLogicStore();
</script>
