import { Avatar } from "@mui/material";
import { blue } from '@mui/material/colors';
const Header = () => {
  return (
    <header className="bg-slate-50 w-full h-14 flex items-center px-3">
      <img className="h-9 pr-5" src="/hostfully-logo.png" alt="logo" />
      <button className="border-blue-300 border-b-2 h-full font-bold">
        booking
      </button>
      <div className="w-full flex justify-end">
        <Avatar sx={{ bgcolor: blue[500] }}>VM</Avatar>
      </div>
    </header>
  );
};
export default Header;
