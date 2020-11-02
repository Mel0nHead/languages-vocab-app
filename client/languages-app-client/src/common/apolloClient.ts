import ApolloClient from "apollo-boost";

const apolloClient = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  request: (operation) => {
    const token = localStorage.getItem("token");
    const authorization = token ? `Bearer ${token}` : "";

    operation.setContext({
      headers: {
        authorization,
      },
    });
  },
});

apolloClient.defaultOptions = {
  watchQuery: {
    fetchPolicy: "no-cache",
  },
  query: {
    fetchPolicy: "no-cache",
  },
  mutate: {
    fetchPolicy: "no-cache",
  },
};

export default apolloClient;
