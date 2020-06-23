import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../contexts/UserProvider";
import axios from "axios";
import {
  Grid,
  Image,
  Button,
  Segment,
  Responsive,
  Icon,
  Popup,
  Modal,
} from "semantic-ui-react";
import { DEVELOPMENT_VIEW, CONSOLE_LOGGING } from "../DevelopmentView";
import { intArrayToBase64 } from "../util/EncodingUtil";
import UserSelfNameChanger from "./user/profile/UserSelfNameChanger";
import QrCodeScanner from "./common/QrCodeScanner";

function getIntArrayBase64(str: string) {
  let STRING_CHAR = Array.from(atob(str));
  let TYPED_ARRAY = STRING_CHAR.map((x) => x.charCodeAt(0));
  return TYPED_ARRAY;
}

function ProfileCard() {
  const [file, setFile] = useState(null);
  const userContext = useContext(Context);

  let fileInputRef: any = React.createRef();

  const fileChange = (e: any) => {
    setFile(e.target.files[0]);
    CONSOLE_LOGGING && console.log("File chosen --->", file);

    // this.setState({ file: e.target.files[0] }, () => {
    //   CONSOLE_LOGGING && console.log("File chosen --->", this.state.file);
    // });
    if (e.target.files[0].size >= 4000000) {
      alert("Please ensure that the file size is below 4 MB.");
    } else {
      const data = new FormData();
      data.append("profilePicture", e.target.files[0]);
      let reader = new FileReader();
      let newProfilePic: any;
      reader.readAsDataURL(e.target.files[0]);
      const config = {
        headers: {
          Authorization: `Bearer ${userContext.token}`,
          "Content-Type": "multipart/form-data",
        },
      };
      reader.onloadend = () => {
        CONSOLE_LOGGING && console.log(reader.result);
        let profilePicString = reader.result as string;
        newProfilePic = getIntArrayBase64(profilePicString.substring(22));
        axios
          .put("/api/accounts/profilePicture", data, config)
          .then((res) => {
            if (res.status === 200) {
              CONSOLE_LOGGING && console.log("Success!");
              userContext.setUser(
                userContext.token,
                userContext.name,
                newProfilePic,
                userContext.role
              );
            }
          })
          .catch((err) => {
            CONSOLE_LOGGING && console.log(err);
          });
      };
    }
  };

  return (
    <Segment placeholder background={"#fcfcfc"}>
      <Grid stackable>
        <Grid.Row>
          <Grid.Column computer={4} tablet={8}>
            <Responsive as={Segment} basic minWidth={750}>
              <Popup
                trigger={
                  <Image
                    src={`data:image/*;base64,${intArrayToBase64(
                      userContext.profilePic
                    )}`}
                    size="medium"
                    circular
                    bordered
                    style={{ cursor: "pointer", background: "#ffffff" }}
                  />
                }
                content={
                  <div>
                    <Button
                      animated="fade"
                      onClick={() => fileInputRef.current.click()}
                    >
                      <Button.Content hidden>
                        <Icon name="camera" />
                      </Button.Content>
                      <Button.Content visible>
                        Upload profile picture (png)
                      </Button.Content>
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      hidden
                      onChange={fileChange}
                      accept="image/png"
                    />
                  </div>
                }
                on={"click"}
                position="bottom center"
              />
            </Responsive>
          </Grid.Column>

          <Grid.Column computer={12} tablet={8} stretched>
            <Grid columns={1}>
              <Grid.Column stretched>
                <Segment basic size="huge">
                  <UserSelfNameChanger />
                  <div style={{ fontSize: "0.75em" }}>
                    <br />
                    <strong>Role: </strong>
                    {userContext.role}
                  </div>
                </Segment>
                <Segment basic compact></Segment>
                <Segment basic compact>
                  <Button.Group vertical>
                    {DEVELOPMENT_VIEW && (
                      <Modal
                        trigger={
                          <Button
                            content="Scan QR code"
                            icon="qrcode"
                            labelPosition="left"
                          />
                        }
                        closeIcon
                        size="tiny"
                      >
                        <Modal.Header content="Scan the registration QR code" />
                        <Modal.Content>
                          <QrCodeScanner />
                        </Modal.Content>
                      </Modal>
                    )}
                    <Button
                      content="View My Bookings"
                      icon="book"
                      labelPosition="left"
                      as={Link}
                      to={"/bookings"}
                    />
                    {DEVELOPMENT_VIEW && (
                      <Button
                        content="View My Events"
                        icon="calendar"
                        labelPosition="left"
                        as={Link}
                        to={"/events"}
                      />
                    )}
                  </Button.Group>
                </Segment>
              </Grid.Column>
            </Grid>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
}

export default ProfileCard;
