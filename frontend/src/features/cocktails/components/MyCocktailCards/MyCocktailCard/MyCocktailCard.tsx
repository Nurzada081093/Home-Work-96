import { ICocktail } from '../../../../../types';
import React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import Chip from '@mui/joy/Chip';
import Typography from '@mui/joy/Typography';
import { apiUrl } from '../../../../../globalConstants.ts';

interface Props {
  cocktail: ICocktail;
}

const MyCocktailCard:React.FC<Props> = ({cocktail}) => {
  console.log(cocktail);
  return (
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
      <Box sx={{
        position: 'relative'
      }}>
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
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                flexGrow: 1,
                alignSelf: 'flex-end',
              }}
            >
              <Typography level="h2" noWrap sx={{ fontSize: 'lg', color: 'white' }}>
                {cocktail.title}
              </Typography>
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
        <Chip
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
        </Chip>
      </Box>
    </Card>
  );
};

export default MyCocktailCard;