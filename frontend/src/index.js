import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import { store } from '../src/app/store';
import { Provider } from 'react-redux';
import SimpleReactLightbox from 'simple-react-lightbox';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route
          path="/*"
          element={
            <SimpleReactLightbox>
              <App />
            </SimpleReactLightbox>
          }
        />
      </Routes>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
