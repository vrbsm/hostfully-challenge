import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
interface SearchProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const Search = ({ onChange }: SearchProps) => {
  return (
    <TextField
      className="sm:w-[70%]"
      onChange={onChange}
      id="input-search"
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
