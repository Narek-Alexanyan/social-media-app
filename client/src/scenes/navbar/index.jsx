import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../../state";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import useMediaQuery from "../../hooks/useMediaQuery";
import SearchField from "../../UI/SearchField";
import Switcher from "../../components/Switcher";

import { HiChatAlt, HiMenu, HiX } from "react-icons/hi";
import { HiBell } from "react-icons/hi";
import { HiQuestionMarkCircle } from "react-icons/hi";
import Dropdown from "../../UI/dropdown/Dropdown";

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const location = useLocation();
  const isLoginPage = location.pathname === "/";
  const isMobileScreen = useMediaQuery("(max-width: 768px)");

  const fullName = `${user?.firstName} ${user?.lastName}`;

  const options = [
    { id: 1, title: "Log Out", action: () => dispatch(setLogout()) },
  ];

  if (isLoginPage) {
    return (
      <div className="bg-white dark:bg-[#1A1A1A]">
        <div className="container mx-auto flex justify-center items-center p-4">
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-2xl text-sky-500 dark:text-sky-300 mr-6 cursor-pointer">
              SocialMedia
            </h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#1A1A1A]">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="flex justify-between items-center">
          <h2
            className="font-bold text-2xl text-sky-500 dark:text-sky-300 mr-6 cursor-pointer"
            onClick={() => navigate("/home")}
          >
            SocialMedia
          </h2>
          {!isMobileScreen && (
            <SearchField
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          )}
        </div>
        {/* DESKTOP NAV */}
        {!isMobileScreen ? (
          <div className="flex justify-between items-center">
            <Switcher className="mx-3" />
            <HiChatAlt className="mx-3 dark:text-white" />
            <HiBell className="mx-3 dark:text-white" />
            <HiQuestionMarkCircle className="mx-3 dark:text-white" />
            <Dropdown options={options} title={fullName} />
          </div>
        ) : (
          <button onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
            <HiMenu className="dark:text-white" />
          </button>
        )}
        {/* MOBILE NAV */}
        {isMobileScreen && isMobileMenuToggled && (
          <div className="fixed right-0 bottom-0 h-full z-10 max-w-[500px] min-w-[300px] bg-slate-100 dark:bg-[#1A1A1A] transition">
            {/* CLOSE ICON */}
            <div className="flex justify-end p-4">
              <button
                onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
              >
                <HiX className="dark:text-white" />
              </button>
            </div>

            {/* MENU ITEMS */}
            <div className="flex flex-col justify-center items-start p-8">
              <Switcher className="my-2" />
              <HiChatAlt className="my-2 dark:text-white" />
              <HiBell className="my-2 dark:text-white" />
              <HiQuestionMarkCircle className="my-2 dark:text-white" />
              <Dropdown className="mt-2" options={options} title={fullName} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
