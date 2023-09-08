import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
  getDetails
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";


const PlacesAutocomplete = ({ setSearchedPlace, setPosition, selectMarker, position }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: {
        lat: () => position.lat,
        lng: () => position.lng
      },
      radius: 200 * 1000
    }
  });

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);

    const { place_id } = data.find(result => result.description === address);
    const details = await getDetails({ placeId: place_id });

    console.log("PLACE DETAILS:", details);

    const placeDetails = {
      lat,
      lng,
      address: details?.formatted_address,
      phone: details?.international_phone_number,
      name: details?.name,
      rating: details?.rating,
      user_ratings_total: details?.user_ratings_total,
      url: details?.url,
      opening_hours: details?.opening_hours?.weekday_text || null,
      website: details?.website,
      type: details?.types?.[0],
      photos: details?.photos?.map(photo => photo.getUrl()) || null,
      icon: details?.icon
    };


    setSearchedPlace(placeDetails);
    setPosition({ lat, lng });
    selectMarker(placeDetails);

  };

  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        className="combobox-input"
        placeholder="Search an address"
      />
      <ComboboxPopover>
        <ComboboxList>
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <ComboboxOption key={place_id} value={description} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};

export default PlacesAutocomplete;
