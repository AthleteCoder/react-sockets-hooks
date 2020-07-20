import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Search from "./Search/Search";
import { Button } from "@material-ui/core";
export default function DynTable({ headers, rows, newItem, searchBy }) {
  const [filtered, setFiltered] = useState(rows);
  useEffect(() => {
    setFiltered(rows);
  }, [rows]);
  const searchChanged = (search) => {
    setFiltered(
      rows.filter((item) =>
        item[searchBy].toLowerCase().includes(search.toLowerCase())
      )
    );
  };
  return (
    <TableContainer component={Paper}>
      <Search newItem={newItem} onSearchChange={searchChanged} />
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {headers.map((header, i) => (
              <TableCell width="20%" key={i}>
                {header.name}
              </TableCell>
            ))}
            <TableCell width="20%">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered.map((row, i) => (
            <TableRow key={i}>
              {headers.map((header, j) => (
                <TableCell key={j + i}>{row[header.prop]}</TableCell>
              ))}
              <TableCell>
                <Button variant="outlined" color="primary">
                  Join
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
