"use client";

import Table from "@/components/Table";
import RefreshButton from "@/components/RefreshButton";
import { getReport } from "@/app/apis";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { report } from "process";

export default function App() {
  const [rows, setRows] = useState([]);
  const [reportid, setReportId] = useState(100);
  const [status, setStatus] = useState("");

  const { data, refetch } = useQuery({
    queryKey: ["reportid", reportid],
    queryFn: () => getReport(reportid),
  });

  useEffect(() => {
    if (data) {
      if (data.report) {
        setRows(data.report);
        console.log("effect", data.report);
      }
      if (data.status) {
        console.log("effect " + data.status);
        setStatus(
          data.status == "Complete" ? new Date().toLocaleString() : data.status
        );
      }
    }
  }, [data]);

  console.log(reportid);
  return (
    <div className="flex flex-col items-center justify-center gap-y-2 m-2 w-full">
      <Table rowData={rows} />
      <RefreshButton
        setReportId={setReportId}
        fetchRowData={refetch}
        status={status}
      />
    </div>
  );
}
