import { useEffect, useState, useRef } from "react";
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
      "bonkers",
      "colossal",
      "far-fetched",
      "fanciful",
      "insane",
      "outlandish",
      "preposterous",
      "quirky",
      "wacky",
      "wild",
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
      "philospher",
      "artist",
      "writer",
      "astronaut",
      "actor",
    ];

    return (
      adjs[Math.floor(Math.random() * adjs.length)] +
      "_" +
      nouns[Math.floor(Math.random() * nouns.length)]
    );
  }
  function getRandomImage() {
    const images = [
      "/images/bear.png",
      "/images/cow.png",
      "/images/cat.png",
      "/images/pelican.png",
      "/images/crab.png",
      "/images/dog.png",
      "/images/elephant.png",
      "/images/octopus.png",
      "/images/owl.png",
      "/images/sheep.png",
      "/images/turtle.png",
      "/images/unicorn.png",
      "/images/wolf.png",
      "/images/rabbit.png",
      "/images/fish.png",
      "/images/jaguar.png",
    ];

    return images[Math.floor(Math.random() * images.length)];
  }
  function getRandomColor(excludedColor) {
    let randomColor;
    do {
      randomColor = "#" + Math.floor(Math.random() * 0xffffff).toString(16);
    } while (randomColor === excludedColor);
    return randomColor;
  }
  const excludedColor = "#7EB4C8";
  getRandomColor(excludedColor);

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [buttonDisable, setButtonDisable] = useState(false);
  const [drone, setDrone] = useState(null);
  const [members, setMembers] = useState([
    {
      id: "",
      clientData: {
        color: "",
        username: "",
        image: "",
      },
    },
  ]);
  const [user, setUser] = useState({
    name: getRandomName(),
    color: getRandomColor(),
    image: getRandomImage(),
  });
  const onChange = (e) => {
    let value = e.target.value;
    setButtonDisable(false);
    setMessage(value);
    console.log(message);
  };
  const membersRef = useRef();
  membersRef.current = members;

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
      setUser((prevData) => ({
        ...prevData,
        id: drone.clientId,
      }));
      console.log("Successfully connected to Scaledrone", user);
    });

    const room = drone.subscribe("observable-love-eva");

    room.on("open", (error) => {
      if (error) {
        return console.error(error);
      }
      console.log("Successfully join the room");
    });
    room.on("members", (members) => {
      setMembers(members);
    });
    room.on("member_join", (member) => {
      setMembers([...membersRef.current, member]);
    });
    room.on("member_leave", ({ id }) => {
      const index = membersRef.current.findIndex((m) => m.id === id);
      const newMembers = [...membersRef.current];
      newMembers.splice(index, 1);
      setMembers(newMembers);
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

  // const send = async (message) => {
  //   if (!message) {
  //     setButtonDisable(true);
  //   }
  //   setMessage(message);
  //   console.log(message);

  //   await drone.publish({
  //     room: "observable-love-eva",
  //     message: message,
  //   });
  //   setMessage("");
  // };
  const send = async (message) => {
    try {
      if (message === "") {
        setButtonDisable(true);
        console.error("Message cannot be empty");
        return;
      }

      setMessage(message);
      console.log(message);

      await drone.publish({
        room: "observable-love-eva",
        message: message,
      });
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  return (
    <div className="app-wrapper">
      <Members members={members} />
      <div className="chat-wrapper">
        <Message messages={messages} user={user} />
        <Input
          onChange={onChange}
          onSend={send}
          message={message}
          disable={buttonDisable}
        />
      </div>
    </div>
  );
}

export default App;
