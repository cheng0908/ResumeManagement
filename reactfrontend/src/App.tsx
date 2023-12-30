import { useContext, lazy, Suspense } from "react";
import { ThemeContext } from "./context/theme.context";
import Navbar from "./components/navbar/Navbar.component";
import { Route, Routes } from "react-router-dom";
import CustomeLinearProgress from "./custome-linear-progress/CustomeLinearProgress.component";

// Import with Lazy loading
const Home = lazy(() => import("./pages/home/Home.page"));
const Companies = lazy(() => import("./pages/companies/Companies.page"));
const AddCompany = lazy(() => import("./pages/companies/AddCompany.page"));

const Jobs = lazy(() => import("./pages/jobs/Jobs.page"));
const AddJob = lazy(() => import("./pages/jobs/AddJob.page"));
const Candidates = lazy(() => import("./pages/candidates/Candidates.page"));
const AddCandidate = lazy(() => import("./pages/candidates/AddCandidate.page"));

const App = () => {
  const { darkmode } = useContext(ThemeContext);
  //   console.log(themeContext);
  const appStyles = darkmode ? "app dark" : "app";
  return (
    <div className={appStyles}>
      <Navbar />
      <div className="wrapper">
        <Suspense fallback={<CustomeLinearProgress />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/companies">
              <Route index element={<Companies />} />
              <Route path="add" element={<AddCompany />} />
            </Route>
            <Route path="/jobs">
              <Route index element={<Jobs />} />
              <Route path="add" element={<AddJob />} />
            </Route>
            <Route path="/candidates">
              <Route index element={<Candidates />} />
              <Route path="add" element={<AddCandidate />} />
            </Route>
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};

export default App;
