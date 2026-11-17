import { useState } from "react";

import {
  LuLayoutDashboard,
  LuAlbum,
  LuStore,
  LuSettings,
  LuLogOut,
  LuArrowRight,
} from "react-icons/lu";

import { NavLink, useLocation } from "react-router-dom";

// Sidebar links
const links = [
  {
    label: "ანალიტიკა",
    icon: LuLayoutDashboard,
    href: "/dashboard",
  },
  {
    label: "შეკვეთები",
    icon: LuAlbum,
    href: "/dashboard/orders",
  },
  {
    label: "საწყობი",
    icon: LuStore,
    href: "/dashboard/storage",
  },
  {
    label: "პროდუქტები",
    icon: LuStore,
    href: "#",
    dropdown: true,
    dropdownItems: [
      {
        title: "ნაკლები მარაგში",
        href: "/dashboard/product/lowstock",
      },
      {
        title: "ყველა",
        href: "/dashboard/product/all",
      },
    ],
  },
  {
    label: "კატეგორია",
    icon: LuStore,
    href: "/dashboard/category",
  },
  {
    label: "ინგრედიენტები",
    icon: LuStore,
    href: "/dashboard/ingredients",
  },
];

const footerLinks = [
  {
    label: "პარამეტრები",
    icon: LuSettings,
    href: "#",
  },
  {
    label: "გასვლა",
    icon: LuLogOut,
    href: "/auth/logout",
  },
];

// Navigation item
function NavItem({ item, open }) {
  const Icon = item.icon;

  const [hovering, setHovering] = useState(false);

  const location = useLocation();

  // Check whether one of the dropdown routes is active
  const isDropdownActive = item.dropdownItems?.some(
    (ele) => location.pathname === ele.href,
  );

  // Dropdown navigation
  if (item.dropdown) {
    return (
      <div
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        className={`group relative flex flex-col justify-center gap-3 rounded-lg p-2
          transition-colors duration-200
          ${
            isDropdownActive
              ? "bg-brand/20 text-brand"
              : "text-brand-500 hover:bg-brand-10 hover:text-brand-500"
          }`}
      >
        {/* Parent item */}
        <div className="flex h-7 items-center gap-3">
          <Icon className="size-5 shrink-0" />

          <span
            className={`whitespace-nowrap text-sm font-medium transition-all duration-300
              ${
                open
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-2 pointer-events-none opacity-0"
              }`}
          >
            {item.label}
          </span>

          <LuArrowRight
            className={`ml-auto shrink-0 transition-transform duration-200
              ${hovering ? "rotate-90" : ""}`}
          />
        </div>

        {/* Dropdown items */}
        {(hovering || isDropdownActive) && open && (
          <ul className="relative flex h-fit w-full flex-col gap-1">
            {item.dropdownItems.map((ele) => (
              <li key={ele.href} className="flex flex-row items-center gap-2">
                <span className="relative bottom-1 transition-all duration-200">
                  .
                </span>

                <NavLink
                  to={ele.href}
                  className={({ isActive }) =>
                    `w-fit rounded-lg p-1 text-center text-sm transition-all duration-300
                    ${
                      isActive
                        ? "ml-2 font-bold text-brand-500"
                        : "text-brand-400 hover:ml-2 hover:text-brand-500"
                    }`
                  }
                >
                  {ele.title}
                </NavLink>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  // Regular navigation
  return (
    <NavLink
      to={item.href}
      end={item.href === "/dashboard"}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className={({ isActive }) =>
        `group relative flex h-11 items-center gap-3 rounded-lg px-3 outline-none
        transition-colors duration-200
        focus-visible:ring-2 focus-visible:ring-brand/60
        ${
          isActive
            ? "bg-brand/20 text-brand"
            : "text-brand-500 hover:bg-brand-10 hover:text-brand-500"
        }`
      }
    >
      {/* Active indicator */}
      <span
        className={`absolute left-0 top-1/2 w-1 -translate-y-1/2 rounded-r-full bg-brand
          transition-all duration-300
          ${
            location.pathname === item.href
              ? "h-6 opacity-100"
              : "h-0 opacity-0"
          }`}
      />

      <Icon
        className={`size-5 shrink-0 transition-colors duration-200
          ${hovering ? "text-brand-400" : ""}`}
      />

      <span
        className={`whitespace-nowrap text-sm font-medium transition-all duration-300
          ${hovering ? "text-brand-400" : ""}
          ${
            open
              ? "translate-x-0 opacity-100"
              : "-translate-x-2 pointer-events-none opacity-0"
          }`}
      >
        {item.label}
      </span>
    </NavLink>
  );
}

// Main sidebar
export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <aside
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setOpen(false);
        }
      }}
      className={`my-auto flex h-[620px] max-h-[90vh] flex-col overflow-hidden
        rounded-2xl border border-white/50 p-2
        text-text-inverse shadow-xl backdrop-blur-xl
        transition-[width] duration-300 ease-in-out
        ${open ? "w-60" : "w-[68px]"}`}
    >
      {/* Logo */}
      <div className="mb-2 flex h-12 items-center gap-3 border-b border-white/10 px-2 pb-2">
        <div className="grid size-8 shrink-0 place-items-center rounded-lg bg-brand font-black text-brand-foreground shadow-brand">
          L
        </div>

        <span
          className={`whitespace-nowrap font-bold tracking-wide transition-all duration-300
            ${open ? "opacity-100" : "opacity-0"}`}
        >
          Palermo
        </span>
      </div>

      {/* Main navigation */}
      <nav className="flex flex-col gap-1">
        {links.map((link) => (
          <NavItem key={link.label} item={link} open={open} />
        ))}
      </nav>

      {/* Footer navigation */}
      <nav className="mt-auto flex flex-col gap-1 border-t border-white/10 pt-2">
        {footerLinks.map((link) => (
          <NavItem key={link.label} item={link} open={open} />
        ))}
      </nav>
    </aside>
  );
}

// Sidebar wrapper
export function AppSidebar() {
  return (
    <div className="ml-2 flex h-screen items-center">
      <Sidebar />
    </div>
  );
}
