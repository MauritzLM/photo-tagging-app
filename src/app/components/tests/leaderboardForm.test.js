import { queryByTestId, render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom';
import LeaderboardForm from '../leaderboardForm';

// props: handlenewgame, gameinstance
// handle submit function -> changes state*
// value of input
// mock fetch
// mocks
let handleNewGameMock = jest.fn();
let gameInstanceMock = {id: 1, time: 10000};
let handleFormSubmit = jest.fn().mockImplementation((e) => e.preventDefault());
let fetch = jest.fn();

describe('Test leaderboard form rendering and submission', () => {
    test('renders correctly', () => {
       render(<LeaderboardForm handleNewGame={handleNewGameMock} gameInstance={gameInstanceMock}/>)

       expect(screen.getByTestId('leaderboard-form')).toBeInTheDocument();
    });

    test('submitting form changes state', async () => {
        const user = userEvent.setup();

        render(<LeaderboardForm handleNewGame={handleNewGameMock} gameInstance={gameInstanceMock}/>);

        await user.click(screen.getByRole('button'));

        expect(handleFormSubmit).toHaveBeenCalled();
    });
});