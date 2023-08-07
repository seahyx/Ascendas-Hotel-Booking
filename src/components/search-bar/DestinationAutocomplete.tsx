import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import Fuse from "fuse.js";
import { useEffect, useState } from "react";
import { useDebounce } from "usehooks-ts";
import { DESTINATIONS, Destination } from "src/utils/destinations";
import { toCapitalizedWords } from "../../utils/camelToCapitalized";
import { createWorkerFactory, useWorker } from "@shopify/react-web-worker";

interface DestinationAutocompleteProps {
  className?: React.HTMLProps<HTMLElement>["className"];
  onChange?: (value: Destination | null) => void;
  defaultValues?: {
    dest?: Destination;
  };
}

const createWorker = createWorkerFactory(() => import("./fuseWorker"));

export default function DestinationAutocomplete({
  className,
  onChange,
  defaultValues,
}: DestinationAutocompleteProps) {
  const [options, setOptions] = useState<readonly Destination[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const fuse = new Fuse(DESTINATIONS, { keys: ["term"] });

  const createWorker = createWorkerFactory(() => import("./fuseWorker"));
  const worker = useWorker(createWorker);

  const search = async (searchTerm: string) => {
    const searchResults = worker.searchFuse(searchTerm);
    searchResults.then((res) => {
      setOptions(res);
      setLoading(false);
    });
  };

  useEffect(() => {
    search(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  return (
    <Autocomplete
      className={className}
      size="small"
      autoHighlight
      autoComplete
      clearOnEscape
      onChange={(event, value: Destination | null) =>
        onChange ? onChange(value) : null
      }
      defaultValue={defaultValues?.dest}
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
      groupBy={(dest) => toCapitalizedWords(dest.type)}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="standard"
          placeholder="Search destinations"
          defaultValue={defaultValues?.dest?.term}
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
        setLoading(true);
      }}
    />
  );
}
