import { Controller, Get, Inject } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HealthCheckResult } from '@nestjs/terminus';
import { AbstractController } from 'src/basic/abstract.controller';
import { ResponseObject } from 'src/basic/response-object';
import { HealthService } from './health.service';

@ApiTags('health')
@Controller('health')
export class HealthController extends AbstractController {
  constructor(@Inject(HealthService) private readonly healthService: HealthService) {
    super();
  }

  @ApiOperation({ summary: 'Check service health status' })
  @ApiResponse({
    status: 200,
    description: 'Health check performed successfully',
  })
  @Get()
  async getHealth(): Promise<ResponseObject<HealthCheckResult>> {
    const healthResult = await this.healthService.checkHealth();
    return this.createOkResponse(healthResult);
  }
}
