import { Body, ConflictException, Controller, Inject, Post, UsePipes } from "@nestjs/common";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import * as sc from '../database/db/schema';
import { DrizzleAsyncProvider } from "../database/drizzle/drizzle.provider";
import { eq } from "drizzle-orm";
import { hash } from "bcryptjs";
import z from "zod";
import { ZodValidationPipe } from "@enem/common";

const createAccountBodySchema = z.object({
	name: z.string().min(3),
	email: z.email(),
	birth_date: z.string().refine((date) => !isNaN(Date.parse(date)), {
		message: "Invalid date format",
	}),
	password: z.string().min(6),
});

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>;
@Controller('/estudantes')
export class CreateEstudanteController {
	constructor(
		@Inject(DrizzleAsyncProvider)
		private db: PostgresJsDatabase<typeof sc>,
	) {}
	@Post()
	@UsePipes(new ZodValidationPipe(createAccountBodySchema))
	async handle(@Body() body: CreateAccountBodySchema) {

		const { name, email, birth_date, password } = body;
		const userSameEmail = await this.db
			.select()
			.from(sc.estudantes)
			.where(eq(sc.estudantes.email, email));

		if (userSameEmail.length) {
			throw new ConflictException('Email already in use');
		}
		const hashedPassword = await hash(password, 8);
		
		const estudante = await this.db
			.insert(sc.estudantes)
			.values({
				name: name,
				email: email,
				birth_date: birth_date,
				password: hashedPassword,
			})
			.returning();
		return estudante;
	}
}