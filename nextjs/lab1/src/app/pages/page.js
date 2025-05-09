import Link from "next/link";
import { cats, posts } from "../categories/page";
export default async function page() {
  await new Promise((resolve) => setInterval(resolve, 1000));
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>title</th>
            <th>desc</th>
            <th>link</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <th>{post.id}</th>
              <th>{post.title}</th>
              <td>{post.desc}</td>
              <td>
                <Link href={`/pages/${post.id}`}>link</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
