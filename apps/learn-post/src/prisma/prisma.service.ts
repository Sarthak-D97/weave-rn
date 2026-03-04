import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../../generated/prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    constructor() {
        const pool = new Pool({ connectionString: process.env.DATABASE_URL as string });
        const adapter = new PrismaPg(pool);
        super({ adapter });
    }
    private readonly shouldConnect = !!process.env.DATABASE_URL;

    async onModuleInit() {
        if (this.shouldConnect) {
            await this.$connect();
        }
    }

    async onModuleDestroy() {
        if (this.shouldConnect) {
            await this.$disconnect();
        }
    }
}
