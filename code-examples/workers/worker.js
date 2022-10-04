import { isMainThread, parentPort, Worker } from "worker_threads";

// The code is executed in the main thread
export const createWorker = (uuid) => {
  const worker = new Worker(uuid);

  worker.on("exit", (code) => {
    console.log(`The worker exited with code: ${code}`);
  });
  worker.on("error", (error) => log.error(error));

  return worker;
};

/*
 * Code executed in the worker thread
 */
if (!isMainThread) {
  // Handle any regular message (not 'error' or 'exit') in here.
  parentPort.on("message", (action) => {
    switch (action.type) {
      case "handle-intensive-thing":
        return handleIntensiveThing(action);
    }
  });
}

const handleIntensiveThing = async ({ payload }) => {

  // Do some intensive tasks here
  // message the main thread when you are done
  parentPort.postMessage({
    type: "done/now",
    payload: {
      uuid: payload.uuid,
    },
  });
};
