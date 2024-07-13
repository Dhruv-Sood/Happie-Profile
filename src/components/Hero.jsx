import Typewriter from 'typewriter-effect';

const Hero = ({ name, role }) => {
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img
                    src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExdGIwZG03enZzM2ZnMXdyNDk5ZmhvbGxsOGc2eWg4ajZodmp4M2g4byZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/bGgsc5mWoryfgKBx1u/giphy.gif"
                    className="max-w-sm rounded-lg shadow-2xl" />
                <div>
                    <h1 className="text-5xl font-bold">
                        Hello World I am {name}
                        <Typewriter
                            options={{
                                strings: [role],
                                autoStart: true,
                                loop: true,
                            }}
                        /></h1>
                    <p className="py-6">
                        A passionate {role} who loves to build community and share knowledge.
                        This is my portfolio website where I showcase my projects and share my knowledge with the community.
                    </p>
                    <button className="btn btn-primary">Get Started</button>
                </div>
            </div>
        </div>
    )
}
export default Hero
