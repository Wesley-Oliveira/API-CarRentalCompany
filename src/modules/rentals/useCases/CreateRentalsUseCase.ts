import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { AppError } from "@shared/errors/AppError";

import { Rental } from "../infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../repositories/IRentalsRepository";

dayjs.extend(utc);

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
    }: IRequest): Promise<Rental> {
        const minimumHour = 24;

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

        // validação se o aluguel tem duração mínima de 24h
        const expectedReturnDateFormat = dayjs(expected_return_date)
            .utc()
            .local()
            .format();

        const dateNow = dayjs().utc().local().format();
        const compare = dayjs(expectedReturnDateFormat).diff(dateNow, "hours");

        if (compare < minimumHour) {
            throw new AppError("Invalid return time!");
        }

        const rental = await this.rentalsRepository.create({
            user_id,
            car_id,
            expected_return_date,
        });

        return rental;
    }
}

export { CreateRentalsUseCase };
