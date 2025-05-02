import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Button,
  Paper,
  useTheme,
  Card,
  CardContent,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel
} from '@mui/material';
import {
  EmojiNature as EcoIcon,
  TrendingUp as ProfitIcon,
  Agriculture as YieldIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const steps = ['Select Goal', 'Farm Details', 'Preferences'];

const GoalCard = ({ title, description, icon, selected, onClick }) => {
  const theme = useTheme();
  
  return (
    <Card
      onClick={onClick}
      sx={{
        cursor: 'pointer',
        height: '100%',
        border: selected ? `2px solid ${theme.palette.primary.main}` : 'none',
        backgroundColor: selected ? theme.palette.primary.light + '10' : 'inherit',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme.shadows[4],
        },
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 2,
            color: theme.palette.primary.main,
          }}
        >
          {icon}
          <Typography variant="h6" sx={{ ml: 1 }}>
            {title}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

const Onboarding = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [selectedGoal, setSelectedGoal] = useState('');
  const [farmSize, setFarmSize] = useState('');
  const [farmType, setFarmType] = useState('');

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      // Save onboarding data and redirect to dashboard
      navigate('/data-entry');
    } else {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const goals = [
    {
      id: 'sustainability',
      title: 'Sustainability',
      description: 'Focus on environmental impact and carbon credits.',
      icon: <EcoIcon fontSize="large" />
    },
    {
      id: 'profit',
      title: 'Profitability',
      description: 'Optimize operations for maximum financial returns.',
      icon: <ProfitIcon fontSize="large" />
    },
    {
      id: 'yield',
      title: 'Yield Optimization',
      description: 'Maximize crop yields through data-driven decisions.',
      icon: <YieldIcon fontSize="large" />
    }
  ];

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              What's your primary goal?
            </Typography>
            <Grid container spacing={3}>
              {goals.map((goal) => (
                <Grid item xs={12} md={4} key={goal.id}>
                  <GoalCard
                    {...goal}
                    selected={selectedGoal === goal.id}
                    onClick={() => setSelectedGoal(goal.id)}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        );

      case 1:
        return (
          <Box sx={{ mt: 4 }}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Farm Size</FormLabel>
              <RadioGroup
                value={farmSize}
                onChange={(e) => setFarmSize(e.target.value)}
              >
                <FormControlLabel
                  value="small"
                  control={<Radio />}
                  label="Small (< 50 acres)"
                />
                <FormControlLabel
                  value="medium"
                  control={<Radio />}
                  label="Medium (50-500 acres)"
                />
                <FormControlLabel
                  value="large"
                  control={<Radio />}
                  label="Large (> 500 acres)"
                />
              </RadioGroup>
            </FormControl>
          </Box>
        );

      case 2:
        return (
          <Box sx={{ mt: 4 }}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Farm Type</FormLabel>
              <RadioGroup
                value={farmType}
                onChange={(e) => setFarmType(e.target.value)}
              >
                <FormControlLabel
                  value="crop"
                  control={<Radio />}
                  label="Crop Farming"
                />
                <FormControlLabel
                  value="mixed"
                  control={<Radio />}
                  label="Mixed Farming"
                />
                <FormControlLabel
                  value="livestock"
                  control={<Radio />}
                  label="Livestock Farming"
                />
              </RadioGroup>
            </FormControl>
          </Box>
        );

      default:
        return 'Unknown step';
    }
  };

  const isStepValid = (step) => {
    switch (step) {
      case 0:
        return selectedGoal !== '';
      case 1:
        return farmSize !== '';
      case 2:
        return farmType !== '';
      default:
        return false;
    }
  };

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)',
        py: 6,
        backgroundColor: (theme) => theme.palette.background.default,
      }}
    >
      <Container maxWidth="lg">
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Welcome to EcoFarmCast
          </Typography>
          <Typography variant="subtitle1" align="center" sx={{ mb: 4 }}>
            Let's set up your farm profile to get personalized recommendations
          </Typography>

          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {getStepContent(activeStep)}

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={!isStepValid(activeStep)}
            >
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Onboarding;
