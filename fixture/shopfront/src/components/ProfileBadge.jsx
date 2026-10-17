// Badge in the account header.
export function ProfileBadge({ user }) {
  return (
    <span className="badge">
      {user.name}
      {/* B3: memberSince is a timestamp object, not a string */}
      <small>Member since {user.memberSince}</small>
    </span>
  );
}
