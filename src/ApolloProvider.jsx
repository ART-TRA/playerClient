import React from "react";
import {createHttpLink} from "apollo-link-http";
import ApolloClient from "apollo-client";
import {InMemoryCache} from "apollo-cache-inmemory";
import {ApolloProvider} from "@apollo/client";
import {PlayerState} from "./context/playerState";
import {Theme} from "./components/Theme/Theme";

const httpLink = createHttpLink({
    // uri: 'http://localhost:5000'
    uri: 'https://evening-brook-36733.herokuapp.com/'
})

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
})

export default (
    <ApolloProvider client={client}>
        <PlayerState>
            <Theme/>
        </PlayerState>
    </ApolloProvider>
)
