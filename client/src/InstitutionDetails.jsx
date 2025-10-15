import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// ---------- Styled Components ----------
const Container = styled.div`
  padding: 2rem;
`;

const Logo = styled.h1`
  font-weight: 800;
  font-size: 2.25rem;
  display: flex;
  gap: 0.1rem;
`;

const BackLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #0da6f2;
  margin-bottom: 1.5rem;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const Card = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0px 10px 30px rgba(0,0,0,0.07);
  @media (prefers-color-scheme: dark) {
    background-color: #1a262d;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: bold;
`;

const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  border-radius: 9999px;
  padding: 0.25rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  background-color: ${(props) => props.color || "#d1fae5"};
  color: ${(props) => props.textColor || "#065f46"};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  @media(min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media(min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const InfoBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: #6b7280;
  @media (prefers-color-scheme: dark) {
    color: #9ca3af;
  }
`;

const Value = styled.p`
  margin-top: 0.25rem;
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  @media (prefers-color-scheme: dark) {
    color: #f9fafb;
  }
`;

const Actions = styled.div`
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  font-weight: 600;
  color: white;
  background-color: ${(props) => props.bg || "#0da6f2"};
  &:hover {
    opacity: 0.9;
  }
`;

// ---------- React Component ----------
export default function InstitutionProfile({ institution }) {
  const navigate = useNavigate();

  // Example institution data fallback
  const data = institution || {
    name: "Sunshine Academy",
    status: "Active",
    registrationId: "SA-2024-001",
    head: "Dr. Evelyn Reed",
    location: "Maplewood, Springfield",
    students: 120,
    teachers: 15
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
      <Logo>
        <span style={{ color: "#FF0000" }}>G</span>
        <span style={{ color: "#FFFF00" }}>e</span>
        <span style={{ color: "#008000" }}>s</span>
        <span style={{ color: "#0000FF" }}>t</span>
        <span style={{ color: "#800080" }}>u</span>
        <span style={{ color: "#FFC0CB" }}>r</span>
        <span style={{ color: "#FFA500" }}>a</span>
      </Logo>

      <BackLink onClick={() => navigate(-1)}>
        &#8592; Back to Institutions
      </BackLink>

      <Card>
        <Header>
          <Title>{data.name}</Title>
          <StatusBadge {...getStatusColor(data.status)}>{data.status}</StatusBadge>
        </Header>

        <Grid>
          <InfoBlock>
            <Label>Registration ID</Label>
            <Value>{data.registrationId}</Value>
          </InfoBlock>
          <InfoBlock>
            <Label>Head of Institution</Label>
            <Value>{data.head}</Value>
          </InfoBlock>
          <InfoBlock>
            <Label>Location</Label>
            <Value>{data.location}</Value>
          </InfoBlock>
          <InfoBlock>
            <Label>Student Strength</Label>
            <Value>{data.students}</Value>
          </InfoBlock>
          <InfoBlock>
            <Label>Registered Teachers</Label>
            <Value>{data.teachers}</Value>
          </InfoBlock>
        </Grid>

        <Actions>
          <Button>Edit Institution</Button>
          <Button bg="#ef4444">Deactivate</Button>
        </Actions>
      </Card>
    </Container>
  );
}
