import React, { useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import useGlobalState from "./Context";
import { Button } from "@material-ui/core";
import Header from "./Header";
import { useHistory } from "react-router";
import { customAlert, DTConvert } from "./common";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import TextField from "@material-ui/core/TextField";

const ReportTable = () => {
  const [state, dispatch] = useGlobalState();
  const history = useHistory();
  const [searchItem, setSearch] = useState("");

  const download = (key) => {
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";

    const fileName = state.assignment_array[key].name + "_report";
    var csvData = [];
    var row = {};
    state.student_database.map((student, key1) => {
      student.answers_array.map((assignment, key2) => {
        if (assignment.id == key) {
          row = {
            id: student.id,
          };
          assignment.ans.map((i, k) => {
            const q = i.ques;
            if (i.qtype == 1 || i.qtype == 4) {
              row = { ...row, [q]: i.ans };
            } else if (i.qtype == 2 || i.qtype == 3) {
              var str = "";
              i.ans.map((op, ke) => {
                str = str + String(op) + " ";
              });
              row = { ...row, [q]: str };
            } else if (i.qtype == 5) {
              var temp = DTConvert(i.ans)
              row = { ...row, [q]: temp}
            }
          });
          csvData.push(row);
        }
      });
    });

    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  const toHome = () => {
    history.push("/home");
  };

  return (
    <>
      <Header />
      <div className="page-paddings">
        <h2 style={{ textAlign: "center" }}>Reports</h2>
        <TextField
          id="outlined-basic"
          variant="outlined"
          label="Search Name"
          className="searchbar"
          onChange={(e) => setSearch(e.target.value)}
        />
        <TableContainer
          component={Paper}
          style={{
            marginTop: "30px",
            width: "max",
            backgroundColor: "#e6f9ff",
          }}
        >
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Subject</TableCell>
                <TableCell>Marks</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {state.assignment_array == ""
                ? customAlert(
                    "No Assignments",
                    "No assignments to view answers of"
                  )
                : state.assignment_array.map((item, key) => {
                    if (item.published) {
                      if (
                        searchItem !== "" &&
                        item.name
                          .toLowerCase()
                          .indexOf(searchItem.toLowerCase()) === -1
                      ) {
                        return null;
                      }
                      return (
                        <TableRow key={key}>
                          <TableCell component="th" scope="row">
                            {key + 1}
                          </TableCell>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>{item.subject}</TableCell>
                          <TableCell>{item.marks}</TableCell>
                          <TableCell className="btw-full">
                            <Button
                              color="primary"
                              onClick={() => download(key)}
                            >
                              Download
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    } else {
                      return null;
                    }
                  })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className="btn-cntr">
        <Button
          variant="contained"
          color="primary"
          onClick={() => toHome()}
          className="btw-full"
        >
          Home
        </Button>
      </div>
    </>
  );
};

export default ReportTable;
