import { Injectable } from '@nestjs/common';
import { HealthCheckResult, HealthCheckService } from '@nestjs/terminus';

@Injectable()
export class HealthService {
  constructor(private readonly healthCheckService: HealthCheckService) {}

  async checkHealth(): Promise<HealthCheckResult> {
    return this.healthCheckService.check([]);
  }
}
