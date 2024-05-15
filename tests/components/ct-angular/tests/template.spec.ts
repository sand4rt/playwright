import { expect, test } from '@playwright/experimental-ct-angular';
import type { HooksConfig } from '../playwright';
import { ButtonComponent } from '@/components/button.component';

test('should render a string', async ({ mount }) => {
  const messages = [] as any[]
  const component = await mount<HooksConfig>(`<app-button data-testid="test" [title]="title" (click)="message.emit('Clicked!')" />`, {
    imports: [ButtonComponent],
    props: {
      title: "Hello!"
    },
    on: {
      message: (value: any) => messages.push(value)
    }
  });

  await expect(component).toHaveText('Hello!')

  await component.update({
    props: {
      title: 'Goodbye!'
    }
  })

  await expect(component).toHaveText('Goodbye!')

  await component.getByTestId('test').click()

  expect(messages).toEqual(['Clicked!'])
})
