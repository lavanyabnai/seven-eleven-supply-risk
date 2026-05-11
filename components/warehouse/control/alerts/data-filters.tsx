import { FolderIcon, ListChecksIcon, UserIcon } from "lucide-react";
import { useState } from "react";


import { DatePicker } from "@/components/date-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// import { TaskStatus } from "../types";
// import { useTaskFilters } from "../hooks/use-task-filters";


export const DataFilters = () => {


  const [filters, setFilters] = useState<{
    status: string | null;
    assigneeId: string | null;
    projectId: string | null;
    dueDate: string | null;
  }>({
    status: null,
    assigneeId: null,
    projectId: null,
    dueDate: null,
  });
  const onStatusChange = (value: string) => {
    setFilters((prev) => ({ ...prev, status: value === "all" ? null : value }));
  };

  const onProjectChange = (value: string) => {
    setFilters((prev) => ({ ...prev, projectId: value === "all" ? null : value }));
  };

  // const onAssigneeChange = (value: string) => {
  //   setFilters((prev) => ({ ...prev, assigneeId: value === "all" ? null : value }));
  // };

  // const onProjectChange = (value: string) => {
  //   setFilters((prev) => ({ ...prev, projectId: value === "all" ? null : value }));
  // };

  return (
    <div className="flex flex-col lg:flex-row gap-2">
      <Select
        defaultValue={filters.status ?? undefined}
        onValueChange={(value) => onStatusChange(value)}
      >
        <SelectTrigger className="w-full lg:w-auto h-8">
          <div className="flex items-center pr-2">
            <ListChecksIcon className="size-4 mr-2" />
            <SelectValue placeholder="All statuses" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All statuses</SelectItem>
          <SelectSeparator />
          <SelectItem value="completed">Completed</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="in-progress">In Progress</SelectItem>
          <SelectItem value="canceled">Canceled</SelectItem>
        </SelectContent>
      </Select>
      <Select
        defaultValue={filters.status ?? undefined}
        onValueChange={(value) => onStatusChange(value)}
      >
        <SelectTrigger className="w-full lg:w-auto h-8">
          <div className="flex items-center pr-2">
            <UserIcon className="size-4 mr-2" />
            <SelectValue placeholder="All Process" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Process</SelectItem>
          <SelectSeparator />
          <SelectItem value="cross-process">Cross Process</SelectItem>
          <SelectItem value="picking">Picking</SelectItem>
          <SelectItem value="receiving">Receiving</SelectItem>
          <SelectItem value="putaway">Putaway</SelectItem>
          <SelectItem value="shipping">Shipping</SelectItem>

        </SelectContent>
      </Select>
      <Select
        defaultValue={filters.projectId ?? undefined}
        onValueChange={(value) => onProjectChange(value)}
      >
        <SelectTrigger className="w-full lg:w-auto h-8">
          <div className="flex items-center pr-2">
            <FolderIcon className="size-4 mr-2" />
            <SelectValue placeholder="All Severity" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Severity</SelectItem>
          <SelectSeparator />
          <SelectItem value="low">Low</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="high">High</SelectItem>
        </SelectContent>
      </Select>

      <DatePicker
        placeholder="Due date"
        className="h-8 w-full lg:w-auto"
        value={filters.dueDate ? new Date(filters.dueDate) : undefined}
        onChange={(date) => {
          setFilters((prev) => ({ ...prev, dueDate: date ? date.toISOString() : null }));
        }}
      />
    </div>
  );
};
