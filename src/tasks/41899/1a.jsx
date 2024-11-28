import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useCallback, useState } from "react";

const generateRandomData = (count) => {
  const statuses = ["Paid", "Pending", "Failed"];
  const methods = ["Credit Card", "PayPal", "Bank Transfer"];

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    invoice: `INV-${(1000 + i).toString().padStart(4, "0")}`,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    method: methods[Math.floor(Math.random() * methods.length)],
    amount: Math.floor(Math.random() * 1000) + 100,
    subRows:
      Math.random() > 0.7
        ? [
            {
              id: `${i + 1}-1`,
              invoice: `SUB-${(1000 + i).toString().padStart(4, "0")}-1`,
              status: statuses[Math.floor(Math.random() * statuses.length)],
              method: methods[Math.floor(Math.random() * methods.length)],
              amount: Math.floor(Math.random() * 100) + 10,
            },
            {
              id: `${i + 1}-2`,
              invoice: `SUB-${(1000 + i).toString().padStart(4, "0")}-2`,
              status: statuses[Math.floor(Math.random() * statuses.length)],
              method: methods[Math.floor(Math.random() * methods.length)],
              amount: Math.floor(Math.random() * 100) + 10,
            },
          ]
        : null,
  }));
};

const TableRow = ({ row, isSelected, onSelect, level = 0 }) => (
  <>
    <tr className={`${level > 0 ? "bg-gray-50" : ""}`}>
      <td className="p-2">
        <Checkbox
          checked={isSelected}
          onCheckedChange={(checked) => onSelect(row.id, checked)}
        />
      </td>
      <td className="p-2">{row.invoice}</td>
      <td className="p-2">{row.status}</td>
      <td className="p-2">{row.method}</td>
      <td className="p-2 text-right">${row.amount.toFixed(2)}</td>
    </tr>
    {row.subRows &&
      row.subRows.map((subRow) => (
        <TableRow
          key={subRow.id}
          row={subRow}
          isSelected={isSelected}
          onSelect={onSelect}
          level={level + 1}
        />
      ))}
  </>
);

export default function App() {
  const [data] = useState(() => generateRandomData(10));
  const [selected, setSelected] = useState({});

  const handleSelect = useCallback((id, checked) => {
    setSelected((prev) => ({ ...prev, [id]: checked }));
  }, []);

  const handleSelectAll = useCallback(
    (checked) => {
      const newSelected = {};
      const selectRow = (row) => {
        newSelected[row.id] = checked;
        if (row.subRows) {
          row.subRows.forEach(selectRow);
        }
      };
      data.forEach(selectRow);
      setSelected(newSelected);
    },
    [data]
  );

  const isAllSelected =
    Object.values(selected).every(Boolean) && Object.keys(selected).length > 0;

  const totalAmount = data.reduce((sum, row) => {
    let rowSum = row.amount;
    if (row.subRows) {
      rowSum += row.subRows.reduce(
        (subSum, subRow) => subSum + subRow.amount,
        0
      );
    }
    return sum + rowSum;
  }, 0);

  const selectedAmount = Object.entries(selected).reduce(
    (sum, [id, isSelected]) => {
      if (!isSelected) return sum;
      const row =
        data.find((r) => r.id.toString() === id) ||
        data
          .flatMap((r) => r.subRows || [])
          .find((sr) => sr.id.toString() === id);
      return sum + (row ? row.amount : 0);
    },
    0
  );

  return (
    <Card className="w-full max-w-4xl mx-auto my-8">
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={isAllSelected}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead>Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row) => (
                <TableRow
                  key={row.id}
                  row={row}
                  isSelected={selected[row.id]}
                  onSelect={handleSelect}
                />
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row justify-between items-center">
        <div className="font-bold">Total: ${totalAmount.toFixed(2)}</div>
        {Object.values(selected).some(Boolean) && (
          <div className="font-bold text-blue-600">
            Selected Total: ${selectedAmount.toFixed(2)}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
