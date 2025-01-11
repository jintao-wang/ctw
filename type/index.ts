interface SaveContentRequest {
    id: string;
    title: string;
    content: string; // HTML格式
    type: 'guide' | 'notice';
    cover?: string;
    status: 'draft' | 'published';
    publishTime?: string;
}

