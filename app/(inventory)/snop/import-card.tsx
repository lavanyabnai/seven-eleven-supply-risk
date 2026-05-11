import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';


import { ImportTable } from './import-table';
import { data } from '@/app/data/network/mapData/supplierMap/data';


const requiredOptions = [
  'groupId',
  'minDcs',
  'maxDcs',
  'timePeriod',
  'inclusionType'
];

interface SelectedColumnsState {
  [key: string]: string | null;
}

interface ImportCardProps {
  onUpload: (data: unknown) => void;
  onCancel: () => void;
}

export function ImportCard({ onUpload, onCancel }: ImportCardProps) {
  const [selectedColumns, setSelectedColumns] = useState<SelectedColumnsState>(
    {}
  );

  const headers = data[0];
  const body = data.slice(1);

  const onTableHeadSelectChange = (
    columnIndex: number,
    value: string | null
  ) => {
    setSelectedColumns((prev) => {
      const newSelectedColumns = { ...prev };

      for (const key in newSelectedColumns) {
        if (newSelectedColumns[key] === value) {
          newSelectedColumns[key] = null;
        }
      }

      if (value === 'skip') {
        value = null;
      }

      newSelectedColumns[`column_${columnIndex}`] = value;
      return newSelectedColumns;
    });
  };

  const progress = Object.values(selectedColumns).filter(Boolean).length;

  const handleContinue = () => {
    const getColumnIndex = (column: string) => {
      return column.split('_')[1];
    };

    const mappedData = {
      headers: (headers as unknown as string[]).map((_header: string, index: number) => {
        const columnIndex = getColumnIndex(`column_${index}`);
        return selectedColumns[`column_${columnIndex}`] || null;
      }),
      body: body
        .map((row: any) => {
          const transformedRow = row.map((cell: unknown, index: number) => {
            const columnIndex = getColumnIndex(`column_${index}`);
            return selectedColumns[`column_${columnIndex}`] ? String(cell) : null;
          });

          return transformedRow.every((item: string | null) => item === null)
            ? []
            : transformedRow;
        })
        .filter((row: (string | null)[]) => row.length > 0)
    };

    const arrayOfData = mappedData.body.map((row: (string | null)[]) => {
      return row.reduce((acc: any, cell: any, index: string | number) => {
        const header = mappedData.headers[index as number];
        if (header !== null) {
          acc[header] = cell;
        }
        return acc;
      }, {});
    });

    const formattedData = arrayOfData.map((item: any) => ({
      groupId: Number(item.groupId),
      minDcs: Number(item.minDcs),
      maxDcs: Number(item.maxDcs),
      timePeriod: item.timePeriod,
      inclusionType: item.inclusionType
    }));
    onUpload(formattedData);
  };

 

  return (
    <div className="max-w-screen-6xl mx-auto w-full pb-10 mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">
            Import Transaction
          </CardTitle>
          <div className="flex flex-col lg:flex-row gap-2 items-center">
            <Button onClick={onCancel} size="sm" className="w-full lg:w-auto">
              Cancel
            </Button>
            <Button
              size="sm"
              disabled={progress < requiredOptions.length}
              onClick={handleContinue}
              className="w-full lg:w-auto"
            >
              Continue ({progress} / {requiredOptions.length})
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ImportTable
            headers={headers as unknown as string[]}
            body={body as unknown as string[][]}
            selectedColumns={selectedColumns}
            onTableHeadSelectChange={onTableHeadSelectChange}
          />
        </CardContent>
      </Card>
    </div>
  );
}
