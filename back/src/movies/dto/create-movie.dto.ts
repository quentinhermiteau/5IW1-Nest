import { ApiProperty } from '@nestjs/swagger';

export class CreateMovieDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  releaseDate: Date;

  @ApiProperty()
  grade: number;

  @ApiProperty()
  categories: number[];

  @ApiProperty({ type: 'string', format: 'binary' })
  poster: any;

  @ApiProperty()
  actors: number[];

  @ApiProperty()
  directors: number[];
}
