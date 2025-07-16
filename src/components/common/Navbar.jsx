import React, { useEffect, useState } from "react";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import navbarLinks from "../../data/navbarLinks";
import { Link, matchPath, useNavigate } from "react-router-dom";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { useLocation } from "react-router-dom";
import {
  AiOutlineShoppingCart,
  AiOutlineLogin,
  AiOutlineHome,
  AiOutlineContacts,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { toast } from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";
import HamburgerMenu from "./HamburgerMenu";
import { VscDashboard, VscSignOut, VscSignIn } from "react-icons/vsc";
import { logout } from "../../services/operations/authServices";
import { BiCategory, BiDetail } from "react-icons/bi";
import { getAllCategories } from "../../services/operations/otherServices";
import { getCurrentUser } from "../../services/operations/profileServices";
import { setLoading } from "../../redux/slices/authSlice";

const Navbar = () => {
  const { token, loading } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { cartItemsCount } = useSelector((state) => state.cart);
  const [loading2, setLoading2] = useState(true);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [catalogs, setCatalogs] = useState([]);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);

  useEffect(() => {
    const fetchCatalog = async () => {
      const toastId = toast.loading("Loading Backend ...");
      const result = await getAllCategories();
      if (result) {
        setCatalogs(result);
      } else {
        toast.error("Failed to load backend");
      }
      toast.dismiss(toastId);
      setLoading2(false);
    };
    fetchCatalog();
  }, []);

  useEffect(() => {
    const getCurrentUserDetails = async () => {
      setLoading(true);
      if (token) {
        await getCurrentUser(token, dispatch, navigate);
      }
      setLoading(false);
    };
    getCurrentUserDetails();
  }, [token, dispatch, navigate]);

  const matchRoute = (linkPath) => {
    if (linkPath === "/")
      return matchPath({ path: linkPath }, location.pathname);
    return location.pathname.startsWith(linkPath);
  };

  const handleLogOutClick = async (e) => {
    setIsMenuModalOpen(false);
    await logout(token, dispatch, navigate);
  };

  return (
    <div className="bg-[#000814] border-b border-b-[#2C333F] h-14">
      <div className="w-11/12 h-14 mx-auto max-w-maxContent flex flex-row items-center justify-between">
        {/* Logo */}
        <div>
          <Link to={"/"}>
            <img src={logo} width={160} height={32} loading="lazy" alt="logo" />
          </Link>
        </div>

        {/* Nav Links */}
        <div className="">
          <nav className="hidden md:block">
            <ul className="flex gap-x-6 text-[#DBDDEA]">
              {navbarLinks.map((link, ind) => (
                <li key={ind}>
                  {link.title === "Catalog" ? (
                    <div className="flex items-center gap-1 group cursor-pointer relative ">
                      <p>{link.title}</p>
                      <SlArrowDown className="translate-y-[1px]" />

                      <div className="z-10 absolute top-[50%] translate-y-[3em] left-[50%] translate-x-[-50%] flex flex-col rounded-lg bg-[#F1F2FF] p-4 text-[#000814] transition-all duration-150 w-[200px]  lg:w-[300px] invisible  opacity-0  group-hover:visible group-hover:opacity-100 group-hover:translate-y-[1.65em]">
                        <div className="absolute h-6 w-6 top-0 translate-y-[-40%] select-none  left-[50%] translate-x-[80%] rotate-45 rounded bg-[#F1F2FF]"></div>

                        {catalogs.length ? (
                          <div className="flex flex-col capitalize">
                            {catalogs.map((catalog, index) => (
                              <Link
                                to={`/categorycourses/${catalog.name
                                  .split(" ")
                                  .join("-")}`}
                                key={index}
                              >
                                <p className="hover:bg-[#C5C7D4] rounded-lg py-3 pl-4">
                                  {catalog.name}
                                </p>
                              </Link>
                            ))}
                          </div>
                        ) : (
                          <div className="select-none cursor-not-allowed">
                            No Catalog Available
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <Link to={link?.path}>
                      <p
                        className={`${
                          matchRoute(link?.path)
                            ? "text-[#FFE83D]"
                            : "text-[#DBDDEA]"
                        }`}
                      >
                        {link.title}
                      </p>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Login / SignUp / DashBoard / Cart */}
        <div className="hidden md:flex gap-x-4 items-center">
          {(loading || loading2) && (
            <div className="text-white font-bold">Loading ...</div>
          )}
          {token === null && (
            <Link to={"/login"}>
              <button className="border border-[#2C333F] bg-[#161D29] text-[#AFB2BF] rounded-md px-3 py-2">
                Log in
              </button>
            </Link>
          )}

          {token === null && (
            <Link to={"/signup"}>
              <button className="border border-[#2C333F] bg-[#161D29] text-[#AFB2BF] rounded-md px-3 py-2">
                Sign Up
              </button>
            </Link>
          )}

          {user && user?.role === "Student" && (
            <Link to={"/dashboard/cart"} className="relative">
              <AiOutlineShoppingCart className="text-2xl text-[#AFB2BF]" />
              {cartItemsCount > 0 && (
                <span className="absolute text-[#E7C009] text-center text-xs font-bold bg-[#424854] h-5 w-5 -bottom-2 -right-2 grid place-items-center rounded-full">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          )}

          {token !== null && <ProfileDropDown />}
        </div>

        {/* HamberBurger Menu - only for small screen */}
        <div className="mr-4 md:hidden">
          <GiHamburgerMenu
            onClick={() => setIsMenuModalOpen((prev) => !prev)}
            className={` fill-[#AFB2BF] `}
            fontSize={24}
          />

          <HamburgerMenu
            isMenuModalOpen={isMenuModalOpen}
            setIsMenuModalOpen={setIsMenuModalOpen}
          >
            <div className="flex flex-col gap-y-2 py-5 px-5">
              {(loading || loading2) && (
                <div className="text-white font-bold">Loading ...</div>
              )}

              {token === null && (
                <Link to={"/login"} onClick={() => setIsMenuModalOpen(false)}>
                  <div className="flex gap-x-2 items-center w-full py-2 px-3 text-[#AFB2BF] hover:text-[#DBDDEA] hover:bg-[#2C333F] ">
                    <VscSignIn className="text-lg" />
                    Log In
                  </div>
                </Link>
              )}

              {token === null && (
                <Link to={"/signup"} onClick={() => setIsMenuModalOpen(false)}>
                  <div className="flex gap-x-2 items-center w-full py-2 px-3 text-[#AFB2BF] hover:text-[#DBDDEA] hover:bg-[#2C333F] ">
                    <AiOutlineLogin className="text-lg" />
                    Sign Up
                  </div>
                </Link>
              )}

              {token !== null && (
                <Link
                  to={"/dashboard/my-profile"}
                  onClick={() => setIsMenuModalOpen(false)}
                >
                  <div className="flex gap-x-2 items-center w-full py-2 px-3 text-[#AFB2BF] hover:text-[#DBDDEA] hover:bg-[#2C333F] ">
                    <VscDashboard className="text-lg" />
                    Dashboard
                  </div>
                </Link>
              )}

              {token !== null && user && user?.role === "Student" && (
                <Link
                  to={"/dashboard/cart"}
                  onClick={() => setIsMenuModalOpen(false)}
                >
                  <div className="flex gap-x-2 items-center w-full py-2 px-3 text-[#AFB2BF] hover:text-[#DBDDEA] hover:bg-[#2C333F] ">
                    <AiOutlineShoppingCart className="text-lg" />
                    Cart
                  </div>
                </Link>
              )}

              {token !== null && (
                <div
                  className="flex gap-x-2 items-center w-full py-2 px-3 text-[#AFB2BF] hover:text-[#DBDDEA] hover:bg-[#2C333F] cursor-pointer"
                  onClick={handleLogOutClick}
                >
                  <VscSignOut className="text-lg" />
                  LogOut
                </div>
              )}

              {/* General Buttons */}
              <div className="h-[1px] my-2 bg-[#AFB2BF] w-3/4 mx-auto"></div>

              <Link to={"/"} onClick={() => setIsMenuModalOpen(false)}>
                <div className="flex gap-x-2 items-center w-full py-2 px-3 text-[#AFB2BF] hover:text-[#DBDDEA] hover:bg-[#2C333F] ">
                  <AiOutlineHome className="text-lg" />
                  Home
                </div>
              </Link>

              <Link to={"/about"} onClick={() => setIsMenuModalOpen(false)}>
                <div className="flex gap-x-2 items-center w-full py-2 px-3 text-[#AFB2BF] hover:text-[#DBDDEA] hover:bg-[#2C333F] ">
                  <BiDetail className="text-lg" />
                  About Us
                </div>
              </Link>

              <Link to={"/contact"} onClick={() => setIsMenuModalOpen(false)}>
                <div className="flex gap-x-2 items-center w-full py-2 px-3 text-[#AFB2BF] hover:text-[#DBDDEA] hover:bg-[#2C333F] ">
                  <AiOutlineContacts className="text-lg" />
                  Contact Us
                </div>
              </Link>

              {/* Category */}
              <div
                className=""
                onClick={() => setCategoryOpen((prev) => !prev)}
              >
                <details>
                  <summary className="flex gap-x-2 items-center w-full py-2 px-3 text-[#AFB2BF] ">
                    <BiCategory className="text-lg" />
                    Category
                    {categoryOpen ? (
                      <SlArrowUp className="translate-y-[1px] ml-auto mr-1" />
                    ) : (
                      <SlArrowDown className="translate-y-[1px] ml-auto mr-1" />
                    )}
                  </summary>

                  <div className="px-4 text-[#AFB2BF]">
                    {catalogs.length ? (
                      <div className="flex flex-col capitalize">
                        {catalogs.map((catalog, index) => (
                          <Link
                            to={`/categorycourses/${catalog.name
                              .split(" ")
                              .join("-")}`}
                            key={index}
                            onClick={() => setIsMenuModalOpen(false)}
                          >
                            <p className=" rounded-lg py-2 pl-4">
                              {catalog.name}
                            </p>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="rounded-lg py-2 pl-4 select-none cursor-not-allowed">
                        No Catalog Available
                      </div>
                    )}
                  </div>
                </details>
              </div>
            </div>
          </HamburgerMenu>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
