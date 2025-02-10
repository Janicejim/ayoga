import React, { useState } from "react";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";
import UserListPage from "../pages/UserListPage";
import TeacherRequestPage from "./TeacherRequestPage";
import UncommentRecordPage from "../pages/UncommentRecordPage";

export default function AdminPage() {
  // const toast = useRef<Toast>(null);
  const [currentPage, setCurrentPage] = useState<string>("teacher_request");
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
      label: "Comment",
      items: [
        {
          label: "Uncomment Record",
          icon: "pi pi-comments",
          command: () => changePageComponent("uncomment_record"),
        },
      ],
    },
  ];

  function changePageComponent(page: string) {
    setCurrentPage(page);
  }

  return (
    <div className="row">
      <div className="d-flex">
        <Menu model={items} style={{ width: "300px", height: "100vh" }} />
        {currentPage === "user_list" && <UserListPage />}
        {currentPage === "teacher_request" && <TeacherRequestPage />}
        {currentPage === "uncomment_record" && <UncommentRecordPage />}
      </div>
    </div>
  );
}
