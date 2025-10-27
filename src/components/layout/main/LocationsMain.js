import HeroPrimary from "@/components/sections/hero-banners/HeroPrimary";
import LocationsPrimary from "@/components/sections/locations/LocationsPrimary";
import Map from "@/components/shared/map/Map";

const LocationsMain = () => {
  return (
    <main>
      <HeroPrimary
        title={"Google Map Locations"}
        text="Locations"
        mb={"mb-0"}
      />
      <Map />
      <LocationsPrimary />
    </main>
  );
};

export default LocationsMain;
