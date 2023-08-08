import axios from "axios";

export interface reportData {
  store_id: number,
  uptime_last_hour: number,
  uptime_last_day: number,
  uptime_last_week: number,
  downtime_last_hour: number,
  downtime_last_day: number,
  downtime_last_week: number,
}

export async function triggerReport() {
  try {
    const response = await axios.get("http://localhost:5000/trigger_report");
    return response.data.report_id
  } catch (error) {
    return error;
  }
}

export async function getReport(report_id: number) {
  try {
    const response = await axios.get("http://localhost:5000/get_report",{ params: {
      report_id: report_id
    }});
    return {status: response.data.status, report: response.data.report};
  } catch (error) {
    return error;
  }
}
