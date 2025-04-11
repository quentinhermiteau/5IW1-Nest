import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UpdateMovieDto } from './dto/update-movie.dto';

interface CreateMovie {
  title: string;
  description: string;
  releaseDate: Date;
  grade: number;
  image?: string;
  categories: number[];
  actors: number[];
  directors: number[];
}
@Injectable()
export class MoviesService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateMovie, file: Express.Multer.File) {
    const client = new S3Client({
      endpoint: 'http://localhost:9000',
      region: 'eu-west-1',
      forcePathStyle: true,
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID!,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
      },
    });

    const key = file.originalname;
    await client.send(
      new PutObjectCommand({
        Bucket: 'images',
        Key: key,
        Body: file.buffer,
      }),
    );

    return this.prisma.movies.create({
      data: {
        title: data.title,
        description: data.description,
        releaseDate: data.releaseDate,
        grade: data.grade,
        image: key,
        categories: {
          connect: data?.categories?.map((id) => ({ id })),
        },
        actors: {
          create: data?.actors?.map((actorId) => ({
            actor: { connect: { id: actorId } },
          })),
        },
        directors: {
          create: data?.directors?.map((directorId) => ({
            director: { connect: { id: directorId } },
          })),
        },
      },
    });
  }

  findAll() {
    return this.prisma.movies
      .findMany({
        include: {
          categories: true,
          actors: {
            include: {
              actor: true,
            },
          },
          directors: {
            include: {
              director: true,
            },
          },
        },
      })
      .then((movies) => {
        return movies.map((movie) => {
          return {
            ...movie,
            actors: movie.actors.map((actor) => actor.actor),
            directors: movie.directors.map((director) => director.director),
          };
        });
      });
  }

  findOne(id: number) {
    return `This action returns a #${id} movie`;
  }

  update(id: number, updateMovieDto: UpdateMovieDto) {
    return `This action updates a #${id} movie`;
  }

  remove(id: number) {
    return `This action removes a #${id} movie`;
  }
}
