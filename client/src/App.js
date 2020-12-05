import './App.css';
import FileUpload from "../src/components/FileUpload"

const App = () => {
  return (
    <div className="container">
      <h4 className="display-4 text-center mb-4">
        React File uplaod
      </h4>
      <FileUpload/>
    </div>
  )
}


export default App;
