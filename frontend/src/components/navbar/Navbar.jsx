import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { openSidebar } from '../../redux/slices/sideBarSlice'; // Adjusted import path

function Navbar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleAdminClick = () => {
        dispatch(openSidebar());
        navigate('/admin');
    };

    return (
        <nav className="bg-gray-800 text-white p-4 flex justify-between">
            <Link to="/" className="mr-4">Home</Link>
            <button onClick={handleAdminClick} className="text-white">
                Admin
            </button>
            <button className="text-white">
                Resources
            </button>
        </nav>
    );
}

export default Navbar;

