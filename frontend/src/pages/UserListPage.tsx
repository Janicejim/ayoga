import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column, ColumnEvent, ColumnEditorOptions } from "primereact/column";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { fetchEditUserRole, fetchUserList } from "../api/admin";
import { showMsgAlert } from "../utils/alert";
import { InputText } from "primereact/inputtext";
import { REACT_APP_UPLOAD_IMAGE } from "../utils/config";

interface User {
  id: number;
  name: string;
  role: string;
  icon: string;
  email: string;
  phone: string;
}

interface ColumnMeta {
  field: string;
  header: string;
}

export default function UserListPage() {
  const [users, setUsers] = useState<User[] | null>([]);
  const [searchWord, setSearchWord] = useState("");

  const columns: ColumnMeta[] = [
    { field: "icon", header: "Icon" },
    { field: "name", header: "Name" },
    { field: "email", header: "Email" },
    { field: "phone", header: "Phone" },
    { field: "role", header: "Role" },
  ];
  const roles = [{ name: "user" }, { name: "teacher" }, { name: "admin" }];

  const imageBodyTemplate = (user: User) => {
    if (user.icon) {
      return (
        <img
          style={{ width: "3.5rem", height: "3rem", borderRadius: "100%" }}
          src={`${REACT_APP_UPLOAD_IMAGE}/${user.icon}`}
          alt="user icon"
          className="w-6rem shadow-2 border-round"
        />
      );
    } else {
      return (
        <img
          style={{ width: "4rem", height: "3rem" }}
          src={`${REACT_APP_UPLOAD_IMAGE}/default.jpeg`}
          alt="user icon"
          className="w-6rem shadow-2 border-round"
        />
      );
    }
  };

  const onCellEditComplete = async (e: ColumnEvent) => {
    let { rowData, newValue, field } = e;
    if (newValue.trim().length > 0) rowData[field] = newValue;
    let result = await fetchEditUserRole(rowData.id, newValue);
    if (result.success) {
      showMsgAlert("success", result.msg);
    } else {
      showMsgAlert("error", result.msg);
    }
  };

  const cellEditor = (options: ColumnEditorOptions) => {
    return selectEditor(options);
  };

  const selectEditor = (options: ColumnEditorOptions) => {
    return (
      <Dropdown
        value={options.value}
        onChange={
          (e: DropdownChangeEvent) =>
            options.editorCallback!(e.target.value.name)
          //   console.log(e.target.value.name)
        }
        options={roles}
        optionLabel="name"
        placeholder="Select A Role"
        className="w-full md:w-14rem"
      />
    );
  };

  async function getUserList(keyword?: string) {
    let result = await fetchUserList(keyword);
    if (result.success) {
      setUsers(result.data);
    }
  }

  async function searchUser(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchWord(e.target.value);
    await getUserList(e.target.value);
  }

  useEffect(() => {
    getUserList();
  }, []);

  return (
    <div>
      <div className="card flex justify-content-center">
        <InputText
          value={searchWord}
          placeholder="Search by email or name"
          onChange={(e) => searchUser(e)}
        />
      </div>

      <div className="card p-fluid">
        {users && users.length > 0 && (
          <DataTable
            paginator
            rows={25}
            rowsPerPageOptions={[5, 10, 25, 50]}
            value={users}
            editMode="cell"
            tableStyle={{ minWidth: "50rem" }}
          >
            {columns.map(({ field, header }) => {
              return field === "role" ? (
                <Column
                  key={field}
                  field={field}
                  header={header}
                  style={{ width: "25%", backgroundColor: "lightblue" }}
                  editor={(options) => cellEditor(options)}
                  onCellEditComplete={onCellEditComplete}
                />
              ) : field === "icon" ? (
                <Column
                  key={field}
                  field={field}
                  header={header}
                  body={imageBodyTemplate}
                  style={{ width: "25%" }}
                />
              ) : (
                <Column
                  key={field}
                  field={field}
                  header={header}
                  style={{ width: "25%" }}
                />
              );
            })}
          </DataTable>
        )}
      </div>
    </div>
  );
}
