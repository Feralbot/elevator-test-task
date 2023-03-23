<template>
  <main>
    <div class="elevator">
      <div
        class="elevator-cabine"
        :class="{ blink: elevatorStatusStore.elevatorStatus == 'arrived' }"
        ref="elevatorCabine"
        :style="[elevatorStore.moveElevator, elevatorStore.smoothElevate]"
      >
        <div class="elevator-cabine-table">
          <div class="elevator-cabine-table-text"></div>
          {{ elevatorStore.elevationPath }} {{ elevatorStore.currentFloor }}
        </div>
      </div>
    </div>

    <floorComponent />
    {{ elevatorStatusStore.elevatorStatus }}
  </main>
</template>

<script setup>
// [ ] 1. Не реализована часть с масштабированием количества лифтов.  // сделать,
// [X] 2. Не совсем логичная работа с данными из store в component/floor, часть данных берется из пропсов, но в тоже время подключено стор для вызова метода. Лучше выбрать один способо, либо общаться со стором напрямую, либо через пропсы и эвенты.
//        //Привести к единой форме
// [ ] полноценная реализацию с несколькими лифтами. // сделать

// [ ]- Хранение информации о позиционировании и анимации лифта в модуле состояния  //  перенести
// [!!]- Трудночитаемая история коммитов (дублирования, не совсем понятные месседжи) // Коммитить важные вещи, конкретнее описывать коммиты
// [Х?]- Неочевидная смена статусов (разные статусы выставляются в компоненте и модуле состояния, некоторые напрямую, некоторые через функцию)
//       //Вынес состояния лифта в отдельный стор, стало чуть лучше, но не идеально, по сути, они также задаются через разные функции в разных компонентах.
// [X?]- Не сохраняется очередь этажей при перезагрузке страницы // Пофиксил, но костыльно, через SetTimeout ({..},1).
//       Состояние inProgress сохраняется при перезагрузке страницы, из за watcher'а на currentFloor.
//       Пробовал разные варианты, выбраный оказался лучшим на текущий момент.

// [X]- Четче разграничить ответственность между компонентами и store // убрать пропсы, брать данные из стора
// [ ]- Четче разграничить ответственность в рамках компонентов (определить "умные" и "глупые") // пока ? Точно выделить лифт в компонент,
// [ ]- Отделить презентационную логику от бизнес-логики // Через композаблы, движение и анимации в один, добавление этажей, лифтов в другой.
// [ ]- Проследить при добавлении этажа высоту подьема лифта

import { onMounted, ref, watch } from "vue";
import { useElevatorStore } from "./stores/elevatorStore";
import { useElevatorStatusStore } from "./stores/elevatorStatusStore";
import floorComponent from "./components/floor.vue";

const elevatorStore = useElevatorStore();
const elevatorStatusStore = useElevatorStatusStore();
const elevatorCabine = ref();
onMounted(() => {
  elevatorStore.getLocalStorage();
  elevatorStore.resetAfterReloadPage();
});

function StartQueueElevating() {
  elevatorCabine.value.ontransitionend = () => {
    elevatorStatusStore.setArrived();
    elevatorStore.elevationPath = "";
    setTimeout(() => {
      elevatorStatusStore.setRest();
      elevatorStore.elevateDelivered();
      if (elevatorStore.floorsQueue.length != 0) {
        StartQueueElevating();
      }
    }, 3000);
  };
}

watch(
  () => elevatorStatusStore.elevatorStatus,
  () => {
    // console.log(
    //   "elevator Status changed to " + elevatorStatusStore.elevatorStatus
    // );
    if (elevatorStatusStore.elevatorStatus == "inProgress") {
      StartQueueElevating();
    }
  },
  { deep: true }
);
</script>
<style src="./styles/reset.css"></style>
<style src="./styles/main.css"></style>
<style src="./styles/animations.css"></style>
