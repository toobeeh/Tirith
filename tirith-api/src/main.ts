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
    .addSecurity('Typo_OAuth2_Login',{
          type: "oauth2",
          openIdConnectUrl: "https://api.typo.rip/openid/.well-known/openid-configuration",
          flows: {
              authorizationCode: {
              scopes: {},
              authorizationUrl: "https:/www.typo.rip/auth/authorize",
              tokenUrl: "https://api.typo.rip/oauth2/token",
            }
          }
        },
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);

  const swaggerOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      initOAuth: {
        clientId: "2",
        scopes: [],
      },
    },
    customSiteTitle: "Typo API Docs",
    customfavIcon: "https://www.typo.rip/res/128MaxFit.png",
    jsonDocumentUrl: "openapi.json",
    customCss: `
      .swagger-ui .topbar { display: none }
    `,
    /*customJsStr: swaggerEnableDiscordLogin*/
  };

  /* redirect from /docs to /docs/ to fix incorrect oauth2 redirect url */
  app.use('/docs', (req, res, next) => {
    if (!req.originalUrl.endsWith('/') && !req.path.includes('.')) {
      return res.redirect(301, req.originalUrl + '/');
    }
    next();
  });

  SwaggerModule.setup('docs', app, document, swaggerOptions);

  await app.listen(3000);
}

bootstrap();


