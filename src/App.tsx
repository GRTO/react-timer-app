import { useEffect, useRef, useState } from "react";
import "./App.css";

const ONE_MINIUTE_IN_SECONDS = 60;
const INITIAL_TIMER = 5 * ONE_MINIUTE_IN_SECONDS;

function App() {
  const [time, setTime] = useState(INITIAL_TIMER); // seconds
  const [isTimerStatus, setTimerStatus] = useState<
    "RUNNING" | "STOPPED" | "INITIALIZED"
  >("INITIALIZED");
  const timerRef = useRef<number | undefined>(undefined);

  const isTimerRunning = isTimerStatus === "RUNNING";

  const timeParsed = `${String(
    Math.floor(time / ONE_MINIUTE_IN_SECONDS)
  ).padStart(2, "0")}:${String(time % ONE_MINIUTE_IN_SECONDS).padStart(
    2,
    "0"
  )}`;

  const createTimer = () =>
    setInterval(() => {
      setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : prevTime));
    }, 1000);

  useEffect(() => {
    setTimerStatus("RUNNING");
    timerRef.current = createTimer();

    return () => clearInterval(timerRef.current);
  }, []);

  const handleStop = () => {
    setTimerStatus("STOPPED");
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = undefined;
    }
  };

  const handleStart = () => {
    if (!timerRef.current) {
      setTimerStatus("RUNNING");
      timerRef.current = createTimer();
    }
  };

  const handleReset = () => {
    setTimerStatus("RUNNING");
    setTime(INITIAL_TIMER);
    timerRef.current = createTimer();
  };

  return (
    <>
      <h1>{timeParsed}</h1>
      <button disabled={isTimerRunning} onClick={handleStart}>
        Start
      </button>
      <button disabled={!isTimerRunning} onClick={handleStop}>
        Stop
      </button>
      <button onClick={handleReset}>Reset</button>
    </>
  );
}

export default App;
