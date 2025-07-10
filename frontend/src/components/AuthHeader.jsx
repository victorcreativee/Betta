import { Link } from "react-router-dom";

export default function AuthHeader() {
  return (
    <header className="bg-white shadow py-4 w-full">
      <div className="w-full flex justify-between items-center text-base font-medium">
       
        <Link to ="/" ><h1 className="text-3xl font-bold text-blue-500 ml-16">Betta</h1></Link>

        
        <nav className="space-x-2 mr-16">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          {/* <Link to="/login" className="hover:text-blue-600">Login</Link> */}
          {/* <Link to="/register" className="hover:text-blue-600">Register</Link> */}
        </nav>
      </div>
    </header>
  );
}
