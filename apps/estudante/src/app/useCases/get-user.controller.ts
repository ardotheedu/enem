import { Body, ConflictException, Controller, Get, Inject, Post, UnauthorizedException, UseGuards, UsePipes } from "@nestjs/common";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import * as sc from '../../db/schema';
import { DrizzleAsyncProvider } from "../drizzle/drizzle.provider";
import { eq } from "drizzle-orm";
import {compare} from "bcryptjs";
import z from "zod";
import { ZodValidationPipe } from "../pipes/zod-validation-pipe";
import { JwtService } from "@nestjs/jwt";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import type { TokenSchema } from "../auth/jwt.strategy";
import { CurrentUser } from "../auth/current-user-decorator";


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