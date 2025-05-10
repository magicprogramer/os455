import axios from "axios";
import Link from "next/link";
export default async function page() {
  await new Promise((resolve) => setInterval(resolve, 1000));
  const { data: posts } = await axios.get(
    "https://jsonplaceholder.typicode.com/posts"
  );
  return (
    <ul>
      <h2>post list</h2>
      {posts.map((post) => (
        <li key={post.id}>
          <Link href={"/pages/" + post.id} className="hover:text-amber-600">
            {post.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
