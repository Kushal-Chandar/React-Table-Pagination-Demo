"use client";

import * as React from "react";
import Button from "@mui/material/Button";
import { triggerReport } from "@/app/apis";

export default function RefreshButton(props: {
  setReportId;
  fetchRowData;
  status;
}) {
  const handleClick = async () => {
    if (props.status !== "Running") {
      props.setReportId(await triggerReport());
    }
    props.fetchRowData();
    console.log(props.status + "Hello");
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div>
        <Button variant="outlined" onClick={handleClick}>
          Refresh
        </Button>
      </div>
      <div>{props.status}</div>
    </div>
  );
}
