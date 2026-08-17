import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Assuming this exists based on @prisma/client in package.json

export async function GET() {
  try {
    // Check Database Health (Simple query to ensure connection is alive)
    let dbStatus = 'disconnected';
    let dbPingTime = 0;
    
    try {
      const start = Date.now();
      // Execute a simple query
      await prisma.$queryRaw`SELECT 1`;
      dbPingTime = Date.now() - start;
      dbStatus = 'connected';
    } catch (dbError) {
      console.error('Health Check - Database Error:', dbError);
      dbStatus = 'error';
    }

    const health = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV,
      services: {
        database: {
          status: dbStatus,
          latency_ms: dbPingTime
        }
      },
      version: process.env.npm_package_version || '0.1.0'
    };

    // If critical services are down, return 503 Service Unavailable
    if (dbStatus === 'error') {
      health.status = 'degraded';
      return NextResponse.json(health, { status: 503 });
    }

    return NextResponse.json(health, { status: 200 });
  } catch (error) {
    console.error('Critical Health Check Failure:', error);
    return NextResponse.json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: 'Internal health check failure'
    }, { status: 500 });
  }
}
