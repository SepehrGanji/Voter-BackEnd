import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const port: number = Number.parseInt(process.env.PORT) || 3000;
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
  console.log(`Nest application is running on port ${port}`);
}
bootstrap();
