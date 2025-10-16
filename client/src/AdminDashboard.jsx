import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

// ---------------- Styled Components ----------------
const Container = styled.div`
  display: flex;
  min-height: 100vh;
  font-family: 'Plus Jakarta Sans', sans-serif;
  background-color: #f0f8ff;
  @media (prefers-color-scheme: dark) {
    background-color: #101c22;
  }
`;

const Sidebar = styled.aside`
  width: 16rem;
  flex-shrink: 0;
  background-color: rgba(255, 255, 255, 1);
  border-right: 1px solid #f0f8ff;
  padding: 1.5rem 0;
  backdrop-filter: blur(12px);
  @media (prefers-color-scheme: dark) {
    background-color: rgba(16, 28, 34, 0.8);
    border-color: #101c22;
  }
`;

const Logo = styled.h1`
  padding: 1.5rem;
  font-weight: 800;
  font-size: 2.25rem;
  display: flex;
  gap: 0.1rem;
`;

const Nav = styled.nav`
  margin-top: 1.5rem;
  padding: 0 1rem;
`;

const NavItem = styled.a`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  color: ${(props) => (props.active ? "#111827" : "#6b7280")};
  background-color: ${(props) =>
    props.active ? "rgba(13,166,242,0.1)" : "transparent"};
  text-decoration: none;
  margin-bottom: 0.25rem;
  transition: all 0.2s;
  &:hover {
    background-color: rgba(13,166,242,0.1);
  }
`;

const Main = styled.main`
  flex: 1;
  padding: 2rem;
`;

const SectionContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-top: 2rem;
  @media(min-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Card = styled.div`
  background-color: white;
  dark-mode-bg: #101c22;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0px 10px 30px rgba(0,0,0,0.07);
  @media (prefers-color-scheme: dark) {
    background-color: rgba(16,28,34,0.5);
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #111827;
  @media (prefers-color-scheme: dark) {
    color: #f9fafb;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 0.75rem;
  border: 1px solid #d1d5db;
  background-color: #ffffff;
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(13,166,242,0.3);
  }
  @media (prefers-color-scheme: dark) {
    background-color: #1f2937;
    border-color: #374151;
    color: #f9fafb;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 0.75rem;
  border: 1px solid #d1d5db;
  background-color: #ffffff;
  cursor: pointer;
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(13,166,242,0.3);
  }
  @media (prefers-color-scheme: dark) {
    background-color: #1f2937;
    border-color: #374151;
    color: #f9fafb;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  border-radius: 0.75rem;
  font-weight: bold;
  background-color: #0da6f2;
  color: white;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    background-color: #0b8ac9;
  }
  &:disabled {
    background-color: #cbd5e1;
    cursor: not-allowed;
  }
`;

const SuccessMessage = styled.div`
  background: #d1fae5;
  border: 1px solid #a7f3d0;
  color: #065f46;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
`;

const ErrorMessage = styled.div`
  background: #fee2e2;
  border: 1px solid #fecaca;
  color: #dc2626;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
`;

const TableContainer = styled.div`
  overflow-x: auto;
  margin-top: 1rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  text-align: left;
  padding: 0.75rem;
  font-weight: 600;
  border-bottom: 1px solid #d1d5db;
`;

const Td = styled.td`
  padding: 0.75rem;
  border-bottom: 1px solid #e5e7eb;
`;

const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: 9999px;
  background-color: ${(props) => props.color || "#d1fae5"};
  color: ${(props) => props.textColor || "#065f46"};
`;

// ---------------- React Component ----------------
export default function AdminDashboard() {
  const [activeView, setActiveView] = useState("dashboard");
  const [search, setSearch] = useState("");
  
  // Institution form state
  const [institutionName, setInstitutionName] = useState("");
  const [institutionError, setInstitutionError] = useState("");
  const [institutionSuccess, setInstitutionSuccess] = useState("");
  const [institutionLoading, setInstitutionLoading] = useState(false);
  
  // Teacher form state
  const [teacherName, setTeacherName] = useState("");
  const [teacherEmail, setTeacherEmail] = useState("");
  const [teacherPassword, setTeacherPassword] = useState("");
  const [teacherInstitution, setTeacherInstitution] = useState("");
  const [teacherError, setTeacherError] = useState("");
  const [teacherSuccess, setTeacherSuccess] = useState("");
  const [teacherLoading, setTeacherLoading] = useState(false);
  
  // Institutions list
  const [institutions, setInstitutions] = useState([]);
  const [institutionsLoading, setInstitutionsLoading] = useState(false);
  
  // Fetch institutions from API
  const fetchInstitutions = async () => {
    setInstitutionsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/institutions");
      const data = await response.json();
      
      if (response.ok) {
        setInstitutions(data.institutions || []);
      }
    } catch (err) {
      console.error("Failed to fetch institutions:", err);
    } finally {
      setInstitutionsLoading(false);
    }
  };
  
  // Fetch institutions on component mount
  useEffect(() => {
    fetchInstitutions();
  }, []);
  
  // Handle institution submission
  const handleAddInstitution = async (e) => {
    e.preventDefault();
    setInstitutionError("");
    setInstitutionSuccess("");
    setInstitutionLoading(true);
    
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/institutions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ name: institutionName }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setInstitutionSuccess(`Institution "${institutionName}" added successfully!`);
        setInstitutionName("");
        // Refresh institutions list
        fetchInstitutions();
      } else {
        setInstitutionError(data.message || "Failed to add institution");
      }
    } catch (err) {
      setInstitutionError("Connection error. Please make sure the server is running.");
    } finally {
      setInstitutionLoading(false);
    }
  };
  
  // Handle teacher submission
  const handleAddTeacher = async (e) => {
    e.preventDefault();
    setTeacherError("");
    setTeacherSuccess("");
    setTeacherLoading(true);
    
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: teacherName,
          email: teacherEmail,
          password: teacherPassword,
          role: "teacher",
          institution: teacherInstitution,
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setTeacherSuccess(`Teacher "${teacherName}" added successfully!`);
        setTeacherName("");
        setTeacherEmail("");
        setTeacherPassword("");
        setTeacherInstitution("");
        // Refresh institutions list to update counts
        fetchInstitutions();
      } else {
        setTeacherError(data.message || "Failed to add teacher");
      }
    } catch (err) {
      setTeacherError("Connection error. Please make sure the server is running.");
    } finally {
      setTeacherLoading(false);
    }
  };


  const getStatusColor = (status) => {
    switch(status) {
      case "Active": return { color: "#d1fae5", textColor: "#065f46" };
      case "Pending": return { color: "#fef3c7", textColor: "#92400e" };
      case "Inactive": return { color: "#fee2e2", textColor: "#991b1b" };
      default: return { color: "#d1fae5", textColor: "#065f46" };
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
        <Nav>
          <NavItem active={activeView === "dashboard"} onClick={() => setActiveView("dashboard")}>Dashboard</NavItem>
          <NavItem active={activeView === "institutions"} onClick={() => setActiveView("institutions")}>Institutions</NavItem>
          <NavItem active={activeView === "reports"} onClick={() => setActiveView("reports")}>Reports</NavItem>
        </Nav>
      </Sidebar>

      <Main>
        {activeView === "dashboard" && (
          <SectionContainer>
            <Card>
              <Title>Add Institution</Title>
              {institutionSuccess && <SuccessMessage>{institutionSuccess}</SuccessMessage>}
              {institutionError && <ErrorMessage>{institutionError}</ErrorMessage>}
              <form onSubmit={handleAddInstitution}>
                <Input 
                  placeholder="Institution Name" 
                  type="text" 
                  value={institutionName}
                  onChange={(e) => setInstitutionName(e.target.value)}
                  required
                />
                <Button type="submit" disabled={institutionLoading}>
                  {institutionLoading ? "Adding..." : "Add Institution"}
                </Button>
              </form>
            </Card>
            <Card>
              <Title>Add Teacher</Title>
              {teacherSuccess && <SuccessMessage>{teacherSuccess}</SuccessMessage>}
              {teacherError && <ErrorMessage>{teacherError}</ErrorMessage>}
              <form onSubmit={handleAddTeacher}>
                <Select 
                  value={teacherInstitution}
                  onChange={(e) => setTeacherInstitution(e.target.value)}
                  required
                >
                  <option value="">Select Institution</option>
                  {institutions.map((inst, idx) => (
                    <option key={idx} value={inst.name}>{inst.name}</option>
                  ))}
                </Select>
                <Input 
                  placeholder="Teacher Name" 
                  type="text" 
                  value={teacherName}
                  onChange={(e) => setTeacherName(e.target.value)}
                  required
                />
                <Input 
                  placeholder="Email" 
                  type="email" 
                  value={teacherEmail}
                  onChange={(e) => setTeacherEmail(e.target.value)}
                  required
                />
                <Input 
                  placeholder="Password" 
                  type="password" 
                  value={teacherPassword}
                  onChange={(e) => setTeacherPassword(e.target.value)}
                  required
                />
                <Button type="submit" disabled={teacherLoading}>
                  {teacherLoading ? "Adding..." : "Add Teacher"}
                </Button>
              </form>
            </Card>
          </SectionContainer>
        )}

        {activeView === "institutions" && (
          <>
            <Title>Institution Management</Title>
            <Input 
              placeholder="Search institutions..." 
              value={search} 
              onChange={(e) => setSearch(e.target.value)} 
            />
            {institutionsLoading ? (
              <p style={{ textAlign: "center", padding: "2rem", color: "#6b7280" }}>
                Loading institutions...
              </p>
            ) : institutions.length === 0 ? (
              <p style={{ textAlign: "center", padding: "2rem", color: "#6b7280" }}>
                No institutions found. Add one from the Dashboard.
              </p>
            ) : (
              <TableContainer>
                <Table>
                  <thead>
                    <tr>
                      <Th>Name</Th>
                      <Th>Teachers</Th>
                      <Th>Students</Th>
                      <Th>Status</Th>
                      <Th>Actions</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {institutions
                      .filter(i => i.name.toLowerCase().includes(search.toLowerCase()))
                      .map((inst, idx) => (
                        <tr key={idx}>
                          <Td>{inst.name}</Td>
                          <Td>{inst.teachers || 0}</Td>
                          <Td>{inst.students || 0}</Td>
                          <Td>
                            <StatusBadge {...getStatusColor(inst.status)}>{inst.status}</StatusBadge>
                          </Td>
                          <Td>
                            <Link
                                to={`/institution-profile/${encodeURIComponent(inst.name)}`}
                                style={{
                                  padding: "0.25rem 0.75rem",
                                  fontSize: "0.75rem",
                                  backgroundColor: "#0da6f2",
                                  color: "white",
                                  borderRadius: "0.5rem",
                                  textDecoration: "none",
                                }}
                              >
                              View Details
                            </Link>
                          </Td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </TableContainer>
            )}
          </>
        )}

        {activeView === "reports" && (
          <>
            <Title>Reports</Title>
            <p>View platform reports here.</p>
          </>
        )}
      </Main>
    </Container>
  );
}
