import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Search = () => {
  return (
    <TextField
    className="sm:w-[70%]"
      id="input-with-icon-textfield"
      InputProps={{
        sx: { borderRadius: 10 },
        endAdornment: (
          <InputAdornment position="end">
            <div className="rounded-full p-2 bg-blue-500 text-white">
              <SearchIcon />
            </div>
          </InputAdornment>
        ),
      }}
      variant="outlined"
    />
  );
};
export default Search;
