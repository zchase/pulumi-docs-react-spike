import React from "react";

interface ReactPageProps {

}

const ReactPage: React.FC<ReactPageProps> = ({}) => {
    return(
        <div className="container mx-auto text-center my-16">
            <h2>A page built with react</h2>
        </div>
    );
};

export default ReactPage;

export async function getStaticProps() {}
