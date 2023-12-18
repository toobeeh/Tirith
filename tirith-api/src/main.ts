import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Skribbl Typo API')
    .setDescription('Skribbl Typo API for resources, admin tools and authentification.')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  const swaggerOptions: SwaggerCustomOptions = {
    customSiteTitle: "Typo API Docs",
    customfavIcon: "https://www.typo.rip/res/128MaxFit.png",
    jsonDocumentUrl: "openapi.json",
    customCss: `
      .swagger-ui .topbar { display: none }
    `
  };

  SwaggerModule.setup('docs', app, document, swaggerOptions);

  await app.listen(3000);
}

bootstrap();


