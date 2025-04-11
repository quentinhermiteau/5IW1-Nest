import { Person } from "./person";

export interface Movie {
  id: string;
  title: string;
  description: string;
  releaseDate: Date;
  grade: number;
  image?: string;
  createdAt: Date;
  updatedAt: Date;

  directors: Person[];
  actors: Person[];
}
