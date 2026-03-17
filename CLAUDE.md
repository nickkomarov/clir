# Clir Project Rules

## Design System
- All components are built from the Figma design system via Figma MCP. Do not introduce custom styles that bypass the design system.
- When building components from Figma, retain the original naming conventions, color styles, text styles, spacing variables, and border radius variables exactly as they appear in Figma.
- All charts or data visualizations must use color tokens and typography from the project design system. Never use default library colors.

## Screen Size
- This is a mobile app. All prototypes are designed for iPhone 17 Pro: 402 x 874 CSS points.
- No responsive design needed. Fixed width of 402px.
- Wrap all pages in a device frame container that is 402px wide and 874px tall, centered on the screen with a visible border so it looks like a phone screen in the browser.
- Respect safe areas: top 62pt, bottom 34pt.

## Project Structure
- Each prototype exploration lives at its own route under /prototypes/. Example: /prototypes/onboarding-v1, /prototypes/dashboard-v2.
- The home page (/) serves as an index listing all available prototypes with links and short descriptions.
- Update the index page every time a new prototype is created.
- Shared components used across explorations go in /components/shared/.
- Exploration-specific components go in /components/[exploration-name]/.

## Component Library
- The coded component library lives in /components/ui/.
- Components must match the Figma design system exactly: same naming, same variants, same tokens.
- When building components from Figma via MCP, always read and replicate: component name, variant properties, color tokens used, text styles (font family, size, weight, line height), spacing values, border radius values.
- Document each component with a comment at the top listing which Figma component it maps to.

## Code Style
- Use TypeScript.
- Use Tailwind for layout and spacing.
- Use Next.js App Router for routing.
- Use made-up but realistic data unless real data files are provided.

## Figma Integration
- When asked to build from Figma, use the Figma MCP to read the design file.
- Always confirm which tokens and styles were extracted before generating components.
- If the MCP cannot read a specific property, flag it and ask for clarification rather than guessing.

## Prototyping Workflow
- Each prototype should feel like a real app running on a phone. Include status bar placeholder at top and home indicator at bottom.
- Navigation between screens within a prototype should use smooth transitions.
- Interactive elements should have proper touch states (pressed, disabled).
- Use scroll containers where content exceeds the viewport height.
