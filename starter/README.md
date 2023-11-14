## Steps

#### Server

Open server directory.

- run "npm install" and "npm start"

#### Node Course

[Node Tutorial and Projects Course](https://www.udemy.com/course/nodejs-tutorial-and-projects-course/?referralCode=E94792BEAE9ADD204BC7)

#### Starter

- run "npm install" and "npm run dev"
- Grocery Bud structure

#### Explore Setup

Explore files and folders

#### Custom Axios Instance

Create utils.js and setup custom axios instance with
following base url:'http://localhost:5000/api/tasks'

#### HTTP Methods

HTTP (Hypertext Transfer Protocol) methods define the types of actions that can be performed on a web server to retrieve, modify or delete information. The most commonly used HTTP methods are GET, POST, PATCH and DELETE. GET retrieves data, POST sends data to be processed, PATCH update or replace existing data, DELETE removes data.

- can use fetch()

GET: This HTTP method is used to retrieve data from a server. When a client sends a GET request to a server, the server will return a response that includes the requested data. This method is typically used to retrieve information from a database, to read a web page, or to download a file. The HTTP GET method is the default method used by web browsers to retrieve data from a server, as it is a safe and efficient way to request resources.

```js
// HTTP GET example
try {
  const response = await axios.get("/api/data");
  console.log(response.data);
} catch (error) {
  console.error(error);
}
```

```js
// HTTP GET example
axios
  .get("/api/data")
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error);
  });
```

POST: The POST method is used to send data to a server to create or update a resource. When a client sends a POST request to a server, the server will process the request and create a new resource or update an existing one. This method is commonly used in web forms, where users enter information that is then sent to a server for processing.

```js
// HTTP POST example
try {
  const response = await axios.post("/api/data", { name: "John", age: 30 });
  console.log(response.data);
} catch (error) {
  console.error(error);
}
```

PATCH: This method is similar to the POST method, but it is used to update only a part of a resource. When a client sends a PATCH request to a server, the server will update the resource with the new data provided in the request. This method is commonly used in REST APIs to update specific properties of a resource.

```js
// HTTP PATCH example
try {
  const response = await axios.patch("/api/data/1", { age: 31 });
  console.log(response.data);
} catch (error) {
  console.error(error);
}
```

DELETE: The DELETE method is used to remove a resource from a server. When a client sends a DELETE request to a server, the server will delete the resource if it exists. This method is commonly used in REST APIs to remove a resource that is no longer needed or to undo a previous action.

```js
// HTTP DELETE example
try {
  const response = await axios.delete("/api/data/1");
  console.log(response.data);
} catch (error) {
  console.error(error);
}
```

CRUD stands for Create, Read, Update, and Delete, which are the basic operations that can be performed on a database or web application. These operations allow users to create new data, read existing data, update data, and delete data when necessary.

#### Docs

[Task API Docs](https://documenter.getpostman.com/view/18152321/2s93RTSDLn)

#### UseEffect Approach

```js
const fetchTasks = async () => {
  try {
    const response = await customFetch.get("/");
    console.log(response.data);
  } catch (error) {
    +console.error(error);
  }
};

useEffect(() => {
  fetchTasks();
}, []);
```

#### React Query

React Query is a state management library that simplifies the process of fetching, caching, and updating data in React applications. Its major benefits include automatic background refetching, caching and stale data management, error handling, and easy pagination and infinite scrolling. Compared to setting up requests with useEffect, React Query provides a more declarative and centralized approach to managing data in React, which results in cleaner and more efficient code. It also reduces boilerplate code and improves performance by minimizing unnecessary re-renders and network requests.

- tons of features
- versions

[React Query](https://tanstack.com/query/v4/docs/react/overview)

#### Install

```sh
npm i @tanstack/react-query
```

#### Setup React Query

main.jsx

```js
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
```

#### First Query

Items.jsx

```js
import { useQuery } from "@tanstack/react-query";

const result = useQuery({
  queryKey: ["tasks"],
  queryFn: () => customFetch.get("/"),
});
console.log(result);
```

- Query Key

The unique key you provide is used internally for refetching, caching, and sharing your queries throughout your application.

- Query Function

A query function can be literally any function that returns a promise. The promise that is returned should either resolve the data or throw an error.

#### Error Handling

```js
const Items = () => {
  const { isLoading, data, error, isError } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const { data } = await customFetch.get("/something");
      return data;
    },
  });

  if (isLoading) {
    return <p style={{ marginTop: "1rem " }}>Loading...</p>;
  }

  // if (isError) {
  //   return <p style={{ marginTop: '1rem ' }}>there was an error...</p>;
  // }
  if (error) {
    return <p style={{ marginTop: "1rem " }}>{error.message}</p>;
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
```

#### Thunder Client Extension

Test API endpoints directly in VS CODE

#### Test Create Task (Challenge)

- check the docs and test endpoint in Thunder Client

#### Create Task

Form.jsx

```js
const { mutate: createTask, isLoading } = useMutation({
  mutationFn: (taskTitle) => customFetch.post("/", { title: taskTitle }),
});

const handleSubmit = (e) => {
  e.preventDefault();
  createTask(newItemName);
};
```

#### useMutation Helper Options

useMutation comes with some helper options that allow quick and easy side-effects at any stage during the mutation lifecycle. These come in handy for both invalidating and refetching queries after mutations

```js
const { mutate: createTask, isLoading } = useMutation({
  mutationFn: (taskTitle) => customFetch.post("/", { title: taskTitle }),
  onSuccess: () => {
    // do something
  },
  onError: () => {
    // do something
  },
});
```

#### Edit Task (Challenge)

- check the docs and test endpoint in Thunder Client
- setup the functionality
  hints : Item.jsx, look for edit log, and two arguments in mutationFn

#### Delete Task (Challenge)

- check the docs and test endpoint in Thunder Client
- setup the functionality

/\***_Query Basics_**/
To subscribe to a query in your components or custom hooks, call the useQuery hook with at least:

A unique key for the query
A function that returns a promise that:
Resolves the data, or
Throws an error

```js
import { useQuery } from "@tanstack/react-query";

function App() {
  const info = useQuery({ queryKey: ["todos"], queryFn: fetchTodoList });
}
```

The unique key you provide is used internally for refetching, caching, and sharing your queries throughout your application.

The query result returned by useQuery contains all of the information about the query that you'll need for templating and any other usage of the data:

isLoading or status === 'loading' => The query has no data yet
isError or status === 'error' => The query encountered an error
isSuccess or status === 'success' => The query was successful and data is available

error - If the query is in an isError state, the error is available via the error property.
data - If the query is in an isSuccess state, the data is available via the data property.
isFetching - In any state, if the query is fetching at any time (including background refetching) isFetching will be true.

```js
function Todos() {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodoList,
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  // We can assume by this point that `isSuccess === true`
  return (
    <ul>
      {data.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
}
```

## If booleans aren't your thing, you can always use the status state as well:

```js
function Todos() {
  const { status, data, error } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodoList,
  });

  if (status === "loading") {
    return <span>Loading...</span>;
  }

  if (status === "error") {
    return <span>Error: {error.message}</span>;
  }

  // also status === 'success', but "else" logic works, too
  return (
    <ul>
      {data.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
}
```

## keep in mind that a query can be in loading state without actually fetching data. As a rule of thumb:

The status gives information about the data: Do we have any or not?
The fetchStatus gives information about the queryFn: Is it running or not?

## Query Keys

At its core, TanStack Query manages query caching for you based on query keys. Query keys have to be an Array at the top level, and can be as simple
as an Array with a single string, or as complex as an array of many strings and nested objects. As long as the query key is serializable, and unique
to the query's data, you can use it!

// A list of todos

```js
useQuery({ queryKey: ['todos'], ... })

// Something else, whatever!
useQuery({ queryKey: ['something', 'special'], ... })

```

## Array Keys with variables

When a query needs more information to uniquely describe its data, you can use an array with a string and any number of serializable objects to describe
it. This is useful for:

```js
// An individual todo
useQuery({ queryKey: ['todo', 5], ... })

// An individual todo in a "preview" format
useQuery({ queryKey: ['todo', 5, { preview: true }], ...})

// A list of todos that are "done"
useQuery({ queryKey: ['todos', { type: 'done' }], ... })
```

## Query Keys are hashed deterministically!

This means that no matter the order of keys in objects, all of the following queries are considered equal:

```js
useQuery({ queryKey: ['todos', { status, page }], ... })
useQuery({ queryKey: ['todos', { page, status }], ...})
useQuery({ queryKey: ['todos', { page, status, other: undefined }], ... })
```

The following query keys, however, are not equal. Array item order matters!

```js
useQuery({ queryKey: ['todos', status, page], ... })
useQuery({ queryKey: ['todos', page, status], ...})
useQuery({ queryKey: ['todos', undefined, page, status], ...})
```

## If your query function depends on a variable, include it in your query key

Since query keys uniquely describe the data they are fetching, they should include any variables you use in your query function that change. For example:

```js
function Todos({ todoId }) {
  const result = useQuery({
    queryKey: ["todos", todoId],
    queryFn: () => fetchTodoById(todoId),
  });
}
```

Note that query keys act as dependencies for your query functions. Adding dependent variables to your query key will ensure that queries are cached
independently, and that any time a variable changes, queries will be refetched automatically

## Query Functions

A query function can be literally any function that returns a promise. The promise that is returned should either resolve the data or throw an error.

All of the following are valid query function configurations:

```js
useQuery({ queryKey: ["todos"], queryFn: fetchAllTodos });
useQuery({ queryKey: ["todos", todoId], queryFn: () => fetchTodoById(todoId) });
useQuery({
  queryKey: ["todos", todoId],
  queryFn: async () => {
    const data = await fetchTodoById(todoId);
    return data;
  },
});
useQuery({
  queryKey: ["todos", todoId],
  queryFn: ({ queryKey }) => fetchTodoById(queryKey[1]),
});
```

## Usage with fetch and other clients that do not throw by default

While most utilities like axios or graphql-request automatically throw errors for unsuccessful HTTP calls, some utilities like fetch do not throw errors
by default. If that's the case, you'll need to throw them on your own. Here is a simple way to do that with the popular fetch API:

```js
useQuery({
  queryKey: ["todos", todoId],
  queryFn: async () => {
    const response = await fetch("/todos/" + todoId);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  },
});
```

## Keep in mind that it might not be enough to check for loading state to show a loading spinner. Queries can be in state: 'loading', but fetchStatus: 'paused' if they are mounting for the first time, and you have no network connection.

## react query Network Mode

The networkMode option can have the following values:

"online": This is the default mode. In this mode, the query will always try to fetch data from the network, and it will not use the cache if the network request fails. This is useful for scenarios where you always want the latest data from the server.

```js
const { data } = useQuery("exampleQueryKey", fetchDataFunction, {
  networkMode: "online",
});
```

"offline": In this mode, the query will try to fetch data from the cache first. If the cache doesn't have the data, it will make a network request. This is useful for scenarios where you want to display cached data even if the network is temporarily unavailable.

```js
const { data } = useQuery("exampleQueryKey", fetchDataFunction, {
  networkMode: "offline",
});
```

"bypass": This mode skips the cache entirely and always makes a network request. It's useful when you want to ensure that you're getting the latest data from the server without relying on any cached information.

```js
const { data } = useQuery("exampleQueryKey", fetchDataFunction, {
  networkMode: "bypass",
});
```

"cache-only": In this mode, the query will only use the cache and will not make a network request. If the data is not in the cache, the query will return undefined. This is useful for scenarios where you want to display data from the cache even if the network is unavailable.

```js
const { data } = useQuery("exampleQueryKey", fetchDataFunction, {
  networkMode: "cache-only",
});
```

## useQuery dependent Query

In React Query, you might have scenarios where the result of one query is used as a parameter for another query. In such cases, you can leverage the enabled and staleTime options along with the queryFn to create dependent queries.

Here's an example of how you might handle dependent queries:

```js
import React from "react";
import { useQuery } from "react-query";

const fetchUser = async (userId) => {
  const response = await fetch(`https://api.example.com/users/${userId}`);
  const data = await response.json();
  return data;
};

const fetchUserPosts = async (userId) => {
  const response = await fetch(`https://api.example.com/users/${userId}/posts`);
  const data = await response.json();
  return data;
};

const UserProfile = ({ userId }) => {
  // Query for user details
  const { data: userData, isLoading: isUserLoading } = useQuery(
    ["user", userId],
    () => fetchUser(userId)
  );

  // Use the user data to conditionally enable the dependent query for user posts
  const { data: userPostsData, isLoading: isUserPostsLoading } = useQuery(
    ["userPosts", userId],
    () => fetchUserPosts(userId),
    {
      enabled: !!userData, // Enable the query only when userData is available
      staleTime: 60000, // Set a stale time for the data (e.g., 1 minute)
    }
  );

  if (isUserLoading) {
    return <div>Loading user data...</div>;
  }

  return (
    <div>
      <h1>User Details</h1>
      <p>User ID: {userId}</p>
      <p>User Name: {userData.name}</p>

      {isUserPostsLoading ? (
        <div>Loading user posts...</div>
      ) : (
        <div>
          <h2>User Posts</h2>
          <ul>
            {userPostsData.map((post) => (
              <li key={post.id}>{post.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
```

### Background Fetching Indicators

A query's status === 'loading' state is sufficient enough to show the initial hard-loading state for a query, but sometimes you may want to display an additional indicator that a query is refetching in the background. To do this, queries also supply you with an isFetching boolean that you can use to show that it's in a fetching state, regardless of the state of the status variable:

```js
function Todos() {
  const {
    status,
    data: todos,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  return status === "loading" ? (
    <span>Loading...</span>
  ) : status === "error" ? (
    <span>Error: {error.message}</span>
  ) : (
    <>
      {isFetching ? <div>Refreshing...</div> : null}

      <div>
        {todos.map((todo) => (
          <Todo todo={todo} />
        ))}
      </div>
    </>
  );
}
```

## Displaying Global Background Fetching Loading State

In addition to individual query loading states, if you would like to show a global loading indicator when any queries are fetching
(including in the background), you can use the useIsFetching hook:

```js
import { useIsFetching } from "@tanstack/react-query";

function GlobalLoadingIndicator() {
  const isFetching = useIsFetching();

  return isFetching ? (
    <div>Queries are fetching in the background...</div>
  ) : null;
}
```

## Query Invalidation

```js
// Invalidate every query in the cache
queryClient.invalidateQueries();
// Invalidate every query with a key that starts with `todos`
queryClient.invalidateQueries({ queryKey: ["todos"] });
```

When a successful postTodo mutation happens, we likely want all todos queries to get invalidated and possibly refetched to show the new todo item. To do this, you can use useMutation's onSuccess options and the client's invalidateQueries function:

```js
// When this mutation succeeds, invalidate any queries with the `todos` or `reminders` query key
const mutation = useMutation({
  mutationFn: addTodo,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["todos"] });
    queryClient.invalidateQueries({ queryKey: ["reminders"] });
  },
});
```
