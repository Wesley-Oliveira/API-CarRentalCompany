import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        name: string;
        email;
    };
    token: string;
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}

    async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.usersRepository.findByEmail(email);
        if (!user) {
            throw new Error("Email or password incorrect!");
        }

        const passwordMatch = await compare(password, user.password);
        if (!passwordMatch) {
            throw new Error("Email or password incorrect!");
        }

        const token = sign({}, "a653509c5557b3a4e6e497635c54f639", {
            subject: user.id,
            expiresIn: "1d",
        });

        const tokenReturn: IResponse = {
            user: {
                name: user.name,
                email: user.email,
            },
            token,
        };
        return tokenReturn;
    }
}

export { AuthenticateUserUseCase };
