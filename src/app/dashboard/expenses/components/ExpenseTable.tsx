import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";

const balanceData = [
  {
    id: 1,
    expenses: "5000",
    remarks: "Office Supplies",
    totalBalance: "NPR 150000",
    addedDate: "2024-06-15",
  },
  {
    id: 2,
    expenses: "3000",
    remarks: "Travel Expenses",
    totalBalance: "NPR 147000",
    addedDate: "2024-06-16",
  },
];

export default function Component() {
  return (
    <div className="overflow-x-auto">
      <Table striped>
        <TableHead className="text-lg">
          <TableRow>
            <TableHeadCell>ID</TableHeadCell>
            <TableHeadCell>Expenses</TableHeadCell>
            <TableHeadCell>Remarks</TableHeadCell>
            <TableHeadCell>Total Balance</TableHeadCell>
            <TableHeadCell>Added Date</TableHeadCell>
            <TableHeadCell>Action</TableHeadCell>
          </TableRow>
        </TableHead>

        <TableBody className="divide-y">
          {balanceData.map((row, index) => (
            <TableRow
              key={index}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {row.id}
              </TableCell>
              <TableCell>{row.expenses}</TableCell>
              <TableCell>{row.remarks}</TableCell>
              <TableCell>{row.totalBalance}</TableCell>
              <TableCell>{row.addedDate}</TableCell>
              <TableCell>
                <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                Edit
              </a>/<a href="#" className="font-medium text-red-600 hover:underline dark:text-red-500">
                Delete
              </a></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}