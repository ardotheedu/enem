import { Body, ConflictException, Controller, Inject, Post } from "@nestjs/common";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import * as sc from '../../db/schema';
import { DrizzleAsyncProvider } from "../drizzle/drizzle.provider";
import { eq } from "drizzle-orm";

@Controller('/estudantes')
export class CreateEstudanteController {
	constructor(
		@Inject(DrizzleAsyncProvider)
		private db: PostgresJsDatabase<typeof sc>,
	) {}
	@Post()
	async handle(@Body() body: any) {
		const userSameEmail = await this.db
			.select()
			.from(sc.estudantes)
			.where(eq(sc.estudantes.email, body.email));

		if (userSameEmail.length) {
			throw new ConflictException('Email already in use');
		}
		const estudante = await this.db
			.insert(sc.estudantes)
			.values({
				name: body.name,
				email: body.email,
				birth_date: body.birth_date,
				password: body.password,
			})
			.returning();
		return estudante;
	}
}