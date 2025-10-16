import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

// ---------------- Styled Components ----------------
const Container = styled.div`
  min-height: 100vh;
  background-color: #f0f8ff;
  padding: 2rem;
  font-family: 'Plus Jakarta Sans', sans-serif;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: white;
  border: 1px solid #e5e7eb;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 0.9rem;
  color: #6b7280;
  transition: all 0.2s;
  
  &:hover {
    background: #f9fafb;
    color: #111827;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #111827;
  margin: 0;
`;

const Card = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const InstitutionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
`;

const InstitutionInfo = styled.div`
  flex: 1;
`;

const InstitutionName = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  color: #111827;
  margin: 0 0 0.5rem 0;
`;

const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 9999px;
  background-color: ${(props) => props.color || "#d1fae5"};
  color: ${(props) => props.textColor || "#065f46"};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  
  ${props => props.variant === 'primary' && `
    background-color: #0da6f2;
    color: white;
    &:hover {
      background-color: #0b8ac9;
    }
  `}
  
  ${props => props.variant === 'danger' && `
    background-color: #ef4444;
    color: white;
    &:hover {
      background-color: #dc2626;
    }
  `}
`;

const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const DetailLabel = styled.span`
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 500;
`;

const DetailValue = styled.span`
  font-size: 1.125rem;
  color: #111827;
  font-weight: 600;
`;

const Section = styled.div`
  margin-top: 2rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: bold;
  color: #111827;
  margin-bottom: 1rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  text-align: left;
  padding: 0.75rem;
  font-weight: 600;
  color: #6b7280;
  border-bottom: 2px solid #e5e7eb;
  font-size: 0.875rem;
`;

const Td = styled.td`
  padding: 0.75rem;
  border-bottom: 1px solid #e5e7eb;
  color: #111827;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: #6b7280;
`;

// ---------------- Component ----------------
export default function InstitutionProfile() {
  const navigate = useNavigate();
  const { institutionName } = useParams();
  const [institution, setInstitution] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInstitutionData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [institutionName]);

  const fetchInstitutionData = async () => {
    setLoading(true);
    try {
      const decodedName = decodeURIComponent(institutionName);
      
      // Fetch institutions
      const instResponse = await fetch("http://localhost:5000/api/institutions");
      const instData = await instResponse.json();
      
      if (instResponse.ok) {
        const foundInst = instData.institutions.find(
          i => i.name === decodedName
        );
        setInstitution(foundInst);
      }

      // Fetch teachers for this institution
      const teachersResponse = await fetch(
        `http://localhost:5000/api/users?role=teacher&institution=${encodeURIComponent(decodedName)}`
      );
      const teachersData = await teachersResponse.json();
      if (teachersResponse.ok) {
        setTeachers(teachersData.users || []);
      }
      
      // Fetch students for this institution
      const studentsResponse = await fetch(
        `http://localhost:5000/api/users?role=student&institution=${encodeURIComponent(decodedName)}`
      );
      const studentsData = await studentsResponse.json();
      if (studentsResponse.ok) {
        setStudents(studentsData.users || []);
      }
      
    } catch (err) {
      console.error("Failed to fetch institution data:", err);
    } finally {
      setLoading(false);
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

  const generateRegistrationId = (name) => {
    const prefix = name.split(' ').map(word => word[0]).join('').toUpperCase();
    return `${prefix}-2024-001`;
  };

  if (loading) {
    return (
      <Container>
        <p style={{ textAlign: "center", padding: "3rem", color: "#6b7280" }}>
          Loading institution details...
        </p>
      </Container>
    );
  }

  if (!institution) {
    return (
      <Container>
        <EmptyState>
          <h2>Institution not found</h2>
          <p>The institution you're looking for doesn't exist.</p>
          <Button variant="primary" onClick={() => navigate("/admin-dashboard")}>
            Back to Dashboard
          </Button>
        </EmptyState>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate("/admin-dashboard")}>
          ← Back to Institutions
        </BackButton>
      </Header>

      <Card>
        <InstitutionHeader>
          <InstitutionInfo>
            <InstitutionName>{institution.name}</InstitutionName>
            <StatusBadge {...getStatusColor(institution.status)}>
              {institution.status}
            </StatusBadge>
          </InstitutionInfo>
          <ActionButtons>
            <Button variant="primary">Edit Institution</Button>
            <Button variant="danger">Deactivate</Button>
          </ActionButtons>
        </InstitutionHeader>

        <DetailsGrid>
          <DetailItem>
            <DetailLabel>Registration ID</DetailLabel>
            <DetailValue>{generateRegistrationId(institution.name)}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Head of Institution</DetailLabel>
            <DetailValue>Dr. {institution.name.split(' ')[0]} Administrator</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Location</DetailLabel>
            <DetailValue>Springfield, USA</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Student Strength</DetailLabel>
            <DetailValue>{students.length}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Registered Teachers</DetailLabel>
            <DetailValue>{teachers.length}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Established Date</DetailLabel>
            <DetailValue>{new Date(institution.createdAt).toLocaleDateString()}</DetailValue>
          </DetailItem>
        </DetailsGrid>

        <Section>
          <SectionTitle>Teachers</SectionTitle>
          {teachers.length === 0 ? (
            <EmptyState>
              <p>No teachers registered yet.</p>
            </EmptyState>
          ) : (
            <Table>
              <thead>
                <tr>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th>Joined Date</Th>
                  <Th>Status</Th>
                </tr>
              </thead>
              <tbody>
                {teachers.map((teacher, idx) => (
                  <tr key={idx}>
                    <Td>{teacher.name}</Td>
                    <Td>{teacher.email}</Td>
                    <Td>{new Date(teacher.createdAt).toLocaleDateString()}</Td>
                    <Td>Active</Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Section>

        <Section>
          <SectionTitle>Students</SectionTitle>
          {students.length === 0 ? (
            <EmptyState>
              <p>No students enrolled yet.</p>
            </EmptyState>
          ) : (
            <Table>
              <thead>
                <tr>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th>Enrolled Date</Th>
                  <Th>Status</Th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, idx) => (
                  <tr key={idx}>
                    <Td>{student.name}</Td>
                    <Td>{student.email}</Td>
                    <Td>{new Date(student.createdAt).toLocaleDateString()}</Td>
                    <Td>Active</Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Section>
      </Card>
    </Container>
  );
}
