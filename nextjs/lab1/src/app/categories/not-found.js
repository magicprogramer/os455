import React from "react";

export default function notFound() {
  try {
    throw new Error("category is not found");
  } catch {
    return <div>invalid category</div>;
  }
}
