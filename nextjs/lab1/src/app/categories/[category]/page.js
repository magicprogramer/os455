import { notFound } from "next/navigation";
import { cats, posts } from "../page";
import Link from "next/link";
export default async function category({ params }) {
  const { category } = await params;
  if (cats.find((cat) => cat == category)) {
    return (
      <div>
        <div>{`posts that has ${category} category on it `}</div>
        <div className="carousel rounded-box h-[50vh] w-[80vw]">
          {posts

            .filter((post) => post.category == category)
            .map((post) => (
              <div className="carousel-item" key={post.id}>
                <div className="card border-2 mr-[2px]">
                  <p className="card-title">{post.title}</p>
                  <p className="card-body">{post.desc}</p>
                  <p className="card-actions bg-amber-200 rounded-b-box">
                    {post.category}
                  </p>
                  <p className="caret-emerald-200">
                    <Link
                      className="text-blue-600 hover:text-blue-800 underline font-medium"
                      href={`/pages/${post.id}`}
                    >
                      see more details
                    </Link>
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  } else {
    notFound();
  }
}
