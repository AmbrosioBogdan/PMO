import { BrowserContext } from 'playwright';

export class SessionStore {
  async save(context: BrowserContext): Promise<any> {
    const state = await context.storageState();
    return state;
  }
}
