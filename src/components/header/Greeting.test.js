import { render, screen } from "@testing-library/react";
import Greeting from "./Greeting";
import userEvent from "@testing-library/user-event";

describe("Greeting component", () => {
  test("renders hello world as a text", () => {
    //Arrange
    render(<Greeting />);

    //Act
    //nothing

    //assesrert
    const helloworldElement = screen.getByText("Hello World!");
    expect(helloworldElement).toBeInTheDocument();

   

    test('renders Changed if the button was clicked', () => {
      //arrange
      render(<Greeting />);

      //act
      const buttonElement = screen.getByRole("button");
      userEvent.click(buttonElement);

      //assert
      const outputElement = screen.getByText("Changed!");
      expect(outputElement).toBeInTheDocument();
    });
  });
});
