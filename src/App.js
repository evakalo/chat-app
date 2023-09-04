import { useEffect, useState } from "react";
import "./App.css";
import Message from "./components/Message";
import Input from "./components/Input";
import Members from "./components/Members";
function App() {
  function getRandomName() {
    const adjs = [
      "whimsical",
      "purple",
      "eccentric",
      "bold",
      "hazy",
      "huge",
      "melancolic",
    ];
    const nouns = [
      "dragon",
      "player",
      "smoke",
      "poet",
      "barbie",
      "syrup",
      "pizza",
      "pudding",
    ];
    return (
      adjs[Math.floor(Math.random() * adjs.length)] +
      "_" +
      nouns[Math.floor(Math.random() * nouns.length)]
    );
  }

  function getRandomColor() {
    return "#" + Math.floor(Math.random() * 0xffffff).toString(16);
  }
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [members, setMembers] = useState([]);
  const [drone, setDrone] = useState(null);
  const [user, setUser] = useState({
    name: getRandomName(),
    color: getRandomColor(),
    id: null,
  });
  const onChange = (e) => {
    let value = e.target.value;
    setMessage(value);
    console.log(message);
  };

  function connectToScaledrone() {
    const drone = new window.Scaledrone("scaledrone id", {
      data: user,
    });
    drone.on("open", (error) => {
      setDrone(drone);
      if (error) {
        return console.error(error);
      }
      user.id = drone.clientId;
      setUser((prevUser) => ({
        ...prevUser,
        id: drone.clientId,
      }));
      console.log("Successfully connected to Scaledrone", user);
    });

    const room = drone.subscribe("observable-love");

    room.on("open", (error) => {
      if (error) {
        return console.error(error);
      }
      console.log("Successfully join the room");
    });
    room.on("members", (members) => {
      setMembers(members);
      console.log(members);
    });
    room.on("member_join", (member) => {
      setMembers([...members, member]);
    });
    room.on("message", (message) => {
      setMessages((prev) => {
        return [...prev, message];
      });
      console.log("New Message", message);
    });
  }

  useEffect(() => {
    if (drone === null) {
      connectToScaledrone();
    }
  }, []);
  const send = async (message) => {
    setMessage(message);
    console.log(message);

    await drone.publish({
      room: "observable-love",
      message: message,
    });
    setMessage("");
  };

  return (
    <div className="app-wrapper">
      <Members members={members} />
      <div className="chat-wrapper">
        <Message messages={messages} user={user} />
        <Input onChange={onChange} onSend={send} message={message} />
      </div>
    </div>
  );
}

export default App;
