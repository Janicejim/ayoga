import moment from "moment";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React from "react";
import { convertToTitleCase } from "../utils/convertTitle";
import { REACT_APP_UPLOAD_IMAGE } from "../utils/config";

interface Record {
  summaryData: any[];
  allRecordData: any;
  onDeleteRecord: (e: Event) => void;
}

export function PoseRecord(record: Record) {
  const summaryColumns = [
    { field: "image", header: "Image" },
    { field: "name", header: "Pose" },
    { field: "accuracy", header: "Time(s)" },
  ];

  const allDataColumns = [
    { field: "created_at", header: "Date" },
    { field: "name", header: "Pose" },
    { field: "accuracy", header: "Time(s)" },
  ];

  let formattedSummaryData;

  if (record.summaryData) {
    formattedSummaryData = record.summaryData.map((record) => {
      return {
        image: record.image,
        name: convertToTitleCase(record.name),
        accuracy: record.accuracy,
      };
    });
  }

  let formattedAllData;

  if (record.allRecordData) {
    formattedAllData = record.allRecordData.map((record: any) => {
      return {
        created_at: moment(record.created_at).format("LLL"),
        name: convertToTitleCase(record.name),
        accuracy: record.accuracy,
        id: record.id,
      };
    });
  }

  const imageBodyTemplate = (record: any) => {
    return (
      <img
        src={`${REACT_APP_UPLOAD_IMAGE}/assets/AiClassification/poses/${record.image}`}
        alt={record.image}
        className="w-1rem shadow-2 border-round"
        style={{ width: "5rem", height: "5rem" }}
      />
    );
  };

  const actionBodyTemplate = (rowData: any) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => record.onDeleteRecord(rowData.id)}
        />
      </React.Fragment>
    );
  };
  return (
    <div className="d-flex justify-content-center" style={{ flexWrap: "wrap" }}>
      <div className="card" style={{ width: "40rem" }}>
        <DataTable
          value={formattedSummaryData}
          tableStyle={{ minWidth: "20rem", maxWidth: "40rem" }}
        >
          {summaryColumns.map((column, index) =>
            column.field === "accuracy" ? (
              <Column
                key={index}
                field={column.field}
                header={column.header}
                sortable
                style={{ width: "33%" }}
              ></Column>
            ) : column.field === "image" ? (
              <Column
                key={index}
                field={column.field}
                body={imageBodyTemplate}
                style={{ width: "33%" }}
              ></Column>
            ) : (
              <Column
                key={index}
                field={column.field}
                header={column.header}
                style={{ width: "33%" }}
              ></Column>
            )
          )}
        </DataTable>
      </div>

      <div className="card" style={{ width: "40rem" }}>
        <DataTable
          value={formattedAllData}
          tableStyle={{ minWidth: "20rem", maxWidth: "40rem" }}
          paginator
          rows={10}
        >
          {allDataColumns.map((column, index) => (
            <Column
              key={index}
              field={column.field}
              header={column.header}
              sortable
              style={{ width: "33%" }}
            ></Column>
          ))}
          <Column
            body={actionBodyTemplate}
            exportable={false}
            style={{ minWidth: "33%" }}
          ></Column>
        </DataTable>
      </div>
    </div>
  );
}
