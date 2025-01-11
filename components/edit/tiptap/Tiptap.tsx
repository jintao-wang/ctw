'use client'
import { useEditor, EditorContent, Editor } from '@tiptap/react'
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import Image from '@tiptap/extension-image'
import { EditorProvider, useCurrentEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import useFileStorage from '@/hooks/useFileStorage'
import { useEffect, useRef } from 'react'
import { uuid } from '@/utils'
import useOSSRef from '@/hooks/useOSSRef'

const MenuBar = ({ metaData, onPublish }: {onPublish: ({ title, summary, cover }: { title: string, summary: string, cover: string | null }) => void }) => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const ossClientRef = useOSSRef();
    const { editor } = useCurrentEditor();
    const coverURLRef = useRef<null | string>(null);
    const titleRef = useRef<HTMLInputElement>(null);
    const summaryRef = useRef<HTMLInputElement>(null);

    if (!editor) {
        return null
    }

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!ossClientRef.current) return;
        if (!file) return

        try {

            // 生成唯一的文件名
            const fileName = `ctw/images/${uuid()}`;

            // 上传文件
            const result = await ossClientRef.current.put(fileName, file);

            return result.url;
        } catch (error) {
            console.error('Image upload failed:', error);
        }
    }

    return (
        <div className='mb-10 flex justify-between items-center'>
            <div className="join">
                <button
                    className={`btn join-item btn-sm ${editor.isActive('bold') && 'btn-active'}`}
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .toggleBold()
                            .run()
                    }
                >
                    Bold
                </button>
                <button
                    className={`btn join-item btn-sm ${editor.isActive('italic') && 'btn-active'}`}
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .toggleItalic()
                            .run()
                    }
                >
                    Italic
                </button>
                <button
                    className={`btn join-item btn-sm ${editor.isActive('strike') && 'btn-active'}`}
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .toggleStrike()
                            .run()
                    }
                >
                    Strike
                </button>
                <button
                    className={`btn join-item btn-sm ${editor.isActive('code') && 'btn-active'}`}
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .toggleCode()
                            .run()
                    }
                >
                    code
                </button>
                <button
                    className={`btn join-item btn-sm ${editor.isActive('heading', { level: 1 }) && 'btn-active'}`}
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                >
                    H1
                </button>
                <button
                    className={`btn join-item btn-sm ${editor.isActive('heading', { level: 2 }) && 'btn-active'}`}
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                >
                    H2
                </button>
                <label className="btn join-item btn-sm">
                    <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e).then((url) => {
                            if (url) {
                                editor.chain().focus().setImage({ src: url }).run()
                            }
                        })}
                    />
                    Image
                </label>
            </div>
            <div>
                <button
                    className="btn btn-outline btn-sm mr-5"
                    onClick={() => dialogRef.current?.showModal()}
                >Publish</button>
                <dialog ref={dialogRef} className="modal">
                    <div className="modal-box">
                        <input
                            type="text"
                            placeholder="Title"
                            className="input input-bordered w-full max-w-xs"
                            ref={titleRef}
                            defaultValue={metaData?.title}
                        />
                        <input
                            type="text"
                            placeholder="Summary"
                            className="mt-5 input input-bordered w-full max-w-xs"
                            ref={summaryRef}
                            defaultValue={metaData?.summary}
                        />
                        <label className="form-control w-full max-w-xs mt-5">
                            <div className="label">
                                <span className="label-text">Pick a Cover</span>
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                className="file-input file-input-bordered w-full max-w-xs"
                                onChange={(e) => handleImageUpload(e).then((url) => {
                                    if (url) {
                                        coverURLRef.current = url;
                                    }
                                })}
                            />
                        </label>
                        <button
                            className='btn btn-block mt-10'
                            onClick={() => {
                                if (titleRef.current?.value) {
                                    onPublish({
                                        title: titleRef.current?.value || '',
                                        summary: summaryRef.current?.value || '',
                                        cover: coverURLRef.current,
                                    })
                                    dialogRef.current?.close();
                                }
                            }}
                        >Submit</button>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>
                {/* <button className="btn btn-outline btn-sm">定时发布</button> */}
            </div>
        </div>
    )
}

const extensions = [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle.configure({ types: [ListItem.name] }),
    StarterKit.configure({
        bulletList: {
            keepMarks: true,
            keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        orderedList: {
            keepMarks: true,
            keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
    }),
    Image,
]

const Tiptap = ({ id }: { id?: string }) => {
    const { metaData, content, save, publish } = useFileStorage(id);
    const editorRef = useRef<Editor>(null);


    useEffect(() => {
        if (editorRef.current) {
            editorRef.current.commands.setContent(content);
        }
    }, [content]);

    return <EditorProvider
        slotBefore={<MenuBar
            metaData={metaData}
            onPublish={({ title, summary, cover }) => publish({ title, summary, cover, content: editorRef.current?.getHTML() || content })} />
        }
        extensions={extensions}
        content={content}
        onUpdate={(e) => {
            save(e.editor);
        }}
        onCreate={({ editor }) => {
            editorRef.current = editor;  // 获取 editor 实例
        }}
        editorProps={{}}
    />
}

export default Tiptap
