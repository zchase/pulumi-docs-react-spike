import React from "react";
import ReactDOMServer from "react-dom/server";

function createPageTemplateString(content: string): string {
    return `{{ define "hero" }}
    {{ partial "hero.html" (dict "title" .Title) }}
{{ end }}

{{ define "main"}}
    ${content}
{{ end }}`;
}

export function renderPage<T extends React.Attributes>(component: React.FC<any>, initialState: T): string {
    const content = ReactDOMServer.renderToString(React.createElement(component, initialState));
    return createPageTemplateString(content);
}
