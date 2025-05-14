import { createApp } from "./app";
import logger from "./logger";

const app = createApp();

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Listen on port ${PORT}...`);
});

process.on("SIGINT", () => {
    logger.log("error", "SIGINT", {});
    process.exit(1);
})