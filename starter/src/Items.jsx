import SingleItem from "./SingleItem";
import { useQuery } from "@tanstack/react-query";
import customFetch from "./utils";
const Items = () => {
  // - Query Key

  // The unique key you provide is used internally for refetching, caching, and sharing your queries throughout your application.

  // - Query Function

  // A query function can be literally any function that returns a promise. The promise that is returned should either resolve the data or throw an error.

  const { isLoading, data, error, isError } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const { data } = await customFetch.get("/");
      return data;
    },
  });
  /**
   * with git we user useQuery
   * with create edit delete we use useMutation
   */

  //   const { isLoading, data } = useQuery({
  //     queryKey: ["tasks"],
  //     queryFn: () => customFetch.get("/"),
  //   });
  //  console.log(data.data.taskList);

  if (isLoading) {
    return <p style={{ marginTop: "1rem" }}>loading...</p>;
  }
  // if (isError) {
  //   return <p style={{ marginTop: "1rem" }}>there was an error...</p>;
  // }
  if (error) {
    return <p style={{ marginTop: "1rem" }}>{error.message}...</p>;
  }
  return (
    <div className="items">
      {data.taskList.map((item) => {
        return <SingleItem key={item.id} item={item} />;
      })}
    </div>
  );
};
export default Items;
