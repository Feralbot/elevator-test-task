import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { useElevatorStore } from "./elevatorStore";
import { useScaleStore } from "./scaleStore";
export const useLiftingSystemLogicStore = defineStore(
  "liftingSystemLogic",
  () => {
    const elevatorStore = useElevatorStore();
    const scaleStore = useScaleStore();
    const floorsQueue = ref([]);

    const setQueueToLocalStorage = () => {
      localStorage.setItem("floorsQueue", JSON.stringify(floorsQueue.value));
    };
    const getQueueFromLocalStorage = () => {
      const queueData = localStorage.getItem("floorsQueue");
      if (queueData) {
        floorsQueue.value = JSON.parse(queueData);
      }
    };
    const addToQueue = (floor) => {
      if (!floorsQueue.value.includes(floor)) {
        floorsQueue.value.push(floor);
      }
    };

    const elevateDelivered = (queue) => {
      const executedQueue = floorsQueue.value.indexOf(queue);
      floorsQueue.value.splice(executedQueue, 1);
    };

    watch(
      floorsQueue.value,
      () => {
        for (let q = 0; q < floorsQueue.value.length; q++) {
          let e = q;
          if (e < scaleStore.elevators.length) {
            if (scaleStore.elevators[e].status != "InProgress")
              elevatorStore.startQueue(
                scaleStore.elevators[e],
                floorsQueue.value[q]
              );
           

            console.log(
              "лифт " +
                scaleStore.elevators[e].id +
                " Отправился выполнять запрос на " +
                floorsQueue.value[q] +
                " этаж"
            );
            e++;
          }
        }
      },
      { deep: true }
    );

    return {
      floorsQueue,
      setQueueToLocalStorage,
      getQueueFromLocalStorage,
      elevateDelivered,
      addToQueue,
    };
  }
);
