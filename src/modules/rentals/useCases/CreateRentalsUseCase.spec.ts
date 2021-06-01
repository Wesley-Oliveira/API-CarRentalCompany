import { AppError } from "@shared/errors/AppError";

import { RentalsRepositoryInMemory } from "../repositories/in-memory/RentalsRepositoryInMemory";
import { CreateRentalsUseCase } from "./CreateRentalsUseCase";

let createRentalsUseCase: CreateRentalsUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;

describe("Create Rental", () => {
    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        createRentalsUseCase = new CreateRentalsUseCase(
            rentalsRepositoryInMemory
        );
    });

    it("should be able to create a new rental", async () => {
        const rental = await createRentalsUseCase.execute({
            user_id: "12345",
            car_id: "123456",
            expected_return_date: new Date(),
        });

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    });

    it("should not be able to create a new rental if there is another open to the same user", async () => {
        expect(async () => {
            await createRentalsUseCase.execute({
                user_id: "1234",
                car_id: "9876",
                expected_return_date: new Date(),
            });

            await createRentalsUseCase.execute({
                user_id: "1234",
                car_id: "1011",
                expected_return_date: new Date(),
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to create a new rental if there is another open to the same car", async () => {
        expect(async () => {
            await createRentalsUseCase.execute({
                user_id: "1234",
                car_id: "1011",
                expected_return_date: new Date(),
            });

            await createRentalsUseCase.execute({
                user_id: "9876",
                car_id: "1011",
                expected_return_date: new Date(),
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
