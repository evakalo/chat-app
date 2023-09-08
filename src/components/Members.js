const Members = ({ members }) => {
  return (
    <ul className="members">
      <div>
        {members.map((member, index) => {
          return (
            <ul>
              <div
                className="members-color"
                style={{ backgroundColor: member.clientData.color }}
              ></div>{" "}
              <li key={member.id}>{member.clientData.name}</li>
            </ul>
          );
        })}
      </div>
    </ul>
  );
};
export default Members;
