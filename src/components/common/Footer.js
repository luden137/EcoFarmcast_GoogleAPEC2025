import React from 'react';
import { Box, Container, Typography, Link, Grid } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.primary.main,
        color: 'white',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              EcoFarmCast
            </Typography>
            <Typography variant="body2">
              Empowering farmers with smart technology for sustainable agriculture
              and environmental stewardship.
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Box>
              <Link
                component={RouterLink}
                to="/data-entry"
                color="inherit"
                sx={{ display: 'block', mb: 1 }}
              >
                Data Entry
              </Link>
              <Link
                component={RouterLink}
                to="/analysis"
                color="inherit"
                sx={{ display: 'block', mb: 1 }}
              >
                Analysis
              </Link>
              <Link
                component={RouterLink}
                to="/help"
                color="inherit"
                sx={{ display: 'block', mb: 1 }}
              >
                Help Center
              </Link>
            </Box>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Contact
            </Typography>
            <Typography variant="body2" paragraph>
              Email: support@ecofarmcast.com
            </Typography>
            <Typography variant="body2">
              Phone: +1 (555) 123-4567
            </Typography>
          </Grid>
        </Grid>

        <Box sx={{ mt: 3, borderTop: '1px solid rgba(255, 255, 255, 0.1)', pt: 2 }}>
          <Typography variant="body2" align="center">
            {'Copyright © '}
            <Link
              component={RouterLink}
              to="/"
              color="inherit"
              underline="hover"
            >
              EcoFarmCast
            </Link>{' '}
            {currentYear}
            {'. All rights reserved.'}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
