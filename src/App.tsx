
import './App.css'
import Dashboard from './containers/Dashboard/Dashboard'
import Nav from './containers/Nav/Nav'


function App() {

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    console.log("Geolocation not supported");
  }
  
  function success(position: { coords: { latitude: any; longitude: any; }; }) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    return "hi";
  }
  
  function error() {
    console.log("Unable to retrieve your location");
  }



  return (
    <>
    <Nav/>
    <Dashboard/>
    </>
  )
}

export default App
