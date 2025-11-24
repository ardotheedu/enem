import { Body, ConflictException, Controller, Get, Inject, Post, UnauthorizedException, UseGuards, UsePipes } from "@nestjs/common";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import * as sc from '../database/db/schema';
import { DrizzleAsyncProvider } from "../database/drizzle/drizzle.provider";
import { eq } from "drizzle-orm";
import { JwtService } from "@nestjs/jwt";
import { JwtAuthGuard, TokenSchema, CurrentUser } from "@enem/auth";


@Controller('/estudante')
@UseGuards(JwtAuthGuard)
export class GetEstudanteController {
	constructor(
		@Inject(DrizzleAsyncProvider)
		private db: PostgresJsDatabase<typeof sc>,
		private jwt: JwtService,
	) {}
	@Get()
	async handle(@CurrentUser() user: TokenSchema) {
		const { sub } = user;

		const [estudante] = await this.db
			.select()
			.from(sc.estudantes)
			.where(eq(sc.estudantes.id, sub));
		
		if (!estudante) {
			throw new UnauthorizedException('User not found');
		}

		return estudante;
	}
}