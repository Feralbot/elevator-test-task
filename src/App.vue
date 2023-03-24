<template>
  <main>
    <elevatorComponent />
    <floorComponent />
    <div class="commandPannel">
      <button class="commandPannel--button" @click="scaleStore.increaseFloor">
        Добавить этаж
      </button>
      <button class="commandPannel--button" @click="scaleStore.decreaseFloor">
        убрать этаж
      </button>
      <button
        class="commandPannel--button"
        @click="scaleStore.increaseElevators"
      >
        Добавить лифт
      </button>
      <button
        class="commandPannel--button"
        @click="scaleStore.decreaseElevators"
      >
        убрать лифт
      </button>
      {{ liftingSystemLogic.floorsQueue }}
      <!-- <div
        class="stats"
        v-for="elevator in scaleStore.elevators"
        :key="elevator"
      >
        <div class="id">ID: {{ elevator.id }}</div>
        <div class="position">position: {{ elevator.position }}</div>
        <div class="destination">destination: {{ elevator.destination }}</div>
        <div class="speed">speed: {{ elevator.speed }}</div>
        <div class="status">status: {{ elevator.status }}</div>
        <div class="direction">direction: {{ elevator.direction }}</div>
      </div>
      QUEUE {{ liftingSystemLogic.floorsQueue }} -->
    </div>
  </main>
</template>

<script setup>
// [ ] 1. Не реализована часть с масштабированием количества лифтов.  // сделать,
// [X] 2. Не совсем логичная работа с данными из store в component/floor, часть данных берется из пропсов, но в тоже время подключено стор для вызова метода. Лучше выбрать один способо, либо общаться со стором напрямую, либо через пропсы и эвенты.
//        //Привести к единой форме
// [ ] полноценная реализацию с несколькими лифтами. // сделать

// [ ]- Хранение информации о позиционировании и анимации лифта в модуле состояния  //  перенести
// [!!]- Трудночитаемая история коммитов (дублирования, не совсем понятные месседжи) // Коммитить важные вещи, конкретнее описывать коммиты
// [ ]- Неочевидная смена статусов (разные статусы выставляются в компоненте и модуле состояния, некоторые напрямую, некоторые через функцию)
//       //Вынес состояния лифта в отдельный стор, стало чуть лучше, но не идеально, по сути, они также задаются через разные функции в разных компонентах.
// [ ]- Не сохраняется очередь этажей при перезагрузке страницы // Пофиксил, но костыльно, через SetTimeout ({..},1).
//       Состояние inProgress сохраняется при перезагрузке страницы, из за watcher'а на currentFloor.
//       Пробовал разные варианты, выбраный оказался лучшим на текущий момент.

// [X]- Четче разграничить ответственность между компонентами и store // убрать пропсы, брать данные из стора
// [ ]- Четче разграничить ответственность в рамках компонентов (определить "умные" и "глупые") // пока ? Точно выделить лифт в компонент,
// [ ]- Отделить презентационную логику от бизнес-логики // Через композаблы, движение и анимации в один, добавление этажей, лифтов в другой.
// [ ]- Проследить при добавлении этажа высоту подьема лифта
// [ ]- Убрать панель с кнопками в компонент
// [ ]- Добавить в LocalStorage Сколько этажей и лифтов, иначе будет странно.
import { onMounted } from "vue";
import { useElevatorStore } from "./stores/elevatorStore";
import { useScaleStore } from "./stores/scaleStore";

import floorComponent from "./components/floor.vue";
import elevatorComponent from "./components/elevator.vue";
import { useLiftingSystemLogicStore } from "./stores/liftingSystemLogicStore";

const elevatorStore = useElevatorStore();
const scaleStore = useScaleStore();
const liftingSystemLogic = useLiftingSystemLogicStore();
onMounted(() => {
  scaleStore.getScalingDataFromLocalStorage();
});
</script>
<style src="./styles/reset.css"></style>
<style src="./styles/main.css"></style>
<style src="./styles/animations.css"></style>
