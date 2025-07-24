import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import {NestExpressApplication} from "@nestjs/platform-express";
import {json, urlencoded} from "express";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({transform: true, transformOptions: {enableImplicitConversion: false}})); // for incoming request validation/transformation
  app.set('trust proxy', 1);
  app.use(json({limit: '20mb'}));
  app.use(urlencoded({limit: '20mb', extended: true}));

  const config = new DocumentBuilder()
    .setTitle('Skribbl Typo API')
    .setDescription('Skribbl Typo API for resources, admin tools and authentication.')
    .setVersion('1.0')
    .addOAuth2({
          type: "openIdConnect",
          openIdConnectUrl: "https://api.typo.rip/openid/.well-known/openid-configuration",
        },
        'Typo_OAuth2_Login')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  const swaggerOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      initOAuth: {
        clientId: "2",
        scopes: []
      }
    },
    customSiteTitle: "Typo API Docs",
    customfavIcon: "https://www.typo.rip/res/128MaxFit.png",
    jsonDocumentUrl: "openapi.json",
    customCss: `
      .swagger-ui .topbar { display: none }
    `,
    /*customJsStr: swaggerEnableDiscordLogin*/
  };

  SwaggerModule.setup('docs', app, document, swaggerOptions);

  await app.listen(3000);
}

bootstrap();


