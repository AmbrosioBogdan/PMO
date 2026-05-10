# 🤖 AI Agent Guidelines

Welcome, Agent. This project is a modular, event-driven monorepo. Please follow these guidelines to maintain consistency and quality.

## 🏗️ Monorepo Strategy
- Use `bun` for all package management and script execution.
- Maintain a clear separation of concerns:
  - **Logic** goes into `packages/*`.
  - **Execution** happens in `apps/*`.
- Shared components should be placed in `packages/ui`.
- Database schemas and clients reside in `packages/database`.

## 🛠️ Coding Standards
- **TypeScript**: Mandatory for all packages and apps.
- **Async/Await**: Use for all asynchronous operations. Avoid callbacks.
- **Error Handling**: Implement robust error handling, especially in `packages/wa-engine` (Playwright logic).
- **Persistence**: Assume the browser session must be resilient. Always check if a session exists before attempting actions.

## 📡 External Integrations
- **Supabase**: Use for Auth and Real-time updates.
- **Neon**: Primary PostgreSQL store.
- **Tinybird**: Use for high-frequency event logging and analytics.
- **Linear**: Keep tasks updated. If you finish a step related to a Linear issue, update its status.

## 🧪 Testing & Verification
- Verify every change by reading the modified files.
- If a build script exists, run it after changes.
- Ensure all new features are documented in the relevant package README.

## 🔄 Development Flow
1. Check Linear for the next task.
2. Formulate a granular plan.
3. Verify every step as you execute.
4. Call `pre_commit_instructions` before submitting.
