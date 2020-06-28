import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Placeholder, Table } from "semantic-ui-react";
import { Context } from "../../../contexts/UserProvider";
import ChangeRoleButton from "./ChangeRoleButton";
import DeleteUserButton from "./DeleteUserButton";
import UserEmailChanger from "./UserEmailChanger";
import { CONSOLE_LOGGING } from "../../../DevelopmentView";
import "../../../styles/ScrollableTable.scss";
import { Role } from "./RoleTypes";

export type UserData = {
  name: string;
  email: string;
  role: Role;
};

function UserAccountsTable() {
  const [allAccounts, setAllAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const userContext = useContext(Context);

  useEffect(() => {
    retrieveAccounts();
  }, []);

  const retrieveAccounts = () => {
    axios
      .get("../api/accounts", {
        headers: { Authorization: `Bearer ${userContext.token}` },
      })
      .then((response) => {
        CONSOLE_LOGGING && console.log("GET all accounts:", response);
        if (response.status === 200) {
          setAllAccounts(response.data);
          setIsLoading(false);
        }
      })
      .catch(({ response }) => {
        CONSOLE_LOGGING && console.log("GET all accounts error:", response);
        switch (response.status) {
          case 401:
            alert("Your current session has expired. Please log in again.");
            userContext.resetUser();
            break;
          default:
            alert("An unknown error has occurred. Please log try again.");
        }
      });
  };

  const renderBodyRow = (data: UserData, index: number) => {
    const { name, email, role } = data;
    const row = (
      <Table.Row key={email}>
        <Table.Cell>{name ? name : "<Pending registration>"}</Table.Cell>
        <Table.Cell>
          <UserEmailChanger email={email} updateTable={retrieveAccounts} />
        </Table.Cell>
        <Table.Cell>{role}</Table.Cell>
        <Table.Cell textAlign="right">
          <ChangeRoleButton
            name={name}
            email={email}
            updateTable={retrieveAccounts}
            role={role}
          />
          <DeleteUserButton email={email} updateTable={retrieveAccounts} />
        </Table.Cell>
      </Table.Row>
    );
    return row;
  };

  return (
    <div className="scrollable-table" style={{ maxHeight: "37em" }}>
      {isLoading ? (
        <Table>
          <Table.Row>
            <Table.Cell>
              <Placeholder>
                <Placeholder.Paragraph>
                  <Placeholder.Line />
                  <Placeholder.Line />
                  <Placeholder.Line />
                  <Placeholder.Line />
                  <Placeholder.Line />
                </Placeholder.Paragraph>
                <Placeholder.Paragraph>
                  <Placeholder.Line />
                  <Placeholder.Line />
                  <Placeholder.Line />
                </Placeholder.Paragraph>
              </Placeholder>
            </Table.Cell>
            <Table.Cell>
              <Placeholder>
                <Placeholder.Paragraph>
                  <Placeholder.Line />
                  <Placeholder.Line />
                  <Placeholder.Line />
                  <Placeholder.Line />
                  <Placeholder.Line />
                </Placeholder.Paragraph>
                <Placeholder.Paragraph>
                  <Placeholder.Line />
                  <Placeholder.Line />
                  <Placeholder.Line />
                </Placeholder.Paragraph>
              </Placeholder>
            </Table.Cell>
            <Table.Cell>
              <Placeholder>
                <Placeholder.Paragraph>
                  <Placeholder.Line />
                  <Placeholder.Line />
                  <Placeholder.Line />
                  <Placeholder.Line />
                  <Placeholder.Line />
                </Placeholder.Paragraph>
                <Placeholder.Paragraph>
                  <Placeholder.Line />
                  <Placeholder.Line />
                  <Placeholder.Line />
                </Placeholder.Paragraph>
              </Placeholder>
            </Table.Cell>
            <Table.Cell>
              <Placeholder>
                <Placeholder.Paragraph>
                  <Placeholder.Line />
                  <Placeholder.Line />
                  <Placeholder.Line />
                  <Placeholder.Line />
                  <Placeholder.Line />
                </Placeholder.Paragraph>
                <Placeholder.Paragraph>
                  <Placeholder.Line />
                  <Placeholder.Line />
                  <Placeholder.Line />
                </Placeholder.Paragraph>
              </Placeholder>
            </Table.Cell>
          </Table.Row>
        </Table>
      ) : (
        <Table
          fixed
          selectable
          headerRow={
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>Role</Table.HeaderCell>
              <Table.HeaderCell textAlign="right">Actions</Table.HeaderCell>
            </Table.Row>
          }
          renderBodyRow={renderBodyRow}
          tableData={allAccounts}
        />
      )}
    </div>
  );
}

export default UserAccountsTable;
