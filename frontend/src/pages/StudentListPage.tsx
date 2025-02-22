import { Button, Table } from "react-bootstrap";
import styles from "../css/transaction.module.css";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { showMsgAlert } from "../utils/alert";
import { getData } from "../api/api";

interface Student {
  email: string,
  phone: string,
  name: string,
  id: number
}



function StudentListPage() {
  const { id } = useParams<{ id: string }>();
  const classId = parseInt(id);
  const [activeStudent, setActiveStudent] = useState<Student[]>([])
  const [inactiveStudent, setInactiveStudent] = useState<Student[]>([])

  const getStudentList = async () => {
    let result = await getData(`api/student/list?class_id=${classId}`)
    if (result.success) {
      setActiveStudent(result.data.activeStudent)
      setInactiveStudent(result.data.inactiveStudent)
    }
  }

  useEffect(() => { getStudentList() },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [])



  const copyToClipboard = async (textToCopy: string) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      showMsgAlert("success", 'copy success')
    } catch (err) {
      showMsgAlert("success", "fail to copy")
    }
  }



  const copyAllEmail = async () => {
    if (activeStudent.length < 1) {
      return
    } else if (activeStudent.length === 1) {
      await copyToClipboard(activeStudent[0].email)
    } else {
      let allEmail = ""
      for (let student of activeStudent) {
        allEmail += student.email + ","
      }
      allEmail = allEmail.slice(0, -1)
      await copyToClipboard(allEmail)

    }
  }
  const copyAllPhone = async () => {
    if (activeStudent.length < 1) {
      return
    } else if (activeStudent.length === 1) {
      await copyToClipboard(activeStudent[0].phone)
    } else {
      let allPhone = ""
      for (let student of activeStudent) {
        allPhone += student.phone + ","
      }
      allPhone = allPhone.slice(0, -1)
      await copyToClipboard(allPhone)

    }
  }

  return <div style={{ height: "100vh" }}>
    <div className="container">
      <div className="row">
        <div className="col">
          <h2 className={styles.pageTitle}>Student List</h2>
        </div>
      </div>
    </div>
    <h4 style={{
      marginLeft: "1rem"
    }}>Active Student</h4>
    <div className={styles.flex}>
      <Button className={styles.btnColor} onClick={copyAllPhone
      }>Copy All Phone</Button>
      <Button className={styles.btnColor}
        onClick={copyAllEmail}>Copy All Email</Button>
    </div>
    <div className="container">
      <div className="row">
        <div className="col">
          <Table className={styles.myTable} responsive="md">
            <thead>
              <tr>
                <th className={styles.tableTitle}>No.</th>
                <th className={styles.tableTitle}>Account Name</th>
                <th className={styles.tableTitle}>Email</th>
                <th className={styles.tableTitle}>Phone</th>
              </tr>
            </thead>
            <tbody>
              {activeStudent &&
                activeStudent.map((student, index) => {
                  return (
                    <tr key={student.id}>
                      <td className={styles.tableItem}>
                        {index + 1}
                      </td>
                      <td className={styles.tableItem}>{student.name}</td>
                      <td className={styles.tableItem}>{student.email}</td>
                      <td className={styles.tableItem}>{student.phone}</td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
    {inactiveStudent.length > 0 && <div>   <h4 style={{
      marginLeft: "1rem",
      marginTop: "2rem"

    }}>Inactive Student</h4>
      <div className="container">
        <div className="row">
          <div className="col">
            <Table className={styles.myTable} responsive="md">
              <thead>
                <tr>
                  <th className={styles.tableTitle}>No.</th>
                  <th className={styles.tableTitle}>Account Name</th>
                  <th className={styles.tableTitle}>Email</th>
                  <th className={styles.tableTitle}>Phone</th>
                </tr>
              </thead>
              <tbody>
                {inactiveStudent.map((student, index) => {
                  return (
                    <tr key={student.id}>
                      <td className={styles.tableItem}>
                        {index + 1}
                      </td>
                      <td className={styles.tableItem}>{student.name}</td>
                      <td className={styles.tableItem}>{student.email}</td>
                      <td className={styles.tableItem}>{student.phone}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </div>
      </div></div>}


  </div>
}

export default StudentListPage;
