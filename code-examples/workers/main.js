// in you main electron process

const worker = createWorker(uuid);

worker.on("message", ({ type, payload }) => {
  switch (type) {
    case "done/now":
      return handleIntensiveWorkDone(payload)
  }
});
