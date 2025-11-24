import { Module } from "@nestjs/common";
import { CreateEstudanteController } from "./create-estudante.controller";
import { AuthenticateEstudanteController } from "./authenticate-estudante.controller";
import { GetEstudanteController } from "./get-user.controller";
import { drizzleProvider } from "../database/drizzle/drizzle.provider";

@Module({
	controllers: [
		CreateEstudanteController, AuthenticateEstudanteController, GetEstudanteController
	],
	providers: [
		...drizzleProvider
	]
})
export class HttpModule {

}