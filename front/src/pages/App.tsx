import React from 'react';
import Router from '../Router'
import { Box } from '@material-ui/core';

// 高階層コンポーネント系
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from "../store/Auth";
import AlertProvider from '../store/AlertProvider';
import LoadProvider from '../store/LoadProvider'
import DateProvider from '../store/DateProvider';
import DiaryFormContentProvider from '../store/DiaryFormContentProvider';

// components
import Header from '../components/layouts/Header'
import Footer from '../components/layouts/Footer'
import AlertList from '../components/universals/AlertList'
import Load from '../components/universals/Load';
import '../styles/css/App.scss';
import { useLayoutStyles } from '../styles/js/layout';
import ConvertProvider from '../store/ConvertProvider';
import FormErrorProvider from '../store/FormErrorProvider';

// function App() 
const App = () => {  
  const layoutClasses = useLayoutStyles()
  return (
    <div className="App">
      <BrowserRouter>
        <ConvertProvider>
          <FormErrorProvider>
            <AlertProvider>
              <LoadProvider>
                <AuthProvider>
                  <DateProvider>
                    <DiaryFormContentProvider>
                      <Header/>
                      <Load/>
                      <Box className={layoutClasses.contentWrapper}>
                        <AlertList/>
                        <Router/>
                      </Box>
                      <Footer/>
                    </DiaryFormContentProvider>
                  </DateProvider>
                </AuthProvider>
              </LoadProvider>
            </AlertProvider>
          </FormErrorProvider>
        </ConvertProvider>
      </BrowserRouter>
    </div>
  )
}

export default App;
