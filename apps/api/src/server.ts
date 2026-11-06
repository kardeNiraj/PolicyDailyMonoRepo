import { createApp } from './app';

async function bootstrap() {
    const app = await createApp();
    const port = process.env.PORT ?? 3000;
    await app.listen(port);
    console.log(`PolicyDaily API running on http://localhost:${port}/api/v1`);
}

bootstrap();
