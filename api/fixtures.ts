import mongoose from "mongoose";
import config from "./config";
import User from "./models/User";
import {randomUUID} from "node:crypto";
import Cocktail from "./models/Cocktail";

const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection('users');
    } catch (e) {
        console.log('Collections were not presents, skipping drop!');
    }

    const [userMolly, userSally] = await User.create(
        {
            email: 'molly@gmail.com',
            password: '123',
            role: 'admin',
            token: randomUUID(),
            displayName: 'Molly Gordon',
            googleId: null,
            avatar: 'fixtures/Molly_Gordon.jpg',
        },
        {
            email: 'sally@gmail.com',
            password: '123',
            role: 'user',
            token: randomUUID(),
            displayName: 'Sally Lau',
            googleId: null,
            avatar: 'fixtures/Sally_Lau.jpg',
        }
    );

    await Cocktail.create(
        {
            user: userSally._id,
            title: 'Winter Rita',
            image: 'fixtures/Winter_Rita.jpg',
            recipe: 'Salt rim. Combine all ingredients, shake with ice, and strain over fresh ice.',
            isPublished: true,
            ingredients: [
                {
                    ingredientName: 'Tequila',
                    amount: '2/3 oz',
                },
                {
                    ingredientName: 'Campari',
                    amount: '1/4 oz',
                },
                {
                    ingredientName: 'Lime Juice',
                    amount: '3/4 oz',
                },
                {
                    ingredientName: 'Orange Juice',
                    amount: '1/2 oz',
                },
                {
                    ingredientName: ' Rosemary Syrup',
                    amount: '1/2 oz',
                },
                {
                    ingredientName: 'Salt',
                    amount: 'Dash',
                }
            ]
        },
        {
            user: userMolly._id,
            title: 'Flaming Dr. Pepper',
            image: 'fixtures/Flaming_Dr.Pepper.jpg',
            recipe: 'Add Amaretto, Bacardi, and vodka. Mix in the Dr. Pepper and beer',
            isPublished: true,
            ingredients: [
                {
                    ingredientName: 'Amaretto',
                    amount: '1 oz',
                },
                {
                    ingredientName: 'Vodka',
                    amount: '1 oz',
                },
                {
                    ingredientName: '151 proof rum',
                    amount: '1 oz Bacardi',
                },
                {
                    ingredientName: 'Dr. Pepper',
                    amount: '1 oz',
                },
                {
                    ingredientName: 'Beer',
                    amount: '1 oz',
                }
            ]
        },
        {
            user: userSally._id,
            title: 'Adam Bomb',
            image: 'fixtures/Adam_Bomb.jpg',
            recipe: 'Add ice to blender (or to glass if prefer on the rocks) then fruit, and fruite juice depending on personal prefference then add the Rum, Vodka, Tequila, and triple sec. blend till smooth, rim glass with sugar or salt and pour mixture in. garnish with lemon or lime slice.',
            isPublished: true,
            ingredients: [
                {
                    ingredientName: 'Rum',
                    amount: '1 part',
                },
                {
                    ingredientName: 'Vodka',
                    amount: '1 part',
                },
                {
                    ingredientName: 'Tequila',
                    amount: '1 part',
                },
                {
                    ingredientName: 'Triple sec',
                    amount: '1/2 part',
                },
                {
                    ingredientName: 'Fruit',
                    amount: '1/2 part',
                },
                {
                    ingredientName: 'Ice',
                    amount: '3 oz',
                },
                {
                    ingredientName: 'Salt',
                    amount: '1-3 pint',
                }
            ]
        },
        {
            user: userSally._id,
            title: 'Blue Margarita',
            image: 'fixtures/Blue_Margarita.jpg',
            recipe: 'Rub rim of cocktail glass with lime juice. Dip rim in coarse salt. Shake tequila, blue curacao, and lime juice with ice, strain into the salt-rimmed glass, and serve.',
            isPublished: true,
            ingredients: [
                {
                    ingredientName: 'Tequila ',
                    amount: '1/2 oz',
                },
                {
                    ingredientName: 'Blue Curacao',
                    amount: '1 oz',
                },
                {
                    ingredientName: 'Lime juice',
                    amount: '1 oz',
                },
                {
                    ingredientName: 'Salt',
                    amount: 'Coarse',
                }
            ]
        },
        {
            user: userMolly._id,
            title: 'Zombie',
            image: 'fixtures/Zombie.jpg',
            recipe: 'Blend at high speed for no more than 5 seconds. Pour into a glass, add ice cubes to fill, then add the garnish. *Donn’s mix: Bring 3 crushed cinnamon sticks, 1 cup of sugar and 1 cup of water to a boil, stirring until the sugar is dissolved. Simmer for 2 minutes, then remove from the heat and let sit for at least 2 hours before straining into a clean glass bottle. Then add 1 part of the syrup and 2 parts of fresh grapefruit juice together.',
            isPublished: true,
            ingredients: [
                {
                    ingredientName: 'Rum',
                    amount: '1/2 oz',
                },
                {
                    ingredientName: 'Gold rum',
                    amount: '1/2 oz',
                },
                {
                    ingredientName: '151 proof rum',
                    amount: '1 oz',
                },
                {
                    ingredientName: 'Pernod',
                    amount: '1 tsp',
                },
                {
                    ingredientName: 'Grenadine',
                    amount: '1 tsp',
                },
                {
                    ingredientName: 'Lime Juice',
                    amount: '1 tsp',
                },
                {
                    ingredientName: 'Angostura Bitters',
                    amount: '1 drop',
                }
            ]
        },
        {
            user: userSally._id,
            title: 'Cocktail Horse’s Neck',
            image: 'fixtures/Cocktail_Horse’s_Neck.jpg',
            recipe: 'Wash and brush an organic, untreated lemon, then cut a spiral of lemon peel, using a citrus peel. If it is too large, cut it with a sharp knife. Put some ice in a tall tumbler glass, place the lemon peel inside and pour the cognac, add the ginger beer and let 2-3 drops of Angostura fall into it. Easy to do, but once you try it you\'ll love it.',
            isPublished: false,
            ingredients: [
                {
                    ingredientName: 'Cognac',
                    amount: '4 cl',
                },
                {
                    ingredientName: 'Ginger Beer',
                    amount: '100 ml',
                },
                {
                    ingredientName: 'Angostura Bitters ',
                    amount: '3 drops',
                },
                {
                    ingredientName: 'Lemon Peel',
                    amount: '1',
                }
            ]
        },
        {
            user: userSally._id,
            title: 'Long vodka',
            image: 'fixtures/Long_vodka.jpg',
            recipe: 'Shake a tall glass with ice cubes and Angostura, coating the inside of the glass. Por the vodka onto this, add 1 slice of lime and squeeze juice out of remainder, mix with tonic, stir and voila you have a Long Vodka',
            isPublished: false,
            ingredients: [
                {
                    ingredientName: 'Vodka',
                    amount: '5 cl',
                },
                {
                    ingredientName: 'Lime',
                    amount: '1/2',
                },
                {
                    ingredientName: 'Angostura bitters',
                    amount: '4 dashes',
                },
                {
                    ingredientName: 'Tonic water',
                    amount: '1 dl Schweppes',
                },
                {
                    ingredientName: 'Ice',
                    amount: '4',
                }
            ]
        },
        {
            user: userMolly._id,
            title: 'Yoghurt_Cooler',
            image: 'fixtures/Yoghurt_Cooler.jpg',
            recipe: 'Place all ingredients in the blender jar - cover and whiz on medium speed until well blended. Pour in one tall, 2 medium or 3 small glasses and drink up. Note: Use lots of ice in this one - great on hot days! To add ice: Remove the center of the cover while the blender is on - drop 3 or 4 ice cubs and blend until they\'re completely crushed.',
            isPublished: false,
            ingredients: [
                {
                    ingredientName: 'Yoghurt',
                    amount: '1 cup',
                },
                {
                    ingredientName: 'Fruit',
                    amount: '1 cup',
                },
                {
                    ingredientName: 'Ice',
                    amount: '3',
                }
            ]
        },
    );
};

run().catch(console.error);