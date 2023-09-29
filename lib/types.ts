export type Variant =
  | 'default'
  | 'secondary'
  | 'ghost'
  | 'destructive'
  | 'success';

export type VariantStyles = {
  [K in Variant]?: string;
};
