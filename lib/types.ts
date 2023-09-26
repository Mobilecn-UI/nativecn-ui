export type Variant = 'default' | 'ghost' | 'destructive';

export type VariantStyles = {
  [K in Variant]?: string;
};
