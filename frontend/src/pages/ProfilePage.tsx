import React from "react";
import { Container, Menu } from "semantic-ui-react";
import ProfileCard from "../components/ProfileCard";

function ProfilePage() {
  return (
    <main className="profile-page">
      <Menu size="huge" style={{ opacity: 0 }}></Menu>
      <br />
      <br />
      <div style={{ margin: "2em 2em" }}>
        <ProfileCard />
      </div>
      <br />
      <br />
      <br />
    </main>
  );
}

export default ProfilePage;
