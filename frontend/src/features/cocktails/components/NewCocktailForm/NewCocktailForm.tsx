import React, { useState } from 'react';
import { ICocktailForm } from '../../../../types';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import { Add } from '@mui/icons-material';
import { Textarea } from '@mui/joy';
import FileInput from '../../../../components/FileInput/FileInput';
import { toast } from 'react-toastify';
import { useAppSelector } from '../../../../app/hooks.ts';
import { addLoadingFromSlice } from '../../cocktailsSlice.ts';
import ButtonSpinner from '../../../../components/UI/ButtonSpinner/ButtonSpinner.tsx';

interface Props {
  createNewCocktail: (cocktail: ICocktailForm) => void;
}

const cocktailState = {
  title: '',
  recipe: '',
  image: null,
  ingredients: [
    {
      ingredientName: '',
      amount: '',
    }
  ],
};

const NewCocktailForm:React.FC<Props> = ({createNewCocktail}) => {
  const [newCocktail, setNewCocktail] = useState<ICocktailForm>(cocktailState);
  const loading = useAppSelector(addLoadingFromSlice);

  const onChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;

    setNewCocktail((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fileEventChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;

    if (files) {
      setNewCocktail((prevState) => ({
        ...prevState,
        [name]: files[0] || null,
      }));
    }
  };

  const onSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newCocktail.title.trim().length === 0 || newCocktail.recipe.trim().length === 0) {
      toast.error('Fill in all fields!');
      return;
    }

    const invalidIngredients = newCocktail.ingredients.some((ingredient) => {
      return ingredient.ingredientName.trim().length === 0 || ingredient.amount.trim().length === 0;
    });

    if (invalidIngredients) {
      toast.error('Fill in ingredients name and amount!');
      return;
    }

    if (!newCocktail.image) {
      toast.error('Please select an image!');
      return;
    }

    createNewCocktail({...newCocktail});
    setNewCocktail(cocktailState);
  };

  const addIngredient = () => {
    setNewCocktail((prevState) => ({
      ...prevState,
      ingredients: [
        ...prevState.ingredients,
        {ingredientName: '', amount: ''}
      ]
    }));
  };

  const ingredientDelete = (index: number) => {
    setNewCocktail((prevState) => {
      return {
        ...prevState,
        ingredients: prevState.ingredients.filter((_, i) => i !== index)
      };
    });
  };

  const onIngredientChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const {name, value} = event.target;
    setNewCocktail((prevState) => {
      const ingredientsCopy = [...prevState.ingredients];
      ingredientsCopy[index] = {...ingredientsCopy[index], [name]: value};

      return {
        ...prevState,
        ingredients: ingredientsCopy
      };
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <main>
        <Sheet
          sx={{
            width: 600,
            mx: 'auto',
            my: 4,
            py: 3,
            px: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            borderRadius: 'sm',
            boxShadow: 'md',
            backgroundColor: 'rgba(236,232,232,0.68)',
          }}
          variant="outlined"
        >
          <div>
            <Typography level="h4" component="h1">
              <b>Add new cocktail</b>
            </Typography>
          </div>
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input
              value={newCocktail.title}
              name="title"
              type="text"
              placeholder="Title..."
              onChange={onChange}
            />
          </FormControl>
          <Box>
            <FormLabel>Ingredients:</FormLabel>
            {newCocktail.ingredients.map((ingredient, index) => (
              <Box key={index} sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                margin: '10px 0'}}>
                <FormControl>
                  <Input
                    style={{width: '250px'}}
                    value={ingredient.ingredientName}
                    name="ingredientName"
                    type="text"
                    placeholder="Ingredient name..."
                    onChange={(event) => onIngredientChange(event, index)}
                  />
                </FormControl>
                <FormControl>
                  <Input
                    value={ingredient.amount}
                    name="amount"
                    type="text"
                    placeholder="Amount..."
                    onChange={(event) => onIngredientChange(event, index)}
                  />
                </FormControl>
                <Button
                  variant='plain'
                  disabled={index === 0}
                  onClick={() => ingredientDelete(index)}
                >
                  <CloseIcon/>
                </Button>
              </Box>
            ))}
            <Button startDecorator={<Add />} onClick={addIngredient}>Add ingredient</Button>
          </Box>
          <FormControl>
            <FormLabel>Recipe</FormLabel>
            <Textarea
              sx={{backgroundColor: 'transparent', border: '1px solid lightgrey'}}
              id="outlined-basic"
              variant="outlined"
              placeholder="Recipe..."
              minRows={3}
              value={newCocktail.recipe}
              name="recipe"
              onChange={onChange}
            />
          </FormControl>
          <FormLabel>Image:</FormLabel>
          <FileInput
            name="image"
            label="Image"
            onGetFile={fileEventChange}
          />
          <Button
            sx={{textTransform: 'uppercase'}}
            type='submit'
            disabled={loading}
          >
            Create cocktail
            {loading ? <ButtonSpinner/> : null}
          </Button>
        </Sheet>
      </main>
    </form>
  );
};

export default NewCocktailForm;