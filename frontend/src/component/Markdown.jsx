//댓글작성에 사용되는 Markdown 컴포넌트
import React from "react";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import ReactMarkdown from "react-markdown";

const Markdown = ({ comment }) => {
  return (
    <div>
      <ReactMarkdown
        children={comment.commentContents}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, "")}
                language={match[1]}
                PreTag="div"
                {...props}
              />
            ) : (
              <code className={className} {...props}>
                {comment.commentContents.split("\n").map((data) => {
                  return (<span>{data}<br /></span>);
                })}
              </code>
            );
          },
        }}
      />
    </div>
  );
};

export default Markdown;