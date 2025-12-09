import CallToAction from "../components/CallToAction.jsx";

export default function Projects() {
    return (
        <div className={"min-h-screen max-w-2xl mx-auto flex justify-center items-center flex-col p-3 gap-6"}>
            <h1 className="text-3xl font-semibold">Projects</h1>
            <p className="text-md text-gray-500">A Blog website built using MERN stack (Mongo, Express, React, NodeJS) for study purpose, gaining web development skill and experience</p>
            <CallToAction />
        </div>
    )
}