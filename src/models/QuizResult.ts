import mongoose, { Schema, Document } from 'mongoose';

export interface IQuizResult extends Document {
  userName: string;
  chapterId?: string;
  chapterTitle?: string;
  score: number;
  totalQuestions: number;
  answers: Record<string, string>;
  createdAt: Date;
}

const QuizResultSchema: Schema = new Schema({
  userName: { type: String, required: true },
  chapterId: { type: String },
  chapterTitle: { type: String },
  score: { type: Number, required: true },
  totalQuestions: { type: Number, required: true },
  answers: { type: Object, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.QuizResult || mongoose.model<IQuizResult>('QuizResult', QuizResultSchema);
