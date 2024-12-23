import "@testing-library/jest-dom";
import { renderWithProvider } from "../utils/test-utils";
import { fireEvent, screen } from "@testing-library/react";
import TodoAndPhotoList from "./TodoAndPhotoList";
import { useRouter } from "next/navigation";

const originalFetach = global.fetch;

jest.mock("next/navigation" , () => ({
    useRouter: jest.fn(),
}))

describe("Testing TodoAndPhotoList component", () => {
    afterEach(() => {
        global.fetch = originalFetach;
        jest.clearAllMocks();
    });
    
    it("renders TodoAndPhotoList component with todo items", async () => {
        const mockTodoAndPhotoList = [{
            id: 1,
            title: "Test Todo 1",
            completed: false,
            },
            {
            id: 2,
            title: "Test Todo 2",
            completed: true,
            }
        ]
        global.fetch = jest.fn().mockResolvedValueOnce(
            Promise.resolve({
                json: () => Promise.resolve(mockTodoAndPhotoList),
            })
        );

        renderWithProvider(<TodoAndPhotoList />);
    }); 
});

test("Test navigation to another route", () => {
    const mockPush = jest.fn();
    //@ts-ignore
    useRouter.mockReturnValue({
        push: mockPush,
    })
    renderWithProvider(<TodoAndPhotoList />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(mockPush).toHaveBeenCalledWith("/route");
});