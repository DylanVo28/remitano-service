import { Document } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


export type VideoDocument= Video & Document

@Schema()
export class Video{
  @Prop({unique: true})
  url: string

  @Prop()
  username: string
}
export const VideoSchema = SchemaFactory.createForClass(Video)