import "@testing-library/jest-dom";
import { renderWithProvider } from "../../utils/test-utils";
import { fireEvent, screen } from "@testing-library/react";
import Navbar from "./Navbar";
import { useDispatch } from "react-redux";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    pathname: "/",
    query: {},
    asPath: "/",
  }),
  usePathname: () => "/",
}));

jest.mock("react-redux" , () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
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
  it("Toggles the dropdown menu when click on Products" , () => {
    const prodcutsMenu = screen.getByText(/Products/i)
    expect(screen.queryByText(/Electroncis/i)).toBeNull();
    fireEvent.click(prodcutsMenu);
    expect(screen.getByText(/Electronics/i)).toBeInTheDocument();
  });
  it("Shows Logout button when user is logged in" , () => {
    jest.mock("readt-redux" , () => ({
      useSelector : jest.fn().mockReturnValue(false),
      useDispatch: jest.fn(),
    }));

    renderWithProvider(<Navbar />)

    const logOutButton = screen.getByText(/Logout/i);
    expect(logOutButton).toBeInTheDocument();
  })
  it("Shows Login button when user is not Login" , () => {
    jest.mock("readt-redux" , () => ({
      useSelector : jest.fn().mockReturnValue(true),
      useDispatch: jest.fn(),
    }));

    renderWithProvider(<Navbar />)

    const logInbutton = screen.getByText(/Login/i);
    expect(logInbutton).toBeInTheDocument();

  })
});
