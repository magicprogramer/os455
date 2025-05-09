import Link from "next/link";
export const cats = ["tech", "health", "travel"];
export const posts = [
  {
    id: 1,
    title: "first post",
    desc: "this is first post",
    link: "",
    category: "tech",
  },
  {
    id: 2,
    title: "second post",
    desc: "this is second post",
    link: "",
    category: "tech",
  },
  {
    id: 3,
    title: "third post",
    desc: "this is third post",
    link: "",
    category: "health",
  },
  {
    id: 4,
    title: "fourth post",
    desc: "this is fourth post",
    link: "",
    category: "fourth",
  },
];
export default function Cateogries() {
  return (
    <ul className="list bg-base-100 rounded-box mt-[20px] ml-[20px] pt-[20px] pl-[20px]">
      {cats.map((cat) => {
        return (
          <div key={cat}>
            <li>
              <Link href={`/categories/${cat}`} className="hover:bg-amber-900">
                {cat}
              </Link>
            </li>
          </div>
        );
      })}
    </ul>
  );
}
