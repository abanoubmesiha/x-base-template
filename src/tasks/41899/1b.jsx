import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useEffect, useState } from "react";

function generateRandomData(count = 10) {
  const methods = ["Credit Card", "PayPal", "Cash", "Bank Transfer"];
  const statuses = ["Paid", "Pending", "Failed", "Refunded"];

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    invoice: `INV-${Math.floor(Math.random() * 1000)}`,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    method: methods[Math.floor(Math.random() * methods.length)],
    amount: (Math.random() * 1000).toFixed(2),
    hasSubRow: Math.random() > 0.7, // 30% chance to have a sub-row
  }));
}

const DataTable = ({ data }) => {
  const [rows, setRows] = useState(data);
  const [selected, setSelected] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    if (selectAll) {
      setSelected(rows.map((row) => row.id));
    } else {
      setSelected([]);
    }
  }, [selectAll, rows]);

  const toggleRow = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
  };

  const calculateTotal = (ids = null) => {
    return rows
      .reduce((acc, row) => {
        if (ids === null || ids.includes(row.id)) {
          return acc + parseFloat(row.amount);
        }
        return acc;
      }, 0)
      .toFixed(2);
  };

  return (
    <Card className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Checkbox checked={selectAll} onCheckedChange={toggleSelectAll} />
            </TableHead>
            <TableHead>Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, index) => [
            <TableRow key={row.id}>
              <TableCell>
                <Checkbox
                  checked={selected.includes(row.id)}
                  onCheckedChange={() => toggleRow(row.id)}
                />
              </TableCell>
              <TableCell>{row.invoice}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell>{row.method}</TableCell>
              <TableCell>${row.amount}</TableCell>
            </TableRow>,
            row.hasSubRow && (
              <TableRow key={`${row.id}-sub`} className="bg-gray-100">
                <TableCell colSpan={5} className="pl-12">
                  Sub-row for {row.invoice}
                </TableCell>
              </TableRow>
            ),
          ])}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableHead colSpan="4" className="text-right">
              Total
            </TableHead>
            <TableHead>${calculateTotal()}</TableHead>
          </TableRow>
          {selected.length > 0 && (
            <TableRow>
              <TableHead colSpan="4" className="text-right">
                Selected Total
              </TableHead>
              <TableHead>${calculateTotal(selected)}</TableHead>
            </TableRow>
          )}
        </TableFooter>
      </Table>
    </Card>
  );
};

export default function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(generateRandomData(15));
  }, []);

  return (
    <div className="flex justify-center p-4 sm:p-8">
      <div className="max-w-4xl w-full">
        <Card>
          <CardHeader>
            <CardTitle>Transaction Table</CardTitle>
            <CardDescription>Overview of latest transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable data={data} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
