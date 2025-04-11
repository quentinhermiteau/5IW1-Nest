import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateMovieDto {
  @ApiProperty()
  @IsString()
  @Type(() => String)
  title: string;

  @ApiProperty()
  @IsString()
  @Type(() => String)
  description: string;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  releaseDate: Date;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  grade: number;

  @ApiProperty()
  @Type(() => Array<number>)
  @Type(() => Array<number>)
  categories: number[];

  @ApiProperty({ type: 'string', format: 'binary' })
  poster: any;

  @ApiProperty()
  @Type(() => Array<number>)
  actors: number[];

  @ApiProperty()
  @Type(() => Array<number>)
  directors: number[];
}
