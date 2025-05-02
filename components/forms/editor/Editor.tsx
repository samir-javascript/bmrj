"use client";

import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  type MDXEditorMethods,
  ConditionalContents,
  toolbarPlugin,
  UndoRedo,
  Separator,
  BoldItalicUnderlineToggles,
  ListsToggle,
  CreateLink,
  InsertImage,
  InsertTable,
  InsertThematicBreak,
  imagePlugin,
  linkPlugin,
  linkDialogPlugin,
  tablePlugin,
} from "@mdxeditor/editor";
import { useTheme } from "next-themes";
import type { ForwardedRef } from "react";

import "@mdxeditor/editor/style.css";
import "./editor.css";

interface Props {
  value: string;
  fieldChange: (value: string) => void;
  editorRef: ForwardedRef<MDXEditorMethods> | null;
  disabled:boolean
}

const Editor = ({ value, editorRef, disabled, fieldChange, ...props }: Props) => {
  const { resolvedTheme } = useTheme();

  const editorClassName = resolvedTheme === "dark" ? "light-border-2 mdx-editor-tall markdown-editor !bg-[rgb(49,49,49)] dark-editor w-full border !text-white" : "!bg-[rgb(49,49,49)] !text-white mdx-editor-tall light-border-2 markdown-editor light-editor w-full border"

  return (
    <MDXEditor
      key={resolvedTheme}
      markdown={value}
      ref={editorRef}
      className={editorClassName}
      readOnly={disabled}
      onChange={fieldChange}
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        linkPlugin(),
        linkDialogPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
        tablePlugin(),
        imagePlugin(),
        toolbarPlugin({
          toolbarContents: () => (
            <ConditionalContents
              options={[
                {
                  fallback: () => (
                    <>
                      <UndoRedo />
                      <Separator />

                      <BoldItalicUnderlineToggles />
                      <Separator />

                      <ListsToggle />
                      <Separator />

                      <CreateLink />
                      <InsertImage />
                      <Separator />

                      <InsertTable />
                      <InsertThematicBreak />
                    </>
                  ),
                },
              ]}
            />
          ),
        }),
       
      ]}

      {...props}
    />
  );
};

export default Editor;