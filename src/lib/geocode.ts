export async function getCoordinatesFromPostcode(postcode: string) {
    try {
      const response = await fetch(`https://api.postcodes.io/postcodes/${encodeURIComponent(postcode)}`);
      const data = await response.json();
      if (data.status === 200 && data.result) {
        return {
          lat: data.result.latitude,
          lng: data.result.longitude,
        };
      } else {
        return null;
      }
    } catch (error) {
      console.error('Geocoding failed:', error);
      return null;
    }
  }
  