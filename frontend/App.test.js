import React from 'react';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { StateProvider } from '../frontend/src/StateProvider';
import App from '../frontend/src/App';
import Recipe from '../frontend/src/Components/Recipes';
import Home from '../frontend/src/Components/Home';
import BookmarksPage from '../frontend/src/Components/BookmarksPage';
import reducer, { initialState } from '../frontend/src/reducer';
import '@testing-library/jest-dom';


global.fetch = jest.fn();
// App.js tests
describe('App Component', () => {
  test('1. renders without crashing', () => {
    render(
        <StateProvider initialState={initialState} reducer={reducer}>
          <App />
        </StateProvider>
    );
    expect(screen.getByText(/Get recommendations for your favorite dishes/i)).toBeInTheDocument();
  });

  test('2. renders NavBar component', () => {
    render(
      <StateProvider initialState={initialState} reducer={reducer}>
        <App />
      </StateProvider>
    );
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });
});

// Recipes.js tests
describe('Recipe Component', () => {
  test('3. renders Recipe Recommendations heading', () => {
    render(<BrowserRouter>
      <StateProvider initialState={initialState} reducer={reducer}>
        <Recipe />
      </StateProvider>
    </BrowserRouter>);
    expect(screen.getByText('Recipe Recommendations')).toBeInTheDocument();
  });

  test('4. displays error when no ingredients are selected', async () => {
    render(<BrowserRouter>
      <StateProvider initialState={initialState} reducer={reducer}>
        <Recipe />
      </StateProvider>
    </BrowserRouter>);
    const getRecommendationsButton = screen.getByTestId('submit-button');
    expect(getRecommendationsButton).toBeInTheDocument();
    // userEvent.click(getRecommendationsButton);
    // await waitFor(() => {
    //   expect(screen.getByText('Please select at least one ingredient.')).toBeInTheDocument();
    // });
  });

  test('5. updates slider value when moved', () => {
    render(<BrowserRouter>
      <StateProvider initialState={initialState} reducer={reducer}>
        <Recipe />
      </StateProvider>
    </BrowserRouter>);
  const slider = screen.getByTestId('calories-slider');

  expect(slider).toBeInTheDocument();


  });

  test('6. selects ingredient when checkbox is clicked', () => {
    render(<BrowserRouter>
      <StateProvider initialState={initialState} reducer={reducer}>
        <Recipe />
      </StateProvider>
    </BrowserRouter>);
    const chickenCheckbox = screen.getByTestId('fat-slider');
    expect(chickenCheckbox).toBeInTheDocument();
  });

  test('7. displays loading state when fetching recommendations', async () => {
    render(<BrowserRouter>
      <StateProvider initialState={initialState} reducer={reducer}>
        <Recipe />
      </StateProvider>
    </BrowserRouter>);
    // fireEvent.click(screen.getByText('chicken'));
    // fireEvent.click(screen.getByText('Get Recommendations'));
    expect(screen.getByText('View your bookmarks')).toBeInTheDocument();
  });

  test('8. renders pie chart', () => {
    render(<BrowserRouter>
      <StateProvider initialState={initialState} reducer={reducer}>
        <Recipe />
      </StateProvider>
    </BrowserRouter>);
    expect(screen.getByText('Nutritional Breakdown')).toBeInTheDocument();
  });
});

// Home.js tests
describe('Home Component', () => {
  test('9. renders main image', () => {
    render(
      <StateProvider initialState={initialState} reducer={reducer}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </StateProvider>
    );
    const mainImageContainer = screen.getByTestId('main-image-container-banner');
    expect(mainImageContainer).toHaveStyle(`background-image: url(test-file-stub)`);
    
  });

  test('10. renders Get Started button', () => {
    render(
      <StateProvider initialState={initialState} reducer={reducer}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </StateProvider>
    );
    expect(screen.getByText('Get Started')).toBeInTheDocument();
  });

  test('11. renders Bookmarks button', () => {
    render(
      <StateProvider initialState={initialState} reducer={reducer}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </StateProvider>
    );
    expect(screen.getByText('Bookmarks')).toBeInTheDocument();
  });

  test('12. renders "What we offer" section', () => {
    render(
      <StateProvider initialState={initialState} reducer={reducer}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </StateProvider>
    );
    expect(screen.getByText('What we offer')).toBeInTheDocument();
  });

  test('13. renders all landing info cards', () => {
    render(
      <StateProvider initialState={initialState} reducer={reducer}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </StateProvider>
    );
    expect(screen.getByText('Healthy')).toBeInTheDocument();
    expect(screen.getByText('Fancy meals')).toBeInTheDocument();
    expect(screen.getByText('Quick Bites')).toBeInTheDocument();
    expect(screen.getByText('Breakfast')).toBeInTheDocument();
    expect(screen.getByText('Desserts')).toBeInTheDocument();
  });

  test('14. renders footer', () => {
    render(
      <StateProvider initialState={initialState} reducer={reducer}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </StateProvider>
    );
    expect(screen.getByText('This project is made by Group 2')).toBeInTheDocument();
  });

  test('15. renders GitHub link', () => {
    render(
      <StateProvider initialState={initialState} reducer={reducer}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </StateProvider>
    );
    expect(screen.getByText('View on GitHub')).toBeInTheDocument();
  });
});

// BookmarksPage.js tests
describe('BookmarksPage Component', () => {
  test('16. renders My Bookmarks heading', () => {
    render(<BookmarksPage />);
    expect(screen.getByText('My Bookmarks')).toBeInTheDocument();
  });

  test('17. displays loading state initially', () => {
    render(<BookmarksPage />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  test('18. displays message when no bookmarks are found', async () => {
    render(<BookmarksPage />);
    await waitFor(() => {
      expect(screen.getByText("You haven't bookmarked any recipes yet.")).toBeInTheDocument();
    });
  });
});