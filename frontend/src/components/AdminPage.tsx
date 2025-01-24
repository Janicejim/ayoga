import React, { useRef, useState } from "react";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";
import Packages from "./Packages";
import { AiGame } from "./AIgame/AI_game";
import UserListPage from "./UserListPage";
import TeacherRequestPage from "./TeacherRequestPage";
import UncommentRecordPage from "./UncommentRecordPage";

export default function AdminPage() {
  // const toast = useRef<Toast>(null);
  const [currentPage, setCurrentPage] = useState<string>("teacher_request");
  const items: MenuItem[] = [
    {
      label: "Fin",
      items: [
        {
          label: "Company",
          icon: "pi pi-building-columns",
          command: () => changePageComponent("packages"),
        },
        {
          label: "All",
          icon: "pi pi-chart-line",
          command: () => changePageComponent("ai_game"),
        },
      ],
    },
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
        {currentPage === "packages" && <Packages />}
        {currentPage === "ai_game" && <AiGame />}
        {currentPage === "user_list" && <UserListPage />}
        {currentPage === "teacher_request" && <TeacherRequestPage />}
        {currentPage === "uncomment_record" && <UncommentRecordPage />}
      </div>
    </div>
  );
}
