import { useEffect, useState } from "react";
import Post from "../Post";
import { useFetch } from "../hooks/useFetch";

export default function IndexPage() {
  const { isInProgress, isError, error, data } = useFetch(() =>
    fetch(`${process.env.REACT_APP_SERVERURL}/post`)
  );

  if (isError && error) {
    return <h1> could not fetch the posts.please try again</h1>;
  } else if (isInProgress) {
    return <h1>fetching your posts...</h1>;
  } else {
    return (
      <>
        {data.length > 0 &&
          data.map((post) => {
            return <Post key={post._id} {...post} />;
          })}
      </>
    );
  }
}
