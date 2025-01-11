'use client'
import { Editor } from "@tiptap/react";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import throttle from 'lodash/throttle'
import { uuid } from "@/utils";
import useOSSRef from "./useOSSRef";



export default function useFileStorage(defaultId?: string) {
    const [id] = useState(defaultId || uuid());
    const [content, setContent] = useState('');
    const ossClientRef = useOSSRef();
    const [allPosts, setAllPosts] = useState([]);

    // 创建防抖函数，延迟500ms执行
    const debouncedSave = useCallback(
        throttle(async (editor: Editor) => {
            if (editor && ossClientRef.current) {
                try {
                    // 填写Object完整路径。Object完整路径中不能包含Bucket名称。
                    // 您可以通过自定义文件名（例如exampleobject.txt）或文件完整路径（例如exampledir/exampleobject.txt）的形式实现将数据上传到当前Bucket或Bucket中的指定目录。
                    // data对象可以自定义为file对象、Blob数据或者OSS Buffer。
                    await ossClientRef.current.put(
                        `ctw/${id}/draft.txt`,
                        new Blob([editor.getHTML()], {
                            type: 'text/plain',
                        }),
                    );
                } catch (e) {
                    console.log(e);
                }
            }
        },
            10000,
            {
                leading: false,  // 禁止首次立即执行
                trailing: true,  // 允许在间隔结束时执行
            }),
        []
    )

    useEffect(() => {
        fetch(
            `https://${process.env.NEXT_PUBLIC_ALI_BUCKET}.${process.env.NEXT_PUBLIC_ALI_REGION}.aliyuncs.com/ctw/info.json`,
            {
                cache: 'no-cache'
            }
        )
            .then((res) => res.json())
            .then(posts => {
                setAllPosts(posts);
            });
    }, [])

    // 组件卸载时取消防抖
    useEffect(() => {
        return () => {
            debouncedSave.cancel()
        }
    }, [debouncedSave])

    useEffect(() => {
        if (defaultId) {
            fetch(
                `https://${process.env.NEXT_PUBLIC_ALI_BUCKET}.${process.env.NEXT_PUBLIC_ALI_REGION}.aliyuncs.com/ctw/${id}/draft.txt`,
                {
                    cache: 'no-cache'
                }
            )
                .then((res) => res.text())
                .then(text => {

                    setContent(text);
                });
        } else {

        }
    }, [defaultId])


    const metaData = useMemo(() => allPosts.find(p => p.id === id), [allPosts, id])


    return {
        metaData,
        content,
        save: (editor: Editor) => {
            debouncedSave(editor)
        },
        publish: ({ title, summary, cover, content, type = 'guide' }: { title: string, summary: string, cover: string | null, content: string, type?: string }) => {
            if (!ossClientRef.current) return;

            const oldIndex = allPosts.findIndex(p => p.id === id);

            const metaData = {
                id,
                title,
                summary,
                cover: cover || allPosts[oldIndex].cover,
                type,
                status: 'published',
                publishTime: new Date().toString(),
            }

            const newPosts = [...allPosts];
            if (oldIndex !== -1) {
                newPosts[oldIndex] === metaData;
            } else {
                newPosts.push(metaData);
            }


            Promise.all([
                ossClientRef.current.put(
                    `ctw/${id}/index.txt`,
                    new Blob([content], {
                        type: 'text/plain',
                    }),
                ),
                ossClientRef.current.put(
                    `ctw/${id}/index.json`,
                    new Blob([JSON.stringify(metaData)], {
                        type: 'text/plain',
                    }),
                ),
                ossClientRef.current.put(
                    `ctw/info.json`,
                    new Blob([JSON.stringify(newPosts)], {
                        type: 'text/plain',
                    }),
                )
            ])
        }
    }
}