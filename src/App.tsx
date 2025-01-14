import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/header';
import { Footer } from './components/footer';
import Home from './pages/Home';

function BackgroundEffect() {
  return (
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-gradient-to-br from-forest-950 via-forest-900 to-forest-950 animate-gradient-shift" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9ImN1cnJlbnRDb2xvciIvPjwvc3ZnPg==')] opacity-[0.03]" />
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <BackgroundEffect />
        <Header />
        <main className="flex-grow max-w-7xl mx-auto px-6 py-12">
          <Home />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

