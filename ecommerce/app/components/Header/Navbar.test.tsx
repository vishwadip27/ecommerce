import "@testing-library/jest-dom";
import { renderWithProvider } from "../../utils/test-utils";
import { screen } from "@testing-library/react";
import Navbar from "./Navbar";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    pathname: "/",
    query: {},
    asPath: "/",
  }),
  usePathname: () => "/",
}));

describe("Testing Navbar component", () => {
    beforeEach(()=>{
        renderWithProvider(<Navbar />);
    })
  it("renders Home link in the Navbar", () => {
    const text = screen.getByText(/Home/i);
    expect(text).toBeInTheDocument();
  });

  it("renders About link in the Navbar", () => {
    const text = screen.getByText(/About/i);
    expect(text).toBeInTheDocument();
  });
});
