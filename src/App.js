import React from 'react';
import Header from './components/Header';
import Content from './components/Content';
import { Layout } from 'antd';
import styled from 'styled-components';
import { Provider } from 'react-redux';
import configureStore from '../src/store/configureStore';

const WhiteLayout = styled(Layout)`
  background-color: white;
`;

function App() {
  const store = configureStore();
  return (
    <Provider store={store}>
      <WhiteLayout>
        <Header />
        <Content />
      </WhiteLayout>
    </Provider>
  );
}

export default App;
