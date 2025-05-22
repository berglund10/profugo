import express, { Request, Response } from "express";
import promClient from 'prom-client';
import logger from "./logger";

export function createApp() {

  const register = new promClient.Registry();

  promClient.collectDefaultMetrics({ register });

  const counter = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'status_code'],
});


  const app = express();

  app.use(express.json());

  app.use((req, res, next) => {
  res.on('finish', () => {
    counter.inc({ method: req.method, status_code: res.statusCode });
  });
  next();
});

app.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
  } catch (error) {
    res.status(500).end(error);
  }
});

  app.get("/status", (req: Request, res: Response) => {
    logger.info("Denna podden svarade");
    console.log(process.env.MOREIFO);
    res.status(200).json({ message: "Are you ready??" });
  });

  app.get("/ok", (req: Request, res: Response) => {
    logger.log("error", "Något gick jävligt fel");
    console.log(process.env.TEST); 
    res.send("ok");
  });

  app.get('/', (req, res) => {
  res.send('Welcome to root!');
});

  return app;
}
