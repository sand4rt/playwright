import { expect, test } from '@playwright/experimental-ct-angular';
import { NamedSlotsComponent } from '@/components/named-slots.component';

test('should render a string', async ({ mount }) => {
  const component = await mount(`
    <app-named-slots>
      <div header>{{header}}</div>
      <div main>{{main}}</div>
      <div footer>{{footer}}</div>
    </app-named-slots>
  `, {
    imports: [NamedSlotsComponent],
    props: {
      header: "Header",
      main: "Main",
      footer: "Footer"
    }
  });

  await expect(component.getByRole('banner')).toHaveText('Header')
  await expect(component.getByRole('main')).toHaveText('Main')
  await expect(component.getByRole('contentinfo')).toHaveText('Footer')
})
