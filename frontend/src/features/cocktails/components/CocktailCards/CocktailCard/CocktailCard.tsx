import { ICocktail } from '../../../../../types';
import React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import Link from '@mui/joy/Link';
import { apiUrl } from '../../../../../globalConstants.ts';
import { useNavigate } from 'react-router-dom';

interface Props {
  cocktail: ICocktail;
}

const CocktailCard:React.FC<Props> = ({cocktail}) => {
  const navigate = useNavigate();
  return cocktail.isPublished && (
    <Box sx={{ minHeight: 350, margin: '20px'}} onClick={() => navigate(`/cocktail/${cocktail._id}`)}>
      <Card
        variant="outlined"
        sx={(theme) => ({
          width: 300,
          gridColumn: 'span 2',
          flexDirection: 'row',
          flexWrap: 'wrap',
          resize: 'horizontal',
          overflow: 'hidden',
          gap: 'clamp(0px, (100% - 360px + 32px) * 999, 16px)',
          transition: 'transform 0.3s, border 0.3s',
          '&:hover': {
            borderColor: theme.vars.palette.primary.outlinedHoverBorder,
            transform: 'translateY(-2px)',
          },
          '& > *': { minWidth: 'clamp(0px, (360px - 100%) * 999,100%)' },
        })}
      >
        <Box
          sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 200 }}
        >
          <Box sx={{ display: 'flex' }}>
            <div>
              <Typography level="title-lg">
                <Link
                  overlay
                  underline="none"
                  sx={{
                    color: 'text.primary',
                    '&.Mui-focusVisible:after': { outlineOffset: '-4px' },
                  }}
                >
                  {cocktail.title}
                </Link>
              </Typography>
            </div>
          </Box>
          <AspectRatio
            variant="soft"
            sx={{
              '--AspectRatio-paddingBottom':
                'clamp(0px, (100% - 200px) * 999, 200px)',
              pointerEvents: 'none',
            }}
          >
            <img
              alt={cocktail.title}
              src={apiUrl + '/' + cocktail.image}
            />
          </AspectRatio>
          <Box sx={{ display: 'flex', gap: 1.5, mt: 'auto' }}>
            <Avatar
              size="md"
              alt={cocktail.user.displayName}
              src={cocktail.user.googleId === null ? apiUrl + '/' + cocktail.user.avatar
                : cocktail.user.avatar && cocktail.user.avatar.startsWith('http')
                  ? cocktail.user.avatar
                  : apiUrl + '/' + cocktail.user.avatar}
            />
            <div>
              <Typography level="body-xs">Created by {cocktail.user.role}</Typography>
              <Typography level="body-sm">{cocktail.user.displayName}</Typography>
            </div>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default CocktailCard;