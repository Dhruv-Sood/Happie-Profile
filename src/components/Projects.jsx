import Card from "./Card"

const Projects = ({ bg,data }) => {

  
  console.log(data);
  return (
    <div className={`p-4 flex flex-col gap-8 ${bg ? `${bg}` : ""}`}>
      <h1 className="w-full text-center font-bold text-4xl my-2">Projects</h1>
      <div className="flex flex-wrap gap-4 justify-around">
        {
          data.map((blog) => {
            return (
              <Card
                title={blog.projectName}
                link={blog.projectLink} 
                img={blog.projectImgLink}  
                desc={blog.projectDesc}
              />
            );
          })
        }
      </div>
    </div>
  )
}
export default Projects