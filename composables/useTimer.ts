export function useTimer() {
  const timer = useState("timer", () => ({
    workingTime: 1,
    restTime: 1,
    maxLoop: 1,
    currentLoop: 1,
    remainingTime: 0,
    interval: '' as NodeJS.Timeout | '',
    nowWorking: true,
  }));

  async function startPomodoro() {
    if (
      timer.value.workingTime === 0 ||
      timer.value.restTime === 0 ||
      timer.value.maxLoop === 0 ||
      timer.value.currentLoop === 0
    ) {
      throw new Error("予期せぬエラーが発生しました。最初からやり直してください。");
    }
    for (timer.value.currentLoop; timer.value.currentLoop <= timer.value.maxLoop; timer.value.currentLoop++) {
      if (timer.value.nowWorking) {
        if(timer.value.remainingTime === 0){
          timer.value.remainingTime = timer.value.workingTime * 60;
        }
        await new Promise<void>(resolve => {
          timer.value.interval = setInterval(() => {
            timer.value.remainingTime--;
            if (timer.value.remainingTime <= 0) {
              clearInterval(timer.value.interval);
              timer.value.nowWorking = false;
              resolve();
            }
          }, 1000);
        });
      }
      if (!timer.value.nowWorking) {
        if(timer.value.remainingTime === 0){
          timer.value.remainingTime = timer.value.restTime * 60;
        }
        await new Promise<void>(resolve => {
          timer.value.interval = setInterval(() => {
            timer.value.remainingTime--;
            if (timer.value.remainingTime <= 0) {
              clearInterval(timer.value.interval);
              timer.value.nowWorking = true;
              resolve();
            }
          }, 1000);
        });
      }
    }
  }

  function clearPomodoro() {
    clearInterval(timer.value.interval);
  }

  return {
    timer,
    startPomodoro,
    clearPomodoro
  };
}
