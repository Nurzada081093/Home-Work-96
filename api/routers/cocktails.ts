import express from "express";
import Cocktail from "../models/Cocktail";
import auth, {RequestWithUser} from "../middleware/auth";
import permit from "../middleware/permit";
import {Error} from "mongoose";
import {imagesUpload} from "../multer";
import {Ingredient} from "../types";

const cocktailsRouter = express.Router();

const cocktailIngredients = (ingredients: string) => {
    try {
        return JSON.parse(ingredients) as Ingredient[];
    } catch {
        return [];
    }
};

cocktailsRouter.get('/', async (req, res, next) => {
    const userIdQuery = req.query.user;

    try {
        const filter = userIdQuery ? {user: userIdQuery} : {};
        const cocktails = await Cocktail.find(filter).populate('user', '_id displayName avatar role');
        res.send(cocktails);
    } catch (e) {
        next(e);
    }
});

cocktailsRouter.get('/:id', async (req, res, next) => {
    const cocktailId = req.params.id;

    if (!req.params.id) {
        res.status(404).send({error: 'Cocktail id not found!'});
    }

    try {
        const cocktail = await Cocktail.findById({_id: cocktailId});

        if (!cocktail) {
            res.status(404).send({error: 'Cocktail not found'});
        }

        res.send(cocktail);
    } catch (e) {
        next(e);
    }
});

cocktailsRouter.post('/', imagesUpload.single('image'), auth, async (req, res, next) => {
    let expressReq = req as RequestWithUser;
    const userId = expressReq.user._id;
    const ingredients = cocktailIngredients(req.body.ingredients);

    try {
        const cocktail = new Cocktail({
            user: userId,
            title: req.body.title,
            image: req.file && 'images' + req.file.filename,
            recipe: req.body.recipe,
            ingredients,
        });
        await cocktail.save();
        res.send(cocktail);
    } catch (error) {

        if (error instanceof Error.ValidationError) {
            res.status(400).send(error);
            return;
        }

        next(error);
    }
});

cocktailsRouter.patch("/:id/togglePublished", auth, permit('admin'), async (req, res, next) => {
    let expressReq = req as RequestWithUser;
    const cocktailId = expressReq.params.id;

    try {
        const cocktail = await Cocktail.findById(cocktailId);

        if (!cocktail) {
            res.status(404).send({error: 'This cocktail not found!'});
            return;
        }

        cocktail.isPublished = true;

        await cocktail.save();
        res.send(cocktail);
    } catch (error) {
        next(error);
    }
});

cocktailsRouter.delete("/:id", auth, permit('admin'), async (req, res, next) => {
    let expressReq = req as RequestWithUser;
    const user = expressReq.user;
    const cocktailId = expressReq.params.id;

    try {
        const cocktail = await Cocktail.findById(cocktailId);

        if (!cocktail) {
            res.status(404).send({error: 'This cocktail not found!'});
            return;
        }

        if (user._id.toString() === cocktail.user._id.toString()) {
            if (cocktail.isPublished === false) {
                await cocktail.deleteOne();
                res.send({message: "This cocktail was successfully deleted by the user!"});
                return;
            }
        }

        if (user.role === 'admin') {
            await cocktail.deleteOne();
            res.send({message: "This cocktail was successfully deleted by admin!"});
            return;
        }

        res.status(403).send({error: 'You aren\'t an admin! You don\'t have access to delete this cocktail!'});

    } catch (error) {
        next(error);
    }
});

export default cocktailsRouter;