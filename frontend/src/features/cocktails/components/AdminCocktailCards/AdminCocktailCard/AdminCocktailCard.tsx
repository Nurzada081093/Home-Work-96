import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined';
import { ICocktail } from '../../../../../types';
import React from 'react';
import { apiUrl } from '../../../../../globalConstants.ts';
import CardCover from '@mui/joy/CardCover';
import Button from '@mui/joy/Button';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks.ts';
import { userFromSlice } from '../../../../users/usersSlice.ts';
import { useNavigate } from 'react-router-dom';
import { deleteCocktail, getCocktails, publishCocktail } from '../../../cocktailsThunk.ts';
import { toast } from 'react-toastify';

interface Props {
  cocktail: ICocktail;
}

const AdminCocktailCard:React.FC<Props> = ({cocktail}) => {
  const user = useAppSelector(userFromSlice);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const deleteTheCocktail = async (cocktailId: string) => {
    if (user && user.role === 'admin') {
      await dispatch(deleteCocktail({cocktailId, token: user.token})).unwrap();
      await dispatch(getCocktails());
      toast.success('Cocktail was successfully deleted!');
      navigate(`/admin`);
    }
  };

  const publishTheCocktail = async (cocktailId: string) => {
    if (user && user.role === 'admin') {
      await dispatch(publishCocktail({cocktailId, token: user.token})).unwrap();
      await dispatch(getCocktails());
      toast.success('Cocktail was successfully published!');
      navigate(`/admin`);
    }
  };

  return (
    <Card sx={{ width: 320, margin: '30px', position: 'relative' }}>
      {!cocktail.isPublished && (
        <CardCover
          className="gradient-cover"
          sx={{
            backgroundColor: 'rgba(152,151,151,0.62)'
          }}
        />
      )}
      <div>
        <Typography level="title-lg">{cocktail.title}</Typography>
        <IconButton
          aria-label="bookmark Bahamas Islands"
          variant="plain"
          color="neutral"
          size="sm"
          sx={{ position: 'absolute', top: '0.875rem', right: '0.5rem' }}
        >
          <BookmarkAdd />
        </IconButton>
      </div>
      <AspectRatio
        minHeight="300px"
        maxHeight="500px"
        sx={{
          backgroundColor: !cocktail.isPublished ? 'gray' : null,
          filter: !cocktail.isPublished ? 'grayscale(100%)' : null,
        }}
      >
        <img
          style={{height: '100%'}}
          src={apiUrl + '/' + cocktail.image}
          srcSet={apiUrl + '/' + cocktail.image}
          loading="lazy"
          alt={cocktail.title}
        />
      </AspectRatio>
      <CardContent
        orientation="horizontal"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around'
        }}
      >
        <Button
          size="md"
          variant='solid'
          color="primary"
          onClick={() => publishTheCocktail(cocktail._id)}
        >
          Publish
        </Button>
        <Button
          size="md"
          variant='solid'
          color="danger"
          onClick={() => deleteTheCocktail(cocktail._id)}
        >
          Delete
        </Button>
      </CardContent>
    </Card>
  );
};

export default AdminCocktailCard;