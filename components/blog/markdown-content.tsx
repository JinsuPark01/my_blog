import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css';

interface MarkdownContentProps {
  content: string;
}

interface CodeProps {
  node?: any;
  inline?: boolean;
  [key: string]: any;
}

const MarkdownContent: React.FC<MarkdownContentProps> = ({ content }) => {
  return (
    <div className="prose dark:prose-dark max-w-none">
      <ReactMarkdown
        children={content}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          h1: ({ node, ...props }) => <h1 className="text-4xl font-bold" {...props} />,
          h2: ({ node, ...props }) => <h2 className="text-3xl font-semibold" {...props} />,
          h3: ({ node, ...props }) => <h3 className="text-2xl font-medium" {...props} />,
          a: ({ node, ...props }) => (
            <a
              className="text-blue-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            />
          ),
          code: ({ node, inline, ...props }: CodeProps) => (
            inline ? (
              <code className="bg-gray-100 text-red-500 px-1 py-0.5 rounded" {...props} />
            ) : (
              <pre className="bg-gray-800 text-white p-4 rounded overflow-x-auto">
                <code {...props} />
              </pre>
            )
          ),
          blockquote: ({ node, ...props }) => (
            <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600" {...props} />
          ),
          ul: ({ node, ...props }) => <ul className="list-disc pl-6" {...props} />,
          ol: ({ node, ...props }) => <ol className="list-decimal pl-6" {...props} />,
        }}
      />
    </div>
  );
};

export default MarkdownContent;
