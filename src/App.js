import React from 'react';
import Header from './components/Header';
import Content from './components/Content';
import { Layout } from 'antd';
import { Provider } from 'react-redux';
import configureStore from '../src/store/configureStore';

function App() {
  const store = configureStore();
  return (
    <Provider store={store}>
      <div>
        <Layout>
          <Header />
          <Content />
        </Layout>
      </div>
    </Provider>
  );
}

export default App;
