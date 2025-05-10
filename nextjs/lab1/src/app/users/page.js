import axios from "axios";
import Link from "next/link";
export default async function page() {
  try {
    const { data: users } = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );

    return (
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>name</th>
              <th>email</th>
              <th>show posts</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <Link href={`/users/${user.id}`}>Link</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  } catch {
    throw new Error("something is wrong");
  }
}
