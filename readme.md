![Recipe App Demo](./recipe-app-demo.gif)

## Tech Stack Used

- [x] React Native with Expo (although in a real app, may not used Expo due to issues with custom native module development)
- [x] TypeScript with all React components, Redux Actions, Redux Reducers strongly typed, meaning most errors are caught by the compiler.
- [x] `react-navigation` for native navigation capabilities, including native access to back buttons.
- [x] Redux with React Hooks to show centralized state management with the syntactic simplicity of hooks.
- [x] Native Base component library to focus on app development that works cross platform.
- [ ] Ideally would have GraphQL endpoint for data management.
- [ ] Have jest + `@testing-library/native` installed, but ran out of time.
- [ ] Have `detox` installed for E2E tests, but ran out of time to run them.
- [ ] Show individual components with Storybook
- [ ] Add CICD process, probably with Windows App Center.

## Architecture Principles

This application attempts to follow the following principles:

- **Flat folder structure with long names**: Following the guidance of React core dev [Dan Ambramov](https://twitter.com/dan_abramov/status/1145354949871767552)
- **Modules First**: Try to keep projects and client tech stacks small. This way, everything from trying new tech stacks to rebasing becomes easier.
- **Interface Focused Abstractions**: Try to design around minimally leaky abstractions. This way, it is easier to change internals later. For example, even though `gateway` doesn't yet proxy to other microservices, by having apps point to the gateway, it becomes easier for server devs to optimize on their own accord.
- **Use Hooks and Functions**: Almost this entire app is written with functional components and hooks.
- **Use Generic UI Components When Piping Business Logic**: Screen modules, where UI meets other side effects like GraphQL, should only contain UI components that are generic by nature, thus making it easier to update the design system later.
- **Separate Complex React Components**: By keeping complex components with complex props out simpler components, we can have a longer shelf life.
- **Unify Modules With Basic Domain Knowledge**: Ideally, would have a `domain` package that contains general business logic. As such, it is imported by most modules within this code base. It would have types and graphql definitions. But it can also be expanded to include brand styles and functional reducers for interacting with different data structures.

## Progress

The following progress list items potentially needed to release MVP to Test Users.

### Cloud

- [x] GraphQL Types
- [x] GraphQL Endpoint
- [x] GraphQL Resolvers
- [x] REST Endpoint
- [x] Sequelize Database
- [ ] Add tests
- [ ] Add data validation for REST
- [ ] Add more error handling
- [ ] Add production logging

### App

- [x] iOS Support
- [x] Android Support
- [x] Apollo Client
- [x] Recompose Integration (for functional state management)
- [x] Flow Types
- [x] Decouple Core Components to Separate Modules
- [x] Reservations Results Screen
- [x] Add Reservation Screen
- [x] Add Reservations Updates DB
- [x] Add Reservations Updates UI
- [ ] Transition Animations
- [ ] Add more native components with `native-base`
- [ ] Brand Assets Update
- [ ] Add more in depth state management (Redux/RxJS)
- [ ] Add Tests
- [ ] Add more error handling
- [ ] Add production logging


## Additional Packages In A Potential Full Stack Architecture

### domain

Core business logic (including GraphQL types and TS types). Can be imported by both server and client code.

### cloud-gateway

Server endpoint. Currently has REST and GraphQL endpoints. Later could be abstracted to microservices.

### cloud-repository

Database. Possibly relational for related data, and document for quick read data.

### react-component-library

Reusable React-Native component library.
