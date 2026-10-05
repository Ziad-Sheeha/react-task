import { memo } from "react";
import { Dialog } from "primereact/dialog";
import { Avatar } from "primereact/avatar";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import type { UserRow } from "./types";

interface Props {
  user: UserRow | null;
  onHide: () => void;
}

const initials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

function UserDetailsDialogBase({ user, onHide }: Props) {
  const fields = user
    ? [
        { icon: "pi pi-envelope", label: "Email", value: user.email },
        { icon: "pi pi-phone", label: "Phone", value: user.phone },
        { icon: "pi pi-globe", label: "Website", value: user.website },
        { icon: "pi pi-building", label: "Company", value: user.company },
        { icon: "pi pi-map-marker", label: "City", value: user.city },
      ]
    : [];

  const header = user && (
    <div className="flex align-items-center gap-3">
      <Avatar label={initials(user.name)} size="xlarge" shape="circle" />
      <div>
        <div className="text-xl font-semibold">{user.name}</div>
        <div className="text-color-secondary">@{user.username}</div>
      </div>
    </div>
  );

  return (
    <Dialog
      visible={user !== null}
      onHide={onHide}
      header={header}
      modal
      draggable={false}
      dismissableMask
      style={{ width: "32rem", maxWidth: "95vw" }}
      footer={<Button label="Close" icon="pi pi-times" text onClick={onHide} />}
    >
      {user && (
        <div className="user-details">
          <Tag value={`ID: ${user.id}`} severity="info" className="mb-3" />
          <ul className="user-details__list">
            {fields.map((f) => (
              <li key={f.label} className="user-details__row">
                <i className={f.icon} />
                <div>
                  <div className="user-details__label">{f.label}</div>
                  <div className="user-details__value">{f.value}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Dialog>
  );
}

export const UserDetailsDialog = memo(UserDetailsDialogBase);
