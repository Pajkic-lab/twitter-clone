import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import * as session from 'express-session'
import { AppModule } from './app.module'
import * as passport from 'passport'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get<ConfigService>(ConfigService)
  app.enableCors({ origin: '*' })
  app.use(
    session({
      secret: configService.get('SESSION_SECRET'),
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 6000000,
      },
    }),
  )
  app.use(passport.initialize())
  app.use(passport.session())
  await app.listen(process.env.PORT || 5000)
  console.log(`Application is running on: ${await app.getUrl()} 🚀🚀🚀`)
}
bootstrap()
