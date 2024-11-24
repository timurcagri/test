import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import restaurants from './assets/data';
import { Restaurant } from './assets/data';
import { useState } from 'react';
import Drawer from './components/Drawer';

function App() {
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [visible, setVisible] = useState(false);

  const handleMarkerClick = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setVisible(true);
  };

  return (
    <div className='relative h-full w-full' style={{ height: '100vh', width: '100vw' }}>
      <Drawer open={visible} setOpen={setVisible}/>
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {restaurants.map((restaurant: Restaurant) => (
          <Marker
            position={restaurant.position}
            key={restaurant.id}
            eventHandlers={{
              click: () => handleMarkerClick(restaurant),
            }}
          >
            <Popup>
              {restaurant.name}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}


export default App;