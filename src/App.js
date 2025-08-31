import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import MobileNavigation from './components/MobileNavigation';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setBannerData, setImageURL } from './store/movieoSlice';

console.log("Test Variable:", process.env.REACT_APP_TEST_VARIABLE);



// Set TMDB base URL and default API key for all axios requests
axios.defaults.baseURL = 'https://api.themoviedb.org/3';
axios.defaults.params = {};
axios.defaults.params['api_key'] = process.env.REACT_APP_TMDB_API_KEY;

function App() {
  const dispatch = useDispatch();

  const fetchTrendingData = async () => {
    try {
      const response = await axios.get('/trending/all/week');
      dispatch(setBannerData(response.data.results));
    } catch (error) {
      console.log("error fetching trending data:", error);
    }
  };

  const fetchConfiguration = async () => {
    try {
      const response = await axios.get('/configuration');
      dispatch(setImageURL(response.data.images.secure_base_url + "original"));
    } catch (error) {
      console.log("error fetching configuration:", error);
    }
  };

  useEffect(() => {
    fetchTrendingData();
    fetchConfiguration();
  }, []);

  return (
    <main className='pb-14 lg:pb-0'>
      <Header />
      <div className='min-h-[90vh]'>
        <Outlet />
      </div>
      <Footer />
      <MobileNavigation />
    </main>
  );
}

export default App;
