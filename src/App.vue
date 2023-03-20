<template>
  <main>
    <div class="elevator">
      <div class="elevator-cabine"></div>
    </div>
    <div class="buttons">
      <div class="flours">
        <div class="flour" v-for="flour in flours" :key="flour">
          <button class="flour-btn" @click="currentFlour = flour">
            {{ flour }}
          </button>
          {{ flourQueue }}
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, watch } from "vue";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Draggable } from "gsap/Draggable";
import { EaselPlugin } from "gsap/EaselPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { PixiPlugin } from "gsap/PixiPlugin";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(
  Flip,
  ScrollTrigger,
  Observer,
  ScrollToPlugin,
  Draggable,
  EaselPlugin,
  MotionPathPlugin,
  PixiPlugin,
  TextPlugin
);

const flours = ref([1, 2, 3, 4, 5]);
const currentFlour = ref(1);
const flourQueue = ref([]);
watch(currentFlour, (flour) => {
  flourQueue.value.push(currentFlour.value);
  gsap
    .timeline()
    .to(".elevator-cabine", {
      y: -160 * (flour - 1),
      duration: 1 * (flour - 1),
    })
    .from(".elevator-cabine", {
      duration: 3,
      backgroundColor: "red",
    });
});
</script>
<style src="./styles/reset.css"></style>
<style src="./styles/main.css"></style>
<style src="./styles/animations.css"></style>
