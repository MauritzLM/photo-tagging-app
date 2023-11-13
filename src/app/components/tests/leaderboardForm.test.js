import { queryByTestId, render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom';
import LeaderboardForm from '../leaderboardForm';
import { mockFetch, mockFetchError } from './mocks/mock-fetch';


// submit function?
// mocks
let handleNewGameMock = jest.fn();
let gameInstanceMock = { id: 1, time: 10000 };

describe('Leaderboard form', () => {

    test('renders correctly', () => {
        render(<LeaderboardForm handleNewGame={handleNewGameMock} gameInstance={gameInstanceMock} />);
        expect(screen.getByTestId('leaderboard-form')).toBeInTheDocument();
    });

    // valid submission and state change
    describe('submitting form and new game', () => {
      
        beforeEach(async () => {
            window.fetch = mockFetch('name');
        });

        // state change
        test('submitting form changes state', async () => {
            const user = userEvent.setup();
            render(<LeaderboardForm handleNewGame={handleNewGameMock} gameInstance={gameInstanceMock} />);
            const submitButton = screen.getByRole('button');
            await user.click(submitButton);
            expect(screen.getByText('Start a new game')).toBeInTheDocument();
        });

        // valid submission
        test('clicking new game button calls function correctly', async () => {
            const user = userEvent.setup();

            render(<LeaderboardForm handleNewGame={handleNewGameMock} gameInstance={gameInstanceMock} />);
            
            const submitButton = screen.getByRole('button');
            await user.click(submitButton);

            const newGameButton = screen.getByText('Start a new game');

            await user.click(newGameButton);

            expect(handleNewGameMock).toHaveBeenCalled();
        });
    });

    // invalid submission
    describe('Failed form validation', () => {
        //setup
        beforeEach(async () => {
            window.fetch = mockFetchError('');
        });

        // error display
        test('form error display', async () => {
            const user = userEvent.setup();
            render(<LeaderboardForm handleNewGame={handleNewGameMock} gameInstance={gameInstanceMock} />);
        
            await user.click(screen.getByRole('button'));

            expect(screen.getByTestId('error-msg').textContent).toMatch(/please enter a name/i);
        });
    });
});