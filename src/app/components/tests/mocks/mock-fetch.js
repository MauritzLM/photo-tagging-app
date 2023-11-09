
export function mockFetch(data) {
    return jest.fn().mockImplementation(() =>
        Promise.resolve({
            ok: true,
            json: () => data,
        }),
    );
};

export function mockFetchError(data) {
    return jest.fn().mockImplementation(() =>
        Promise.resolve({
            ok: true,
            // "Keep in mind that fetch is a little funny in that if you want the JSON response, you are dealing with 2 promises." - https://www.leighhalliday.com/mock-fetch-jest
            json: () =>  Promise.resolve({ errors: [{ msg: 'please enter a name' }] }),
        }),
    );
};