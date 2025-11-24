import { Question } from '@/domain/forum/enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Either, right } from '@/core/either'
import { QuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachment'
import { QuestionAttachmentList } from '@/domain/forum/enterprise/entities/question-attachment-list'

interface CreateQuestionUseCaseRequest {
  authorId: string
  title: string
  content: string
  attachmentsIds: string[]
}

type CreateQuestionUseCaseResponse = Either<
  null,
  {
    question: Question
  }
>

export class CreateQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    authorId,
    title,
    content,
    attachmentsIds,
  }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
      authorId: new UniqueEntityID(authorId),
      title,
      content,
    })

    const questionAttachments = attachmentsIds.map((attachmentId) => {
      return QuestionAttachment.create({
        attachmentId: new UniqueEntityID(attachmentId),
        questionId: question.id,
      })
    })

    question.attachments = new QuestionAttachmentList(questionAttachments)

    await this.questionsRepository.create(question)

    return right({
      question,
    })
  }
}

import { Body, ConflictException, Controller, Inject, Post, UsePipes } from "@nestjs/common";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import * as sc from '../../db/schema';
import { DrizzleAsyncProvider } from "../drizzle/drizzle.provider";
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