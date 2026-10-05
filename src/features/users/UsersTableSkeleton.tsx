import { memo } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Skeleton } from "primereact/skeleton";

const HEADERS = ["ID", "Name", "Username", "Email", "Phone", "Website", "Company", "City", "Actions"];
const ROWS = Array.from({ length: 10 }, (_, i) => ({ id: i }));
const cell = () => <Skeleton height="1.1rem" />;

function UsersTableSkeletonBase() {
  return (
    <div aria-busy="true" aria-label="Loading users">
      <DataTable value={ROWS} dataKey="id" scrollable>
        {HEADERS.map((h) => (
          <Column key={h} header={h} body={cell} style={{ minWidth: "8rem" }} />
        ))}
      </DataTable>
    </div>
  );
}

export const UsersTableSkeleton = memo(UsersTableSkeletonBase);
