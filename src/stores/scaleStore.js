import { defineStore } from "pinia";
import { ref, watch, computed } from "vue";
import { useElevatorStore } from "./elevatorStore";

export const useScaleStore = defineStore("scaleStore", () => {
  const elevatorStore = useElevatorStore();
  const floors = ref(5);
  const elevators = ref([
    {
      id: 1,
      position: 1,
      destination: 1,
      speed: 0,
      status: "rest",
      direction: "",
    },
  ]);

  const increaseFloor = () => {
    floors.value++;
  };
  const decreaseFloor = () => {
    if (floors.value > 5) {
      floors.value--;
    }
  };
  const setID = () => {
    return elevators.value.length + 1;
  };
  const increaseElevators = () => {
    elevators.value.push({
      id: setID(),
      position: 1,
      destination: 1,
      speed: 0,
      status: "rest",
      direction: "",
    });
  };
  const decreaseElevators = () => {
    if (elevators.value.length > 1) {
      elevators.value.splice(-1);
    }
  };
  const setScalingDatatoLocalStorage = () => {
    localStorage.setItem("ElevatorsInfo", JSON.stringify(elevators.value));
    localStorage.setItem("FloorsAmmount", JSON.stringify(floors.value));
  };

  const getScalingDataFromLocalStorage = () => {
    const elevatorsData = localStorage.getItem("ElevatorsInfo");
    if (elevatorsData) {
      elevators.value = JSON.parse(elevatorsData);
    }
    const FloorsAmmountData = localStorage.getItem("FloorsAmmount");
    if (FloorsAmmountData) {
      floors.value = JSON.parse(FloorsAmmountData);
    }
  };
  const elevatorHeight = computed(() => {
    return `height: ${799 / floors.value}px`;
  });
  const elevatorTop = computed(() => {
    return `top: ${800 - 800 / floors.value}px`;
  });
  watch(floors, () => {
    //setScalingDatatoLocalStorage();
  });
  watch(
    elevators,
    () => {
      //  setScalingDatatoLocalStorage();
    },
    { deep: true }
  );
  return {
    floors,
    elevators,
    elevatorHeight,
    elevatorTop,
    increaseFloor,
    decreaseFloor,
    increaseElevators,
    decreaseElevators,
    setScalingDatatoLocalStorage,
    getScalingDataFromLocalStorage,
    setID,
  };
});
