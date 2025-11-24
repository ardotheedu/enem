CREATE TABLE "estudantes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"birth_date" date NOT NULL,
	CONSTRAINT "estudantes_email_unique" UNIQUE("email")
);
