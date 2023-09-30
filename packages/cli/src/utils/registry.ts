export const ALL_COMPONENTS = [
  'Avatar',
  'Badge',
  'Button',
  'Card',
  'Tabs',
  'Toggle',
];
const baseUrl =
  'https://raw.githubusercontent.com/Mobilecn-UI/nativecn-ui/main';

export async function fetchComponents(components: string[]) {
  try {
    const fetchedComponents = await Promise.all(
      components.map(async component => {
        const response = await fetch(`${baseUrl}/components/${component}.tsx`);
        const content = await response.text();
        return {
          name: `${component}.tsx`,
          content,
        };
      })
    );

    return fetchedComponents;
  } catch (error) {
    throw new Error(`Failed to fetch components from registry.`);
  }
}
