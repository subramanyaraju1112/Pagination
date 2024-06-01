import React, { useEffect, useState } from 'react';
import Previous from '../../../public/assets/arrow-left.svg';
import Next from '../../../public/assets/arrow-right.svg';

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const totalPages = 7;

    useEffect(() => {
        fetchUsers(currentPage);
    }, [currentPage]);

    const fetchUsers = async (page) => {
        try {
            const response = await fetch(`https://give-me-users-forever.vercel.app/api/users/${page}/next`);
            const data = await response.json();
            setUsers(data.users);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <section className='flex flex-col gap-4 border border-[0.063rem] border-[#3f4856] rounded-md shadow-lg'>
            <div className='p-4 w-full bg-[#0e2c50]'>
                <h1 className='text-3xl font-semibold text-white'>List Of Users</h1>
            </div>
            <div className='px-4'>
                <ul>
                    {users.map((user) => {
                        return (
                            <li key={user.id} className='p-2 flex justify-between items-start border-b-[0.063rem] border-[#E8EBEF]'>
                                <div className='flex flex-col gap-1 items-start'>
                                    <span className='list-disc text-left text-lg text-[#3f4856]'>{user.FirstNameLastName}</span>
                                    <span className='opacity-50 text-sm text-[#252525]'>{user.JobTitle}</span>
                                </div>
                                <div>
                                    <span className='opacity-60 text-xs text-[#3f4856]'>Ph: {user.Phone}</span>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div className='p-4 flex gap-1 items-center'>
                <button className='p-2 flex gap-1 items-center border border-[#3F4856] hover:cursor-pointer hover:bg-[#3f4856] hover:text-white' onClick={handlePrevPage} disabled={currentPage === 0}>
                    <img src={Previous} alt='next-icon' width={7} height={7} />
                    <span>Previous</span>
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index)}
                        className={currentPage === index ? 'p-2 border border-[#3F4856] bg-[#3f4856] text-white hover:cursor-pointer' : 'p-2 border border-[#3F4856] hover:cursor-pointer'}
                    >
                        {index + 1}
                    </button>
                ))}
                <button className='p-2 flex gap-1 items-center border border-[#3F4856] hover:cursor-pointer hover:bg-[#3f4856] hover:text-white' onClick={handleNextPage}>
                    <span>Next</span>
                    <img src={Next} alt='next-icon' width={7} height={7} />
                </button>
            </div>
        </section>
    );
};

export default UsersList;
