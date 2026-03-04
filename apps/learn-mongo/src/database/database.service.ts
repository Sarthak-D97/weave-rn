import {
  Injectable,
  OnModuleInit,
  OnApplicationShutdown,
} from '@nestjs/common';

@Injectable()
export class DatabaseService {
  private isConnected = false;

  onModuleInit() {
    this.isConnected = true;
    console.log('database connected successfully');
  }
  onApplicationShutdown(signal: string) {
    this.isConnected = false;
    console.log(`database disconnected successfully signal ${signal}`);
  }
  getStatus() {
    return this.isConnected ? 'connected' : 'disconnected';
  }
}
