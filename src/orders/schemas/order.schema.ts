import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type OrderDocument = Order & Document;

@Schema({
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
  strict: false,
})
export class Order {}

export const OrderSchema = SchemaFactory.createForClass(Order);
