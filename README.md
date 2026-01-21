# Random-Chat Project

## Overview
Random-Chat is a real-time chat application built with a focus on clean architecture. It uses Bun as the runtime, Hono for the web framework, PostgreSQL with Drizzle ORM for data persistence, and TypeScript for type safety. The project is modular, with domain-driven design principles.

## Current State
- **Backend**: Minimal API with user registration (`POST /api/v1/users/register`). Includes basic validation, password hashing, and database integration.
- **Architecture**: Clean layers (domain, application, infrastructure) with dependency injection.
- **Tech Stack**: Bun, Hono, Drizzle, PostgreSQL, bcrypt.
- **Features**: User registration only; no authentication, chat, or frontend.
- **Development**: Runs on `http://localhost:3000` with hot reload.

## Code Quality Improvements (Applied)
- **Dependency Injection**: Centralized container initialization in `index.ts` for reusability.
- **Clean Architecture Adherence**: Defined interfaces in application layer (`UserRepository`, `PasswordHasher`); removed bloated repository methods.
- **SOLID Principles**: Split repository interfaces for Interface Segregation; refactored use case to return `Result<T>` for consistency.
- **Error Handling**: Unified use of `Result` in domain operations; wrapped infrastructure errors.
- **Naming Conventions**: Fixed typos (e.g., `.middleware.ts`); removed unused code (`RegisterUserSchema`).
- **Immutability**: Generated UUID in `User.create`; moved `UserPersistence` to shared types.
- **Separation of Concerns**: Controllers focus on HTTP translation; use cases handle business logic.

## Areas for Improvement

### High Priority
1. **Authentication System**
   - Add login/logout with JWT tokens.
   - Implement middleware to protect routes.
   - Store JWT secrets securely in `.env`.

2. **Chat Functionality**
   - Implement rooms and messages.
   - Add WebSocket support for real-time messaging.
   - Create use cases for sending/joining rooms.

3. **Security Enhancements**
   - Increase bcrypt salt rounds to 12.
   - Add rate limiting for registration/login.
   - Enforce stronger password policies (e.g., special characters).

### Medium Priority
4. **Testing**
   - Add unit tests for domain logic, use cases, and repositories.
   - Implement integration tests for HTTP routes.
   - Set up test database.

5. **Performance**
   - Add caching (e.g., Redis) for sessions/messages.
   - Implement pagination for large data sets.
   - Optimize database queries.

### Low Priority
6. **Code Quality**
   - Add ESLint and Prettier for consistent code style.
   - Improve error handling with more specific error classes.
   - Ensure consistent naming and documentation.

7. **Documentation**
   - Expand README with setup guides, architecture diagrams, and API docs.
   - Add Swagger for API documentation.
   - Document environment variables and deployment.

## Roadmap
- **Phase 1**: Implement authentication and basic testing.
- **Phase 2**: Build chat features with WebSockets.
- **Phase 3**: Develop frontend (e.g., React) and integrate.
- **Phase 4**: Add advanced features like user profiles, notifications, and deployment optimizations.

## Getting Started
1. Clone the repo.
2. Run `docker-compose up` for PostgreSQL.
3. In `backend/`, run `bun install` and `bun run dev`.
4. Test registration: `curl -X POST http://localhost:3000/api/v1/users/register -H "Content-Type: application/json" -d '{"username":"test","password":"password123"}'`.

For contributions, focus on the high-priority items or propose new features via issues.