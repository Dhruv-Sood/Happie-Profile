const Card = ({title,link,img,desc}) => {
  return (
    <>
          <div className="card card-compact bg-base-100 w-96 shadow-xl" data-theme="cupcake">
              <figure className="overflow-hidden">
                  <img
                      src={`${img}`}
                      alt="image" 
                      className=" bg-cover w-full"
                      />
              </figure>
              <div className="card-body">
                  <h2 className="card-title">{title}</h2>
                  {desc?<p>{desc}</p>:null}
                  <div className="card-actions justify-end">
                      <a href={`${link}`} target="_blank"><button className="btn btn-primary">Open</button></a>
                  </div>
              </div>
          </div>
    </>
  )
}
export default Card