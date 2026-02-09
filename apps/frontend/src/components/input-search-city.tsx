import {
  Autocomplete,
  AutocompleteEmpty,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopup,
} from "./selia/autocomplete";

export const SearchInputCity = ({
  cities,
}: {
  cities: {
    label: string;
    value: string;
  }[];
}) => {
  return (
    <Autocomplete items={cities}>
      <AutocompleteInput
        placeholder="Search location"
        className="lg:w-64 w-full p-5"
        size={90}
      />

      <AutocompletePopup>
        <AutocompleteEmpty>Tidak ada kota ditemukan</AutocompleteEmpty>
        <AutocompleteList>
          {cities.map((city) => (
            <AutocompleteItem key={city.value} value={city.value}>
              {city.label}
            </AutocompleteItem>
          ))}
        </AutocompleteList>
      </AutocompletePopup>
    </Autocomplete>
  );
};
