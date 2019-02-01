import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemDataService implements InMemoryDbService {
  createDb() {
    const users = [
      { id: 1, name: 'I am {value}. Click Here.' },
      { id: 2, name: 'I am { input }. Click Here too.' },
      { id: 3, name: 'Please hit { val }. Throw it.' },
      { id: 4, name: 'Hey you { inputs }. Give it all.' },
    ];
    return {users: {
      total: users.length,
      results: users
    }};
  }
}
