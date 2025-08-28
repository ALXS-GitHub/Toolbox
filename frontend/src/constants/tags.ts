export interface TagProps {
  color: string;
  backgroundColor: string;
  borderColor: string;
}

export const TagsMap: Record<string, TagProps> = {
    default: {
        color: '#ffffff',
        backgroundColor: '#333333bb',
        borderColor: '#1a1a1a',
    },
    dev: {
        color: '#56ade7ff',
        backgroundColor: '#007accbb',
        borderColor: '#005a9e',
    },
    desktop: {
        color: '#e7d26bff',
        backgroundColor: '#e5c10abb',
        borderColor: '#b58f00',
    },
    design: {
        color: '#6aeb95ff',
        backgroundColor: '#07df4fbb',
        borderColor: '#05b84c',
    },
    rating: {
        color: '#000000',
        backgroundColor: '#ffffffbb',
        borderColor: '#f1c40f',
    }
}