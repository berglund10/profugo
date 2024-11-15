import { createService } from "./service";
import { createRouter } from "./router";
import { createContributionsDb } from "./repository";

export const createContributionsFeature = () => {
  const db = createContributionsDb();
  const service = createService(db);
  const router = createRouter(service);

  return {
    router,
  };
};
