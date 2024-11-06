import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLocationById } from '../../app/locationSlice';
import { useParams } from 'react-router-dom';
import Portal from '../../components/layout/Portal/Portal';
import Map from '../../components/common/Map/Map';  // Import the Map component

function LocationDetail() {
  const { locationId } = useParams();
  const dispatch = useDispatch();
  const { location, loading, error } = useSelector((state) => state.locations);

  useEffect(() => {
    dispatch(fetchLocationById(locationId));
  }, [dispatch, locationId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Portal>
        <h1>Location Details</h1>
        {location ? (
          <>
            <p>ID: {location.locationId}</p>
            <p>Name: {location.locationName}</p>
            <p>Latitude: {location.latitude}</p>
            <p>Longitude: {location.longitude}</p>
            <p>Radius: {location.radius}</p>
            <p>Region: {location.division}</p>
            <p>Address: {location.address}</p>
            <p>Type: {location.type}</p>

            <div style={{ height: '400px', width: '100%', marginTop: '20px', marginBottom: '20px' }}>
              <Map 
                center={[location.latitude, location.longitude]}
                zoom={13}
                markers={[
                  {
                    position: [location.latitude, location.longitude],
                    popupContent: location.locationName
                  }
                ]}
              />
            </div>
          </>
        ) : (
          <p>No location found.</p>
        )}
      </Portal>
    </>
  );
}

export default LocationDetail;
