import NewCocktailForm from '../components/NewCocktailForm/NewCocktailForm.tsx';
import { ICocktailForm } from '../../../types';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { userFromSlice } from '../../users/usersSlice.ts';
import { useNavigate } from 'react-router-dom';
import { addCocktail } from '../cocktailsThunk.ts';
import { toast } from 'react-toastify';

const NewCocktailContainer = () => {
  const user = useAppSelector(userFromSlice);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const createNewCocktail = async (newCocktail: ICocktailForm) => {
    if (user) {
      await dispatch(addCocktail({cocktail: newCocktail, token: user.token})).unwrap();
      toast.success('Cocktail was successfully added and it is reviewed by moderator!');
      navigate('/');
    }
    console.log(newCocktail);
  };

  return (
    <>
      <NewCocktailForm createNewCocktail={createNewCocktail}/>
    </>
  );
};

export default NewCocktailContainer;