import { posts } from "@/app/categories/page";
import { notFound } from "next/navigation";
import Loader from "../loading";
export default async function page({ params }) {
  await new Promise((resolve) => setInterval(resolve, 3000));
  const { id } = await params;
  const post = posts.find((post) => post.id == id);
  if (!post) return notFound();
  return (
    <div>
      {
        <>
          <div className="card card-border border-2 bg-amber-500 mt-[20px] ml-[10vw] w-96">
            <div className="card-body">
              <h2 className="card-title">{post.title}</h2>
              <p>{post.desc}</p>
              <div className="card-actions justify-end">
                <button className="btn btn-info">{post.category}</button>
              </div>
            </div>
          </div>
        </>
      }
    </div>
  );
}
