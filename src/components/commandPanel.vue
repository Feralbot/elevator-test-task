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
  </div>
</template>
<script setup>
import { useScaleStore } from "../stores/scaleStore";
const scaleStore = useScaleStore();
</script>
