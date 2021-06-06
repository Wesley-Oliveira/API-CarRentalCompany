import { Router } from "express";

import { CreateRentalsController } from "@modules/rentals/useCases/createRentalsUseCase/CreateRentalsController";
import { DevolutionRentalController } from "@modules/rentals/useCases/devolutionRental/DevolutionRentalController";
import { ListRentalsByUserController } from "@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const rentalsRoutes = Router();

const createRentalsController = new CreateRentalsController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalsRoutes.post("/", ensureAuthenticated, createRentalsController.handle);
rentalsRoutes.post(
    "/devolution/:id",
    ensureAuthenticated,
    devolutionRentalController.handle
);
rentalsRoutes.get(
    "/user",
    ensureAuthenticated,
    listRentalsByUserController.handle
);

export { rentalsRoutes };
