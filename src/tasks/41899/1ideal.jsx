import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import "@/index.css";
import React, { useState } from "react";

// Mock data
const generateRandomData = () => {
  const statuses = ["Paid", "Pending", "Overdue"];
  const methods = ["Credit Card", "Bank Transfer", "Cash"];

  const data = Array.from({ length: 10 }, (_, i) => ({
    invoice: `INV-${i + 1}`,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    method: methods[Math.floor(Math.random() * methods.length)],
    amount: parseFloat((Math.random() * 1000).toFixed(2)),
    subRows: Array.from({ length: 2 }, (_, j) => ({
      invoice: `INV-${i + 1}.${j + 1}`,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      method: methods[Math.floor(Math.random() * methods.length)],
      amount: parseFloat((Math.random() * 500).toFixed(2)),
    })),
  }));

  return data;
};

// Table Row Component
function TableRow({ row, isChecked, onCheckboxChange }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <tr className="hover:bg-gray-50">
        <td className="px-6 py-4 whitespace-nowrap">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={onCheckboxChange}
          />
        </td>
        <td className="px-6 py-4 whitespace-nowrap">{row.invoice}</td>
        <td className="px-6 py-4 whitespace-nowrap">{row.status}</td>
        <td className="px-6 py-4 whitespace-nowrap">{row.method}</td>
        <td className="px-6 py-4 whitespace-nowrap">
          {row.amount.toLocaleString(undefined, { maximumFractionDigits: 2 })}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          {row.subRows.length > 0 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-blue-500"
            >
              {isExpanded ? "Hide" : "Show"} Sub-rows
            </button>
          )}
        </td>
      </tr>
      {isExpanded &&
        row.subRows.map((subRow, index) => (
          <tr key={index} className="bg-gray-100 hover:bg-gray-200">
            <td className="px-6 py-4 whitespace-nowrap">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={onCheckboxChange}
              />
            </td>
            <td className="px-6 py-4 whitespace-nowrap pl-8">
              {subRow.invoice}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">{subRow.status}</td>
            <td className="px-6 py-4 whitespace-nowrap">{subRow.method}</td>
            <td className="px-6 py-4 whitespace-nowrap">
              {subRow.amount.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}
            </td>
            <td className="px-6 py-4 whitespace-nowrap"></td>
          </tr>
        ))}
    </>
  );
}

// Main App Component
export default function App() {
  const [data] = useState(generateRandomData());
  const [selectedRows, setSelectedRows] = useState(new Set());

  const totalAmount = data.reduce(
    (total, row) =>
      total +
      row.amount +
      row.subRows.reduce((subTotal, subRow) => subTotal + subRow.amount, 0),
    0
  );
  const selectedTotal = Array.from(selectedRows).reduce((total, key) => {
    const row = data[key];
    return (
      total +
      row.amount +
      row.subRows.reduce((subTotal, subRow) => subTotal + subRow.amount, 0)
    );
  }, 0);

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const allKeys = new Set(data.map((_, i) => i));
      setSelectedRows(allKeys);
    } else {
      setSelectedRows(new Set());
    }
  };

  const handleRowCheckboxChange = (index) => {
    setSelectedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <div className="p-4 sm:p-10 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3">
                  <input type="checkbox" onChange={handleSelectAll} />
                </th>
                <th className="px-6 py-3">Invoice</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Method</th>
                <th className="px-6 py-3">Amount</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((row, index) => (
                <TableRow
                  key={index}
                  row={row}
                  isChecked={selectedRows.has(index)}
                  onCheckboxChange={() => handleRowCheckboxChange(index)}
                />
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="4" className="px-6 py-4 text-right font-bold">
                  Total
                </td>
                <td className="px-6 py-4">
                  {totalAmount.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}
                </td>
              </tr>
              {selectedRows.size > 0 && (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-right font-bold">
                    Selected Total
                  </td>
                  <td className="px-6 py-4">
                    {selectedTotal.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
              )}
            </tfoot>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
