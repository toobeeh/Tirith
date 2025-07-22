import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger';
import { swaggerEnableDiscordLogin } from './swaggerEnableDiscord';
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
    .setDescription('Skribbl Typo API for resources, admin tools and authentification.')
    .setVersion('1.0')
    .addOAuth2({
          type: 'oauth2',
          description: "Authenticate with the API by retrieving a JWT through OAuth2.\nClient ID 2 is for the API client, leave the secret empty.",
          flows: {
            authorizationCode: {
              authorizationUrl: 'https://www.typo.rip/auth/authorize',
              tokenUrl: 'https://api.typo.rip/oauth/token',
              scopes: {
              }
            }
          },
          scheme: 'bearer',
          bearerFormat: 'JWT',
          in: 'header',
        },
        'Typo OAuth2 Login')
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


