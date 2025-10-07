import React, { useState } from "react";
import styled from "styled-components";
import { FiHome, FiUsers, FiBook } from "react-icons/fi";

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
  line-height: 2.5rem;
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
  background-color: ${(props) => (props.active ? "rgba(13,166,242,0.1)" : "transparent")};
  text-decoration: none;
  margin-bottom: 0.25rem;
  transition: all 0.2s;

  &:hover {
    background-color: rgba(13,166,242,0.1);
  }

  svg {
    color: #0da6f2;
  }
`;

const Main = styled.main`
  flex: 1;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 2.25rem;
  font-weight: bold;
  color: #111827;

  @media (prefers-color-scheme: dark) {
    color: #f9fafb;
  }
`;

const Subtitle = styled.p`
  margin-top: 0.5rem;
  color: #6b7280;
  
  @media (prefers-color-scheme: dark) {
    color: #9ca3af;
  }
`;

const FormContainer = styled.div`
  margin-top: 2rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media(min-width: 1024px){
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Card = styled.div`
  background-color: #ffffff;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 10px 15px rgba(0,0,0,0.1);

  @media (prefers-color-scheme: dark) {
    background-color: rgba(16,28,34,0.5);
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #6b7280;

  @media (prefers-color-scheme: dark) {
    color: #9ca3af;
  }
`;

const Input = styled.input`
  width: 90%;
  padding: 1rem;
  border-radius: 0.75rem;
  border: 1px solid #d1d5db;
  margin-bottom: 1rem;
  font-size: 1rem;
  color: #111827;
  background-color: #e5e7eb;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(13,166,242,0.3);
    border-color: transparent;
  }

  @media (prefers-color-scheme: dark) {
    color: #f9fafb;
    background-color: #1f2937;
    border-color: #374151;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #0da6f2;
  color: #fff;
  font-weight: bold;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: rgba(13,166,242,0.9);
  }
`;

// ---------------- React Component ----------------
export default function InstitutionManagement() {
  const [activeView, setActiveView] = useState("dashboard");

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
          <NavItem 
            active={activeView === "dashboard"} 
            href="#" 
            onClick={() => setActiveView("dashboard")}
          >
            <FiHome /> Dashboard
          </NavItem>
          <NavItem 
            active={activeView === "institutions"} 
            href="#" 
            onClick={() => setActiveView("institutions")}
          >
            <FiUsers /> Institutions
          </NavItem>
          <NavItem 
            active={activeView === "reports"} 
            href="#" 
            onClick={() => setActiveView("reports")}
          >
            <FiBook /> Reports
          </NavItem>
        </Nav>
      </Sidebar>

      <Main>
        {activeView === "dashboard" && (
          <>
            <Title>Admin Dashboard</Title>
            <FormContainer>
              <Card>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Add Institution</h2>
                <form>
                  <Label htmlFor="institutionName">Institution Name</Label>
                  <Input id="institutionName" type="text" placeholder="Enter institution name" />
                  <Button type="submit">Add Institution</Button>
                </form>
              </Card>

              <Card>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Add Teacher</h2>
                <form>
                  <Label htmlFor="teacherName">Teacher Name</Label>
                  <Input id="teacherName" type="text" placeholder="Enter teacher name" />
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Enter email" />
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="Enter password" />
                  <Button type="submit">Add Teacher</Button>
                </form>
              </Card>
            </FormContainer>
          </>
        )}

        {activeView === "institutions" && (
          <Title>Institutions Management Placeholder</Title>
        )}

        {activeView === "reports" && (
          <Title>Reports Placeholder</Title>
        )}
      </Main>
    </Container>
  );
}
