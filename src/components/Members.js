const Members = ({ members }) => {
  return (
    <ul className="members">
      <li>Online: </li>
      <div>
        {members.map((member, index) => {
          return <li key={member.id}>{member.clientData.name}</li>;
        })}
      </div>
    </ul>
  );
};
export default Members;
