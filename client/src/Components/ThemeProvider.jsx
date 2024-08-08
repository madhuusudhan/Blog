import { useSelector } from "react-redux";

function ThemeProvider({ children }) {
  const { theme } = useSelector((state) => state.theme);
  
  return (
    <div className={`min-h-screen ${theme}`}>
      <div className="bg-teal-100 text-black dark:text-white dark:bg-blue-950 min-h-screen">
        {children}
      </div>
    </div>
  );
}

export default ThemeProvider;
