import { AppError } from "@shared/errors/AppError";

import { IRentalsRepository } from "../repositories/IRentalsRepository";

interface IRequest {
    user_id: string;
    car_id: string;
    expected_return_date: Date;
}

class CreateRentalsUseCase {
    constructor(private rentalsRepository: IRentalsRepository) {}

    async execute({
        user_id,
        car_id,
        expected_return_date,
    }: IRequest): Promise<void> {
        // Validação se já existe um alguel em aberto para o mesmo carro
        const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(
            car_id
        );
        if (carUnavailable) {
            throw new AppError("Car is unavailable!");
        }

        // validação se já existe um alugel em aberto para o mesmo usuário
        const rentalOpenToUser =
            await this.rentalsRepository.findOpenRentalsByUser(user_id);
        if (rentalOpenToUser) {
            throw new AppError("There's a rental in progress for user!");
        }
    }
}

export { CreateRentalsUseCase };
