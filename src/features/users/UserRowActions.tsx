import { memo } from "react";
import { Button } from "primereact/button";

interface Props {
  id: number;
  onView: (id: number) => void;
}

function UserRowActionsBase({ id, onView }: Props) {
  return (
    <div className="flex align-items-center gap-1">
      <Button icon="pi pi-eye" rounded text severity="info" aria-label="View user" onClick={() => onView(id)} />

      <span className="action-disabled">
        <Button icon="pi pi-pencil" rounded text severity="secondary" aria-label="Edit user" disabled />
      </span>
      <span className="action-disabled">
        <Button icon="pi pi-trash" rounded text severity="danger" aria-label="Delete user" disabled />
      </span>
    </div>
  );
}

export const UserRowActions = memo(UserRowActionsBase);
