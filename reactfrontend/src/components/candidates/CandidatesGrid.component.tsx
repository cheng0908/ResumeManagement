import { Box } from "@mui/material";
import "./candidates-grid.scss";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ICandidate } from "../../types/global.typing";
import { PictureAsPdfRounded } from "@mui/icons-material";
import { baseUrl } from "../../constants/url.constant";

const column: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "firstName", headerName: "First Name", width: 120 },
  { field: "lastName", headerName: "Last Name", width: 120 },
  { field: "email", headerName: "Email", width: 150 },
  { field: "phone", headerName: "Phone", width: 150 },
  { field: "coverLetter", headerName: "Cover Letter", width: 400 },
  {
    field: "resumeUrl",
    headerName: "Download",
    width: 150,
    renderCell: (params) => (
      <a href={`${baseUrl}Candidate/download/${params.row.resumeUrl}`}>
        <PictureAsPdfRounded />
      </a>
    ),
  },
];

interface ICandidateGridProps {
  data: ICandidate[];
}

const CandidatesGrid = ({ data }: ICandidateGridProps) => {
  return (
    <Box className="candidates-grid">
      <DataGrid
        rows={data}
        columns={column}
        getRowId={(row) => row.id}
        rowHeight={50}
      ></DataGrid>
    </Box>
  );
};

export default CandidatesGrid;
