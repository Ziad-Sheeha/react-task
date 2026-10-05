import { memo } from "react";
import { classNames } from "primereact/utils";
import { NavLink } from "react-router-dom";

const items = [{ label: "Users", icon: "pi pi-users", to: "/users" }];

function SidebarBase({ open }: { open: boolean }) {
  return (
    <aside className={classNames("sidebar", { "sidebar--closed": !open })}>
      <nav>
        <ul>
          {items.map((item) => (
            <li key={item.label}>
              <NavLink
                to={item.to}
                end
                className={({ isActive }) => classNames("sidebar__link", { "sidebar__link--active": isActive })}
              >
                <i className={item.icon} />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export const Sidebar = memo(SidebarBase);
