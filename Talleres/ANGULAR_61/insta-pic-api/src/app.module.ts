import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotoModule } from './photo/photo.module';

@Module({
	imports: [
		AuthModule,
		UserModule,
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: 'aws-1-us-east-2.pooler.supabase.com',
			port: 5432,
			username: 'postgres.jlkkpfvhavizoybkccez',
			password: 'XXXXXXXXXXXXXX',
			database: 'postgres',
			synchronize: true,
			autoLoadEntities: true
		}),
		PhotoModule
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule { }
