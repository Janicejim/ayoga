import { Button, Table } from "react-bootstrap";
import styles from "../css/Transaction.module.css";
import { useParams } from "react-router";
import { fetchStudentList } from "../api/teacher";
import { useEffect, useState } from "react";

interface Student {
  email: string,
  phone: string,
  name: string,
  id: number
}



function StudentList() {
  const { id } = useParams<{ id: string }>();
  const classId = parseInt(id);
  const [activeStudent, setActiveStudent] = useState<Student[]>([])
  const [inactiveStudent, setInactiveStudent] = useState<Student[]>([])

  const getStudentList = async () => {
    let result = await fetchStudentList(classId)
    if (result.success) {
      setActiveStudent(result.data.activeStudent)
      setInactiveStudent(result.data.inactiveStudent)
    }
  }

  useEffect(() => { getStudentList() }, [])



  const copyToClipboard = async (textToCopy: string) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      alert("copy success")
    } catch (err) {
      alert("fail to copy")
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

  return <div>
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
    <Button style={{
      margin: "1rem"
    }} onClick={copyAllPhone
    }>Copy All Phone</Button>
    <Button style={{
      margin: "1rem"

    }} onClick={copyAllEmail}>Copy All Email</Button>
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
      marginLeft: "1rem"

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
      </div></div>}


  </div>
}

export default StudentList;
