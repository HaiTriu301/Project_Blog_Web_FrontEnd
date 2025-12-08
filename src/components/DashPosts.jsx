import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow} from "flowbite-react";
import {Link} from "react-router-dom";

export default function DashPosts() {
    const {currentUser} = useSelector(state => state.user)
    const [userPosts, setUserPosts] = useState({});
    console.log(userPosts)

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch(
                    `${import.meta.env.VITE_API_URL}/api/post/getposts?userId=${
                        currentUser._id
                    }`,
                    {
                        credentials: 'include',
                    }
                );
                const data = await res.json();
                if (res.ok) {
                    setUserPosts(data.posts);
                    // if (data.posts.length < 9) {
                    //     setShowMore(false);
                    // }
                }
            } catch (error) {
                console.log(error.message);
            }
        };
        if (currentUser.isAdmin) {
            fetchPosts();
        }
    }, [currentUser._id]);

    return (
        <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar
        scrollbar-track-slate-100 scrollbar-thumb-slate-300
        dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
            {currentUser.isAdmin && userPosts.length > 0 ? (
                <>
                    <Table hoverable classNaame='shadow-md'>
                        <TableHead>
                            <TableHeadCell>Date updated</TableHeadCell>
                            <TableHeadCell>Post image</TableHeadCell>
                            <TableHeadCell>Post title</TableHeadCell>
                            <TableHeadCell>Category</TableHeadCell>
                            <TableHeadCell>Delete</TableHeadCell>
                            <TableHeadCell>
                                <span>Edit</span>
                            </TableHeadCell>
                        </TableHead>
                        {userPosts.map((post) => (
                            <TableBody className='divide-y'>
                                <TableRow className='bg-white dark:bg-gray-700 dark:bg-gray-800'>
                                    <TableCell>
                                        {new Date(post.updatedAt).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell>
                                        <Link to={`/post/${post.slug}`}>
                                            <img
                                                src={post.image}
                                                alt={post.title}
                                                className='w-20 h-10 object-cover bg-gray-500'
                                            />
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <Link
                                            className='font-medium text-gray-900 dark:text-white'
                                            to={`/post/${post.slug}`}
                                        >
                                            {post.title}
                                        </Link>
                                    </TableCell>
                                    <TableCell>{post.category}</TableCell>
                                    <TableCell>
                                        <span
                                            // onClick={() => {
                                            //     setShowModal(true);
                                            //     setPostIdToDelete(post._id);
                                            // }}
                                            className='font-medium text-red-500 hover:underline cursor-pointer'
                                        >
                                          Delete
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <Link
                                            className='text-teal-500 hover:underline'
                                            to={`/update-post/${post._id}`}
                                        >
                                            <span>Edit</span>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        ))}
                    </Table>
                </>
            ) : (
                <p>You have no posts yet!</p>
            )}
        </div>
    )
}