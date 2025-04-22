import React from 'react';
import { AppProvider } from './contexts/AppContext';
import Layout from './components/layout/Layout';
import ViewManager from './components/ViewManager';

function App() {
  return (
    <AppProvider>
      <Layout>
        <ViewManager />
      </Layout>
    </AppProvider>
  );
}

export default App;