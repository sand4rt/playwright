//@ts-check
import '../src/assets/index.css';
import { beforeMount, afterMount } from '@playwright/experimental-ct-svelte/hooks';

beforeMount(async ({ hooksConfig }) => {
  console.log(`Before mount: ${JSON.stringify(hooksConfig)}`);
});

afterMount(async ({}) => {
  console.log(`After mount`);
});