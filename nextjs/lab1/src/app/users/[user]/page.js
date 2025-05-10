import axios from "axios";
import Link from "next/link";

export default async function page({ params }) {
  try {
    const { user } = await params;
    console.log(user);
    const { data: posts } = await axios.get(
      "https://jsonplaceholder.typicode.com/posts?userId=" + user
    );
    const { data: userDetails } = await axios.get(
      "https://jsonplaceholder.typicode.com/users?id=" + user
    );
    console.log("user details " + userDetails[0].name);
    return (
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>title</th>
              <th>body</th>
              <th>user</th>
              <th>see more details</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td>{post.title}</td>
                <td>{post.body}</td>
                <td>
                  <Link href={`/users/${userDetails[0].id}`}>
                    {userDetails[0].name}
                  </Link>
                </td>
                <td>
                  <Link href={`/pages/${post.id}`}>see more details</Link>
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
