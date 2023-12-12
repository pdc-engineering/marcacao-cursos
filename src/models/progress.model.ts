import * as mongoose from 'mongoose';

export interface Lesson {
  isIntroduction: boolean;
  courseLessonId: number;
  courseTopicId: number;
  progress: number;
  completed: boolean;
  createAt: Date;
  updatedAt: Date;
}

export interface Course {
  courseId: number;
  lessons: Lesson[];
}

export interface Courses extends mongoose.Document {
  accountId: number;
  courses: Course[];
}

export const CoursesSchema = new mongoose.Schema({
  accountId: { type: Number, required: true },
  courses: [
    new mongoose.Schema({
      // Corrigido aqui
      courseId: { type: Number, required: true },
      lessons: [
        {
          isIntroduction: { type: Boolean, required: true },
          courseLessonId: { type: Number, required: true },
          courseTopicId: { type: Number, required: true },
          progress: { type: Number, required: true },
          completed: { type: Boolean, required: true },
          createAt: { type: Date, required: true },
          updatedAt: { type: Date, required: true },
        },
      ],
    }),
  ],
});

export const CoursesModel = mongoose.model<Courses>('Courses', CoursesSchema);
