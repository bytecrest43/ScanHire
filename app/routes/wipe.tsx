import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

const WipeApp = () => {
  const { auth, isLoading, error, clearError, fs, ai, kv } = usePuterStore();
  const navigate = useNavigate();
  const [files, setFiles] = useState<FSItem[]>([]);

  const loadFiles = async () => {
    const files = (await fs.readDir("./")) as FSItem[];
    setFiles(files);
  };

  useEffect(() => {
    loadFiles();
  }, []);

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) {
      navigate("/auth?next=/wipe");
    }
  }, [isLoading]);

  const handleDelete = async () => {
    for (const file of files) {
      await fs.delete(file.path);
    }
    await kv.flush();
    loadFiles();
  };

  if (isLoading) return <div className="text-center mt-10">Loading...</div>;

  if (error)
    return (
      <div className="text-red-600 text-center mt-10">
        Error: {error}
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800">Wipe App</h1>
        <p className="text-gray-600">
          Authenticated as: <span className="font-medium">{auth.user?.username}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        {files.map((file) => (
          <div
            key={file.id}
            className="p-4 rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition bg-white"
          >
            <p className="text-gray-800 font-medium">{file.name}</p>
            <p className="text-sm text-gray-500">{file.path}</p>
          </div>
        ))}
      </div>

      <div className="text-center">
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition"
          onClick={handleDelete}
        >
          🧹 Wipe App Data
        </button>
      </div>
    </div>
  );
};

export default WipeApp;
