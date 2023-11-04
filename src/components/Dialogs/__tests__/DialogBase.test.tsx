import { fireEvent, render, screen } from "@testing-library/react";
import DialogBase, { DialogBaseProps } from "../DialogBase";
import TranslationProvider from "src/providers/TranslationProvider";

const mockOnClose = jest.fn();
const mockOnConfirm = jest.fn();

const defaultProps: DialogBaseProps = {
    open: true,
    onClose: mockOnClose,
    onConfirm: mockOnConfirm,
    title: "Test Dialog",
    content: "This is a test dialog",
};

const renderComponent = (props: DialogBaseProps) => {
    return render(
        <TranslationProvider initLocale="en">
            <DialogBase {...props} />
        </TranslationProvider>
    );
};

describe("DialogBase", () => {
    it("renders the dialog with the correct title and content", () => {
        renderComponent(defaultProps);
        expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
        expect(screen.getByText(defaultProps.content)).toBeInTheDocument();
    });

    it("Cancel button should be in the document", () => {
        renderComponent({ ...defaultProps, showCancel: true });
        const cancelButton = screen.getByText("Cancel");
        expect(cancelButton).toBeInTheDocument();
    });

    it("Cancel button should be clicked", () => {
        renderComponent({ ...defaultProps, showCancel: true });
        const cancelButton = screen.getByText("Cancel");
        fireEvent.click(cancelButton);
        expect(mockOnClose).toHaveBeenCalled();
    });

    it("does not render the cancel button when showCancel is false", () => {
        const { queryByText } = render(<DialogBase {...defaultProps} showCancel={false} />);
        expect(queryByText("Cancel")).toBeNull();
    });

    it("renders the custom text for the cancel and confirm buttons", () => {
        const { getByText } = render(
            <DialogBase {...defaultProps} cancelText="Abort" confirmText="Proceed" />
        );
        expect(getByText("Abort")).toBeInTheDocument();
        expect(getByText("Proceed")).toBeInTheDocument();
    });
});
