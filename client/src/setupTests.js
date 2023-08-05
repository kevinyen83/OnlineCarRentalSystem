import { server } from './mocks/browser';
import '@testing-library/jest-dom/extend-expect';



beforeAll(() => server.listen());

// Reset any request handlers after each test
afterEach(() => server.resetHandlers());

// Stop the MSW worker after all tests are done
afterAll(() => server.close());