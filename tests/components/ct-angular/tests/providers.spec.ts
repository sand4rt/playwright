import { expect, test } from '@playwright/experimental-ct-angular';
import type { HooksConfig } from '../playwright';
import { ProvidersComponent, Store, StoreModule } from '@/components/providers.component';

test('should add imports', async ({ mount }) => {
  const component = await mount<HooksConfig>(ProvidersComponent, {
    imports: [StoreModule],
  });
  await expect(component).toContainText('Store: from environmentProvider')
  await expect(component).not.toContainText('Store: from provider')
})

test('should add environment providers', async ({ mount }) => {
  const component = await mount<HooksConfig>(ProvidersComponent, {
    environmentProviders: [Store],
  });

  await expect(component).toContainText('Store: from environmentProvider')
  await expect(component).not.toContainText('Store: from provider')
})

test('should add component providers', async ({ mount }) => {
  const component = await mount<HooksConfig>(ProvidersComponent, {
    providers: [Store],
  });

  await expect(component).not.toContainText('Store: from environmentProvider')
  await expect(component).toContainText('Store: from provider')
})

test('should add component view providers', async ({ mount }) => {
  const component = await mount<HooksConfig>(ProvidersComponent, {
    viewProviders: [Store],
  });

  await expect(component).not.toContainText('Store: from environmentProvider')
  await expect(component).toContainText('Store: from provider')
})
