import { memo } from "react";
import { classNames } from "primereact/utils";

const items = [{ label: "Users", icon: "pi pi-users", active: true }];

function SidebarBase({ open }: { open: boolean }) {
  return (
    <aside className={classNames("sidebar", { "sidebar--closed": !open })}>
      <nav>
        <ul>
          {items.map((item) => (
            <li key={item.label}>
              <a
                href="#"
                className={classNames("sidebar__link", { "sidebar__link--active": item.active })}
                onClick={(e) => e.preventDefault()}
              >
                <i className={item.icon} />
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export const Sidebar = memo(SidebarBase);
