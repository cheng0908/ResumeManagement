import { useEffect, useState } from "react";
import { IJob, ICreateCandidateDto } from "../../types/global.typing";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import httpModule from "../../helpers/http.module";
import InputFileUpload from "../../components/candidates/InputFileUpload.component";
//import { error } from "console";
import "./candidates.scss";

const AddCandidate = () => {
  const [candidate, setCandidates] = useState<ICreateCandidateDto>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    coverLetter: "",
    jobId: "",
  });

  const [jobs, setJobs] = useState<IJob[]>([]);
  const [pdfFile, setPdfFile] = useState<File | null>();
  const handleFileChange = (file: File | null) => {
    setPdfFile(file);
  };
  const redirect = useNavigate();

  useEffect(() => {
    httpModule
      .get<IJob[]>("/Job/Get")
      .then((reponse) => {
        setJobs(reponse.data);
      })
      .catch((error) => {
        alert("Error");
        console.log(error);
      });
  }, []);

  const handleClickSaveBtn = () => {
    if (
      candidate.firstName === "" ||
      candidate.lastName === "" ||
      candidate.email === "" ||
      candidate.phone === "" ||
      candidate.coverLetter === "" ||
      candidate.jobId === "" ||
      !pdfFile
    ) {
      alert("Please fill all fields");
      return;
    }
    const newCandidatesFormData = new FormData();
    newCandidatesFormData.append("firstName", candidate.firstName);
    newCandidatesFormData.append("lastName", candidate.lastName);
    newCandidatesFormData.append("email", candidate.email);
    newCandidatesFormData.append("phone", candidate.phone);
    newCandidatesFormData.append("jobId", candidate.jobId);
    newCandidatesFormData.append("coverLetter", candidate.coverLetter);
    newCandidatesFormData.append("pdfFile", pdfFile);
    // console.log(newCandidatesFormData);
    httpModule
      .post("/Candidate/Create", newCandidatesFormData)
      .then((response) => redirect("/candidates"))
      .catch((error) => console.log(error));
  };
  const handleClickBackBtn = () => {
    redirect("/candidates");
  };

  return (
    <div className="content">
      <div className="add-candidates">
        <h2>Add New Candidate</h2>
        <FormControl fullWidth>
          <InputLabel>Job</InputLabel>
          <Select
            value={candidate.jobId}
            label="Job"
            onChange={(e) =>
              setCandidates({ ...candidate, jobId: e.target.value })
            }
          >
            {jobs.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          autoComplete="off"
          label="First Name"
          variant="outlined"
          value={candidate.firstName}
          onChange={(e) =>
            setCandidates({ ...candidate, firstName: e.target.value })
          }
        />
        <TextField
          autoComplete="off"
          label="Last Name"
          variant="outlined"
          value={candidate.lastName}
          onChange={(e) =>
            setCandidates({ ...candidate, lastName: e.target.value })
          }
        />
        <TextField
          autoComplete="off"
          label="Email"
          variant="outlined"
          value={candidate.email}
          onChange={(e) =>
            setCandidates({ ...candidate, email: e.target.value })
          }
        />
        <TextField
          autoComplete="off"
          label="Phone"
          variant="outlined"
          value={candidate.phone}
          onChange={(e) =>
            setCandidates({ ...candidate, phone: e.target.value })
          }
        />
        <TextField
          multiline
          autoComplete="off"
          label="Cover Letter"
          variant="outlined"
          value={candidate.coverLetter}
          onChange={(e) =>
            setCandidates({ ...candidate, coverLetter: e.target.value })
          }
        />

        <Box>
          <InputFileUpload onFileChange={handleFileChange} />
        </Box>
        {/*<input*/}
        {/*  type="file"*/}
        {/*  onChange={(event) =>*/}
        {/*    setPdfFile(event.target.files ? event.target.files[0] : null)*/}
        {/*  }*/}
        {/*/>*/}
        <div className="btns">
          <Button
            variant="outlined"
            color="primary"
            onClick={handleClickSaveBtn}
          >
            Save
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleClickBackBtn}
          >
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddCandidate;
