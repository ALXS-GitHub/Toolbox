export interface TagProps {
  color: string;
  backgroundColor: string;
  borderColor: string;
}

export const TagKeysMap: Record<string, TagProps> = {
    default: {
        color: '#ffffff',
        backgroundColor: '#333333bb',
        borderColor: '#1a1a1a',
    },
    origin: {
        color: '#ffffff',
        backgroundColor: '#007accbb',
        borderColor: '#005a9e',
    },
    use_state: {
        color: '#ffffff',
        backgroundColor: '#f27325bb',
        borderColor: '#c75b1d',
    },
    category: {
        color: '#ffffff',
        backgroundColor: '#912bf0bb',
        borderColor: '#6a1b9e',
    },
    version: {
        color: '#ffffff',
        backgroundColor: '#d72b9bbb',
        borderColor: '#9b1b5fff',
    },
    os: {
        color: '#ffffff',
        backgroundColor: '#e33d31bb',
        borderColor: '#89180bff',
    },
    rating: {
        color: '#000000',
        backgroundColor: 'transparent',
        borderColor: '#f1c40f',
    }
}