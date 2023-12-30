import { Box } from "@mui/material";
import "./jobs-grid.scss";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import { IJob } from "../../types/global.typing";

const column: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "title", headerName: "Title", width: 500 },
  { field: "level", headerName: "Level", width: 150 },
  { field: "companyName", headerName: "Company Name", width: 150 },
  {
    field: "createdAt",
    headerName: "Creation Time",
    width: 150,
    renderCell: (params) => moment(params.row.createdAt).fromNow(),
  },
];

interface IJobGridProps {
  data: IJob[];
}

const JobsGrid = ({ data }: IJobGridProps) => {
  return (
    <Box className="jobs-grid">
      <DataGrid
        rows={data}
        columns={column}
        getRowId={(row) => row.id}
        rowHeight={50}
      ></DataGrid>
    </Box>
  );
};

export default JobsGrid;
