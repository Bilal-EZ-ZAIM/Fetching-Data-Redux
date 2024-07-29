import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../redux/slices/PostSlice";
import ReactPaginate from "react-paginate";
import "./Post.css"; // تأكد من إنشاء هذا الملف CSS

const Post = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const posts = useSelector((state) => state.posts.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  // حساب عدد العناصر لكل صفحة
  const postsPerPage = 5;
  const offset = currentPage * postsPerPage;

  // تصفية البيانات بناءً على استعلام البحث
  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.body.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentPosts = filteredPosts.slice(offset, offset + postsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="post-container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {currentPosts.length > 0 ? (
        currentPosts.map((post) => (
          <div key={post.id} className="post-card">
            <h2 className="post-title">{post.title}</h2>
            <p className="post-body">{post.body}</p>
          </div>
        ))
      ) : (
        <p className="no-posts">No posts available.</p>
      )}

      {filteredPosts.length > postsPerPage && (
        <ReactPaginate
          pageCount={Math.ceil(filteredPosts.length / postsPerPage)}
          onPageChange={handlePageChange}
          containerClassName="pagination"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          activeClassName="active"
          previousLabel={"< Previous"}
          nextLabel={"Next >"}
          previousClassName="previous"
          nextClassName="next"
        />
      )}
    </div>
  );
};

export default Post;
