import React from "react";

interface ReactPageProps {

}

const ReactPage: React.FC<ReactPageProps> = ({}) => {
    const handleClick = () => {
        console.log("I am clickable");
    };

    return(
        <div className="container mx-auto text-center my-16">
            <h2>A page built with react</h2>
            <a onClick={handleClick}>Click Me</a>

            <script src="/hydration/index.bundle.js" async></script>
        </div>
    );
};

export default ReactPage;

export async function getStaticProps() {}
