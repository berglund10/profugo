import { createService } from "./service";
import { createRouter } from "./router";
import { createPersonDb } from "./repository";

export const createPersonFeature = () => {
  const db = createPersonDb();
  const service = createService(db);
  const router = createRouter(service);

  return {
    router,
  };
};
