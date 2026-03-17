// Component Registry
// This file is the single source of truth for the /components-preview showcase page.
//
// HOW TO ADD A NEW COMPONENT:
// 1. Create your component file in /components/ui/
// 2. Import it below
// 3. Add an entry to the `registry` array
// 4. The /components-preview page will display it automatically

import type { ReactNode } from "react";

import { Button } from "./button";
import { ButtonSmall } from "./button-small";
import { ButtonSocial, AppleLogo, GoogleLogo } from "./button-social";
import { SelectionChip } from "./selection-chip";
import { IconButton } from "./icon-button";
import { Input } from "./input";
import { OTPInput } from "./otp-input";
import { Toggle } from "./toggle";
import { Checkbox } from "./checkbox";
import { Radio } from "./radio";
import { SegmentedControl } from "./segmented-control";
import { TabBar } from "./tab-bar";
import { TopNavBar } from "./top-nav-bar";
import { Badge } from "./badge";
import { IllustrationLogo, IllustrationDaily, IllustrationFlex, IllustrationCheckbox, IllustrationCheckboxLine } from "./illustrations";
import {
  IconNewSpread,
  IconHome,
  IconHistory,
  IconCredits,
  IconProfile,
  IconChevronLeft,
  IconChevronRight,
  IconClose,
  IconBackCircle,
} from "./icons";

export interface VariantShowcase {
  label: string;
  render: () => ReactNode;
}

export interface ComponentShowcaseEntry {
  name: string;
  description: string;
  figmaComponent?: string;
  variants: VariantShowcase[];
}

export const registry: ComponentShowcaseEntry[] = [
  {
    name: "Illustrations",
    description: "Multicolor illustrations with three size variants: lg (110px), md (42px), sm (24px).",
    figmaComponent: "Illustration/Logo, Illustration/Daily, Illustration/Flex",
    variants: [
      { label: "Logo — lg", render: () => <IllustrationLogo size="lg" /> },
      { label: "Logo — md", render: () => <IllustrationLogo size="md" /> },
      { label: "Logo — sm", render: () => <IllustrationLogo size="sm" /> },
      { label: "Daily — lg", render: () => <IllustrationDaily size="lg" /> },
      { label: "Daily — md", render: () => <IllustrationDaily size="md" /> },
      { label: "Daily — sm", render: () => <IllustrationDaily size="sm" /> },
      { label: "Flex — lg", render: () => <IllustrationFlex size="lg" /> },
      { label: "Flex — md", render: () => <IllustrationFlex size="md" /> },
      { label: "Flex — sm", render: () => <IllustrationFlex size="sm" /> },
      { label: "Checkbox — lg", render: () => <IllustrationCheckbox size="lg" /> },
      { label: "Checkbox — md", render: () => <IllustrationCheckbox size="md" /> },
      { label: "Checkbox — sm", render: () => <IllustrationCheckbox size="sm" /> },
      { label: "CheckboxLine — lg", render: () => <IllustrationCheckboxLine size="lg" /> },
      { label: "CheckboxLine — md", render: () => <IllustrationCheckboxLine size="md" /> },
      { label: "CheckboxLine — sm", render: () => <IllustrationCheckboxLine size="sm" /> },
    ],
  },
  {
    name: "Icons",
    description: "System icon set. All 42x42, using currentColor for fill/stroke.",
    figmaComponent: "Icon/*",
    variants: [
      { label: "NewSpread", render: () => <IconNewSpread className="size-[42px] text-primary-black" /> },
      { label: "Home", render: () => <IconHome className="size-[42px] text-primary-black" /> },
      { label: "History", render: () => <IconHistory className="size-[42px] text-primary-black" /> },
      { label: "Credits", render: () => <IconCredits className="size-[42px] text-primary-black" /> },
      { label: "Profile", render: () => <IconProfile className="size-[42px] text-primary-black" /> },
      { label: "ChevronLeft", render: () => <IconChevronLeft className="size-[42px] text-primary-black" /> },
      { label: "ChevronRight", render: () => <IconChevronRight className="size-[42px] text-primary-black" /> },
      { label: "Close", render: () => <IconClose className="size-[42px] text-primary-black" /> },
      { label: "BackCircle", render: () => <IconBackCircle className="size-[42px] text-primary-black" /> },
    ],
  },
  {
    name: "Button",
    description: "Full-width action buttons used for primary and secondary CTAs.",
    figmaComponent: "Button/Primary, Button/Secondary, Button/Outlined, Button/Text",
    variants: [
      { label: "Primary — Default", render: () => <Button variant="primary">Get Started</Button> },
      { label: "Primary — Disabled", render: () => <Button variant="primary" disabled>Get Started</Button> },
      { label: "Secondary — Default", render: () => <Button variant="secondary">Continue</Button> },
      { label: "Secondary — Disabled", render: () => <Button variant="secondary" disabled>Continue</Button> },
      { label: "Outlined — Dark", render: () => <Button variant="outlined-dark">Get another reading</Button> },
      { label: "Outlined — Amber", render: () => <Button variant="outlined-amber">Get another reading</Button> },
      { label: "Text", render: () => <Button variant="text">Go home</Button> },
    ],
  },
  {
    name: "ButtonSmall",
    description: "Compact CTA buttons (40px) for inline actions. Primary and secondary variants with optional leading icon.",
    figmaComponent: "ButtonSmall/Primary, ButtonSmall/Secondary",
    variants: [
      { label: "Primary — Text", render: () => <ButtonSmall variant="primary">Get Started</ButtonSmall> },
      { label: "Primary — Icon + Text", render: () => <ButtonSmall variant="primary" icon={<IconNewSpread className="size-[16px]" />}>New Spread</ButtonSmall> },
      { label: "Secondary — Text", render: () => <ButtonSmall variant="secondary">Continue</ButtonSmall> },
      { label: "Secondary — Icon + Text", render: () => <ButtonSmall variant="secondary" icon={<IconNewSpread className="size-[16px]" />}>New Spread</ButtonSmall> },
      { label: "Primary — Disabled", render: () => <ButtonSmall variant="primary" disabled>Get Started</ButtonSmall> },
      { label: "Secondary — Disabled", render: () => <ButtonSmall variant="secondary" disabled>Get Started</ButtonSmall> },
    ],
  },
  {
    name: "ButtonSocial",
    description: "Social login buttons with provider icon and label.",
    figmaComponent: "Button/Social",
    variants: [
      { label: "Apple", render: () => <ButtonSocial icon={<AppleLogo />}>Sign up with Apple</ButtonSocial> },
      { label: "Google", render: () => <ButtonSocial icon={<GoogleLogo />}>Sign up with Google</ButtonSocial> },
    ],
  },
  {
    name: "SelectionChip",
    description: "Pill-shaped toggle chips for multi-select options.",
    figmaComponent: "SelectionChip",
    variants: [
      { label: "Default", render: () => <SelectionChip>Love & relationships</SelectionChip> },
      { label: "Selected", render: () => <SelectionChip selected>Love & relationships</SelectionChip> },
    ],
  },
  {
    name: "IconButton",
    description: "Circular icon buttons for navigation actions.",
    figmaComponent: "IconButton",
    variants: [
      { label: "Back", render: () => <IconButton variant="back" /> },
      { label: "Close", render: () => <IconButton variant="close" /> },
    ],
  },
  {
    name: "Input",
    description: "Text input with floating label, helper text, and error state.",
    figmaComponent: "Input",
    variants: [
      { label: "Default", render: () => <Input label="Enter your Name" helperText="Makes your reading personal and connected." /> },
      { label: "Filled", render: () => <Input label="Enter your Name" helperText="Makes your reading personal and connected." value="Nikolay" /> },
      { label: "Error", render: () => <Input label="Enter your Name" error="Makes your reading personal and connected." value="Nikolay" /> },
      { label: "Password", render: () => <Input label="Enter your password" helperText="Makes your reading personal and connected." type="password" /> },
    ],
  },
  {
    name: "OTPInput",
    description: "4-digit one-time password input.",
    figmaComponent: "OTPInput",
    variants: [
      { label: "Default", render: () => <OTPInput /> },
      { label: "Filled", render: () => <OTPInput value="6904" /> },
      { label: "Error", render: () => <OTPInput error /> },
    ],
  },
  {
    name: "Toggle",
    description: "On/off switch control.",
    figmaComponent: "Toggle",
    variants: [
      { label: "Off", render: () => <Toggle checked={false} /> },
      { label: "On", render: () => <Toggle checked /> },
    ],
  },
  {
    name: "Checkbox",
    description: "Square check/uncheck control.",
    figmaComponent: "Checkbox",
    variants: [
      { label: "Unchecked", render: () => <Checkbox checked={false} /> },
      { label: "Checked", render: () => <Checkbox checked /> },
    ],
  },
  {
    name: "Radio",
    description: "Circular single-select control.",
    figmaComponent: "Radio",
    variants: [
      { label: "Unselected", render: () => <Radio selected={false} /> },
      { label: "Selected", render: () => <Radio selected /> },
    ],
  },
  {
    name: "SegmentedControl",
    description: "Two-option tab switcher.",
    figmaComponent: "SegmentedControl",
    variants: [
      { label: "Left Active", render: () => <SegmentedControl leftLabel="Yearly" rightLabel="Monthly" value="left" /> },
      { label: "Right Active", render: () => <SegmentedControl leftLabel="Yearly" rightLabel="Monthly" value="right" /> },
    ],
  },
  {
    name: "TabBar",
    description: "Bottom navigation bar with Home, New Spread action, and History.",
    figmaComponent: "TabBar",
    variants: [
      { label: "Home Active", render: () => <TabBar activeTab="home" /> },
      { label: "History Active", render: () => <TabBar activeTab="history" /> },
    ],
  },
  {
    name: "TopNavBar",
    description: "Top navigation bar with back, title, and close.",
    figmaComponent: "TopNavBar",
    variants: [
      { label: "Default", render: () => <TopNavBar title="Page Title" /> },
    ],
  },
  {
    name: "Badge",
    description: "Small status labels for categories and promotions.",
    figmaComponent: "Badge",
    variants: [
      { label: "Recommended", render: () => <Badge type="recommended">Recommended</Badge> },
      { label: "Best Value", render: () => <Badge type="best-value">Best Value</Badge> },
      { label: "Category", render: () => <Badge type="category">Category</Badge> },
    ],
  },
];
