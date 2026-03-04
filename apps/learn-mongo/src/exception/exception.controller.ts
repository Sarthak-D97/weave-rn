import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseFilters,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/filters/http-exception/http-exception.filter';

@Controller('exception')
@UseFilters(HttpExceptionFilter)
export class ExceptionController {
  @Get('Hello/:id')
  getHello(@Param('id', ParseIntPipe) id: number) {
    return { message: `your id is : ${id}` };
  }
}
