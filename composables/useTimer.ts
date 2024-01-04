export function useTimer() {
  const timer = useState("timer", () => ({
    workingTime: 0,
    restTime: 0,
    maxLoop: 0,
    currentLoop: 1,
    remainingTime: 0,
    nowWorking: true,
  }));

  // TODO: 次一時停止、クリアボタンを設置して操作できるようにしたい。
  // TODO: その次は数字を受け取って開始できるように。
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
          timer.value.remainingTime = timer.value.workingTime;
        }
        await new Promise<void>(resolve => {
          const workInterval = setInterval(() => {
            timer.value.remainingTime--;
            if (timer.value.remainingTime <= 0) {
              clearInterval(workInterval);
              timer.value.nowWorking = false;
              resolve();
            }
          }, 1000);
        });
      }
      if (!timer.value.nowWorking) {
        if(timer.value.remainingTime === 0){
          timer.value.remainingTime = timer.value.restTime;
        }
        await new Promise<void>(resolve => {
          const restInterval = setInterval(() => {
            timer.value.remainingTime--;
            if (timer.value.remainingTime <= 0) {
              clearInterval(restInterval);
              timer.value.nowWorking = true;
              resolve();
            }
          }, 1000);
        });
      }
    }
  }

  return {
    timer,
    startPomodoro,
  };
}
