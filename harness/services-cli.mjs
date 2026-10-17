// usage: node harness/services-cli.mjs up|down   (mock backend container)
import { startMock, stopMock } from './services.mjs';

const cmd = process.argv[2];
if (cmd === 'up') {
  await startMock();
  console.log('mock backend up on http://localhost:7103');
} else if (cmd === 'down') {
  stopMock();
  console.log('mock backend removed');
} else {
  throw new Error('usage: up|down');
}
