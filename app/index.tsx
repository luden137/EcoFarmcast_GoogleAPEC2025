import React from 'react';
import { Redirect } from 'expo-router';
import { USE_DEV_MODE } from '../src/config/devConfig';

export default function Index() {
  // In development mode, go directly to home
  // In production mode, go to login page for authentication
  return USE_DEV_MODE ? <Redirect href="/home" /> : <Redirect href="/(auth)/login" />;
}
