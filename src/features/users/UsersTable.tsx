import { memo, useCallback, useMemo, useState } from "react";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable, type DataTableFilterMeta } from "primereact/datatable";
import { Column, type ColumnFilterElementTemplateOptions } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { useDebounce } from "@/hooks/useDebounce";
import type { UserRow } from "./types";
import { Tooltip } from "primereact/tooltip";
import { UserRowActions } from "./UserRowActions";
import { UserDetailsDialog } from "./UserDetailsDialog";
import "./users.css";

const PAGE_SIZES = [5, 10, 25, 50, 100];
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
  loading: boolean;
}

function UsersTableBase({ users, loading }: Props) {
  const [filters, setFilters] = useState<DataTableFilterMeta>(createFilters);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<UserRow[]>([]);

  const debouncedSearch = useDebounce(search, 300);

  const [viewId, setViewId] = useState<number | null>(null);

  const viewedUser = useMemo(() => users.find((u) => u.id === viewId) ?? null, [users, viewId]);

  const handleView = useCallback((id: number) => setViewId(id), []);
  const handleCloseView = useCallback(() => setViewId(null), []);

  const actionsBody = useCallback((row: UserRow) => <UserRowActions id={row.id} onView={handleView} />, [handleView]);

  const mergedFilters = useMemo<DataTableFilterMeta>(
    () => ({
      ...filters,
      global: { value: debouncedSearch || null, matchMode: FilterMatchMode.CONTAINS },
    }),
    [filters, debouncedSearch],
  );

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
    setSearch("");
  }, []);

  const header = (
    <div className="flex justify-content-between align-items-center gap-3 flex-wrap">
      <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined onClick={clearAll} />
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search name, email, phone..."
        />
      </span>
    </div>
  );

  return (
    <>
      <Tooltip target=".action-disabled" content="Do not modify the API data." position="top" />
      <DataTable
        value={users}
        dataKey="id"
        loading={loading}
        header={header}
        emptyMessage="No users match your search."
        paginator
        rows={PAGE_SIZES[0]}
        rowsPerPageOptions={PAGE_SIZES}
        filters={mergedFilters}
        onFilter={(e) => setFilters(e.filters)}
        globalFilterFields={GLOBAL_FIELDS}
        selectionMode="checkbox"
        selection={selected}
        onSelectionChange={(e) => setSelected(e.value as UserRow[])}
        scrollable
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
      </DataTable>
      <UserDetailsDialog user={viewedUser} onHide={handleCloseView} />
    </>
  );
}

export const UsersTable = memo(UsersTableBase);
