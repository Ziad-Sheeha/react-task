import { memo, useCallback, useMemo, useState } from "react";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { type DataTableFilterMeta } from "primereact/datatable";
import { Column, type ColumnFilterElementTemplateOptions } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import type { UserRow } from "./types";
import { UserRowActions } from "./UserRowActions";
import { UserDetailsDialog } from "./UserDetailsDialog";
import "./users.css";
import { StateMessage } from "@/components/feedback/StateMessage";
import { Table } from "@/components/table/Table";

const GLOBAL_FIELDS = ["name", "username", "email", "phone", "website"];

const textFilter = () => ({
  operator: FilterOperator.AND,
  constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
});

const selectFilter = () => ({ value: null, matchMode: FilterMatchMode.EQUALS });

const createFilters = (): DataTableFilterMeta => ({
  name: textFilter(),
  username: textFilter(),
  email: textFilter(),
  website: textFilter(),
  company: selectFilter(),
  city: selectFilter(),
});

interface Props {
  users: UserRow[];
}

function UsersTableBase({ users }: Props) {
  const [filters, setFilters] = useState<DataTableFilterMeta>(createFilters);
  const [selected, setSelected] = useState<UserRow[]>([]);

  const [viewId, setViewId] = useState<number | null>(null);

  const viewedUser = users.find((u) => u.id === viewId) ?? null;

  const handleView = useCallback((id: number) => setViewId(id), []);
  const handleCloseView = useCallback(() => setViewId(null), []);

  const actionsBody = useCallback((row: UserRow) => <UserRowActions id={row.id} onView={handleView} />, [handleView]);

  const companies = useMemo(() => [...new Set(users.map((u) => u.company))].sort(), [users]);
  const cities = useMemo(() => [...new Set(users.map((u) => u.city))].sort(), [users]);

  const makeSelectFilter = useCallback(
    (options: string[]) => (o: ColumnFilterElementTemplateOptions) => (
      <Dropdown
        value={o.value}
        options={options}
        onChange={(e) => o.filterCallback(e.value)}
        placeholder="Any"
        showClear
        className="p-column-filter"
      />
    ),
    [],
  );
  const companyFilter = useMemo(() => makeSelectFilter(companies), [makeSelectFilter, companies]);
  const cityFilter = useMemo(() => makeSelectFilter(cities), [makeSelectFilter, cities]);

  const clearAll = useCallback(() => {
    setFilters(createFilters());
  }, []);

  const header = <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined onClick={clearAll} />;

  const hasActiveFilters = useMemo(() => {
    return Object.entries(filters).some(([field, filter]) => {
      if (field === "global") return false;

      if ("constraints" in filter) {
        return filter.constraints.some((constraint) => constraint.value !== null && constraint.value !== "");
      }

      return filter.value !== null && filter.value !== "";
    });
  }, [filters]);

  const emptyMessage = (
    <StateMessage
      icon={hasActiveFilters ? "pi pi-search" : "pi pi-users"}
      title={hasActiveFilters ? "No users found" : "No users found"}
      description={
        hasActiveFilters
          ? "We couldn't find any users matching your search or filters."
          : "There are no users to display at the moment."
      }
      actionLabel={hasActiveFilters ? "Clear filters" : undefined}
      actionIcon={hasActiveFilters ? "pi pi-filter-slash" : undefined}
      onAction={hasActiveFilters ? clearAll : undefined}
      compact
    />
  );

  return (
    <>
      <Table
        value={users}
        dataKey="id"
        header={header}
        emptyMessage={emptyMessage}
        filters={filters}
        onFilter={setFilters}
        globalFilterFields={GLOBAL_FIELDS}
        selection={selected}
        onSelectionChange={(value) => setSelected(value as UserRow[])}
      >
        <Column selectionMode="multiple" headerStyle={{ width: "3rem" }} />
        <Column field="id" header="ID" style={{ minWidth: "5rem" }} />
        <Column field="name" header="Name" filter filterPlaceholder="Search by name" style={{ minWidth: "12rem" }} />
        <Column
          field="username"
          header="Username"
          filter
          filterPlaceholder="Search by username"
          style={{ minWidth: "11rem" }}
        />
        <Column field="email" header="Email" filter filterPlaceholder="Search by email" style={{ minWidth: "14rem" }} />
        <Column field="phone" header="Phone" style={{ minWidth: "12rem" }} />
        <Column
          field="website"
          header="Website"
          filter
          filterPlaceholder="Search by website"
          style={{ minWidth: "11rem" }}
        />
        <Column
          field="company"
          header="Company"
          filter
          showFilterMatchModes={false}
          filterElement={companyFilter}
          style={{ minWidth: "13rem" }}
        />
        <Column
          field="city"
          header="City"
          filter
          showFilterMatchModes={false}
          filterElement={cityFilter}
          style={{ minWidth: "11rem" }}
        />
        <Column
          header="Actions"
          body={actionsBody}
          frozen
          alignFrozen="right"
          exportable={false}
          style={{ minWidth: "9rem" }}
        />
      </Table>
      <UserDetailsDialog user={viewedUser} onHide={handleCloseView} />
    </>
  );
}

export const UsersTable = memo(UsersTableBase);
