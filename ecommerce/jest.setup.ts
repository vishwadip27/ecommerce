import '@testing-library/jest-dom';
const originalConsoleError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (/Warning.*CSSStyleSheet/.test(args[0])) return;
    originalConsoleError(...args);
  };
});

jest.mock("primereact/resources/primereact.css", () => {});
jest.mock("primeicons/primeicons.css", () => {});

afterAll(() => {
  console.error = originalConsoleError;
});
