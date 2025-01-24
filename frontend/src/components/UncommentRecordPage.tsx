import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import {
  fetchUncommentRecord,
  sendEmailToUncommentStudents,
} from "../api/admin";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import moment from "moment";
import { showMsgAlert } from "../utils/alert";

interface UncommentRecord {
  class_name: string;
  student_name: string;
  email: string;
  date: string;
}

function UncommentRecordPage() {
  const [recordNumber, setRecordNumber] = useState<number>(0);
  const [uncommentRecords, setUncommentRecords] = useState<UncommentRecord[]>(
    []
  );
  const columns = [
    { field: "class_name", header: "Class Name" },
    { field: "student_name", header: "Student Name" },
    { field: "email", header: "Student Email" },
    { field: "date", header: "Class Start Date" },
  ];

  async function getUncommentRecords() {
    let result = await fetchUncommentRecord();
    let records: UncommentRecord[] = result.data;

    let mappedData = records.map((record) => {
      return {
        class_name: record.class_name,
        student_name: record.student_name,
        email: record.email,
        date: moment(record.date).format("LLL"),
      };
    });

    setUncommentRecords(mappedData);
    setRecordNumber(result.data.length);
  }

  async function sendEmailToStudents() {
    let result = await sendEmailToUncommentStudents();
    if (result.success) {
      showMsgAlert("success", result.msg);
    } else {
      showMsgAlert("error", result.msg);
    }
  }

  useEffect(() => {
    getUncommentRecords();
  }, []);

  return (
    <div>
      <h3 className="d-flex justify-content-center">
        Number of uncomment Record:{recordNumber}
      </h3>
      <div className="d-flex justify-content-center">
        <Button
          className="btn-warning"
          onClick={() => sendEmailToStudents()}
          style={{ marginTop: "1rem", marginBottom: "1rem" }}
        >
          Send Email For All Uncomment Students
        </Button>
      </div>

      <DataTable
        paginator
        rows={25}
        rowsPerPageOptions={[5, 10, 25, 50]}
        value={uncommentRecords}
        editMode="cell"
        tableStyle={{ minWidth: "50rem" }}
      >
        {columns.map(({ field, header }) => {
          return (
            <Column
              key={field}
              field={field}
              header={header}
              style={{ width: "25%" }}
            />
          );
        })}
      </DataTable>
    </div>
  );
}
export default UncommentRecordPage;
