import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Profile } from './profile.schema';

@Schema()
export class Students extends Document {
  @Prop()
  name!: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Profile' })
  profile!: Profile;
}

export const StudentsSchema = SchemaFactory.createForClass(Students);
