import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";

const balanceData = [
  {
    id: "BAL000004",
    balance: "$ 100000",
    openingBalance: "$ 100000",
    closingBalance: "$ 100000",
    date: "2025-10-11",
  },
  {
    id: "BAL000005",
    balance: "$ 100000",
    openingBalance: "$ 100000",
    closingBalance: "$ 100000",
    date: "2025-10-11",
  },
  {
    id: "BAL000006",
    balance: "$ 100000",
    openingBalance: "$ 100000",
    closingBalance: "$ 100000",
    date: "2025-10-11",
  },
];

export default function Component() {
  return (
    <div className="overflow-x-auto">
      <Table striped>
        <TableHead className="text-lg">
          <TableRow>
            <TableHeadCell>ID</TableHeadCell>
            <TableHeadCell>Balance</TableHeadCell>
            <TableHeadCell>Opening Balance</TableHeadCell>
            <TableHeadCell>Closing Balance</TableHeadCell>
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
              <TableCell>{row.balance}</TableCell>
              <TableCell>{row.openingBalance}</TableCell>
              <TableCell>{row.closingBalance}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}