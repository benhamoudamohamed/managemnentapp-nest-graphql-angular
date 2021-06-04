import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  app.useGlobalPipes(new ValidationPipe())
  // await app.listen(3000);
  await app.listen(process.env.PORT || 4000);
  console.log(`Application is running on: http://localhost:4000/graphql`);
}
bootstrap();
