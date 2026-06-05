import { Route, Routes } from 'react-router-dom';
import { AppProviders } from '@/providers/AppProviders';
import { HomePage } from '@/pages/HomePage';
import { UserPage } from '@/pages/UserPage';
import { RepoPage } from '@/pages/RepoPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

export function App() {
  return (
    <AppProviders>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user/:username" element={<UserPage />} />
        <Route path="/repo/:owner/:repoName" element={<RepoPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AppProviders>
  );
}
