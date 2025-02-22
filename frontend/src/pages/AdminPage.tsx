import React, { useEffect, useState } from "react";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";
import UserListPage from "../pages/UserListPage";
import TeacherRequestPage from "./TeacherRequestPage";
import { Sidebar } from 'primereact/sidebar';
import { Button } from "primereact/button";
import AdminRefundPage from "./AdminRefundPage";
export default function AdminPage() {
  const [currentPage, setCurrentPage] = useState<string>("teacher_request");
  const [visible, setVisible] = useState(true);
  const [smallSizeMode, setSmallSizeMode] = useState(window.innerWidth > 800 ? false : true);

  const items: MenuItem[] = [
    {
      label: "User",
      items: [
        {
          label: "User List & Role Change",
          icon: "pi pi-users",
          command: () => changePageComponent("user_list"),
        },
      ],
    },
    {
      label: "Teacher",
      items: [
        {
          label: "Apply Request",
          icon: "pi pi-id-card",
          command: () => changePageComponent("teacher_request"),
        },
      ],
    },
    {
      label: "Complaint",
      items: [
        {
          label: "Transaction & Refund",
          icon: "pi pi-comments",
          command: () => changePageComponent("transaction_refund"),
        },
      ],
    },
  ];

  function changePageComponent(page: string) {
    setCurrentPage(page);
  }
  const handleResize = () => {
    if (window.innerWidth <= 800) {
      setVisible(false);
      setSmallSizeMode(true)
    } else {
      setVisible(true);
      setSmallSizeMode(false)
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="row">
      {smallSizeMode && <Button icon="pi pi-bars" onClick={() => setVisible(true)} />}
      <div className="d-flex">
        {smallSizeMode ? <>
          <Sidebar visible={visible} onHide={() => setVisible(false)}>
            <Menu model={items} style={{ width: "100%", height: "100vh" }} />
          </Sidebar></> : <Menu model={items} style={{ width: "300px", height: "100vh" }} />}
        {currentPage === "user_list" && <UserListPage />}
        {currentPage === "teacher_request" && <TeacherRequestPage />}
        {currentPage === "transaction_refund" && < AdminRefundPage />}
      </div>
    </div>
  );
}
