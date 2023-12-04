import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  BadRequestException,
  UseGuards,
  Param,
  NotFoundException,
  Get,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleDto } from './dto';
import { Article } from './article.entity';
import { AuthGuard } from 'src/middleware/authGuad.middleware';

interface KnotsResponse<T> {
  message: string;
  data: T;
}

@Controller('article')
export class ArticleController {
  constructor(
    private articleService: ArticleService,
  ) {}

  @Post('add')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard)
  async add(
    @Body() articleDto: ArticleDto,
  ): Promise<KnotsResponse<Article>> {
    try {
      const user =
        await this.articleService.add(
          articleDto,
        );

      return {
        message:
          'Article added successfully',
        data: user,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message,
      );
    }
  }

  @Post('update/:id')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard)
  async update(
    @Param('id') id: string,
    @Body() articleDto: ArticleDto,
  ): Promise<KnotsResponse<Article>> {
    try {
      const article =
        await this.articleService.update(
          id,
          articleDto,
        );
      if (!article) {
        throw new NotFoundException(
          `Article with ID ${id} not found.`,
        );
      }
      return {
        message:
          'Article updated successfully',
        data: article,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message,
      );
    }
  }

  @Post('delete/:id')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard)
  async delete(
    @Param('id') id: string,
  ): Promise<{
    message: string;
    deletedKnots: Article | null;
  }> {
    try {
      const article =
        await this.articleService.delete(id);
      if (!article) {
        throw new NotFoundException(
          `Article with ID ${id} not found.`,
        );
      }
      return {
        message: `Article with ID ${id} has been deleted.`,
        deletedKnots: article,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message,
      );
    }
  }

  @Get('/')
  @UseGuards(AuthGuard)
  async getAll(): Promise<Article[]> {
    const article =
      await this.articleService.getAll();
    return article;
  }
}
