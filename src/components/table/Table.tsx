import { memo, useMemo, useState, type ReactNode } from "react";
import { FilterMatchMode } from "primereact/api";
import { DataTable, type DataTableFilterMeta } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useDebounce } from "@/hooks/useDebounce";
import { StateMessage } from "@/components/feedback/StateMessage";

const DEFAULT_PAGE_SIZES = [5, 10, 25, 50, 100];

interface Props {
  value: unknown[];
  dataKey?: string;
  children: ReactNode;

  filters?: DataTableFilterMeta;
  onFilter?: (filters: DataTableFilterMeta) => void;
  globalFilterFields?: string[];

  searchPlaceholder?: string;

  header?: ReactNode;
  emptyMessage?: ReactNode;

  selection?: unknown[];
  onSelectionChange?: (value: unknown[]) => void;

  pageSizes?: number[];
  rows?: number;

  scrollable?: boolean;
}

function TableBase({
  value,
  dataKey,
  children,
  filters,
  onFilter,
  globalFilterFields,
  searchPlaceholder = "Search...",
  header,
  emptyMessage,
  selection,
  onSelectionChange,
  pageSizes = DEFAULT_PAGE_SIZES,
  rows = pageSizes[0],
  scrollable = true,
}: Props) {
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 300);

  const mergedFilters = useMemo<DataTableFilterMeta>(
    () => ({
      ...filters,
      global: {
        value: debouncedSearch || null,
        matchMode: FilterMatchMode.CONTAINS,
      },
    }),
    [filters, debouncedSearch],
  );

  const tableHeader = (
    <div className="flex justify-content-between align-items-center gap-3 flex-wrap">
      {header}

      <span className="search-box">
        <i className="pi pi-search" />

        <InputText value={search} onChange={(e) => setSearch(e.target.value)} placeholder={searchPlaceholder} />

        {search && (
          <Button
            type="button"
            icon="pi pi-times"
            text
            rounded
            onClick={() => setSearch("")}
            aria-label="Clear search"
          />
        )}
      </span>
    </div>
  );

  return (
    <DataTable
      value={value}
      stripedRows
      dataKey={dataKey}
      header={tableHeader}
      emptyMessage={
        emptyMessage ?? (
          <StateMessage icon="pi pi-inbox" title="No data" description="There is no data to display." compact />
        )
      }
      paginator
      rows={rows}
      rowsPerPageOptions={pageSizes}
      filters={mergedFilters}
      onFilter={(e) => onFilter?.(e.filters)}
      globalFilterFields={globalFilterFields}
      selection={selection}
      onSelectionChange={(e) => onSelectionChange?.(e.value)}
      selectionMode="checkbox"
      scrollable={scrollable}
      className="app-table"
    >
      {children}
    </DataTable>
  );
}

export const Table = memo(TableBase);
