import React from "react";
// Components
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

function createData(
  name: string,
  role: string,
  status: boolean,
) {
  return { name, role, status, };
};

// TODO: Replace with dynamic data
const roles = {
  owner: "Owner",
  admin: "Admin",
  editor: "Editor",
  viewer: "Viewer",
  guest: "Guest",
};

// TODO: Replace with dynamic data
const rows = [
  createData("Peggy Olson", roles.owner, true),
  createData("Don Draper", roles.admin, true),
  createData("Roger Sterling", roles.editor, false),
  createData("Joan Holloway", roles.viewer, true),
  createData("Betty Draper", roles.guest, false),
];

export default function TeamTable() {
  return (
    <TableContainer
      className="
        border
        border-neutral-300
        rounded-md
      "
    >
      <Table
        sx={{ minWidth: 650 }}
        aria-label="team table"
      >
        <TableHead
          className="bg-neutral-50"
        >
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell
                component="th"
                scope="row"
                className="
                  flex
                  flex-row
                  justify-start
                  items-center
                  gap-4
                "
              >
                <Avatar
                  sx={{ width: 30, height: 30 }}
                  src="/images/peggy.png"
                >
                  PO
                </Avatar>
                {row.name}
              </TableCell>
              <TableCell>
                {row.role}
              </TableCell>
              <TableCell>
                {row.status ? 
                  <Typography
                    variant="body2"
                    className="text-green-700"
                  >
                    Active
                  </Typography>
                : 
                  <Typography
                    variant="body2"
                    className="text-red-700"
                  >
                    Pending
                  </Typography>
                }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};