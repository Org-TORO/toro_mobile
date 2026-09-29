# TORO User Interface Guide

This guide documents the current TORO mobile UI direction so future screens keep the same color schema, spacing, and interaction style.

## Current UI Direction

TORO uses a light, ocean-inspired visual system: soft sky blues, deep brand blues, translucent white surfaces, rounded form controls, and calm shadows. The current primary screen is the login flow, built in Expo React Native with `StyleSheet`, `ImageBackground`, `SafeAreaView`, and `lucide-react-native` icons.

The app is configured for a light interface in `app.json`:

```json
"userInterfaceStyle": "light"
```

Avoid dark-mode-only layouts unless a complete dark theme is introduced later.

## Brand Assets

Use the existing assets in `assets/` as the source of truth:

- `assets/TORO_LOGO.png` for the TORO brand mark.
- `assets/LOGIN_SCREEN_BACKGROUND.png` for the current watercolor ocean background.
- `assets/icon.png`, `assets/splash-icon.png`, and Android adaptive icon assets for platform branding.

The current background style is soft, airy, and illustrative. Future backgrounds should feel compatible with watercolor ocean/sky imagery and should not overpower foreground content.

## Color Tokens

Use these colors before introducing new ones.

| Token | Value | Usage |
| --- | --- | --- |
| `brandBlue` | `#2F74D8` | Primary filled buttons |
| `brandBlueStrong` | `#2E73FF` | Focus borders, input icons, active icons |
| `brandBlueDeep` | `#07509F` | Main headings |
| `brandBlueLink` | `#155BDE` | Text links |
| `brandBlueDark` | `#113EB1` | Secondary button text |
| `brandBlueRefresh` | `#1766DD` | Refresh/action icon |
| `screenBlue` | `#DCEFFD` | Fallback screen background |
| `adaptiveIconBlue` | `#E6F4FE` | Android adaptive icon background |
| `lineBlue` | `#D6E7FB` | Dividers |
| `borderBlue` | `#98C8FF` | Secondary button border |
| `inputBorder` | `#EEF4FA` | Default input border |
| `textPrimary` | `#253A56` | Input/body text |
| `textMuted` | `#8A93A3` | Placeholders and muted text |
| `white` | `#FFFFFF` | Panels, text on primary actions |
| `danger` | `#C92A2A` | Validation and form errors |
| `success` | `#22C764` | Success check badge |

Preferred translucent surfaces:

```ts
const surfaces = {
  card: "rgba(255, 255, 255, 0.78)",
  cardStronger: "rgba(255, 255, 255, 0.84)",
  input: "rgba(255, 255, 255, 0.9)",
  secondaryButton: "rgba(255, 255, 255, 0.42)",
  insetPanel: "rgba(255, 255, 255, 0.34)",
};
```

## Layout

- Design portrait-first. The app is configured with `"orientation": "portrait"`.
- Wrap screens in `SafeAreaView` when content touches device edges.
- Use `KeyboardAvoidingView` for forms.
- Center auth-style cards vertically and horizontally.
- Keep primary content width constrained. Current cards use `width: "100%"` with `maxWidth` around `322` to `342`.
- Use horizontal screen padding around `22`.
- Prefer generous vertical breathing room over dense layouts.

Current card pattern:

```ts
{
  width: "100%",
  maxWidth: 322,
  alignItems: "center",
  borderRadius: 20,
  backgroundColor: "rgba(255, 255, 255, 0.78)",
  paddingHorizontal: 28,
}
```

## Shape And Elevation

Use rounded, soft shapes:

- Cards: `20` to `22` radius.
- Inputs and primary buttons: `14` radius.
- Circular icon buttons: equal width/height with radius at half size, such as `50x50` with `25` radius.
- Success badges: circular, currently `48x48` with `24` radius.

Use soft blue shadows instead of gray/black shadows:

```ts
{
  shadowColor: "#82A7CE",
  shadowOffset: { width: 0, height: 18 },
  shadowOpacity: 0.22,
  shadowRadius: 28,
  elevation: 14,
}
```

Inputs use a lighter shadow:

```ts
{
  shadowColor: "#98B7D9",
  shadowOffset: { width: 0, height: 8 },
  shadowOpacity: 0.12,
  shadowRadius: 14,
  elevation: 3,
}
```

## Typography

The current app uses the default React Native system font. Continue with system fonts unless a brand font is added intentionally.

Text style:

- Headings: deep blue, centered, uppercase where appropriate, `17`, `800`.
- Primary button text: white, `15`, `800`.
- Secondary button text: dark blue, `15`, `800`.
- Input text: `#253A56`, `15`, `500`.
- Placeholder text: `#8A93A3`.
- Error text: danger red, `12` to `13`, `700` to `800`.

Use Vietnamese copy in UTF-8. Do not commit mojibake text such as garbled accented characters.

## Form Components

Inputs should follow the current login field style:

- Height: `52`.
- Border radius: `14`.
- Border: `1` using `#EEF4FA`.
- Background: `rgba(255, 255, 255, 0.9)`.
- Horizontal padding: `15`.
- Left icon from `lucide-react-native`, usually `19` to `20` size, `2.4` stroke width.
- Placeholder color: `#8A93A3`.

Focused inputs:

```ts
{
  borderColor: "#2E73FF",
  borderWidth: 1.5,
  shadowColor: "#2E73FF",
  shadowOpacity: 0.18,
}
```

Error inputs:

```ts
{
  borderColor: "#C92A2A",
  borderWidth: 1.5,
  shadowColor: "#C92A2A",
  shadowOpacity: 0.14,
}
```

## Buttons

Primary buttons:

- Height: `52`.
- Radius: `14`.
- Background: `#2F74D8`.
- Label: white, `15`, `800`.
- Use a soft blue shadow.
- Show `ActivityIndicator` with white color when submitting.

Secondary outline buttons:

- Height: `52`.
- Radius: `14`.
- Border: `2` using `#98C8FF`.
- Background: `rgba(255, 255, 255, 0.42)`.
- Label: `#113EB1`, `15`, `800`.

Pressed state:

```ts
{
  opacity: 0.84,
  transform: [{ scale: 0.99 }],
}
```

Icon-only buttons should be circular and include `accessibilityLabel`.

## Icons

Use `lucide-react-native` for interface icons. Existing icons include:

- `UserRound` for username or email.
- `LockKeyhole` for password.
- `Eye` and `EyeOff` for password visibility.
- `RefreshCw` for refresh.
- `Check` for success.

Icon colors should usually use `#2E73FF`, `#1766DD`, white, success green, or another existing token.

## Dividers

Use thin blue dividers for separation:

```ts
{
  height: 1,
  backgroundColor: "#D6E7FB",
}
```

Divider labels should be small, bold, and blue.

## Feedback States

- Validation errors appear directly below the related field in red.
- Form-level errors appear centered above the primary action.
- Loading states replace button text with an activity indicator.
- Success states use the TORO logo, deep blue heading text, and a green circular check badge.
- Subtle animation is appropriate for success confirmation. The current success badge fades, lifts, and springs into place.

## Implementation Notes

- Keep UI styles close to components while the app is small.
- If more screens are added, extract shared tokens into a theme module before duplicating colors and shadows.
- Prefer `StyleSheet.create` for component styling.
- Reuse `SafeAreaView`, `KeyboardAvoidingView`, `Pressable`, and `ImageBackground` patterns from the login screen.
- Keep accessibility labels on icon-only controls and state-changing buttons.

## Avoid

- Heavy gradients that compete with the watercolor background.
- Dark panels or black shadows.
- Sharp rectangular controls.
- New unrelated accent colors unless the product state requires them.
- Dense layouts that remove the current calm spacing.
- Text-only icon actions when a familiar lucide icon exists.
- Garbled non-UTF-8 Vietnamese text.
