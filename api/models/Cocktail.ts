import mongoose from "mongoose";

const Schema = mongoose.Schema;

const IngredientSchema = new Schema({
    ingredientName: {
        type: String,
        required: true,
    },
    amount: {
        type: String,
        required: true,
    },
});

const CocktailSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required'],
    },
    title: {
        type: String,
        required: [true, 'Title is required'],
    },
    image: {
        type: String,
        required: [true, 'Image is required'],
    },
    recipe: {
        type: String,
        required: [true, 'Recipe is required'],
    },
    isPublished: {
        type: Boolean,
        default: false,
    },
    ingredients: [IngredientSchema],
});

const Cocktail = mongoose.model('Cocktail', CocktailSchema);
export default Cocktail;