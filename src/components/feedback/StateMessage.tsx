import { memo, type ReactNode } from "react";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import "./state-message.css";

interface Props {
  icon: string;
  title: string;
  description?: ReactNode;
  tone?: "danger" | "info" | "neutral";
  actionLabel?: string;
  actionIcon?: string;
  onAction?: () => void;
  compact?: boolean;
}

function StateMessageBase({
  icon,
  title,
  description,
  tone = "neutral",
  actionLabel,
  actionIcon,
  onAction,
  compact,
}: Props) {
  return (
    <div
      className={classNames("state", `state--${tone}`, { "state--compact": compact })}
      role={tone === "danger" ? "alert" : "status"}
    >
      <div className="state__icon">
        <i className={icon} />
      </div>
      <h2 className="state__title">{title}</h2>
      {description && <p className="state__desc">{description}</p>}
      {actionLabel && onAction && (
        <Button
          className="state__action"
          label={actionLabel}
          icon={actionIcon}
          outlined={tone !== "danger"}
          severity={tone === "danger" ? "danger" : undefined}
          onClick={onAction}
        />
      )}
    </div>
  );
}

export const StateMessage = memo(StateMessageBase);
