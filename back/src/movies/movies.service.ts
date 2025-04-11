import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
  constructor(private prisma: PrismaService) {}

  async create(createMovieDto: CreateMovieDto) {
    const { poster } = createMovieDto;

    const client = new S3Client({
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
      },
      region: 'eu-west-1',
      endpoint: 'http://localhost:9000',
    });

    try {
      await client.send(
        new PutObjectCommand({
          Bucket: 'images',
          Key: poster.originalname,
          Body: poster.buffer,
          ContentType: poster.mimetype,
        }),
      );

      return 'This action adds a new movie';
    } catch (error) {
      console.error('Error uploading file to S3', error);
      throw error;
    }
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
