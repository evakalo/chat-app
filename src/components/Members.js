const Members = ({ members }) => {
  return (
    <div className="members">
      {members.map((member, index) => {
        return (
          <div className="member-wrapper" key={index}>
            <p
              className="members-color"
              style={{ backgroundColor: member.clientData.color }}
            ></p>{" "}
            <p key={member.id}>{member.clientData.name}</p>
          </div>
        );
      })}
    </div>
  );
};
export default Members;
