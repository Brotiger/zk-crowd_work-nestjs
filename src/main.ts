import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const config = new DocumentBuilder()
    .setTitle('Crowd Work')
    .setDescription('Документация REST API')
    .setVersion('1.0.0')
    .addTag('Brotiger')
    .build()

  const document = SwaggerModule.createDocument(app, config)

  app.useGlobalPipes(new ValidationPipe());

  SwaggerModule.setup('/docs', app, document)

  await app.listen(process.env.PORT)
  console.log(`Server started on ${process.env.PORT}`)
}
bootstrap()
