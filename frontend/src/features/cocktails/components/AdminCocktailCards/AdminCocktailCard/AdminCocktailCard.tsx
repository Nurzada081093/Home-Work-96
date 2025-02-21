import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined';
import { ICocktail } from '../../../../../types';
import React, { useState } from 'react';
import { apiUrl } from '../../../../../globalConstants.ts';
import CardCover from '@mui/joy/CardCover';
import Button from '@mui/joy/Button';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks.ts';
import { userFromSlice } from '../../../../users/usersSlice.ts';
import { useNavigate } from 'react-router-dom';
import { deleteCocktail, getCocktails, publishCocktail } from '../../../cocktailsThunk.ts';
import { toast } from 'react-toastify';
import { CircularProgress } from '@mui/joy';

interface Props {
  cocktail: ICocktail;
}

const AdminCocktailCard:React.FC<Props> = ({cocktail}) => {
  const user = useAppSelector(userFromSlice);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [deleteLoading, setDeleteLoading] = useState<{index: string | null; loading: boolean}>({
    index: null,
    loading: false,
  });
  const [publishLoading, setPublishLoading] = useState<{index: string | null; loading: boolean}>({
    index: null,
    loading: false,
  });

  const getInformationCocktail = (id: string) => {
    navigate(`/cocktail/${id}`);
  };

  const deleteTheCocktail = async (cocktailId: string) => {
    if (user && user.role === 'admin') {
      setDeleteLoading(prevState => ({...prevState, loading: true, index: cocktailId}));
      await dispatch(deleteCocktail({cocktailId, token: user.token})).unwrap();
      await dispatch(getCocktails());
      toast.success('Cocktail was successfully deleted!');
      navigate(`/admin`);
      setDeleteLoading(prevState => ({...prevState, loading: false, index: null}));
    }
  };

  const publishTheCocktail = async (cocktailId: string) => {
    if (user && user.role === 'admin') {
      setPublishLoading(prevState => ({...prevState, loading: true, index: cocktailId}));
      await dispatch(publishCocktail({cocktailId, token: user.token})).unwrap();
      await dispatch(getCocktails());
      toast.success('Cocktail was successfully published!');
      navigate(`/admin`);
      setPublishLoading(prevState => ({...prevState, loading: false, index: null}));
    }
  };

  return (
    <Card sx={{
      width: 320,
      margin: '30px',
      position: 'relative'
    }}
    >
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
        onClick={() => getInformationCocktail(cocktail._id)}
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
        {!cocktail.isPublished && (
          <Button
            sx={{width: '120px'}}
            variant='solid'
            color="primary"
            disabled={publishLoading.loading && cocktail._id === publishLoading.index}
            onClick={() => publishTheCocktail(cocktail._id)}
          >
            Publish
            {publishLoading.loading && cocktail._id === publishLoading.index ? <CircularProgress size="sm" /> : null}
          </Button>
        )}
        <Button
          sx={{
            width: cocktail.isPublished ? '100%' : '120px',
          }}
          variant='solid'
          color="danger"
          disabled={deleteLoading.loading && cocktail._id === deleteLoading.index}
          onClick={() => deleteTheCocktail(cocktail._id)}
        >
          Delete
          {deleteLoading.loading && cocktail._id === deleteLoading.index ? <CircularProgress size="sm" /> : null}
        </Button>
      </CardContent>
    </Card>
  );
};

export default AdminCocktailCard;