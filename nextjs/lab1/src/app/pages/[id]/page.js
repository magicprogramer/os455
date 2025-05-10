import { notFound } from "next/navigation";
import Loader from "../loading";
import axios from "axios";

export default async function page({ params }) {
  try {
    await new Promise((resolve) => setInterval(resolve, 3000));
    const { id } = await params;
    const {
      data: [post],
    } = await axios.get("https://jsonplaceholder.typicode.com/posts?id=" + id);
    if (!post) throw new Error("error");
    const {
      data: [user],
    } = await axios.get(
      "https://jsonplaceholder.typicode.com/users?id=" + post.userId
    );
    const { data: comments } = await axios.get(
      "https://jsonplaceholder.typicode.com/comments?postId=" + post.id
    );
    console.log("com " + comments);
    console.log("post " + post);
    console.log(user);

    return (
      <div className="card card-xl">
        <h2 className="font-bold bg-base-200">Post title</h2>
        <p className="ml-[10px] mt-[10px]"> {post.title}</p>
        <hr />

        <h2 className="font-bold bg-base-200 flex items-center">Content</h2>
        <p className="ml-[10px] h-[40vh] bg-amber-200 self-center-safe mt-[20px]">
          {" "}
          {post.body}
        </p>
        <hr />
        <div className="mt-[10px]">
          <span className="font-bold bg-base-200 ">By: </span>
          <button className="btn btn-info"> {user.name}</button>
        </div>
        <hr />
        <div className="flex flex-col">
          <h1 className="font-bold bg-gray-600">Comments</h1>
          <ul className="flex flex-col">
            {comments.map((c) => (
              <li key={c.id} className="bg-[#22e2bf] mb-[20px]">
                <p className="underline">sender : {c.email}</p>
                <p>comment content: {c.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  } catch {
    throw new Error("something is wrong");
  }
}
