# Serverless NextJS GraphQL - Pass Manager

## Tech Stack

- [NextJS](https://nextjs.org/)
- [GraphQL](https://graphql.org/)
- [NodeJS](https://nodejs.org/en/) - implicit in the built-in serverless functions from NextJS
- AWS MySQL RDB

I created this project with what I would consider to be a non-ideal tech stack for the sake of self-education.

NextJS tends to shine in the realm of SEO because of all the Static/SSR tools built into it. It's built in routing simplifies folder structure greatly when you have an application with many pages.

In this case, a password-manager does not need to be SEO optimized, nor does it have enough pages to necessitate the routing capabilities.

And in terms of GraphQL:
From my limited understanding of GraphQL, it is a basically a very sophisticated Cache, that can tremendously lower the overhead of handling multiple DataSources.

Also totally overkill for this application given I have a single datasource, but hey it was fun to learn.

## Improvements

Some immediate improvements that I want to make.

1. Currently, passwords are being sent to and from the UI and the back-end without being encrypted. I could have implemented this in the first iteration, however for the sake of QA, it was a lot easier to leave this as is until I had a working product.

2. Likewise, for `MUTATION_QUERIES` such as `addAccount`, the userId is being passed in explicitly. This is a security error as it could allow any user to update the account of a different user.

Ideally the userId should be tokenized and stored in the request headers, but again for the sake of QA and getting this off the ground, I left this as is.

3. Obviously there are ton of things to be added to the UI such as a `Confirm Changes` whenever you update a password.

4. Typescript types - The files have a .ts extension in name only right now.

This Project was bootstrapped with create-next-app.

```bash
npx create-next-app --example api-routes-apollo-server-and-client-auth api-routes-apollo-server-and-client-auth-app
```
