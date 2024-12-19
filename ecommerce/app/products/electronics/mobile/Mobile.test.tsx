import "@testing-library/jest-dom";
import { renderWithProvider } from "../../../utils/test-utils";
import { fireEvent, screen } from "@testing-library/react";
import { useDispatch } from "react-redux";
import MobileComponent from "./page";

jest.mock('next/router', () => ({
    useRouter: jest.fn().mockReturnValue({
      push: jest.fn(),
      pathname: "/",
      query: {},
    }),
  }));
  
describe("Test Mobile Component" , () => {
    beforeEach(() => {
        renderWithProvider(<MobileComponent />)
    })
    it("render a title", () => {
        const title= screen.getByText(/Add New Mobiles/i);
        expect(title).toBeInTheDocument();
    })
    it("render input text box" , () => {
        const input = screen.getByPlaceholderText(/Enter Mobile Name/i);
        expect(input).toBeInTheDocument();
    });
    it("Add Mobile button render ", () => {
        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument();
    })
})