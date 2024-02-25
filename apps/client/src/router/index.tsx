import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { PageManager } from './PageManager';
import { Page, pages } from './pages';

const pagesArray: Page[] = Object.values(pages);

const createPageElement = (page: Page) => {
  return (
    <PageManager accessRole={page.accessRole}>
      <page.Component />
    </PageManager>
  );
};

const router = createBrowserRouter([
  {
    children: pagesArray.map((page) => ({
      element: createPageElement(page),
      path: page.path,
    })),
  },
]);

export const Router = () => {
  return <RouterProvider router={router} />;
};
