import { useEffect, useRef } from "react";

export default function useOSSRef() {
    const ossClientRef = useRef(null);

    useEffect(() => {
        ossClientRef.current = new OSS({
            // yourRegion填写Bucket所在地域。以华东1（杭州）为例，Region填写为oss-cn-hangzhou。
            region: process.env.NEXT_PUBLIC_ALI_REGION,
            // 从STS服务获取的临时访问密钥（AccessKey ID和AccessKey Secret）。
            accessKeyId: process.env.NEXT_PUBLIC_ALI_ACCESS_KEY_ID!,
            accessKeySecret: process.env.NEXT_PUBLIC_ALI_ACCESS_KEY_SECRET!,
            bucket: process.env.NEXT_PUBLIC_ALI_BUCKET,
        });
    }, [])

    return ossClientRef;
}