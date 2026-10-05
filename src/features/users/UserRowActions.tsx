import { memo } from "react";
import { Button } from "primereact/button";

interface Props {
  id: number;
  onView: (id: number) => void;
}

const DISABLED_TIP = {
  showOnDisabled: true,
  position: "top" as const,
};
const NOTE = "Do not modify the API data.";

function UserRowActionsBase({ id, onView }: Props) {
  return (
    <div className="flex align-items-center gap-1">
      <Button icon="pi pi-eye" rounded text severity="info" aria-label="View user" onClick={() => onView(id)} />
      <Button
        icon="pi pi-pencil"
        rounded
        text
        severity="secondary"
        aria-label="Edit user"
        disabled
        tooltip={NOTE}
        tooltipOptions={DISABLED_TIP}
      />
      <Button
        icon="pi pi-trash"
        rounded
        text
        severity="danger"
        aria-label="Delete user"
        disabled
        tooltip={NOTE}
        tooltipOptions={DISABLED_TIP}
      />
    </div>
  );
}

export const UserRowActions = memo(UserRowActionsBase);
