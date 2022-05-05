import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";
const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();
const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
)
describe('Submit feedback', ()=>{
  it('should be able to submit a feedback', async ()=>{
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'testes',
      screenshot: 'data:image/png;base64,buceta',
    })).resolves.not.toThrow();
    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it('should be able to submit a feedback without type', async ()=>{
    await expect(submitFeedback.execute({
      type: '',
      comment: 'testes',
      screenshot: 'data:image/png;base64,buceta',
    })).rejects.toThrow();
  });

  it('should be able to submit a feedback without comment', async ()=>{
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: '',
      screenshot: 'data:image/png;base64,buceta',
    })).rejects.toThrow();
  });

  it('should be able to submit a feedback with an invalid screenshot', async ()=>{
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'testes',
      screenshot: '123.jpg',
    })).rejects.toThrow();
  });
});