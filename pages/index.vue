<script setup lang="ts">
import { useTimer } from "@/composables/useTimer";
const { timer, startPomodoro, clearPomodoro } = useTimer();
const isRunning = ref(false);
const isPaused = ref(false);

// 25分の作業タイマーを開始
function startToPomodoro() {
  startPomodoro();
  isRunning.value = true;
  isPaused.value = false;
}

function pauseToPomodoro() {
  clearPomodoro();
  isRunning.value = false;
  isPaused.value = true;
}

function resetToPomodoro() {
  timer.value.workingTime = 1;
  timer.value.restTime = 1;
  timer.value.maxLoop = 1;
  timer.value.currentLoop = 1;
  timer.value.remainingTime = 0;
  timer.value.nowWorking = true;
  clearPomodoro();
  isRunning.value = false;
  isPaused.value = false;
}
</script>
<template>
  <div>
    <h1>MioPomodoro</h1>
  </div>
  <div>{{ timer.remainingTime }}</div>
  <div v-if="timer.nowWorking">作業時間</div>
  <div v-else>休憩時間</div>
  <div class="settings">
    <div>
      <h2>Count</h2>
    </div>
    <div>
      <label for="loop-selector">ループ回数:</label>
      <select id="loop-selector" v-model="timer.maxLoop">
        <option v-for="n in 5" :key="n" :value="n">{{ n }}</option>
      </select>
    </div>
    <div>
      <label for="working-time-slider">作業時間 (分):</label>
      <input
        type="range"
        id="working-time-slider"
        v-model="timer.workingTime"
        min="1"
        max="60"
      />
      <span>{{ timer.workingTime }} 分</span>
    </div>
    <div>
      <label for="rest-time-slider">休憩時間 (分):</label>
      <input
        type="range"
        id="rest-time-slider"
        v-model="timer.restTime"
        min="1"
        max="60"
      />
      <span>{{ timer.restTime }} 分</span>
    </div>
    <div>
      <h2>MusicSelect</h2>
      <div>
        ここを実装していく
      </div>
    </div>
  </div>
  <button @click="startToPomodoro()" :disabled="isRunning">
    start
  </button>
  <button @click="pauseToPomodoro()" :disabled="!isRunning">pause</button>
  <button @click="resetToPomodoro()" :disabled="!isRunning && !isPaused">
    rest
  </button>
</template>

<style scoped>
.settings > div {
  width: 500px;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}
</style>
