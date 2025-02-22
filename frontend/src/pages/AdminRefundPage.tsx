import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { showMsgAlert } from "../utils/alert";
import { InputText } from "primereact/inputtext";
import { getData, postOrPatchTextForm } from "../api/api";
import { Button } from "primereact/button";
import { RefundTransactionItem } from "../utils/models";



interface ColumnMeta {
  field: string;
  header: string;
}

export default function AdminRefundPage() {
  const [transactions, setTransactions] = useState<RefundTransactionItem[] | null>([]);
  const [searchWord, setSearchWord] = useState("");

  const columns: ColumnMeta[] = [
    { field: "id", header: "Id" },
    { field: "transaction_id", header: "Transaction_id" },
    { field: "refund_related_id", header: "Refund_related_id" },
    { field: "type", header: "Type" },
    { field: "user_id", header: "User_id" },
    { field: "class_id", header: "Class_id" },
    { field: "credit", header: "Credit" },
    { field: "action", header: "Action" },
  ];


  const onEdit = async (transaction: RefundTransactionItem) => {
    let result = await postOrPatchTextForm("PUT", "api/admin/transactions", { user_id: transaction.user_id, class_id: transaction.class_id })
    if (result.success) {
      showMsgAlert("success", result.msg)
      setSearchWord("");
      await getTransactions(transaction.transaction_id)
    }
  };

  async function getTransactions(keyword?: string) {
    let path;

    if (keyword) {
      path = `api/admin/transactions?keyword=${keyword}`;
    } else {
      path = `api/admin/transactions`;
    }
    let result = await getData(path);

    if (result.success) {
      setTransactions(result.data);
    }
  }

  async function searchTransaction(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchWord(e.target.value);
    await getTransactions(e.target.value);
  }

  useEffect(() => {
    getTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="card flex justify-content-center">
        <InputText
          value={searchWord}
          placeholder="Search by transaction id"
          onChange={(e) => searchTransaction(e)}
        />
      </div>

      <div className="card p-fluid">
        {transactions && transactions.length > 0 && (
          <DataTable
            paginator
            rows={25}
            rowsPerPageOptions={[5, 10, 25, 50]}
            value={transactions}
            editMode="cell"
            tableStyle={{ minWidth: "50rem" }}
          >
            {columns.map(({ field, header }) => {
              return field === "action" ? (
                <Column
                  key={field}
                  body={(rowData) => (
                    <Button
                      label="Refund"
                      onClick={() => onEdit(rowData)}
                    />
                  )}
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
