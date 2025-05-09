import React from "react";

export default function notFound() {
  try{
      throw new Error("page is not found");
  }
  catch{
    return <>
    page not founds
    </>
  }
}
