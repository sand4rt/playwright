import { Component, inject, Injectable, NgModule } from '@angular/core';

@Injectable()
export class Store {
  state = {
    text: `Store`
  }
}

@NgModule({
  providers: [Store]
})
export class StoreModule {}

@Component({
  standalone: true,
  selector: 'app-imports',
  template: `
    {{ provider?.state.text }}: from provider
    {{ environmentProvider?.state.text }}: from environmentProvider
  `
})
export class ProvidersComponent {
  provider = inject(Store, { self: true, optional: true })
  environmentProvider = inject(Store, { skipSelf: true, optional: true })
}
