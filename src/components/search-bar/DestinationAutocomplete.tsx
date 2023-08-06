import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import Fuse from "fuse.js";
import { useEffect, useState } from "react";
import { useDebounce } from "usehooks-ts";
import { DESTINATIONS, Destination } from "src/utils/destinations";

interface DestinationAutocompleteProps {
  className?: React.HTMLProps<HTMLElement>["className"];
  onChange?: (value: Destination | null) => void;
}

export default function DestinationAutocomplete({
  className,
  onChange,
}: DestinationAutocompleteProps) {
  const [options, setOptions] = useState<readonly Destination[]>([]);
  const [loading, setLoading] = useState(false);
  const MAX_LIST_ELEMENTS = 8;
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const fuse = new Fuse(DESTINATIONS, { keys: ["term"] });

  useEffect(() => {
    setLoading(true);
  }, [searchTerm]);
  useEffect(() => {
    const asyncSearch = async () => {
      let searchResults = await fuse
        .search(debouncedSearchTerm, { limit: MAX_LIST_ELEMENTS })
        .map((result) => result.item);
      setOptions(searchResults);
      setLoading(false);
    };
    asyncSearch().catch(console.error);
  }, [debouncedSearchTerm]);

  return (
    <Autocomplete
      id='auto-box'
      className={className}
      size="small"
      autoHighlight
      autoComplete
      clearOnEscape
      onChange={(event, value: Destination | null) =>
        onChange ? onChange(value) : null
      }
      loading={loading}
      options={options}
      getOptionLabel={(option) => option.term}
      noOptionsText={
        searchTerm.length === 0
          ? "Where are you going?"
          : "No destination found"
      }
      loadingText={"Searching..."}
      filterOptions={(x) => x}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="standard"
          placeholder="Search destinations"
          sx={{
            input: {
              "&::placeholder": {
                opacity: 1,
              },
            },
          }}
          InputProps={{
            ...params.InputProps,
            disableUnderline: true,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={16} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      inputValue={searchTerm}
      onInputChange={(event, newInputValue) => {
        setSearchTerm(newInputValue);
      }}
    />
  );
}
