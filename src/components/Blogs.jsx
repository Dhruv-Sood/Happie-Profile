import Card from "./Card";

const Blogs = ({ bg, data }) => {
    console.log(data);
    return (
        <div className={`p-4 flex flex-col gap-8 ${bg ? `${bg}` : ""}`}>
            <h1 className="w-full text-center font-bold text-4xl my-2">Blogs</h1>
            <div className="flex flex-wrap gap-4 justify-around">
                {
                    data.map((blog) => {
                        return (
                            <Card
                                title={blog.blogTitle}
                                link={blog.blogLink}  // Use blog.blogLink here
                                img={blog.blogImageUrl}  // Use blog.blogImageUrl here
                            />
                        );
                    })
                }
            </div>
        </div>
    );
};

export default Blogs;
