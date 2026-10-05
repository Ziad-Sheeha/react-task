import { useNavigate } from "react-router-dom";
import { StateMessage } from "@/components/feedback/StateMessage";

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <>
      <span className="not-found__code" aria-hidden="true">
        404
      </span>
      <StateMessage
        compact
        tone="info"
        icon="pi pi-compass"
        title="Page not found"
        description="The page you're looking for doesn't exist or has been moved."
        actionLabel="Back to users"
        actionIcon="pi pi-arrow-left"
        onAction={() => navigate("/users")}
      />
    </>
  );
}
