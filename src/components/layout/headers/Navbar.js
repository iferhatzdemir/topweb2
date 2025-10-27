const Image = "next/image";
const homeImage1 = "/img/home-demos/home-1.jpg";
const homeImage2 = "/img/home-demos/home-2.jpg";
const homeImage3 = "/img/home-demos/home-3.jpg";
const homeImage4 = "/img/home-demos/home-4.jpg";
const homeImage5 = "/img/home-demos/home-5.jpg";
const homeImage6 = "/img/home-demos/home-6.jpg";
const homeImage7 = "/img/home-demos/home-7.jpg";
const homeImage8 = "/img/home-demos/home-8.jpg";
const homeImage9 = "/img/home-demos/home-9.jpg";
const homeImage10 = "/img/home-demos/home-10.jpg";
const homeImage11 = "/img/home-demos/home-11.jpg";

const dropdownBannerImage1 = "/img/banner/menu-banner-1.png";
import HomeDropdown from "./HomeDropdown";
import CommonDropdown from "./CommonDropdown";
import PagesDropdown from "./PagesDropdown";
import NavItem from "./NavItem";
import Link from "next/link";
import { useHeaderContex } from "@/providers/HeaderContex";
import Logo from "./Logo";

const Navbar = () => {
  const { headerStyle, headerSize, isNavbarAppointmentBtn, isTextWhite } =
    useHeaderContex();
  const navItemsRaw = [
    {
      name: "Home",
      path: "/",
      dropdown: null,
      dropdownSection: [
        {
          title: null,
          path: "#",
          dropdownItems: [
            {
              name: "Home Style - 01",
              img: homeImage1,
              path: "/",
            },
            {
              name: "Home Style - 02",
              img: homeImage2,
              path: "/home-2",
            },
            {
              name: "Home Style - 03",
              img: homeImage3,
              path: "/home-3",
            },
            {
              name: "Home Style - 04",
              img: homeImage4,
              path: "/home-4",
            },
            {
              name: "Home Style - 05",
              img: homeImage5,
              path: "/home-5",
              label: "video",
            },
            {
              name: "Home Style - 06",
              img: homeImage6,
              path: "/home-6",
            },
            {
              name: "Home Style - 07",
              img: homeImage7,
              path: "/home-7",
            },
            {
              name: "Home Style - 08",
              img: homeImage8,
              path: "/home-8",
              label: null,
            },
            {
              name: "Home Style - 09",
              img: homeImage9,
              path: "/home-9",
            },
            {
              name: "Home Style - 10",
              img: homeImage10,
              path: "/home-10",
            },
            {
              name: "Home Style - 11",
              img: homeImage11,
              path: "/home-11",
              label: "Service",
            },
          ],
        },
      ],
    },
    {
      name: "About",
      path: "#",
      dropdown: null,
      dropdownSection: [
        {
          title: null,
          path: "#",
          dropdownItems: [
            {
              name: "About",

              path: "/about",
            },
            {
              name: "Services",

              path: "/services",
            },
            {
              name: "Service Details",

              path: "/services/1",
            },
            {
              name: "Gallery",

              path: "/portfolio",
            },
            {
              name: "Gallery - 02",

              path: "/portfolio-2",
            },
            {
              name: "Gallery Details",
              path: "/portfolio/1",
            },
            {
              name: "Team",

              path: "/team",
            },
            {
              name: "Team Details",

              path: "/team/1",
            },
            {
              name: "FAQ",

              path: "/faq",
            },
            {
              name: "Google Map Locations",

              path: "/locations",
            },
          ],
        },
      ],
    },
    {
      name: "Shop",
      path: "/shop",
      dropdown: null,
      isNestedDropdown: null,
      dropdownSection: [
        {
          title: null,
          path: "#",
          dropdownItems: [
            {
              name: "Shop",

              path: "/shop",
            },
            {
              name: "Shop Grid",

              path: "/shop-grid",
            },
            {
              name: "Shop Left sidebar",

              path: "/shop-left-sidebar",
            },
            {
              name: "Shop right sidebar",

              path: "/shop-right-sidebar",
            },
            {
              name: "Shop details",

              path: "/products/1",
            },
            {
              name: "Shop details no sidebar ",
              path: "/shop-details-2",
            },
            {
              name: "Other Pages",
              path: "/team",
              nestedDropdown: null,
              nestedDropdownItems: [
                {
                  name: "Cart",
                  path: "/cart",
                },
                {
                  name: "Wishlist",
                  path: "/wishlist",
                },
                {
                  name: "Checkout",
                  path: "/checkout",
                },
                {
                  name: "Order Tracking",
                  path: "/order-tracking",
                },
                {
                  name: "My Account",
                  path: "/account",
                },
                {
                  name: "Sign in",
                  path: "/login",
                },
                {
                  name: "Register",
                  path: "/register",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "News",
      path: "#",
      dropdown: null,
      dropdownSection: [
        {
          title: null,
          path: "#",
          dropdownItems: [
            {
              name: "News",

              path: "/blogs",
            },
            {
              name: "News Grid",

              path: "/blogs-grid",
            },
            {
              name: "News Left sidebar",

              path: "/blog-left-sidebar",
            },
            {
              name: "News Right sidebar",

              path: "/blog-right-sidebar",
            },
            {
              name: "News details",

              path: "/blogs/1",
            },
          ],
        },
      ],
    },
    {
      name: "Pages",
      path: "#",
      dropdown: null,
      dropdownSection: [
        {
          title: "Inner Pages",
          path: "#",
          dropdownItems: [
            {
              name: "Gallery",

              path: "/portfolio",
            },
            {
              name: "Gallery - 02",

              path: "/portfolio-2",
            },
            {
              name: "Gallery",

              path: "/portfolio/1",
            },
            {
              name: "Team",

              path: "/team",
            },
            {
              name: "Team Details",

              path: "/team/1",
            },
            {
              name: "FAQ",

              path: "/faq",
            },
          ],
        },
        {
          title: "Inner Pages",
          path: "#",
          dropdownItems: [
            {
              name: "History",

              path: "/history",
            },
            {
              name: "Appointment",

              path: "/contact",
            },
            {
              name: "Google Map Locations",

              path: "/locations",
            },
            {
              name: "404",

              path: "/error",
            },
            {
              name: "Contact",

              path: "/contact",
            },
            {
              name: "Coming Soon",

              path: "/coming-soon",
            },
          ],
        },
        {
          title: "Shop Pages",
          path: "#",
          dropdownItems: [
            {
              name: "Shop",

              path: "/shop",
            },
            {
              name: "Shop Left sidebar",

              path: "/shop-left-sidebar",
            },
            {
              name: "Shop right sidebar",

              path: "/shop-right-sidebar",
            },
            {
              name: "Shop Grid",

              path: "/shop-grid",
            },
            {
              name: "Shop details",

              path: "/products/1",
            },
            {
              name: "Cart",

              path: "/cart",
            },
          ],
        },
        {
          title: null,
          bannerImg: dropdownBannerImage1,
          path: "/shop",
        },
      ],
    },
    {
      name: "Contact",
      path: "/contact",
      dropdown: null,
    },
  ];
  const navItems = navItemsRaw?.map((navItem, idx) => ({
    ...navItem,
    dropdown:
      idx === 0 ? (
        <HomeDropdown itmes={navItem?.dropdownSection} />
      ) : idx > 0 && idx < 4 ? (
        <CommonDropdown items={navItem?.dropdownSection} />
      ) : idx === 4 ? (
        <PagesDropdown itmes={navItem?.dropdownSection} />
      ) : null,
  }));
  return (
    <div
      className={`col header-menu-column ${
        headerStyle === 2 || isTextWhite
          ? " menu-color-white"
          : headerStyle === 5
          ? "justify-content-center align-items-center"
          : ""
      }`}
    >
      {headerStyle === 5 ? <Logo sticky={true} /> : ""}
      <div
        className={`header-menu ${
          headerStyle === 5 ? "header-menu-2" : "d-none d-xl-block "
        } `}
      >
        <nav>
          <div className="ltn__main-menu">
            <ul>
              {navItems?.map((item, idx) => (
                <NavItem key={idx} item={item} />
              ))}
              {isNavbarAppointmentBtn ||
              headerSize === "lg" ||
              headerStyle === 2 ||
              headerStyle === 4 ? (
                <li className="special-link text-uppercase">
                  <Link href="/contact">GET A Quote</Link>
                </li>
              ) : (
                ""
              )}
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
