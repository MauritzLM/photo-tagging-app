import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom';
import Game from '../page';
import { mockFetch } from '@/app/components/tests/mocks/mock-fetch';

jest.mock('../../utils/utils.js', () => {
    return true
}
);

// rendering
// 1. initial render
// 2. -> click on picture
const updateSelection = jest.fn();

// mock fetch
describe("game page", () => {

    test("render initial state and select image", async () => {
        window.fetch = mockFetch('selection');

        render(<Game />);

        const images = await screen.findAllByRole("img");

        await user.click(images[0]);

        expect(screen.getByText('characters to find:')).toBeInTheDocument();

    });
});