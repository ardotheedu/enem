import { Body, ConflictException, Controller, Inject, Post, UnauthorizedException, UsePipes } from "@nestjs/common";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import * as sc from '../../db/schema';
import { DrizzleAsyncProvider } from "../drizzle/drizzle.provider";
import { eq } from "drizzle-orm";
import {compare} from "bcryptjs";
import z from "zod";
import { ZodValidationPipe } from "@enem/common";
import { JwtService } from "@nestjs/jwt";

const createSessionBodySchema = z.object({
    email: z.email(),
    password: z.string().min(6),
});

type CreateSessionBodySchema = z.infer<typeof createSessionBodySchema>;

@Controller('/sessions')
export class AuthenticateEstudanteController {
    constructor(
        @Inject(DrizzleAsyncProvider)
        private db: PostgresJsDatabase<typeof sc>,
        private jwt: JwtService,
    ) {}
	@Post()
    @UsePipes(new ZodValidationPipe(createSessionBodySchema))
    async handle(@Body() body: CreateSessionBodySchema) {
        const { email, password } = body;

        const [estudante] = await this.db
            .select()
            .from(sc.estudantes)
            .where(eq(sc.estudantes.email, email));
        
        if (!estudante) {
            throw new UnauthorizedException('Email or password incorrect');
        }
        const isPasswordValid = await compare(password, estudante.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Email or password incorrect');
        }

        const acessToken = this.jwt.sign({
            sub: estudante.id,
        });

        return { acess_token: acessToken };
    }
}