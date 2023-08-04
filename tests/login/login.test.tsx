import React from 'react'
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import LoginPage from "../../src/pages/login";

describe("Home", () => {
    const { container } = render(<LoginPage />);
    it("renders correctly", () => {
        expect(container).toMatchSnapshot();
    });

    it("has username & password", () => {
        const { container } = render(<LoginPage />);
        expect(screen.getByText("email:")).toBeInTheDocument;
        expect(screen.getByText("Password:")).toBeInTheDocument;
    });

    it("has button for log in", () => {
        const { container } = render(<LoginPage />);
        userEvent.click(screen.getByRole("button"))
        expect(screen.getByRole('button')).toBeCalled;
    });

    it("allows log in", () => {
        const { container } = render(<LoginPage />);
        userEvent.type(screen.getByText("email:"),"abc@example.com")
        userEvent.type(screen.getByText("Password:"),"password")
        userEvent.click(screen.getByRole("button"))
    });

});