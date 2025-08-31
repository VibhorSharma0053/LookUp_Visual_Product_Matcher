import { useState, useMemo, useCallback } from 'react';
import axios from 'axios';
import Controls from './components/Controls';
import ResultsPanel from './components/ResultsPanel';
import Footer from './components/Footer';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

function App() {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [queryImage, setQueryImage] = useState(null);
  const [similarityThreshold, setSimilarityThreshold] = useState(0.75);

  const resetState = () => {
    setResults([]);
    setError(null);
    setQueryImage(null);
  }

  const handleSearch = useCallback(async ({ file, searchUrl }) => {
    setIsLoading(true);
    setError(null);
    setResults([]);
    
    const formData = new FormData();
    if (file) {
      formData.append('file', file);
      setQueryImage(URL.createObjectURL(file));
    } else if (searchUrl) {
      formData.append('url', searchUrl);
      setQueryImage(searchUrl);
    } else {
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/api/v1/search`, formData);
      setResults(response.data.results);
    } catch (err) {
      const errorMsg = err.response?.data?.detail || 'Something went wrong. Please try again.';
      setError(errorMsg);
      setQueryImage(null);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const filteredResults = useMemo(() => {
    return results.filter(result => result.similarity >= similarityThreshold);
  }, [results, similarityThreshold]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-800">
      <header className="py-8">
        <h1 className="text-4xl font-bold text-center text-gray-700">LookUp - Visual Product Matcher</h1>
      </header>

      <main className="container mx-auto px-4 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Controls 
            queryImage={queryImage}
            isLoading={isLoading}
            handleFileSelect={(file) => handleSearch({ file })}
            resetState={resetState}
            similarityThreshold={similarityThreshold}
            setSimilarityThreshold={setSimilarityThreshold}
          />
          <ResultsPanel 
            isLoading={isLoading}
            error={error}
            results={results}
            filteredResults={filteredResults}
            handleUrlSearch={(url) => handleSearch({ searchUrl: url })}
          />
        </div>
      </main>
      <Footer/>
    </div>
  );
}

export default App;