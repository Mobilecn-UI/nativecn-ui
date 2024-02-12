import { Switch as NativeSwitch } from 'react-native';

import { theme } from '../styles/theme';

// TODO: use current theme's colors
export interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof NativeSwitch> {}
export default function Switch({
  trackColor = { false: theme.light.background, true: theme.light.foreground },
  thumbColor = theme.light.background,
  ios_backgroundColor = theme.light.background,
  ...props
}: SwitchProps) {
  return (
    <NativeSwitch
      trackColor={trackColor}
      thumbColor={thumbColor}
      ios_backgroundColor={ios_backgroundColor}
      {...props}
    />
  );
}
