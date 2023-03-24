import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { useElevatorStore } from "./elevatorStore";

export const useScaleStore = defineStore("scaleStore", () => {
  const elevatorStore = useElevatorStore();
  const floors = ref(5);
  const elevators = ref([elevatorStore.elevator]);

  const increaseFloor = () => {
    floors.value++;
  };
  const decreaseFloor = () => {
    if (floors.value > 5) {
      floors.value--;
    }
  };
  const increaseElevators = () => {
    elevators.value++;
  };
  const decreaseElevators = () => {
    if (elevators.value > 1) {
      elevators.value--;
    }
  };
  const setScalingDatatoLocalStorage = () => {
    localStorage.setItem("ElevatorsAmmount", JSON.stringify(elevators.value));
    localStorage.setItem("FloorsAmmount", JSON.stringify(floors.value));
  };

  const getScalingDataFromLocalStorage = () => {
    const elevatorsData = localStorage.getItem("ElevatorsAmmount");
    if (elevatorsData) {
      elevators.value = JSON.parse(elevatorsData);
    }
    const FloorsAmmountData = localStorage.getItem("FloorsAmmount");
    if (FloorsAmmountData) {
      floors.value = JSON.parse(FloorsAmmountData);
    }
  };
  watch(floors, () => {
    setScalingDatatoLocalStorage();
  });
  watch(elevators, () => {
    setScalingDatatoLocalStorage();
  });
  return {
    floors,
    increaseFloor,
    decreaseFloor,
    elevators,
    increaseElevators,
    decreaseElevators,
    setScalingDatatoLocalStorage,
    getScalingDataFromLocalStorage,
  };
});
