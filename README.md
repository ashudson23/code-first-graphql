Project using [GraphQL (GQL)](https://graphql.org/) and [Typescript](https://www.typescriptlang.org/) utilising code-first generated schemas - bootstrapped with [@nestjs/cli](https://www.npmjs.com/package/@nestjs/cli).

## Getting Started

For first time running, or when new packages have been added or editted

```bash
npm i
```

#### Run

```bash
npm start
# or
npm run dev
```

#### For Graphql (GQL) Playground

Open at [http://localhost:53373/graphql](http://localhost:53373/graphql)

### Run in production

```bash
npm run build
npm run serve
```

## Example queries

### Get users

#### Simple

```graphql
{
  users {
    name
  }
}
```

#### With constraints

```graphql
{
  users (skip: 0, take: 1) {
    id
    name
  }
}
```

#### With resolver chain

```graphql
{
  users {
    id
    name
    interests {
      id
      title
    }
  }
}
```

### Get interests

#### Simple

```graphql
{
  interests {
    id
    title
  }
}
```

#### With range of ids

```graphql
{
  interests (interestIds: [
    "4246ec53-6eaf-4744-93ce-e2643263d84b",
    "58659c67-2393-41d6-a803-94a8e9aa664f",
  ]) {
    id
    title
  }
}
```


### Create users


#### Simple

```graphql
mutation {
  createUser(createUserData: {
    name: "Matt",
  }) {
    name
    interests {
      title
    }
  }
}
```


#### With interests

```graphql
mutation {
  createUser(createUserData: {
    name: "Matt",
    interestIds: ["58659c67-2393-41d6-a803-94a8e9aa664f"],
  }) {
    name
    interests {
      title
    }
  }
}
```

### Create Interest

```graphql
mutation {
  createInterest(createInterestData: {
    title: "React",
  }) {
    id
  }
}
```

### Subscribe to events

#### User has been added subscription

```graphql
  subscription {
    userAdded {
      id
      name
    }
  }
```

#### Interest has been added subscription

```graphql
  subscription {
    interestAdded {
      id
      title
    }
  }
```

#### Example subscription using React

```jsx
import { gql } from '@apollo/client';
import { useSubscription } from "@apollo/react-hooks";

const ADDED_USERS_SUBSCRIPTION = gql`
  subscription {
    userAdded {
      id
      name
      interests {
        title
      }
    }
  }
`;

const LatestUser = () => {
  const { data, error, loading } = useSubscription(ADDED_USERS_SUBSCRIPTION);

  if (loading) {
    return <></>;
  }
  if (error) {
    return <>Something went wrong.</>;
  }
  if (!data) {
    return <>No new users</>;
  }

  const { userAdded } = data;
  const { name, interests } = userAdded;

  if (!interests || !interests.length) {
    return <>Say coucou to {name}, they don't have interests yet, let's help them !</>;
  }

  const interestList = interests.map(x => x.title).join(', ');
  return <>Please welcome {name}, fun fact: they like {interestList} !!</>;
}

export default LatestUser;
```

#### For production

When running `GraphQL Server` over multiple instances or in a production environment (where in-memory pubsub isn't recommended) consider using an external solution like [graphql-redis-subscriptions](https://github.com/davidyaha/graphql-redis-subscriptions) so all connections are notified of events consistently.
