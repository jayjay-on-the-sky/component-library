# Project Documentation

This document serves as a guide to all available documentation files in this repository, helping agents and developers quickly find the information they need.

## 📚 Documentation Overview

| Document | Purpose | When to Use |
|----------|---------|-------------|
| **[CLAUDE.md](./CLAUDE.md)** | Primary guide for Claude Code agents | When you need to understand how to develop, build, and work with this codebase using Claude Code |
| **[TEST_PLAN.md](./TEST_PLAN.md)** | Comprehensive test plan for validating components | When you need to test existing components or verify contract compliance |
| **[COMPONENT_CREATION_PLAN.md](./COMPONENT_CREATION_PLAN.md)** | Step-by-step guide for creating new components | When you want to create a new component that follows library standards |
| **[COMPONENT_CONTRACT.md](./COMPONENT_CONTRACT.md)** | Rules all components must follow for theme compatibility | When you need to understand the strict requirements for component styling and behavior |
| **[README.md](./README.md)** | Project overview and usage instructions | When you need a high-level understanding of what this project does |
| **[DOCUMENTATION.md](./DOCUMENTATION.md)** | This file - documentation index | When you need to find what documentation is available |

## 🚀 Quick Start for Agents

1. **Read CLAUDE.md first** - This is your primary guide for working with this codebase
2. **Understand the Component Contract** - Read COMPONENT_CONTRACT.md to grasp the styling rules
3. **For development tasks**:
   - To create a new component: Follow COMPONENT_CREATION_PLAN.md
   - To test components: Refer to TEST_PLAN.md
   - For general development: Use the commands and guidelines in CLAUDE.md

## 🔍 Key Areas of the Codebase

### 🏗️ Project Structure
See the "Project Structure" section in CLAUDE.md for a detailed breakdown of:
- `/src/components` - Where all UI components live
- `/src/lib` - Utility modules and API clients
- `/src/hooks` - Custom React hooks
- `/src/assets` - Static assets
- `/themes` - Theme definition files

### ⚙️ Configuration
Key configuration files are documented in CLAUDE.md under "Key Configuration Files":
- `package.json` - Dependencies and scripts
- `tsconfig.json` - TypeScript configuration
- `vite.config.js` - Vite setup
- Environment variables in `.env.example`

### 🤖 AI Integration
This library uses GitHub Actions and the Claude AI API for:
- Component generation from descriptions
- URL/UI scanning/reverse engineering
- Theme variant generation
See the "AI Integration" section in CLAUDE.md for details.

## 📝 How to Contribute

1. **Creating Components**: Follow the step-by-step guide in COMPONENT_CREATION_PLAN.md
2. **Following Contracts**: All components must adhere to COMPONENT_CONTRACT.md
3. **Testing**: Use TEST_PLAN.md to validate your work
4. **Development**: Use the commands in CLAUDE.md (`npm run dev`, `npm run build`, etc.)

## 🔧 Troubleshooting

Common issues and their solutions can be found in:
- **Development Issues**: Check the "Common Development Tasks" section in CLAUDE.md
- **AI Feature Problems**: See the "Debugging AI features" tip in CLAUDE.md
- **Theme Issues**: Review the "Theme System" section in CLAUDE.md
- **Component Contract Violations**: Refer to TEST_PLAN.md for validation checks

## 🔄 Keeping Documentation Updated

When making significant changes to the codebase:
1. Update CLAUDE.md if development processes or structure change
2. Update TEST_PLAN.md if testing procedures evolve
3. Update COMPONENT_CREATION_PLAN.md if component creation guidelines change
4. Ensure COMPONENT_CONTRACT.md reflects the current styling rules
5. Update this DOCUMENTATION.md if you add or remove documentation files

---
*Last updated: May 17, 2026*