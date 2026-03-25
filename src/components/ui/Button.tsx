import { ActivityIndicator, Pressable, Text } from 'react-native';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
}

const variantStyles: Record<Variant, { container: string; text: string }> = {
  primary: { container: 'bg-primary-600 active:bg-primary-700', text: 'text-white' },
  secondary: { container: 'bg-secondary-600 active:bg-secondary-700', text: 'text-white' },
  outline: { container: 'border border-primary-600 bg-transparent', text: 'text-primary-600' },
  ghost: { container: 'bg-transparent', text: 'text-primary-600' },
};

const sizeStyles: Record<Size, { container: string; text: string }> = {
  sm: { container: 'px-3 py-2 rounded-lg', text: 'text-sm' },
  md: { container: 'px-4 py-3 rounded-xl', text: 'text-base' },
  lg: { container: 'px-6 py-4 rounded-xl', text: 'text-lg' },
};

export function Button({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
}: ButtonProps) {
  const isDisabled = disabled || loading;
  const { container, text } = variantStyles[variant];
  const { container: sizeContainer, text: sizeText } = sizeStyles[size];

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      className={`flex-row items-center justify-center ${container} ${sizeContainer} ${fullWidth ? 'w-full' : ''} ${isDisabled ? 'opacity-50' : ''}`}
    >
      {loading ? (
        <ActivityIndicator size="small" color={variant === 'primary' ? '#fff' : '#2563eb'} />
      ) : (
        <Text className={`font-semibold ${text} ${sizeText}`}>{label}</Text>
      )}
    </Pressable>
  );
}
