import mongoose, { Schema, Document } from 'mongoose';

export interface IRecipe extends Document {
  title: string;
  description?: string;
  cuisine: string;
  sourceUrl: string;
  imagePath: string;
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const recipeSchema = new Schema<IRecipe>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    cuisine: {
      type: String,
      required: [true, 'Cuisine type is required'],
      trim: true,
    },
    sourceUrl: {
      type: String,
      required: [true, 'Source URL is required'],
      trim: true,
      validate: {
        validator: function (v: string) {
          try {
            new URL(v);
            return true;
          } catch {
            return false;
          }
        },
        message: 'Please provide a valid URL',
      },
    },
    imagePath: {
      type: String,
      required: [true, 'Image is required'],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Recipe = mongoose.model<IRecipe>('Recipe', recipeSchema);

