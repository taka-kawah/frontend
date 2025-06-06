import { AccountModal } from "./Components/SignIn/AccpuntModal";

function App() {
  return (
    <div className="bg-gray-200 flex justify-center py-5">
      <AccountModal needsSign={true} />
    </div>
  );
}

export default App;
// This is a simple React application that includes a sign-in form component.
