import express from "express";
import { NodemailerAdapter } from "./adapters/nodeMailer/nodeMailer-mail-adapter";
import { PrismaFeedbacksRepository } from "./repositories/prisma/prisma-feedbacks-repository";
import { SubmitFeedbackUseCase } from "./use-cases/submit-feedback-use-case";
export const routes = express.Router();
routes.post("/feedbacks", async (req, res) => {
  const { type, comment, screenshot } = req.body;
  const prismaFeedbacksRepository = new PrismaFeedbacksRepository()
  const nodemailerAdapter = new NodemailerAdapter()
  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedbacksRepository,
    nodemailerAdapter
  );
  await submitFeedbackUseCase.execute({
    type,
    comment,
    screenshot,
  });
  return res.status(201).send();
});
