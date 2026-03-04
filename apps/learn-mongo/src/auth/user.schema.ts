import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type AuthUserDocument = HydratedDocument<AuthUser>;

@Schema({
  collection: 'users',
})
export class AuthUser {
  @Prop({ required: true })
  email!: string;

  @Prop({ required: true })
  password!: string;
}

export const AuthUserSchema = SchemaFactory.createForClass(AuthUser);
