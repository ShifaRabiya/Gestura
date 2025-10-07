import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";

// ---------------- Styled Components ----------------
const Container = styled.div`
  display: flex;
  min-height: 100vh;
  font-family: 'Lexend', sans-serif;
`;

const Sidebar = styled.aside`
  width: 16rem;
  background-color: #fff;
  border-right: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
`;

const Logo = styled.h1`
  padding: 1.5rem;
  font-family: 'Fredoka', cursive;
  font-weight: 700;
  font-size: 2.5rem;
  gap: 0.1rem;
  text-shadow: -1px -1px 0 rgba(255,255,255,0.6),
    1px -1px 0 rgba(255,255,255,0.6),
    -1px 1px 0 rgba(255,255,255,0.6),
    1px 1px 0 rgba(255,255,255,0.6),
    2px 4px 6px rgba(0,0,0,0.3);
`;

const Role = styled.p`
  padding: 0 1.5rem 1.5rem;
  font-size: 0.875rem;
  color: #6b7280;
`;

const Nav = styled.nav`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
`;

const NavLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  margin-bottom: 0.25rem;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.875rem;
  color: ${(props) => (props.active ? "#fff" : "#374151")};
  background-color: ${(props) => (props.active ? "#389cfa" : "transparent")};
  &:hover {
    background-color: ${(props) => (props.active ? "#389cfa" : "#e0f2fe")};
  }
`;

const Main = styled.main`
  flex: 1;
  background-color: #ebf5ff;
  padding: 2rem;
`;

const Header = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
`;

const Tabs = styled.div`
  display: flex;
  border-bottom: 2px solid #e5e7eb;
  margin-bottom: 1.5rem;
`;

const Tab = styled.a`
  margin-right: 2rem;
  padding-bottom: 0.5rem;
  font-weight: 500;
  font-size: 0.875rem;
  color: ${(props) => (props.active ? "#389cfa" : "#6b7280")};
  border-bottom: 2px solid ${(props) => (props.active ? "#389cfa" : "transparent")};
  text-decoration: none;
  cursor: pointer;
`;

const SearchWrapper = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.5rem 0.75rem 0.5rem 2.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  &:focus {
    outline: none;
    border-color: #389cfa;
    box-shadow: 0 0 0 1px #389cfa;
  }
`;

const TableWrapper = styled.div`
  background-color: #fff;
  border-radius: 0.75rem;
  overflow: hidden;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  text-align: left;
  padding: 0.75rem 1.5rem;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  color: #6b7280;
  border-bottom: 1px solid #e5e7eb;
`;

const Td = styled.td`
  padding: 0.75rem 1.5rem;
  font-size: 0.875rem;
  color: #374151;
  border-bottom: 1px solid #e5e7eb;
`;

const Avatar = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 9999px;
  margin-right: 0.75rem;
`;

const ActionLink = styled.a`
  color: #389cfa;
  text-decoration: none;
  &:hover {
    color: #1d6fe1;
  }
`;

const Form = styled.form`
  background: #fff;
  padding: 2rem;
  border-radius: 0.75rem;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 4px rgba(0,0,0,0.05);
  max-width: 600px;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  &:focus {
    outline: none;
    border-color: #389cfa;
    box-shadow: 0 0 0 1px #389cfa;
  }
`;

const SubmitButton = styled.button`
  background: #389cfa;
  color: #fff;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  &:hover {
    background: #1d6fe1;
  }
`;

// ---------------- Sample Data ----------------
const initialStudents = [
  {
    name: "Sophia Clark",
    age: "7 years",
    level: "Level 3",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuA3X15ZK5mIBQ5jptcxUMNZDvaKiDLM0t9V67IbuVXfkeQa7K8gpQcuFEvtsQXODnQiaB9XwOTSQ7UbTfZz8n24HXWDhWYoTEifam3dgZoacAr72YNBE1NpWtr46X5ocvp9ZfGjp2pK9z8TX1LHFF77dzqNV56jrsfJhg6U7teb870WvmlyMju6c6peCTxVkq6fXGK-W_RTlU8ICJM2rP1jPE_4JQZTHIKPG1smccBL93o6H3XIDvG0osMCjTj0-dO063XuwGlWwItd",
  },
  {
    name: "Ethan Carter",
    age: "9 years",
    level: "Level 5",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDfj2YwaKfpQd2yZPhdZ_HY1ANZZ5YREbLrieaNO_LfpXgRTg6EEJIXtV-p2uVD_dDBmuJvliQvPiWJuILuGyMckkAtGmEZgtrnrujc71rYLw-mNffXD_iT2YIW0nrmVb5WH73WT0Z3PBEJEbde0srXkgovcjTMGa0G9U7f0HgPteIoqLpbebOplVTOr1AoueDGKa_tew-TPLALhPZsEqjePD9SLEsntmLKw0aefZ-OLw7C-dezPcqPlCZOq68ywqlc5T98N0Ir6SXb",
  },
  {
    name: "Olivia Bennett",
    age: "6 years",
    level: "Level 2",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4UNA9CHQtmQTiI8eYsjrOJ1h6CZs83WpKdG3p9hh4aPOZuvXviH8PBj7sKQHDxWQmvfcqX3RaZD0cPi7_dhw-sAC6CzCBI3kFN8FLBR8AC8XbfUUOoavgOa4O7AM1u7L-6lYCpWLqhqSHwec1beZO2YrAaJ3fjFK_DW5bHjOxeVV3N856-H0RBXs7OcRf74Fxv5zqb-WIPZ3--5EN6WeT8XFp4g2DtfN09FT3yrqTV3qsM0h42MMJom-cwz27_OUmE3cRKZnX-QxT",
  },
];

// ---------------- Main Component ----------------
// Add to TeacherDashboard component
export default function TeacherDashboard() {
  const [students, setStudents] = useState(initialStudents);
  const [activeTab, setActiveTab] = useState("view"); // "view" or "add"
  const [activeSidebar, setActiveSidebar] = useState("students"); // "students" or "reports"
  const [newStudent, setNewStudent] = useState({
    name: "",
    photo: "",
    age: "",
    mentalAge: "",
    guardian: "",
    emergencyContact: "",
    studentId: "",
    grade: "",
    level: "",
  });
  const [reportFile, setReportFile] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewStudent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStudents((prev) => [...prev, newStudent]);
    setNewStudent({
      name: "",
      photo: "",
      age: "",
      mentalAge: "",
      guardian: "",
      emergencyContact: "",
      studentId: "",
      grade: "",
      level: "",
    });
    setActiveTab("view");
  };

  const handleReportUpload = (e) => {
    e.preventDefault();
    if (reportFile) {
      alert(`Report file "${reportFile.name}" uploaded successfully!`);
      setReportFile(null);
    }
  };

  return (
    <Container>
      <Sidebar>
        <Logo>
          <span style={{ color: "#FF0000" }}>G</span>
          <span style={{ color: "#FFFF00" }}>e</span>
          <span style={{ color: "#008000" }}>s</span>
          <span style={{ color: "#0000FF" }}>t</span>
          <span style={{ color: "#800080" }}>u</span>
          <span style={{ color: "#FFC0CB" }}>r</span>
          <span style={{ color: "#FFA500" }}>a</span>
        </Logo>
        <Role>Teacher</Role>
        <Nav>
          <NavLink
            href="#"
            active={activeSidebar === "students"}
            onClick={() => setActiveSidebar("students")}
          >
            Students
          </NavLink>
          <NavLink
            href="#"
            active={activeSidebar === "reports"}
            onClick={() => setActiveSidebar("reports")}
          >
            Reports
          </NavLink>
        </Nav>
      </Sidebar>

      <Main>
        {activeSidebar === "students" ? (
          <>
            <Header>Students</Header>
            <Tabs>
              <Tab active={activeTab === "view"} onClick={() => setActiveTab("view")}>
                View Student Details
              </Tab>
              <Tab active={activeTab === "add"} onClick={() => setActiveTab("add")}>
                Add New Student
              </Tab>
            </Tabs>

            {activeTab === "view" ? (
              <>
                <SearchWrapper>
                  <SearchInput placeholder="Search students" />
                </SearchWrapper>
                <TableWrapper>
                  <Table>
                    <thead>
                      <tr>
                        <Th>Student</Th>
                        <Th>Mental Age</Th>
                        <Th>Current Game Level</Th>
                        <Th>Actions</Th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map((student, index) => (
                        <tr key={index}>
                          <Td>
                            <div style={{ display: "flex", alignItems: "center" }}>
                              <Avatar src={student.photo || student.avatar || ""} />
                              <span>{student.name}</span>
                            </div>
                          </Td>
                          <Td>{student.mentalAge || student.age}</Td>
                          <Td>{student.level}</Td>
                          <Td>
                            <ActionLink as={Link} to="/view-details">View Details</ActionLink>
                          </Td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </TableWrapper>
              </>
            ) : (
              <Form onSubmit={handleSubmit}>
                {/* Student form fields as before */}
                <FormGroup>
                  <Label>Student Name</Label>
                  <Input name="name" value={newStudent.name} onChange={handleChange} required />
                </FormGroup>
                <FormGroup>
                  <Label>Student Photo</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setNewStudent((prev) => ({ ...prev, photo: e.target.files[0] }))
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Age</Label>
                  <Input name="age" value={newStudent.age} onChange={handleChange} required />
                </FormGroup>
                <FormGroup>
                  <Label>Mental Age</Label>
                  <Input name="mentalAge" value={newStudent.mentalAge} onChange={handleChange} required />
                </FormGroup>
                <FormGroup>
                  <Label>Guardian Name</Label>
                  <Input name="guardian" value={newStudent.guardian} onChange={handleChange} required />
                </FormGroup>
                <FormGroup>
                  <Label>Emergency Contact Number</Label>
                  <Input name="emergencyContact" value={newStudent.emergencyContact} onChange={handleChange} required />
                </FormGroup>
                <FormGroup>
                  <Label>Student ID</Label>
                  <Input name="studentId" value={newStudent.studentId} onChange={handleChange} required />
                </FormGroup>
                <FormGroup>
                  <Label>Grade</Label>
                  <Input name="grade" value={newStudent.grade} onChange={handleChange} required />
                </FormGroup>
                <FormGroup>
                  <Label>Game Level</Label>
                  <Input name="level" value={newStudent.level} onChange={handleChange} required />
                </FormGroup>
                <SubmitButton type="submit">Add Student</SubmitButton>
              </Form>
            )}
          </>
        ) : (
          <>
            <Header>Upload Report</Header>
            <Form onSubmit={handleReportUpload}>
              <FormGroup>
                <Label>Report File</Label>
                <Input
                  type="file"
                  onChange={(e) => setReportFile(e.target.files[0])}
                  required
                />
              </FormGroup>
              <SubmitButton type="submit">Upload Report</SubmitButton>
            </Form>
          </>
        )}
      </Main>
    </Container>
  );
}

