import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar } from '@/components/layout/sidebar';
import { CRMView } from '@/views/crm-view';
import { LedgerView } from '@/views/ledger-view';
import { SettingsView } from '@/views/settings-view';

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-background">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<CRMView />} />
            <Route path="/crm" element={<CRMView />} />
            <Route path="/ledger" element={<LedgerView />} />
            <Route path="/ledger/:clientId" element={<LedgerView />} />
            <Route path="/settings" element={<SettingsView />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;