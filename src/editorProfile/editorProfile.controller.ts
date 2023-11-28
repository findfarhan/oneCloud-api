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
import { EditorProfileService } from './editorProfile.service';
import { EditoProfileDto } from './dto';
import { EditorProfile } from './editorProfile.entity';
import { AuthGuard } from 'src/middleware/authGuad.middleware';

interface KnotsResponse<T> {
  message: string;
  data: T;
}

@Controller('editorProfile')
export class EditorProfileController {
  constructor(
    private editorProfileService: EditorProfileService,
  ) {}

  @Post('add')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard)
  async add(
    @Body() editoProfileDto: EditoProfileDto,
  ): Promise<KnotsResponse<EditorProfile>> {
    try {
      const user =
        await this.editorProfileService.add(
          editoProfileDto,
        );

      return {
        message:
          'editorProfile added successfully',
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
    @Body() editoProfileDto: EditoProfileDto,
  ): Promise<KnotsResponse<EditorProfile>> {
    try {
      const editorProfile =
        await this.editorProfileService.update(
          id,
          editoProfileDto,
        );
      if (!editorProfile) {
        throw new NotFoundException(
          `editorProfile with ID ${id} not found.`,
        );
      }
      return {
        message:
          'editorProfile updated successfully',
        data: editorProfile,
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
    deletedKnots: EditorProfile | null;
  }> {
    try {
      const editorProfile =
        await this.editorProfileService.delete(id);
      if (!editorProfile) {
        throw new NotFoundException(
          `editorProfile with ID ${id} not found.`,
        );
      }
      return {
        message: `editorProfile with ID ${id} has been deleted.`,
        deletedKnots: editorProfile,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message,
      );
    }
  }

  @Get('/')
  @UseGuards(AuthGuard)
  async getAll(): Promise<EditorProfile[]> {
    const editorProfile =
      await this.editorProfileService.getAll();
    return editorProfile;
  }
}
