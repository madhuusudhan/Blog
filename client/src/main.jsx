// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App.jsx';
// import './index.css';
// import { BrowserRouter } from 'react-router-dom';
// import { store } from './Redux/store.js';
// import {Provider} from 'react-redux'
// import { persistor } from './Redux/store.js';
// import { PersistGate } from 'redux-persist/integration/react';
// import ThemeProvider from './Components/ThemeProvider.jsx';
// import ScrolltoTop from './Components/ScrolltoTop.jsx';
// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <PersistGate persistor={persistor}> 
//         <BrowserRouter>
//         <ThemeProvider>
//           <ScrolltoTop>
//             <App />
//           </ScrolltoTop>
//         </ThemeProvider>
//         </BrowserRouter>
//       </PersistGate>
//     </Provider>
//   </React.StrictMode>
// );
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { store } from './Redux/store.js';
import { Provider } from 'react-redux';
import { persistor } from './Redux/store.js';
import { PersistGate } from 'redux-persist/integration/react';
import ThemeProvider from './Components/ThemeProvider.jsx';
import ScrolltoTop from './Components/ScrolltoTop.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}> 
        <BrowserRouter>
          <ThemeProvider>
            <ScrolltoTop>
              <App />
            </ScrolltoTop>
          </ThemeProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
