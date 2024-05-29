import { NavLink, NavLinkProps } from "react-router-dom";
import css from './Navigation.module.css';
import clsx from "clsx";

type NavLinkClassProps = {
  isActive: boolean;
};

const getNavLinkClass = ({ isActive }: NavLinkClassProps) => {
  return clsx(css.link, isActive && css.active);
};

export default function Navigation() {
  return (
    <nav className={css.nav}>
      <NavLink to="/" className={getNavLinkClass}>
        Home
      </NavLink>
      <NavLink to="/movies" className={getNavLinkClass}>
        Movies
      </NavLink>
    </nav>
  );
}
