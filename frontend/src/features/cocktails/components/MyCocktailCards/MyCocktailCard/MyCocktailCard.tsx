import { ICocktail } from '../../../../../types';
import React, { useState } from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import Chip from '@mui/joy/Chip';
import Typography from '@mui/joy/Typography';
import { apiUrl } from '../../../../../globalConstants.ts';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks.ts';
import { userFromSlice } from '../../../../users/usersSlice.ts';
import { deleteCocktail, getUserCocktails } from '../../../cocktailsThunk.ts';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/joy/Alert';
import AdminCocktailCard from '../../AdminCocktailCards/AdminCocktailCard/AdminCocktailCard.tsx';
import CircularProgress from '@mui/joy/CircularProgress';

interface Props {
  cocktail: ICocktail;
}

const MyCocktailCard:React.FC<Props> = ({cocktail}) => {
  const user = useAppSelector(userFromSlice);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [deleteLoading, setDeleteLoading] = useState<{index: string | null; loading: boolean}>({
    index: null,
    loading: false,
  });

  const getInformationCocktail = (id: string) => {
    navigate(`/cocktail/${id}`);
  };

  const deleteTheCocktail = async (cocktailId: string) => {
    if (user && user._id === cocktail.user._id) {
      setDeleteLoading(prevState => ({...prevState, loading: true, index: cocktailId}));
      await dispatch(deleteCocktail({cocktailId, token: user.token})).unwrap();
      await dispatch(getUserCocktails(user._id));
      toast.success('Cocktail was successfully deleted!');
      navigate(`/myCocktails`);
      setDeleteLoading(prevState => ({...prevState, loading: false, index: null}));
    }
  };

  return (
    <>
      {user && user.role !== 'admin' ?
        <Card
          variant="plain"
          sx={{
            width: 300,
            backgroundColor: !cocktail.isPublished ? 'rgba(152,151,151,0.84)' : 'initial',
            p: 0,
            margin: '20px',
            position: 'relative',
            border: '1px solid lightgrey'
          }}>
          <Box
            onClick={() => getInformationCocktail(cocktail._id)}
            sx={{
              position: 'relative'
             }}
          >
            <AspectRatio ratio="4/3">
              <figure>
                <img
                  src={apiUrl + '/' + cocktail.image}
                  srcSet={apiUrl + '/' + cocktail.image}
                  loading="lazy"
                  alt={cocktail.title}
                />
              </figure>
            </AspectRatio>
            {!cocktail.isPublished && (
              <CardCover
                className="gradient-cover"
                sx={{
                  backgroundColor: 'rgba(152,151,151,0.62)'
                }}
              />
            )}
            <CardCover
              className="gradient-cover"
              sx={{
                '&:hover, &:focus-within': {
                  opacity: 1,
                },
                opacity: 0,
                transition: '0.1s ease-in',
                background:
                  'linear-gradient(180deg, transparent 62%, rgba(0,0,0,0.00345888) 63.94%, rgba(0,0,0,0.014204) 65.89%, rgba(0,0,0,0.0326639) 67.83%, rgba(0,0,0,0.0589645) 69.78%, rgba(0,0,0,0.0927099) 71.72%, rgba(0,0,0,0.132754) 73.67%, rgba(0,0,0,0.177076) 75.61%, rgba(0,0,0,0.222924) 77.56%, rgba(0,0,0,0.267246) 79.5%, rgba(0,0,0,0.30729) 81.44%, rgba(0,0,0,0.341035) 83.39%, rgba(0,0,0,0.367336) 85.33%, rgba(0,0,0,0.385796) 87.28%, rgba(0,0,0,0.396541) 89.22%, rgba(0,0,0,0.4) 91.17%)',
              }}
            >
              <div>
                <Box
                  sx={{
                    p: 2,
                    gap: 1.5,
                    flexGrow: 1,
                    alignSelf: 'flex-end',
                  }}
                >
                  <Typography level="h2" noWrap sx={{fontSize: 'lg', color: 'white'}}>
                    {cocktail.title}
                  </Typography>
                  {!cocktail.isPublished && (
                    <Alert
                      color="neutral"
                      sx={{
                        marginTop: '10px',
                        backgroundColor: 'rgba(180,246,246,0.7)',
                        color: 'black'
                      }}>
                      This cocktail has not   published yet!
                    </Alert>
                  )}
                </Box>
              </div>
            </CardCover>
          </Box>
          <Box sx={{
            display: 'flex',
            gap: 1,
            alignItems: 'center',
            padding: '0 10px 10px'
          }}>
            <Avatar
              alt={cocktail.user.displayName}
              src={cocktail.user.googleId === null ? apiUrl + '/' + cocktail.user.avatar
                : cocktail.user.avatar && cocktail.user.avatar.startsWith('http')
                  ? cocktail.user.avatar
                  : apiUrl + '/' + cocktail.user.avatar}
              size="md"
              sx={{
                backgroundColor: !cocktail.isPublished ? 'gray' : null,
                filter: !cocktail.isPublished ? 'grayscale(100%)' : null,
              }}
            />
            <Typography sx={{ fontSize: 'sm', fontWeight: 'md' }}>
              {cocktail.user.displayName}
            </Typography>
            {!cocktail.isPublished && (
              <Chip
                onClick={() => deleteTheCocktail(cocktail._id)}
                variant="outlined"
                color="neutral"
                size="sm"
                sx={{
                  borderRadius: 'sm',
                  py: 0.25,
                  px: 0.5,
                  marginLeft: 'auto',
                  cursor: 'pointer',
                  color: !cocktail.isPublished ? 'rgba(234,126,126,0.93)' : null,
                }}
              >
                Delete
                {deleteLoading.loading && cocktail._id === deleteLoading.index ? <CircularProgress size="sm" /> : null}
              </Chip>
            )}
          </Box>
        </Card>
        :
        <AdminCocktailCard cocktail={cocktail}/>
      }
    </>

  );
};

export default MyCocktailCard;