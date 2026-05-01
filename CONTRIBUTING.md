# Personal Messaging OS - Contributing Guide

## Development Setup

1. Follow [SETUP.md](./docs/SETUP.md)
2. Create a branch: `git checkout -b feature/your-feature`
3. Make changes and test locally

## Code Standards

### TypeScript
- Always use strict mode
- Provide proper types (no `any`)
- Use interfaces for objects

### React
- Use functional components with hooks
- Follow React naming conventions
- Use Tailwind for styling

### File Structure
```
src/
├── app/
├── components/
│   ├── feature/
│   └── ui/
├── lib/
├── hooks/
└── types/
```

## Commit Convention

```
feat: Add new feature
fix: Fix a bug
docs: Update documentation
style: Code style changes
refactor: Refactor code
test: Add tests
chore: Maintenance
```

## Pull Request Process

1. Create PR with clear description
2. Link relevant issues
3. Ensure all tests pass
4. Request review from maintainers
5. Address feedback
6. Merge when approved

## Code Review Checklist

- [ ] Code follows style guide
- [ ] No `console.log()` in production code
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] No breaking changes (or documented)
- [ ] Performance implications considered

## Testing

```bash
# Unit tests
pnpm test

# Integration tests
pnpm test:integration

# E2E tests (Playwright)
pnpm test:e2e
```

## Performance

- Monitor bundle size: `pnpm analyze`
- Check Core Web Vitals
- Profile with DevTools
- Optimize images and assets

## Security

- No secrets in code
- Use environment variables
- Validate user input
- Sanitize data before display
- Keep dependencies updated: `pnpm audit`

## Questions?

Open an issue or start a discussion!
