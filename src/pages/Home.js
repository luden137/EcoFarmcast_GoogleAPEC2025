import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  useTheme
} from '@mui/material';
import {
  DataUsage as DataIcon,
  Analytics as AnalyticsIcon,
  EmojiNature as EcoIcon,
  TrendingUp as TrendingIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const FeatureCard = ({ title, description, icon, buttonText, onClick }) => {
  const theme = useTheme();
  
  return (
    <Card 
      elevation={2}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 2,
            color: theme.palette.primary.main
          }}
        >
          {icon}
          <Typography variant="h6" component="h2" sx={{ ml: 1 }}>
            {title}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={onClick}>
          {buttonText}
        </Button>
      </CardActions>
    </Card>
  );
};

const Home = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const theme = useTheme();

  const features = [
    {
      title: 'Data Entry',
      description: 'Record and manage your farm data including soil conditions, crop details, and equipment usage.',
      icon: <DataIcon fontSize="large" />,
      buttonText: 'Enter Data',
      onClick: () => navigate('/data-entry')
    },
    {
      title: 'Analysis',
      description: 'Get insights and recommendations based on your farm data and environmental conditions.',
      icon: <AnalyticsIcon fontSize="large" />,
      buttonText: 'View Analysis',
      onClick: () => navigate('/analysis')
    },
    {
      title: 'Sustainability',
      description: 'Track your environmental impact and explore opportunities for carbon credits.',
      icon: <EcoIcon fontSize="large" />,
      buttonText: 'Check Impact',
      onClick: () => navigate('/analysis')
    },
    {
      title: 'Trends',
      description: 'Monitor agricultural trends and market conditions affecting your farm.',
      icon: <TrendingIcon fontSize="large" />,
      buttonText: 'View Trends',
      onClick: () => navigate('/analysis')
    }
  ];

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)', // Adjust for navbar height
        py: 6,
        backgroundColor: theme.palette.background.default
      }}
    >
      <Container maxWidth="lg">
        {/* Welcome Section */}
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome to EcoFarmCast, {currentUser?.displayName}!
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
            Your smart farming companion for sustainable agriculture
          </Typography>
        </Box>

        {/* Features Grid */}
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <FeatureCard {...feature} />
            </Grid>
          ))}
        </Grid>

        {/* Quick Stats Section */}
        <Box sx={{ mt: 8 }}>
          <Typography variant="h5" gutterBottom>
            Your Farm Overview
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Recent Activity
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    No recent activity to display. Start by entering your farm data.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => navigate('/data-entry')}>
                    Enter Data
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Recommendations
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Complete your farm profile to receive personalized recommendations.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => navigate('/onboarding')}>
                    Complete Profile
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
