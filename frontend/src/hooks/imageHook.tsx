import type { PropSidebarCustomProps } from '@site/src/types/customProps';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { useEffect, useState } from 'react';


export const imageHook = (image: string | undefined) => {
    const img = image || '';
    const hasImage = typeof image === "string" && image.trim() !== '';
    const resolvedImage = useBaseUrl(img);
    const [imageLoaded, setImageLoaded] = useState<boolean | null>(null);

    useEffect(() => {
        if (hasImage) {
            const imgObj = new Image();
            imgObj.src = resolvedImage;
            imgObj.onload = () => setImageLoaded(true);
            imgObj.onerror = () => setImageLoaded(false);
        } else {
            setImageLoaded(false);
        }
    }, [hasImage, resolvedImage]);

    return { imageLoaded, resolvedImage };
}