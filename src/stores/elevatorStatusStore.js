import { defineStore } from "pinia";
import { ref } from "vue";
export const useElevatorStatusStore = defineStore("elevatorStatusStore", () => {
  const elevatorStatus = ref("rest");
  const setRest = () => {
    elevatorStatus.value = "rest";
  };
  const setInProgress = () => {
    elevatorStatus.value = "inProgress";
  };
  const setArrived = () => {
    elevatorStatus.value = "arrived";
  };
  return { elevatorStatus, setRest, setInProgress, setArrived };
});
