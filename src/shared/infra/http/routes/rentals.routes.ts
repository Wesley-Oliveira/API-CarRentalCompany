import { Router } from "express";

import { CreateRentalsController } from "@modules/rentals/useCases/CreateRentalsController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const rentalsRoutes = Router();

const createRentalsController = new CreateRentalsController();

rentalsRoutes.post("/", ensureAuthenticated, createRentalsController.handle);

export { rentalsRoutes };
