import { Controller, Get } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';

@Controller('employee')
export class EmployeeController {
  @Get()
  @Throttle({default: {ttl: 60000, limit: 3}})
  getEmployee() {
    return 'employess data is fetched successfully for company data';
  }
}
