import { defineStore } from "pinia";
import { ref, reactive, watch } from "vue";
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

    const elevateDelivered = () => {
      floorsQueue.value.shift();
    };

    const selectRestingElevator = () => {
      let restingElevator;
      scaleStore.elevators.forEach((elevator) => {
        if (elevator.status == "rest") {
          restingElevator = elevator;
        }
      });
      return restingElevator;
    };

    watch(
      floorsQueue.value,
      () => {
        elevatorStore.startQueue(selectRestingElevator());
        setQueueToLocalStorage();
      },
      { deep: true }
    );

    return {
      floorsQueue,
      setQueueToLocalStorage,
      getQueueFromLocalStorage,
      elevateDelivered,
      addToQueue,
      selectRestingElevator,
    };
  }
);
