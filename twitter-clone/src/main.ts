import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors({ origin: '*' })
  await app.listen(process.env.PORT || 5000)
  console.log(`Application is running on: ${await app.getUrl()} 🚀🚀🚀`)
}
bootstrap()
