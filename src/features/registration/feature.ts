import { createService } from "./service";
import { createRouter } from "./router";
import { db } from "../../db";

export const createPersonFeature = () => {
  const service = createService(db);
  const router = createRouter(service);

  return {
    router,
  };
};
