import {
    ICreateSpecificationDTO,
    ISpecificationRepository,
} from "./ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationRepository {
    create({ description, name }: ICreateSpecificationDTO): void {
        throw new Error("Method not implemented.");
    }
}

export { SpecificationsRepository };
