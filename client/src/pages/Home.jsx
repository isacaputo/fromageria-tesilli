import * as React from 'react';
import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import { Paper, Box, Grid, Typography, Button, Skeleton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export function Home() {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Determine which image to load based on screen size
  const getOptimalImage = () => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      if (width <= 640) return '/images/Home-small.jpg';
      if (width <= 1280) return '/images/Home-medium.jpg';
      return '/images/Home.jpg';
    }
    return '/images/Home-medium.jpg'; // Default fallback
  };

  const [imageSrc] = useState(getOptimalImage());

  // Preload the image
  useEffect(() => {
    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageError(true);
    img.src = imageSrc;
  }, [imageSrc]);

  return (
    <>
      {/* Loading skeleton while image loads */}
      {!imageLoaded && !imageError && (
        <Skeleton
          variant="rectangular"
          sx={{
            height: 750,
            borderRadius: 0,
          }}
          animation="wave"
        />
      )}

      {/* Error fallback */}
      {imageError && (
        <Paper
          sx={{
            position: 'relative',
            color: '#fff',
            borderRadius: 0,
            backgroundColor: '#549470', // Your brand color as fallback
            display: 'flex',
            alignItems: 'center',
            height: 750,
          }}
        >
          <Grid
            container
            sx={{ justifyContent: 'center', textAlign: 'center' }}
          >
            <Grid item md={6}>
              <Box
                sx={{
                  position: 'relative',
                  p: { xs: 3, md: 6 },
                }}
              >
                <Typography
                  component="h1"
                  variant="h3"
                  color="inherit"
                  gutterBottom
                  sx={{ fontFamily: 'Oooh Baby', fontSize: 80 }}
                >
                  Fromageria Tesilli
                </Typography>
                <Typography
                  component="h1"
                  variant="h3"
                  color="inherit"
                  gutterBottom
                  sx={{ fontFamily: 'Verdana', fontSize: 20 }}
                >
                  Queijos • Sabores • Afetos
                </Typography>
                <br />
                <Button
                  variant="contained"
                  onClick={() => navigate('/products')}
                >
                  Conheça nossos queijos
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      )}

      {/* Main content with optimized image loading */}
      {imageLoaded && (
        <Paper
          sx={{
            position: 'relative',
            color: '#fff',
            borderRadius: 0,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url("${imageSrc}")`,
            display: 'flex',
            alignItems: 'center',
            height: 750,
            // Add transition for smooth appearance
            opacity: imageLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out',
          }}
        >
          <Grid
            container
            sx={{ justifyContent: 'center', textAlign: 'center' }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                right: 0,
                left: 0,
                backgroundColor: 'rgba(0,0,0,.45)',
              }}
            />
            <Grid item md={6}>
              <Box
                sx={{
                  position: 'relative',
                  p: { xs: 3, md: 6 },
                }}
              >
                <Typography
                  component="h1"
                  variant="h3"
                  color="inherit"
                  gutterBottom
                  sx={{ fontFamily: 'Oooh Baby', fontSize: 80 }}
                >
                  Fromageria Tesilli
                </Typography>
                <Typography
                  component="h1"
                  variant="h3"
                  color="inherit"
                  gutterBottom
                  sx={{ fontFamily: 'Verdana', fontSize: 20 }}
                >
                  Queijos • Sabores • Afetos
                </Typography>
                <br />
                <Button
                  variant="contained"
                  onClick={() => navigate('/products')}
                >
                  Conheça nossos queijos
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      )}
    </>
  );
}
